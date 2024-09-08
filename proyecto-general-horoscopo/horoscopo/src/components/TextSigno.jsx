import './styles/TextSigno.css';

function TextSigno({texto}){
    return (
        <textarea id="textoSigno" value={texto} cols="38" rows="6">

        </textarea>
    )
}

export default TextSigno;