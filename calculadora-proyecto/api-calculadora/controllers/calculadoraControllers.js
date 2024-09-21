
const {add, subtract, multiply, mayorear, promediar, menorear} = require('../operaciones/operaciones.js');

function sumar(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = add(number1, number2);
    console.log("num1: " + String(number1) + " num2: " + String(number2) + " y la suma: " + String(result))
    res.json({
        resultado: result
    });
}

function restar(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = subtract(number1, number2);
    res.json({
        resultado: result
    })
}

function multiplicar(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = multiply(number1, number2);
    res.json({
        resultado: result
    })
}

function mayor(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = mayorear(number1, number2);
    res.json({
        resultado: result
    })
}

function menor(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = menorear(number1, number2);
    res.json({
        resultado: result
    })
}

function prom(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = promediar(number1, number2);
    res.json({
        resultado: result
    })
}

module.exports = {
    sumar,
    restar,
    multiplicar,
    mayor,
    menor,
    prom
}