import { useState } from "react";
import '../styles/Calculadora.css'
import Resultado from "./Resultado";

function Calculadora(){
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [resultado, setResultado] = useState('');

    // function handleSubmit(e){
    //     e.preventDefault();
    //     const operacion = e.target.value;
    //     fetch(`http://localhost:3500/v1/calculadora/${operacion}`, {
    //         method: 'POST',
    //         headers: {"Content-Type": "application/json"},
    //         body: JSON.stringify({number1, number2})
    //     })
    //         .then(res =>res.json())
    //         .then(responseData => {
    //             setResultado(responseData.resultado)
    //             // setResultado(responseData)
    //             // console.log(resultado)
    //         })
    // }

    return (
        <div className="container">
            <h1 id="txtCalculadora">CALCULADORA</h1>
            <form>
                <input type="number" className="number" onChange={(e)=>{setNumber1(e.target.value)}}/><br />
                <input type="number" className="number" onChange={(e)=>{setNumber2(e.target.value)}}/><br />
                <input className="btnEnviar" value="sumar" onClick={operation}/>
                <input className="btnEnviar" value="restar" onClick={operation}/>
                <input  className="btnEnviar" value="multiplicar" onClick={operation}/>
                <input className="btnEnviar" value="mayor" onClick={operation} />
                <input className="btnEnviar" value="menor" onClick={operation} />
                <input className="btnEnviar" value="prome" onClick={operation} />

            </form>
            <Resultado resultado={"El resultado es "+ resultado}/>
        </div>
    )


    function operation(event) {

        var total;

        switch (event.target.value) {
            case 'sumar':
                total = parseInt(number1) + parseInt(number2);
                break;
            case 'restar':
                total = parseInt(number1) - parseInt(number2);
                break;
            case 'multiplicar':
                total = parseInt(number1) * parseInt(number2);
                break;
            case 'mayor':
                total = parseInt(number1) > parseInt(number2);
                break;
            case 'menor':
                total = parseInt(number1) < parseInt(number2);
                break;
            case 'prome':
                total = (parseInt(number1) + parseInt(number2))/2;
                break;

        }

        console.log('Total', total)
        setResultado(total);
    }

}

export default Calculadora