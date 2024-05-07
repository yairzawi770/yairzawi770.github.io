const validate = (num1, num2)  => {
    if (Math.floor(num1) !== num1 || Math.floor(num2) !== num2) {
        throw TypeError('Use only integer numbers in my calculator')
    }
}

const add = (num1, num2) => {
    validate(num1, num2)
    return num1 + num2
}

const sub = (num1, num2) => {
    return num1 - num2
}

const mul = (num1, num2) => {
    return num1 * num2
}

const div = (num1, num2) => {
    return num1 / num2
}

module.exports = { add, sub, mul, div }