const fs = require('fs')

const TERMINATOR = "\u0003"

const chain = {}

init()

module.exports = {
    addToChain(sentence, user, channel, guild) {
        const tokens = sentence.split(" ")

        tokens.forEach((token, index) => {
            const chainEntry = getOrCreateChainEntry(token)

            if(index == 0) {
                chainEntry.start = true
            }

            pushIfNotExist(chainEntry.ids, user),
            pushIfNotExist(chainEntry.ids, channel)
            pushIfNotExist(chainEntry.ids, guild)

            const nextToken = tokens[index + 1]

            const userFollowedBy = getOrCreateFollowedBy(chainEntry.followedBy, nextToken, user)
            const channelFollowedBy = getOrCreateFollowedBy(chainEntry.followedBy, nextToken, channel)
            const guildFollowedBy = getOrCreateFollowedBy(chainEntry.followedBy, nextToken, guild)

            userFollowedBy.occurences++
            channelFollowedBy.occurences++
            guildFollowedBy.occurences++
        })
    },
    generateSentence(id) {
        const idTokens = Object.values(chain).filter(e => e.ids.includes(id))
        const startToken = randomArrayItem(idTokens.filter(e => e.start))

        let result = [startToken]

        while(true) {
            const nextToken = randomArrayItem(result[result.length - 1].followedBy.filter(f => f.id == id))

            if(nextToken.word == TERMINATOR) {
                return result.map(t => t.word).join(" ")
            }

            result.push(chain[nextToken.word])
        }
    },
    chain
}

function init() {
    const chainsFile = fs.exists('chains.json')

    if(chainsFile) {
        chains = JSON.parse(fs.readFileSync('chains.json', 'UTF-8'))
    } else {
        fs.writeFileSync('chains.json', '{}')
    }

    setInterval(saveChains, 15000)
}

function saveChains() {
    fs.writeFileSync('chains.json', JSON.stringify(chain))
}

function createChainEntry(word) {
    return {
        word,
        "followedBy": [],
        "ids": [],
        "start": false,
        "context": []
    }
}

function getOrCreateChainEntry(word) {
    if(!chain[word]) {
        const result = createChainEntry(word)
        chain[word] = result
    }
    
    return chain[word]
}

function createFollowedBy(word, id) {
    return  {
        id,
        word: word,
        occurences: 0
    }
}

function getOrCreateFollowedBy(followedByArray, word, id) {
    if(!word) {
        word = TERMINATOR
    }

    const existingFollowedBy = followedByArray.find(i => i.id == id && i.word == word)
    
    if(existingFollowedBy) {
        return existingFollowedBy
    } else {
        const followedBy = createFollowedBy(word, id)
        followedByArray.push(followedBy)
        return followedBy
    }
}

function pushIfNotExist(array, item) {
    if(!array.includes(item)) {
        array.push(item)
    }
}

function randomArrayItem(array) {
    return array[Math.floor(Math.random() * array.length)]
}
