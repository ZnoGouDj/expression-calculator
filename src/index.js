function brackets(arr) {
    let ifPaired = arr.filter(char => char === '(' || char === ')');
    for (let i = 0; i < ifPaired.length; i++) {
        if (ifPaired[i] === "(" && ifPaired[i+1] === ")") {
            ifPaired.splice(i, 2);
            i = -1;
        }
    }
    if (ifPaired.length !== 0) {
        throw new Error("ExpressionError: Brackets must be paired");
    }
}//(['(',  '38', '+', '52', '+', '65', '-', '19',  ')', '*', '(',  '72', '*', '3', '/', '36', '*', '(',  '9', '/', '2', '-', '17', '*', '38', '/', '28',  ')', ')', '/', '18', '/', '84']); 
//Brackets must be paired DONE FOR SURE!
function zeroDivision(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (typeof (+arr[i]) === 'number' && arr[i + 1] === '/' && arr[i + 2] === '0') {
            throw new Error("TypeError: Division by zero.");
        }
    }
}
//zeroDivision([ '31', '*', '21', '+', '14', '/', '(',  '(',  '18', '*', '52', '/', '(',  '43', '-', '74', '/', '89', '-', '12',  ')', '+', '8',  ')', '+', '3', '/', '0', '+', '(',  '9', '+', '81', '+', '19', '*', '94', '/', '(',  '0', '*', '71', '+', '53', '-', '20', '*', '94',  ')',  ')',  ')'])
//No Division by Zero DONE FOR SURE!

//eval([20, '-',  57,'*',  12, '-','(',  58, '+',84, '*',  32,'/',  27, ')'])

function eval(arr) {
    //['2', '+', '2']
    arr = uniteNumbers(arr);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === ")"){
            for (let j = i; j >= 0; j--) {
                if (arr[j] === "("){
                   let newArr = arr.slice(j + 1, i);
                   arr.splice(j, i - j + 1, evalNoBrackets(newArr));
                   i = 0;
                   break;
        }
    }
}
}//WILL NOT WORK IN THEORY BECAUSE for example in "(1 + (2))" will take "1+(2"
    //ALSO IT WILL NOT REMOVE BRACKETS ANYWAY EVEN IF IT WILL WORK IN CASE 1 + (1 + 2)
    //RESULT WILL BE 1 + (3)
    //THINK ABOUT IT TOMORROW, IF U SOLVE THIS, IT WILL BE UGLY NEWBIE SOLUTION OF TOP LEVEL TASK
    //arr.splice(arr.indexOf('(')+1, arr.indexOf(')') - arr.indexOf('(')-1, evalNoBrackets(arr));

    //copy array from ( to ) ;
    //splice from first arr all the = ( ) INCLUDING brackets!!!
    //paste copied arr!
    //i = 0;
    return evalNoBrackets(arr);
}
function evalNoBrackets(arr) {
    //['2', '+', '2']
    //['2', '+', '2', '*', '3', '/', '2']
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
//expressionCalculator(" 39 / 41 + 100 + 45 ")
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
}//uniteNumbers(['2','0', '-', '5','7', '*', '1','2', '-', '(',  '5','8', '+', '8','4', '*', '3','2', '/', '2','7',  ')'])
//uniteNumbers(['3','9','/','4','1','+','1','0','0','+','4','5'])
//works almost for sure (1 test lol) uniteNumbers(['5', '6', '*', '6', '3', '+', '7', '7', '-', '6'])
module.exports = {
    expressionCalculator
}
