import React from "react";
import "./login.scss";
export const LoginIndex = ({
  email,
  password,
  handleLogin,
  handleLoginInputChange,
}) => {
  return (
    <div className="LoginScreen">
      <h1 className="title">Iniciar sesión</h1>
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
                <span className="botom_init_seccion">Iniciar sesión</span>
              </button>
            </div>
          </form>
          {/* <p className="p">
            No tienes una cuenta ?
            <b onClick={handleRegister}> Crea tu cuenta </b>
          </p> */}
        </div>
      </div>
    </div>
  );
};
