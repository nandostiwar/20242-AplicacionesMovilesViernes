
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

function calcularMenorQue(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return number1 < number2;
}

function calcularMayorQue(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return number1 > number2;
}

function proMedio(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return  (parseInt(number1) + parseInt(number2))/2;
}

module.exports = {
    add,
    subtract,
    multiply,
    calcularMenorQue,
    calcularMayorQue,
    proMedio
}