
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

function isGreaterThan(a, b) {
    let number1 = parseFloat(a);
    let number2 = parseFloat(b);
    
    if (number1 > number2) {
        return number1; // number1 es mayor
    } else if (number1 < number2) {
        return number2; // number2 es meyor
    } else {
        return "Ambos números son iguales"; // number1 y number2 son iguales
    }
}

function isLessThan(a, b) {
    let number1 = parseFloat(a);
    let number2 = parseFloat(b);
    
    if (number1 < number2) {
        return number1; // number1 es menor
    } else if (number1 > number2) {
        return number2; // number2 es menor
    } else {
        return "Ambos números son iguales"; // number1 y number2 son iguales
    }
}

function average(a, b) {
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return (number1 + number2) / 2;
}




module.exports = {
    add,
    subtract,
    multiply,
    isGreaterThan,
    isLessThan,
    average
}