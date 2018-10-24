const arrayCompare = require('../arrayCompare')

test('compare equal arrays', () => {
    const input1 = [1, 2, 3]
    
    const input2 = [1, 2, 3]

    const expected = 3

    expect(arrayCompare(input1, input2)).toBe(expected)
})

test('compare partially equal arrays', () => {
    const input1 = [1, 2, 3]
    
    const input2 = [1]

    const expected = 1

    expect(arrayCompare(input1, input2)).toBe(expected)
})

test('compare partially equal arrays 2', () => {
    const input1 = [1, 2, 3]
    
    const input2 = [1, 3]

    const expected = 2

    expect(arrayCompare(input1, input2)).toBe(expected)
})

test('compare non equal arrays', () => {
    const input1 = [1, 2, 3]
    
    const input2 = [5, 6, 7]

    const expected = 0

    expect(arrayCompare(input1, input2)).toBe(expected)
})

test('compare equal strings', () => {
    const input1 = ["what", "it", "do"]
    
    const input2 = ["what", "it", "do"]

    const expected = 3

    expect(arrayCompare(input1, input2)).toBe(expected)
})

test('compare partically equal strings', () => {
    const input1 = ["what", "it", "do"]
    
    const input2 = ["what", "it"]

    const expected = 2

    expect(arrayCompare(input1, input2)).toBe(expected)
})


