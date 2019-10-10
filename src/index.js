function brackets(arr) {
    let ifPaired = arr.filter(char => char === '(' || char === ')');
    for (let i = 0; i < ifPaired.length; i++) {
        if (ifPaired[i] === "(" && ifPaired[i + 1] === ")") {
            ifPaired.splice(i, 2);
            i = -1;
        }
    }
    if (ifPaired.length !== 0) {
        throw new Error("ExpressionError: Brackets must be paired");
    }
}

function zeroDivision(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (typeof (+arr[i]) === 'number' && arr[i + 1] === '/' && arr[i + 2] === '0') {
            throw new Error("TypeError: Division by zero.");
        }
    }
}

function eval(arr) {
    arr = uniteNumbers(arr);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === ")") {
            for (let j = i; j >= 0; j--) {
                if (arr[j] === "(") {
                    let newArr = arr.slice(j + 1, i);
                    arr.splice(j, i - j + 1, evalNoBrackets(newArr));
                    i = 0;
                    break;
                }
            }
        }
    }
    return evalNoBrackets(arr);
}

function evalNoBrackets(arr) {
    arr = uniteNumbers(arr);
    let result = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '*') {
            let result = arr[i - 1] * arr[i + 1];
            arr.splice(i - 1, 3, result);
            i = 0;
        }
        if (arr[i] === '/') {
            let result = arr[i - 1] / arr[i + 1];
            arr.splice(i - 1, 3, result);
            i = 0;
        }
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '+') {
            result = arr[i - 1] + arr[i + 1];
            arr.splice(i - 1, 3, result);
            i = 0;
        }
        if (arr[i] === '-') {
            result = arr[i - 1] - arr[i + 1];
            arr.splice(i - 1, 3, result);
            i = 0;
        }
    }
    return arr[0];
}

function expressionCalculator(expr) {
    let arr = expr.split('')
        .filter(char => char !== ' ');
    if (arr.indexOf('0') > -1) {
        zeroDivision(arr);
    }
    if (arr.indexOf('(') > -1 || arr.indexOf(')') > -1) {
        brackets(arr);
        return eval(arr);
    }
    return evalNoBrackets(arr);
}

function uniteNumbers(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (!isNaN(arr[i]) && !isNaN(arr[i + 1]) && !isNaN(arr[i + 2])) {
            arr[i] += arr[i + 1] + arr[i + 2];
            arr.splice(i + 1, 2);
            arr[i] = Number(arr[i]);
        }
        if (!isNaN(arr[i]) && !isNaN(arr[i + 1])) {
            arr[i] += arr[i + 1];
            arr.splice(i + 1, 1);
            arr[i] = Number(arr[i]);
        }
        if (!isNaN(arr[i])) {
            arr[i] = Number(arr[i]);
        }
    }
    return arr;
}

module.exports = {
    expressionCalculator
}
