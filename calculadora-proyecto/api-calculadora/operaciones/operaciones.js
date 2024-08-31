
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

function maxim(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return number1 < number2 ? number1 : number2;
}

function minim(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return number1 > number2 ? number1 : number2;
}
 
function promed(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    p = ((number1+number2)/2)
    return p;
}


module.exports = {
    add,
    subtract,
    multiply,
    maxim,
    minim,
    promed,
}