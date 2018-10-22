const markov = require('../markov')
markov.chains = {}

test('chain is blank', () => {
    expect(markov.chain).toEqual({})
})

test('add to chain', () => {
    const sentence = "Hello sir"
    const user = "shaun"
    const channel = "general"
    const guild = "shaunguild"

    const context = ["hello", "shaun"]

    markov.addToChain(sentence, user, channel, guild, context)

    expect(markov.chain).toEqual(
        {
            "Hello": {
                "word": "Hello",
                "followedBy": [
                    {
                        "id": "shaun",
                        "word": "sir",
                        "occurences": 1,
                        "context": ["hello", "shaun"]
                    },
                    {
                        "id": "general",
                        "word": "sir",
                        "occurences": 1,
                        "context": ["hello", "shaun"]
                    },
                    {
                        "id": "shaunguild",
                        "word": "sir",
                        "occurences": 1,
                        "context": ["hello", "shaun"]
                    }
                ],
                "context": ["hello", "shaun"],
                "ids": ["shaun", "general", "shaunguild"],
                "start": true,
            },
            "sir": {
                "word": "sir",
                "followedBy": [
                    {
                        "id": "shaun",
                        "word": "\u0003",
                        "occurences": 1,
                        "context": ["hello", "shaun"]
                    },
                    {
                        "id": "general",
                        "word": "\u0003",
                        "occurences": 1,
                        "context": ["hello", "shaun"]
                    },
                    {
                        "id": "shaunguild",
                        "word": "\u0003",
                        "occurences": 1,
                        "context": ["hello", "shaun"]
                    }
                ],
                "context": ["hello", "shaun"],
                "ids": ["shaun", "general", "shaunguild"],
                "start": false,
            }
        }
    )
})

test('updating existing', () => {
    const sentence = "Hello friend"
    const user = "shaun"
    const channel = "general"
    const guild = "shaunguild"

    const context = ["hello", "shaun"]

    markov.addToChain(sentence, user, channel, guild, context)

    expect(markov.chain).toEqual(
        {
            "Hello": {
                "word": "Hello",
                "followedBy": [
                    {
                        "id": "shaun",
                        "word": "sir",
                        "occurences": 1,
                        "context": ["hello", "shaun"]
                    },
                    {
                        "id": "general",
                        "word": "sir",
                        "occurences": 1,
                        "context": ["hello", "shaun"]
                    },
                    {
                        "id": "shaunguild",
                        "word": "sir",
                        "occurences": 1,
                        "context": ["hello", "shaun"]
                    },
                    {
                        "id": "shaun",
                        "word": "friend",
                        "occurences": 1,
                        "context": ["hello", "shaun"]
                    },
                    {
                        "id": "general",
                        "word": "friend",
                        "occurences": 1,
                        "context": ["hello", "shaun"]
                    },
                    {
                        "id": "shaunguild",
                        "word": "friend",
                        "occurences": 1,
                        "context": ["hello", "shaun"]
                    }
                ],
                "context": ["hello", "shaun"],
                "ids": ["shaun", "general", "shaunguild"],
                "start": true,
            },
            "sir": {
                "word": "sir",
                "followedBy": [
                    {
                        "id": "shaun",
                        "word": "\u0003",
                        "occurences": 1,
                        "context": ["hello", "shaun"]
                    },
                    {
                        "id": "general",
                        "word": "\u0003",
                        "occurences": 1,
                        "context": ["hello", "shaun"]
                    },
                    {
                        "id": "shaunguild",
                        "word": "\u0003",
                        "occurences": 1,
                        "context": ["hello", "shaun"]
                    }
                ],
                "context": ["hello", "shaun"],
                "ids": ["shaun", "general", "shaunguild"],
                "start": false,
            },
            "friend": {
                "word": "friend",
                "followedBy": [
                    {
                        "id": "shaun",
                        "word": "\u0003",
                        "occurences": 1,
                        "context": ["hello", "shaun"]
                    },
                    {
                        "id": "general",
                        "word": "\u0003",
                        "occurences": 1,
                        "context": ["hello", "shaun"]
                    },
                    {
                        "id": "shaunguild",
                        "word": "\u0003",
                        "occurences": 1,
                        "context": ["hello", "shaun"]
                    }
                ],
                "context": ["hello", "shaun"],
                "ids": ["shaun", "general", "shaunguild"],
                "start": false,
            }
        }
    )
})

test('same sentence', () => {
    const sentence = "Hello sir"
    const user = "shaun"
    const channel = "general"
    const guild = "shaunguild"

    const context = ["hello", "shaun"]

    markov.addToChain(sentence, user, channel, guild, context)

    expect(markov.chain).toEqual(
        {
            "Hello": {
                "word": "Hello",
                "followedBy": [
                    {
                        "id": "shaun",
                        "word": "sir",
                        "occurences": 2,
                        "context": ["hello", "shaun"]
                    },
                    {
                        "id": "general",
                        "word": "sir",
                        "occurences": 2,
                        "context": ["hello", "shaun"]
                    },
                    {
                        "id": "shaunguild",
                        "word": "sir",
                        "occurences": 2,
                        "context": ["hello", "shaun"],
                    },
                    {
                        "id": "shaun",
                        "word": "friend",
                        "occurences": 1,
                        "context": ["hello", "shaun"]
                    },
                    {
                        "id": "general",
                        "word": "friend",
                        "occurences": 1,
                        "context": ["hello", "shaun"]
                    },
                    {
                        "id": "shaunguild",
                        "word": "friend",
                        "occurences": 1,
                        "context": ["hello", "shaun"]
                    }
                ],
                "context": ["hello", "shaun"],
                "ids": ["shaun", "general", "shaunguild"],
                "start": true,
            },
            "sir": {
                "word": "sir",
                "followedBy": [
                    {
                        "id": "shaun",
                        "word": "\u0003",
                        "occurences": 2,
                        "context": ["hello", "shaun"]
                    },
                    {
                        "id": "general",
                        "word": "\u0003",
                        "occurences": 2,
                        "context": ["hello", "shaun"]
                    },
                    {
                        "id": "shaunguild",
                        "word": "\u0003",
                        "occurences": 2,
                        "context": ["hello", "shaun"]
                    }
                ],
                "context": ["hello", "shaun"],
                "ids": ["shaun", "general", "shaunguild"],
                "start": false,
            },
            "friend": {
                "word": "friend",
                "followedBy": [
                    {
                        "id": "shaun",
                        "word": "\u0003",
                        "occurences": 1,
                        "context": ["hello", "shaun"]
                    },
                    {
                        "id": "general",
                        "word": "\u0003",
                        "occurences": 1,
                        "context": ["hello", "shaun"]
                    },
                    {
                        "id": "shaunguild",
                        "word": "\u0003",
                        "occurences": 1,
                        "context": ["hello", "shaun"]
                    }
                ],
                "context": ["hello", "shaun"],
                "ids": ["shaun", "general", "shaunguild"],
                "start": false,
            }
        }
    )
})

test('generate sentence', () => {
    const id = "shaun"

    const context = ["hello"]

    const sentence = markov.generateSentence(id, context)

    expect(sentence).toMatch(/Hello (sir|friend)/)
})

test('generate sentence no context', () => {
    const id = "shaun"

    const context = []

    const sentence = markov.generateSentence(id, context)

    expect(sentence).toBeFalsy()
})
