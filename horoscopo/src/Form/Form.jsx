import "./form2.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/loginComponent/LoginForm";
import ChangePasswordForm from "../components/changePasswordComponent/ChangePasswordForm";
import CreateUserForm from "../components/createUSerComponent/CreateUserForm";

function Form({ callback }) {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const goTo = useNavigate();

  return (
    <div>
      <h1 id="txtBienvenida">Bienvenido a nuestro portal del Zodiaco</h1>

      <LoginForm callback={callback} goTo={goTo} />


      <button
        type="button"
        className="button"
        onClick={() => setIsCreatingUser((prev) => !prev)} // Cambia el estado a su opuesto
      >
        {isCreatingUser ? "Cerrar Formulario" : "Crear Nuevo Usuario"}
      </button>

      {isCreatingUser && (
        <CreateUserForm setIsCreatingUser={setIsCreatingUser} />
      )}


      <button
        type="button"
        className="button"
        onClick={() => setIsChangingPassword((prev) => !prev)}
      >
        {isChangingPassword ? "Cerrar Formulario" : "Cambiar Contraseña"}
      </button>

      {isChangingPassword && (
        <ChangePasswordForm setIsChangingPassword={setIsChangingPassword} />
      )}
    </div>
  );
}

export default Form;
