const {add, subtract, multiply, mayor, menor, promedio} = require('../operaciones/operaciones.js');

function sumar(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = add(number1, number2);
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

function calcularMayor(req, res) {
    const { body } = req;
    const { number1, number2 } = body;
    const result = mayor(number1, number2);
    res.json({
        resultado: result
    });
}

function calcularMenor(req, res) {
    const { body } = req;
    const { number1, number2 } = body;
    const result = menor(number1, number2);
    res.json({
        resultado: result
    });
}

function calcularPromedio(req, res) {
    const { body } = req;
    const { number1, number2 } = body;
    const result = promedio(number1, number2);
    res.json({
        resultado: result
    });
}

module.exports = {
    sumar,
    restar,
    multiplicar,
    calcularMayor,
    calcularMenor,
    calcularPromedio
}