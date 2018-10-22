const markov = require('../markov')

test('chain is blank', () => {
    expect(markov.chain).toEqual({})
})

test('add to chain', () => {
    const sentence = "Hello sir"
    const user = "shaun"
    const channel = "general"
    const guild = "shaunguild"

    markov.addToChain(sentence, user, channel, guild)

    expect(markov.chain).toEqual(
        {
            "Hello": {
                "word": "Hello",
                "followedBy": [
                    {
                        "id": "shaun",
                        "word": "sir",
                        "occurences": 1
                    },
                    {
                        "id": "general",
                        "word": "sir",
                        "occurences": 1
                    },
                    {
                        "id": "shaunguild",
                        "word": "sir",
                        "occurences": 1
                    }
                ],
                "context": [],
                "ids": ["shaun", "general", "shaunguild"],
                "start": true,
            },
            "sir": {
                "word": "sir",
                "followedBy": [
                    {
                        "id": "shaun",
                        "word": "xs",
                        "occurences": 1
                    },
                    {
                        "id": "general",
                        "word": "xs",
                        "occurences": 1
                    },
                    {
                        "id": "shaunguild",
                        "word": "xs",
                        "occurences": 1
                    }
                ],
                context: [],
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

    markov.addToChain(sentence, user, channel, guild)

    expect(markov.chain).toEqual(
        {
            "Hello": {
                "word": "Hello",
                "followedBy": [
                    {
                        "id": "shaun",
                        "word": "sir",
                        "occurences": 1
                    },
                    {
                        "id": "general",
                        "word": "sir",
                        "occurences": 1
                    },
                    {
                        "id": "shaunguild",
                        "word": "sir",
                        "occurences": 1
                    },
                    {
                        "id": "shaun",
                        "word": "friend",
                        "occurences": 1
                    },
                    {
                        "id": "general",
                        "word": "friend",
                        "occurences": 1
                    },
                    {
                        "id": "shaunguild",
                        "word": "friend",
                        "occurences": 1
                    }
                ],
                "context": [],
                "ids": ["shaun", "general", "shaunguild"],
                "start": true,
            },
            "sir": {
                "word": "sir",
                "followedBy": [
                    {
                        "id": "shaun",
                        "word": "xs",
                        "occurences": 1
                    },
                    {
                        "id": "general",
                        "word": "xs",
                        "occurences": 1
                    },
                    {
                        "id": "shaunguild",
                        "word": "xs",
                        "occurences": 1
                    }
                ],
                context: [],
                "ids": ["shaun", "general", "shaunguild"],
                "start": false,
            },
            "friend": {
                "word": "friend",
                "followedBy": [
                    {
                        "id": "shaun",
                        "word": "xs",
                        "occurences": 1
                    },
                    {
                        "id": "general",
                        "word": "xs",
                        "occurences": 1
                    },
                    {
                        "id": "shaunguild",
                        "word": "xs",
                        "occurences": 1
                    }
                ],
                context: [],
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

    markov.addToChain(sentence, user, channel, guild)

    expect(markov.chain).toEqual(
        {
            "Hello": {
                "word": "Hello",
                "followedBy": [
                    {
                        "id": "shaun",
                        "word": "sir",
                        "occurences": 2
                    },
                    {
                        "id": "general",
                        "word": "sir",
                        "occurences": 2
                    },
                    {
                        "id": "shaunguild",
                        "word": "sir",
                        "occurences": 2
                    },
                    {
                        "id": "shaun",
                        "word": "friend",
                        "occurences": 1
                    },
                    {
                        "id": "general",
                        "word": "friend",
                        "occurences": 1
                    },
                    {
                        "id": "shaunguild",
                        "word": "friend",
                        "occurences": 1
                    }
                ],
                "context": [],
                "ids": ["shaun", "general", "shaunguild"],
                "start": true,
            },
            "sir": {
                "word": "sir",
                "followedBy": [
                    {
                        "id": "shaun",
                        "word": "xs",
                        "occurences": 2
                    },
                    {
                        "id": "general",
                        "word": "xs",
                        "occurences": 2
                    },
                    {
                        "id": "shaunguild",
                        "word": "xs",
                        "occurences": 2
                    }
                ],
                context: [],
                "ids": ["shaun", "general", "shaunguild"],
                "start": false,
            },
            "friend": {
                "word": "friend",
                "followedBy": [
                    {
                        "id": "shaun",
                        "word": "xs",
                        "occurences": 1
                    },
                    {
                        "id": "general",
                        "word": "xs",
                        "occurences": 1
                    },
                    {
                        "id": "shaunguild",
                        "word": "xs",
                        "occurences": 1
                    }
                ],
                context: [],
                "ids": ["shaun", "general", "shaunguild"],
                "start": false,
            }
        }
    )
})

test('generate sentence', () => {
    const id = "shaun"

    const sentence = markov.generateSentence(id)

    expect(sentence).toMatch(/Hello (sir|friend)/)
})
