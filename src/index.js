function brackets(arr) {
    let ifPaired = arr.filter(char => char === '(' || char === ')');
    for (let i = 0; i < ifPaired.length; i++) {
        if (ifPaired[i] === "(" && ifPaired[i+1] === ")") {
            ifPaired.splice(i, 2);
            i = -1;
            break;
        }
    }
    if (ifPaired.length !== 0) {
        throw new Error("ExpressionError: Brackets must be paired");
    }
}
//Brackets must be paired DONE!
function zeroDivision(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (typeof (+arr[i]) === 'number' && arr[i + 1] === '/' && arr[i + 2] === '0') {
            throw new Error("TypeError: Division by zero.");
        }
    }
}
//No Division by Zero DONE!
function eval(arr) {
    //['2', '+', '2']

}

function evalNoBrackets(arr) {
    //['2', '+', '2']
    //['2', '+', '2', '*', '3', '/', '2']
    uniteNumbers(arr);
    let result = 0;
    for (let i = 0; i < arr.length; i++) {
        let toNum = +(arr[i - 1]);
        let toNumNext = +(arr[i + 1]);
        if (arr[i] === '*') {
            let result = toNum * toNumNext;
            arr.splice(i - 1, 3, result);
        }
        if (arr[i] === '/') {
            let result = toNum / toNumNext;
            arr.splice(i - 1, 3, result);
        }
    }
    for (let i = 0; i < arr.length; i++) {
        let toNum = +(arr[i - 1]);
        let toNumNext = +(arr[i + 1]);
        if (arr[i] === '+') {
            result = toNum + toNumNext;
            arr.splice(i - 1, 3, result);
        }
        if (arr[i] === '-') {
            result = toNum - toNumNext;
            arr.splice(i - 1, 3, result);
        }
    }
    return arr[0];
}
// expressionCalculator('49 * 63 / 58 * 36')
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
        if (arr[i] !== '+' &&
            arr[i+1] !== '+' &&
            arr[i] !== '-' &&
            arr[i+1] !== '-' &&
            arr[i] !== '*' &&
            arr[i+1] !== '*' &&
            arr[i] !== '/' &&
            arr[i+1] !== '/' &&
            arr[i] !== '(' &&
            arr[i+1] !== ')' &&
            arr[i] !== '(' &&
            arr[i+1] !== ')') {
            arr[i] += arr[i + 1];
            arr.splice(i + 1, 1);
        }
    }
    return arr;
}

module.exports = {
    expressionCalculator
}