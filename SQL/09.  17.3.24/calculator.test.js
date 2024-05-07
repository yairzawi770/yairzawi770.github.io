const assert = require('assert')
const calculator = require('./calculator') 

describe('Testing basic functionallity of the calculator', () => {
    it('add simple adding numbers [1, 1]', () => {
        // AAA
        const actual = calculator.add(1, 1);
        const expected = 2

        assert.strictEqual(expected, actual)
    })
    it('add simple subtract numbers [5, 2]', () => {
        // AAA
        const actual = calculator.sub(5, 2);
        const expected = 3

        assert.strictEqual(expected, actual)
    })
    it('add simple multiply numbers [2, 7]', () => {
        // AAA
        const actual = calculator.mul(2, 7);
        const expected = 14

        assert.strictEqual(expected, actual)
    }) 
    it('add simple divide numbers [8, 2]', () => {
        // AAA
        const actual = calculator.div(8, 2);
        const expected = 4

        assert.strictEqual(expected, actual)
    })    
})

describe('Testing calculator divide function in depth', () => {
    it('divide by zero -- 8 / 0 == Infinity', () => {
        // AAA
        const actual = calculator.div(8, 0);
        const expected = Infinity

        assert.strictEqual(expected, actual)
    })
    it('divide by zero -- 0 / 0 == NaN', () => {
        // AAA
        const actual = calculator.div(0, 0);
        const expected = NaN;

        assert.strictEqual(expected, actual)
    })
})

describe('Testing calculator gets only integer numbers', () => {
    it('adding float numbers [3.5, 9.1] should raise an Error', () => {

        assert.throws(() => {
            calculator.add(3.5, 9.1);
        }, TypeError);
    })

})