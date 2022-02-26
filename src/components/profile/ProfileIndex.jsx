import React from "react";
import { Navbar } from "../navbar/Navbar";
import './profile.scss';
export const ProfileIndex = ({
  name,
  email,
  img_header,
  profile_photo,
  handleSaveInfo,
  handleOnChangeName,
  handleOnChangeLinkImg,
  handleCambiarPassword,
  handleOnChangePassword,
  handleOnChangePasswordNew,
  handleOnChangePasswordConfir,
}) => {
  return (
    <div>
      <Navbar />
      <div className="container_profile_view">
        <div className="container_sub_profile_view">
          <div className="container_photo_profile">
            <div className="container_sub_photo_profile">
              <img
                src={profile_photo}
                alt={"profile_photo"}
                className="profile_photo"
              ></img>
            </div>
          </div>
          <div className="container_data_basic">
            <div className="container_sub_data_basic">
              <div className="data_basic">
                <div className="name">
                  <h6>Nombre</h6>
                  <input
                    type="text"
                    className={"input_name"}
                    name={`nombre`}
                    onChange={(e) => handleOnChangeName(e)}
                    placeholder={"Ingresa un nombre"}
                    defaultValue={name}
                  ></input>
                </div>
                <div className="email">
                  <h6>Correo electrónico</h6>
                  <span>{email}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="container_img_header">
            <div className="container_sub_img_header">
              <div className="img_header">
                <div className="container_input">
                  <h6>Enlace de la imagen</h6>
                  <input
                    type="url"
                    className={"input_img"}
                    name={`img`}
                    onChange={(e) => handleOnChangeLinkImg(e)}
                    placeholder={"Url de la imagen"}
                    defaultValue={img_header}
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <div className="container_password">
            <div className="container_sub_password">
              <div className="password">
                <div className="container_input">
                  <span>Contraseña actual</span>
                  <input
                    type="password"
                    className={"inputPassword"}
                    name={`text`}
                    onChange={(e) => handleOnChangePassword(e)}
                    placeholder={"Contraseña actual"}
                    defaultValue={""}
                  ></input>
                </div>
                <div className="container_input1">
                  <span>Nueva contraseña</span>
                  <input
                    type="password"
                    className={"inputPasswordNew"}
                    name={`text`}
                    onChange={(e) => handleOnChangePasswordNew(e)}
                    placeholder={"Nueva contraseña"}
                    defaultValue={""}
                  ></input>
                </div>
                <div className="container_input2">
                  <span>Confirmar nueva contraseña</span>
                  <input
                    type="password"
                    className={"inputPassworConfir"}
                    name={`text`}
                    onChange={(e) => handleOnChangePasswordConfir(e)}
                    placeholder={"Confirmar nueva contraseña"}
                    defaultValue={""}
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <div className="container_botom">
            <div className="containerBottom">
              <button onClick={handleSaveInfo} className="button">
                <span className="botom_init_seccion">Guardar información</span>
              </button>
            </div>
            <div className="containerBottom1">
              <button onClick={handleCambiarPassword} className="button">
                <span className="botom_init_seccion">Cambiar contraseña</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
