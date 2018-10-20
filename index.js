const { Client } = require('discord.js')
const client = new Client()
const fs = require('fs')
const determiners = require('./determiners')

const { token } = require('./token.json')

const chains = require("./chains.json")

let imitate

client
    .on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`)
    })
    .on('message', msg => {
        if (msg.author.bot) return

        analyzeMessage(msg.author.id, msg.content)

        if (msg.content.startsWith('??i')) {
            imitate = msg.mentions.members.first().id
            msg.guild.me.setNickname(msg.mentions.members.first().displayName)
            msg.reply("Ok, I will imitate " + msg.mentions.members.first())
        } else {
            if (Math.random() < -1 && imitate) {
                const sentence = generateMessageFor(imitate)

                if (sentence) {
                    msg.channel.startTyping()
                    setTimeout(() => {
                        msg.channel.send(sentence)
                        msg.channel.stopTyping()
                    }, Math.random() * 2000)
                }
            }
        }

        saveChains()
    })
    .on('guildCreate', guild => {
        guild.channels.forEach(channel => {
            generateMarkovChains(channel)
        })
    })

client.login(token)

function generateMarkovChains(channel) {
    channel.fetchMessages({ limit: 100 })
        .then(messages => {
            console.log(`Analyzing ${messages.size} messages`)

            for (const message of messages.values()) {
                analyzeMessage(message.author.id, message.content)
            }
        })
}

function analyzeMessage(user, message) {
    const splitMessage = message.split(" ")

    let userChain = chains[user]

    if (!userChain) {
        chains[user] = {}
        userChain = chains[user]
    }

    splitMessage.forEach((word, index) => {
        pushToChain(userChain, word, splitMessage[index + 1], index)
    })
}

function pushToChain(userChain, word, next, index) {
    if (!next) {
        next = "\t"
    }

    if (!userChain[word]) {
        userChain[word] = {}
    }

    if (!userChain[word].next) {
        userChain[word].next = []
    }

    if (index == 0) {
        userChain[word].start = true
    }

    const foundWord = getWordFromArray(userChain[word].next, next)
    foundWord.occurences++
}

function getWordFromArray(wordArray, word) {
    const result = wordArray.find(a => a.word == word)

    if (result) {
        return result
    } else {
        const newEntry = { word, occurences: 0 }
        wordArray.push(newEntry)
        return newEntry
    }
}

function generateMessageFor(user) {
    if (!chains[user]) return

    console.log("Generating a message...")

    const firstWords = Object.entries(chains[user]).filter(f => f[1].start).map(f => f[0])
    const firstWord = firstWords[Math.floor(Math.random() * firstWords.length)]

    let sentence = [firstWord]
    let lastWord = firstWord

    while (true) {
        const nextWord = getNextWord(lastWord, chains[user])

        if (nextWord == "\t") {
            return sentence.join(" ")
        } else {
            sentence.push(nextWord)
            lastWord = nextWord
        }
    }
}

function getNextWord(word, userChain) {
    const nextWords = userChain[word].next

    const lookup = []

    for (const nextWord of nextWords) {
        const occurences = nextWord.occurences
        for (let i = 0; i < occurences; i++) {
            lookup.push(nextWord.word)
        }
    }

    return lookup[Math.floor(Math.random() * lookup.length)]
}

function saveChains() {
    fs.writeFileSync("./chains.json", JSON.stringify(chains))
}
