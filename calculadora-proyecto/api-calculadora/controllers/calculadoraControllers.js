const {add, subtract, multiply, calcularMenorQue, calcularMayorQue, proMedio} = require('../operaciones/operaciones.js');

function sumar(req, res){

    console.log('Desde el frontend', req.body)

    const {number1, number2} = req.body;
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

function menorQue(req, res){
    const {number1, number2} = req.body;
    const result = calcularMenorQue(number1, number2);
    res.json({
        resultado: result
    })
}

function mayorQue(req, res){
    const {number1, number2} = req.body;
    const result = calcularMayorQue(number1, number2);
    res.json({
        resultado: result
    })
}

function promedio(req, res){
    const {number1, number2} = req.body;
    const result = proMedio(number1, number2);
    res.json({
        resultado: result
    })
}


module.exports = {
    sumar,
    restar,
    multiplicar,
    menorQue,
    mayorQue,
    promedio
}