const markov = require('../markov')

test('chain is blank', () => {
    expect(markov.chain).toEqual({})
})

test('add to chain', () => {
    const sentence = "Hello sir"
    const ids = ["shaun", "general", "shaunguild"]
    const context = ["hello", "shaun"]

    markov.addToChain(sentence, ids, context)

    expect(markov.chain).toEqual({"Hello": {"context": [{"id": "shaun", "occurences": 1, "word": "hello"}, {"id": "shaun", "occurences": 1, "word": "shaun"}, {"id": "general", "occurences": 1, "word": "hello"}, {"id": "general", "occurences": 1, "word": "shaun"}, {"id": "shaunguild", "occurences": 1, "word": "hello"}, {"id": "shaunguild", "occurences": 1, "word": "shaun"}], "followedBy": [{"context": [{"occurences": 1, "word": "hello"}, {"occurences": 1, "word": "shaun"}], "id": "shaun", "occurences": 1, "word": "sir"}, {"context": [{"occurences": 1, "word": "hello"}, {"occurences": 1, "word": "shaun"}], "id": "general", "occurences": 1, "word": "sir"}, {"context": [{"occurences": 1, "word": "hello"}, {"occurences": 1, "word": "shaun"}], "id": "shaunguild", "occurences": 1, "word": "sir"}], "ids": ["shaun", "general", "shaunguild"], "start": true, "word": "Hello"}, "sir": {"context":[{"id": "shaun", "occurences": 1, "word": "hello"}, {"id": "shaun", "occurences": 1, "word": "shaun"}, {"id": "general", "occurences": 1, "word": "hello"}, {"id": "general", "occurences": 1, "word": "shaun"}, {"id": "shaunguild", "occurences": 1, "word": "hello"}, {"id": "shaunguild", "occurences": 1, "word": "shaun"}], "followedBy": [{"context": [{"occurences": 1, "word": "hello"}, {"occurences": 1, "word": "shaun"}], "id": "shaun", "occurences": 1, "word": "\u0003"}, {"context": [{"occurences": 1, "word": "hello"}, {"occurences": 1, "word": "shaun"}], "id": "general", "occurences": 1, "word": "\u0003"}, {"context": [{"occurences": 1, "word": "hello"}, {"occurences": 1, "word": "shaun"}], "id": "shaunguild", "occurences": 1, "word": "\u0003"}], "ids": ["shaun", "general", "shaunguild"], "start": false, "word": "sir"}})
})

test('updating existing', () => {
    const sentence = "Hello friend"
    const ids = ["shaun", "general", "shaunguild"]
    const context = ["hello", "shaun"]

    markov.addToChain(sentence, ids, context)

    expect(markov.chain).toEqual({"Hello": {"context": [{"id": "shaun", "occurences": 2, "word": "hello"}, {"id": "shaun", "occurences": 2, "word": "shaun"}, {"id": "general", "occurences": 2, "word": "hello"}, {"id": "general", "occurences": 2, "word": "shaun"}, {"id": "shaunguild", "occurences": 2, "word": "hello"}, {"id": "shaunguild", "occurences": 2, "word": "shaun"}], "followedBy": [{"context": [{"occurences": 1, "word": "hello"}, {"occurences": 1, "word": "shaun"}], "id": "shaun", "occurences": 1, "word": "sir"}, {"context": [{"occurences": 1, "word": "hello"}, {"occurences": 1, "word": "shaun"}], "id": "general", "occurences": 1, "word": "sir"}, {"context": [{"occurences": 1, "word": "hello"}, {"occurences": 1, "word": "shaun"}], "id": "shaunguild", "occurences": 1, "word": "sir"}, {"context": [{"occurences": 1, "word": "hello"}, {"occurences": 1, "word": "shaun"}], "id": "shaun", "occurences": 1, "word": "friend"}, {"context": [{"occurences": 1, "word": "hello"}, {"occurences": 1, "word": "shaun"}], "id": "general", "occurences": 1, "word": "friend"}, {"context": [{"occurences": 1, "word": "hello"}, {"occurences": 1, "word": "shaun"}], "id": "shaunguild", "occurences": 1, "word": "friend"}], "ids": ["shaun", "general", "shaunguild"], "start": true, "word": "Hello"}, "friend": {"context": [{"id": "shaun", "occurences": 1, "word": "hello"}, {"id": "shaun", "occurences": 1, "word": "shaun"}, {"id": "general", "occurences": 1, "word": "hello"}, {"id": "general", "occurences": 1, "word": "shaun"}, {"id": "shaunguild", "occurences": 1, "word": "hello"}, {"id": "shaunguild", "occurences": 1, "word": "shaun"}], "followedBy": [{"context": [{"occurences": 1, "word": "hello"}, {"occurences": 1, "word": "shaun"}], "id": "shaun", "occurences": 1, "word": "\u0003"}, {"context": [{"occurences": 1, "word": "hello"}, {"occurences": 1, "word": "shaun"}], "id": "general", "occurences": 1, "word": "\u0003"}, {"context": [{"occurences": 1, "word": "hello"}, {"occurences": 1, "word": "shaun"}], "id": "shaunguild", "occurences": 1, "word": "\u0003"}], "ids": ["shaun", "general", "shaunguild"], "start": false, "word": "friend"}, "sir": {"context": [{"id": "shaun", "occurences": 1, "word": "hello"}, {"id": "shaun", "occurences": 1, "word": "shaun"}, {"id": "general", "occurences": 1, "word": "hello"}, {"id": "general", "occurences": 1, "word": "shaun"}, {"id": "shaunguild", "occurences": 1, "word": "hello"}, {"id": "shaunguild", "occurences": 1, "word": "shaun"}], "followedBy": [{"context": [{"occurences": 1, "word": "hello"}, {"occurences": 1, "word": "shaun"}], "id": "shaun", "occurences": 1, "word": "\u0003"}, {"context": [{"occurences": 1, "word": "hello"}, {"occurences": 1, "word": "shaun"}], "id": "general", "occurences": 1, "word": "\u0003"}, {"context": [{"occurences":1, "word": "hello"}, {"occurences": 1, "word": "shaun"}], "id": "shaunguild", "occurences": 1, "word": "\u0003"}], "ids": ["shaun", "general", "shaunguild"], "start": false, "word": "sir"}})
})

test('same sentence', () => {
    const sentence = "Hello sir"
    const ids = ["shaun", "general", "shaunguild"]
    const context = ["hello", "shaun"]

    markov.addToChain(sentence, ids, context)

    expect(markov.chain).toEqual({"Hello": {"context": [{"id": "shaun", "occurences": 3, "word": "hello"}, {"id": "shaun", "occurences": 3, "word": "shaun"}, {"id": "general", "occurences": 3, "word": "hello"}, {"id": "general", "occurences": 3, "word": "shaun"}, {"id": "shaunguild", "occurences": 3, "word": "hello"}, {"id": "shaunguild", "occurences": 3, "word": "shaun"}], "followedBy": [{"context": [{"occurences": 2, "word": "hello"}, {"occurences": 2, "word": "shaun"}], "id": "shaun", "occurences": 2, "word": "sir"}, {"context": [{"occurences": 2, "word": "hello"}, {"occurences": 2, "word": "shaun"}], "id": "general", "occurences": 2, "word": "sir"}, {"context": [{"occurences": 2, "word": "hello"}, {"occurences": 2, "word": "shaun"}], "id": "shaunguild", "occurences": 2, "word": "sir"}, {"context": [{"occurences": 1, "word": "hello"}, {"occurences": 1, "word": "shaun"}], "id": "shaun", "occurences": 1, "word": "friend"}, {"context": [{"occurences": 1, "word": "hello"}, {"occurences": 1, "word": "shaun"}], "id": "general", "occurences": 1, "word": "friend"}, {"context": [{"occurences": 1, "word": "hello"}, {"occurences": 1, "word": "shaun"}], "id": "shaunguild", "occurences": 1, "word": "friend"}], "ids": ["shaun", "general", "shaunguild"], "start": true, "word": "Hello"}, "friend": {"context": [{"id": "shaun", "occurences": 1, "word": "hello"}, {"id": "shaun", "occurences": 1, "word": "shaun"}, {"id": "general", "occurences": 1, "word": "hello"}, {"id": "general", "occurences": 1, "word": "shaun"}, {"id": "shaunguild", "occurences": 1, "word": "hello"}, {"id": "shaunguild", "occurences": 1, "word": "shaun"}], "followedBy": [{"context": [{"occurences": 1, "word": "hello"}, {"occurences": 1, "word": "shaun"}], "id": "shaun", "occurences": 1, "word": "\u0003"}, {"context": [{"occurences": 1, "word": "hello"}, {"occurences": 1, "word": "shaun"}], "id": "general", "occurences": 1, "word": "\u0003"}, {"context": [{"occurences": 1, "word": "hello"}, {"occurences": 1, "word": "shaun"}], "id": "shaunguild", "occurences": 1, "word": "\u0003"}], "ids": ["shaun", "general", "shaunguild"], "start": false, "word": "friend"}, "sir": {"context": [{"id": "shaun", "occurences": 2, "word": "hello"}, {"id": "shaun", "occurences": 2, "word": "shaun"}, {"id": "general", "occurences": 2, "word": "hello"}, {"id": "general", "occurences": 2, "word": "shaun"}, {"id": "shaunguild", "occurences": 2, "word": "hello"}, {"id": "shaunguild", "occurences": 2, "word": "shaun"}], "followedBy": [{"context": [{"occurences": 2, "word": "hello"}, {"occurences": 2, "word": "shaun"}], "id": "shaun", "occurences": 2, "word": "\u0003"}, {"context": [{"occurences": 2, "word": "hello"}, {"occurences": 2, "word": "shaun"}], "id": "general", "occurences": 2, "word": "\u0003"}, {"context": [{"occurences":2, "word": "hello"}, {"occurences": 2, "word": "shaun"}], "id": "shaunguild", "occurences": 2, "word": "\u0003"}], "ids": ["shaun", "general", "shaunguild"], "start": false, "word": "sir"}})
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
