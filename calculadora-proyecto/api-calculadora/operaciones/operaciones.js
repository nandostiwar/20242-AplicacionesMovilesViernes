
/**
 * Sumar dos cantidades numéricas
 * @param {Number} a 
 * @param {Number} b 
 * @returns Number
 */
function add(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return number1 + number2;
}

function subtract(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return number1 - number2;
}

function multiply(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return number1 * number2;
}

function mayor(a, b) {
    return Math.max(a, b);
}

function menor(a, b) {
    return Math.min(a, b);
}

function promedio(a, b) {
    let num1 = parseInt(a);
    let num2 = parseInt(b);
    return ((num1 + num2) / 2);
}

module.exports = {
    add,
    subtract,
    multiply,
    mayor,
    menor,
    promedio
}