const fs = require('fs')
const arrayCompare = require('./arrayCompare')

const TERMINATOR = "\u0003"

let chain = {}

init()

module.exports = {
    addToChain(sentence, user, channel, guild, context) {
        const tokens = sentence.split(" ")

        tokens.forEach((token, index) => {
            const chainEntry = getOrCreateChainEntry(token)

            if (index == 0) {
                chainEntry.start = true
            }

            context.forEach(c => pushIfNotExist(chainEntry.context, c))

            pushIfNotExist(chainEntry.ids, user),
            pushIfNotExist(chainEntry.ids, channel)
            pushIfNotExist(chainEntry.ids, guild)

            const nextToken = tokens[index + 1]

            const userFollowedBy = getOrCreateFollowedBy(chainEntry.followedBy, nextToken, user)
            const channelFollowedBy = getOrCreateFollowedBy(chainEntry.followedBy, nextToken, channel)
            const guildFollowedBy = getOrCreateFollowedBy(chainEntry.followedBy, nextToken, guild)

            context.forEach(c => pushIfNotExist(userFollowedBy.context, c))
            context.forEach(c => pushIfNotExist(channelFollowedBy.context, c))
            context.forEach(c => pushIfNotExist(guildFollowedBy.context, c))

            userFollowedBy.occurences++
            channelFollowedBy.occurences++
            guildFollowedBy.occurences++
        })
    },
    generateSentence(id, context) {
        const idTokens = Object.values(chain).filter(e => e.ids.includes(id) || !id)
        const startTokens = idTokens.filter(e => e.start)
            .sort((a, b) => arrayCompare.compare(b.context, context) - arrayCompare.compare(a.context, context))

        console.log(startTokens)

        const startToken = randomArrayItem(startTokens.filter(a => arrayCompare.compare(a.context, context) && arrayCompare.compare(a.context, context) == arrayCompare.compare(startTokens[0].context, context)))

        console.log(startToken)

        if (!startToken) {
            return
        }

        let result = [startToken]

        while (true) {
            const nextTokens = result[result.length - 1].followedBy.filter(f => (f.id == id || !id))
                .sort((a, b) => arrayCompare.compare(b.context, context) - arrayCompare.compare(a.context, context))

                const nextToken = randomOccurenceItem(nextTokens.filter(a => arrayCompare.compare(a.context, context) && arrayCompare.compare(a.context, context) == arrayCompare.compare(nextTokens[0].context, context)))

            if (nextToken.word == TERMINATOR) {
                return result.map(t => t.word).join(" ")
            }

            result.push(chain[nextToken.word])
        }
    },
    chain
}

function init() {
    const chainsFile = fs.existsSync('chains.json')

    if (chainsFile) {
        chain = JSON.parse(fs.readFileSync('chains.json', 'UTF-8'))
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
    if (!chain[word]) {
        const result = createChainEntry(word)
        chain[word] = result
    }

    return chain[word]
}

function createFollowedBy(word, id) {
    return {
        id,
        word: word,
        occurences: 0,
        context: []
    }
}

function getOrCreateFollowedBy(followedByArray, word, id) {
    if (!word) {
        word = TERMINATOR
    }

    const existingFollowedBy = followedByArray.find(i => i.id == id && i.word == word)

    if (existingFollowedBy) {
        return existingFollowedBy
    } else {
        const followedBy = createFollowedBy(word, id)
        followedByArray.push(followedBy)
        return followedBy
    }
}

function pushIfNotExist(array, item) {
    if (!array.includes(item)) {
        array.push(item)
    }
}

function randomArrayItem(array) {
    return array[Math.floor(Math.random() * array.length)]
}

function randomOccurenceItem(array) {
    const total = array.map(i => i.occurences).reduce((a, b) => a + b, 0)
    let selectedIndex = Math.floor(Math.random() * total)

    for (const item of array) {
        selectedIndex -= item.occurences

        if (selectedIndex <= 0) {
            return item
        }
    }
}
