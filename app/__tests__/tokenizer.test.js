const tokenizer = require('../tokenizer')

test('tokenize string', () => {
    const input = "Hello, we are having a party today!!!"

    const expected = ["hello", "we", "are", "having", "a", "party", "today"]

    expect(tokenizer.tokenize(input)).toEqual(expected)
})

test('tokenize empty', () => {
    const input = ""

    const expected = []

    expect(tokenizer.tokenize(input)).toEqual(expected)
})
