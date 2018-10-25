const fs = require('fs')

const TERMINATOR = "\u0003"

let chain = {}

init()

module.exports = {
    addToChain(sentence, ids, context) {
        const tokens = sentence.split(" ")

        tokens.forEach((token, index) => {
            const chainEntry = getOrCreateChainEntry(token)

            if (index == 0) {
                chainEntry.start = true
            }

            const nextToken = tokens[index + 1]

            ids.forEach(id => {
                pushIfNotExist(chainEntry.ids, id)

                const followedBy = getOrCreateFollowedBy(chainEntry.followedBy, nextToken, id)
                followedBy.occurences++

                context.forEach(c => {
                    const followedByContextEntry = findOrCreateContextEntry(followedBy.context, c)
                    followedByContextEntry.occurences++

                    const contextEntry = findOrCreateContextEntry(chainEntry.context, c, id)
                    contextEntry.occurences++
                })
            })
        })
    },
    generateSentence(id, context) {
        const contexts = this.getTopContexts(Object.values(chain), id, context)
        
        const startWord = randomOccurenceItem(contexts)

        const sentence = [ startWord ]

        if(!startWord) {
            return null
        }

        while(true) {
            const previous = sentence[sentence.length - 1]
            const followedBy = chain[previous.word].followedBy

            const followedByContexts = this.getTopContexts(followedBy, id, context)

            const nextWord = randomOccurenceItem(followedByContexts)
            
            if(nextWord.word == TERMINATOR) {
                return sentence.map(s => s.word).join(" ")
            }

            sentence.push(nextWord)
        }
    },
    getRelevantContext(chainEntry, id, context) {
        const relevantContext = chainEntry.context.filter(c => (!id || ((!c.ids || c.ids.includes(id)) || (!c.id || c.id == id))) && context.includes(c.word))
        const total = relevantContext.reduce((t, c) => t += c.occurences, 0)
    
        return {
            word: chainEntry.word,
            occurences: total
        }
    },
    getTopContexts(contextArray, id, context) {
        const relevantTokens = contextArray.map(f => this.getRelevantContext(f, id, context))
                    .filter(c => c.occurences)
                    .sort(occurenceSort)
    
        let top = 3
    
        if(relevantTokens.length < top) {
            top = relevantTokens.length
        }
    
        return relevantTokens.slice(0, top)
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

function findOrCreateContextEntry(array, word, id) {
    const result = array.find(i => i.word == word && (i.id == id || !id))
    
    if (result) {
        return result
    }

    const contextEntry = createContextEntry(word, id)
    array.push(contextEntry)
    return contextEntry
}

function createContextEntry(word, id) {
    if(id) {
        return {
            id,
            word,
            occurences: 0
        }
    } else {
        return {
            word,
            occurences: 0
        }
    }
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

function occurenceSort(a, b) {
    return b.occurences - a.occurences
}
