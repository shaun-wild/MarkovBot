const { Client } = require('discord.js')
const client = new Client()

const { token } = require('./token.json')

const markov = require('./app/markov')
const config = require('./app/config')

config.loadConfig()

const tokenizer = require('./app/tokenizer')

const PREFIX = "m?"

client
    .on('ready', ready)
    .on('message', message)
    .on('guildCreate', guildCreate)
    

function message(message) {
    if(message.author.bot) {
        return
    }

    if(message.channel.type == "dm") {
        replyToMessage(message.content, message.channel)
        return
    }

    const imitateId = config.getConfig(message.guild.id, "imitate")

    if(imitateId) {
        const context = tokenizer.tokenize(message.content)
        const response = markov.generateSentence(imitateId, context)

        if(response) {
            simulateSend(response, message.channel)
        }
    }

    console.log(`Message From ${message.author.tag}@${message.guild.name}: ${message.content}`)

    if(message.content.startsWith(PREFIX)) {
        handleCommand(message)   
    }

    const user = message.author.id
    const channel = message.channel.id
    const guild = message.guild.id

    message.channel.fetchMessages({limit: 3})   
    .then(messages => {
        const contextString = messages.filter(m => m.author.id != message.author.id)
        .map(m => m.content)
        .join(" ")

        const contextTokens = tokenizer.tokenize(contextString)
        //markov.addToChain(message.content, [user, channel, guild], contextTokens)
    })
}

function guildCreate(guild) {

}

function ready() {
    console.log("Logged in as " + client.user.tag)
    console.log(`Currently active on ${client.guilds.size} guilds: ${client.guilds.map(g => g.name)}`)
}

function handleCommand(message) {
    const args = message.content.split(" ")
    const command = args.shift().replace(PREFIX, "")

    console.log(command)

    if(command == "reply") {
        const sentence = args.join(" ")
        replyToMessage(sentence, message.channel)
    } else if (command == "info") {
        const entries = Object.keys(markov.chain).length
        simulateSend(`I currently have ${entries} entries ${Math.floor((entries/1000000) * 100)}% of final goal`, message.channel)
    } else if(command == "imitate") {
        const guildId = message.guild.id

        const user = message.mentions.members.first()
        const channel = message.mentions.channels.first()

        if(user) {
            config.setConfig(guildId, "imitate", user.id)
            simulateSend("Okay. I will imitate " + user + ".", message.channel)
        } else if(channel) {
            config.setConfig(guildId, "imitate", channel.id)
            simulateSend("Okay. I will imitate channel " + channel + ".", message.channel)
        } else {
            config.setConfig(guildId, "imitate", null)
            simulateSend("Okay. I've stopped imitating.", message.channel)
        }
    }
}

function replyToMessage(sentence, channel) {    
    const context = tokenizer.tokenize(sentence)
    const response = markov.generateSentence(null, context)

    if(response) {
        simulateSend(response, channel)
    } else {
        simulateSend("Sorry, I do not understand :(", channel)
    }
}

function simulateSend(message, channel) {
    const delay = message.length * 20
    channel.startTyping()
    setTimeout(() => {
        channel.send(message)
        channel.stopTyping()
    }, delay)
}

client.login(token)
