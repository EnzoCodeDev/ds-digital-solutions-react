import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useForm } from "../../hooks/useForm";
import { startLogin } from "../../redux/actions/auth";
export const LoginScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formLoginValues, handleLoginInputChange] = useForm({
    email: "",
    password: "",
  });
  const { email, password } = formLoginValues;
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(email, password));
  };
  const handleRegister = () => {
    history.push("/auth/register");
  };
  return (
    <div className="LoginScreen">
      <h1 className="title">Inicia sesión</h1>
      <div className="LoginScreenn">
        <div className="container">
          <form onSubmit={handleLogin}>
            <div className="logoContainer">
              <img
                className="logo"
                alt="logo"
                src="/logo/ds-digital-solutions-logo.png"
              ></img>
            </div>
            <div className="containerInputEmail">
              <label>Correo electrónico</label>
              <div className="containerInput">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleLoginInputChange}
                  placeholder="Correo electrónico"
                />
              </div>
            </div>
            <div className="containerInputPassword">
              <label>Contraseña</label>
              <div className="containerInput">
                <input
                  name="password"
                  value={password}
                  onChange={handleLoginInputChange}
                  type="password"
                  placeholder="Contraseña *"
                />
              </div>
            </div>
            <div className="containerBottom">
              <button type="submit" className="button">
                <span className="Button__Content-opcph8-1 fa-duqf">
                  Inicia sesión
                </span>
              </button>
            </div>
          </form>
          <p className="p">
            No tienes una cuenta ?
            <b onClick={handleRegister}> Crea tu cuenta </b>
          </p>
        </div>
      </div>
    </div>
  );
};
