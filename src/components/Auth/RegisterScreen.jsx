import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useForm } from "../../hooks/useForm";
import { StartRegister } from "../../redux/actions/auth";
import Swal from "sweetalert2";
export const RegisterScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formRegisterValues, handleRegisterInputChange] = useForm({
    name: "",
    lastName: "",
    email: "",
    password1: "",
    password2: "",
  });
  const { name, lastName, email, password1, password2 } = formRegisterValues;
  const handleRegister = (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      return Swal.fire(
        "Error",
        "Las contraseñas deben de ser iguales",
        "error"
      );
    }
    dispatch(StartRegister(email, password1, name, lastName));
  };
  const handleLogin = () => {
    history.push("/auth/login");
  };
  return (
    <div className="registerScreen">
      <h1 className="title">Crea una cuenta</h1>
      <div className="registerScreenn">
        <div className="container">
          <p>Los campos obligatorios están marcados con un asterisco: *</p>
          <form onSubmit={handleRegister}>
            <div className="subContainer">
              <div className="containerInputName">
                <label>Nombre *</label>
                <div className="containerInput">
                  <input
                    name="name"
                    value={name}
                    onChange={handleRegisterInputChange}
                    placeholder="Nombre *"
                  />
                </div>
              </div>
              <div className="containerInputName">
                <label>Apellido</label>
                <div className="containerInput">
                  <input
                    name="lastName"
                    value={lastName}
                    onChange={handleRegisterInputChange}
                    placeholder="Apellido"
                  />
                </div>
              </div>
            </div>
            <div className="containerInputEmail">
              <label>Correo electrónico *</label>
              <div className="containerInput">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleRegisterInputChange}
                  placeholder="Correo electrónico"
                />
              </div>
            </div>
            <div className="containerInputPassword">
              <label>Contraseña *</label>
              <div className="containerInput">
                <input
                  name="password1"
                  value={password1}
                  onChange={handleRegisterInputChange}
                  type="password"
                  placeholder="Contraseña *"
                />
              </div>
            </div>
            <div className="containerInputPassword">
              <label>Confirma tu contraseña *</label>
              <div type="password" className="containerInput">
                <input
                  type="password"
                  name="password2"
                  value={password2}
                  onChange={handleRegisterInputChange}
                  placeholder="Confirmar contraseña *"
                />
              </div>
            </div>
            <div className="containerBottom">
              <button type="submit" className="button">
                <span className="Button__Content-opcph8-1 fa-duqf">
                  Crear cuenta
                </span>
              </button>
            </div>
          </form>
          <p className="p">
            Ya tienes una cuenta ?<b onClick={handleLogin}> iniciar sesión</b>
          </p>
        </div>
      </div>
    </div>
  );
};
