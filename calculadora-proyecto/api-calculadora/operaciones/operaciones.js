
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
function prome(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return (number1 + number2)/2;
}
function may(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    if (number1>number2){

        return `..Este numero ${number1} es mayor` 
    }
    if(number1 === number2){

        return`.. No, estos numeros son iguales`
    }else{
        
        return `..Este numero ${number2} menor` 
    }

}
function men(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    if (number1<number2){

        return `...Este numero ${number1} es menor` 
    }
    if(number1 === number2){

        return`...No.. estos numeros son iguales`
    }else{
        
        return `...Este numero ${number2} es menor` 
    }
    

}



module.exports = {
    add,
    subtract,
    multiply,
    prome,
    may,
    men
}