import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Navbar } from "../navbar/Navbar";
import { login } from "../../redux/actions/auth";
export const ProfileView = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const { name, email, profile_photo, img_header } = useSelector((state) => state.auth);
  //Datos del usuario
  const [nombre, setNombre] = useState(`${name}`);
  const [imgLink, setImgLink] = useState(`${img_header}`);
  //Estado de las contraseñas
  const [password, setPassword] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordConfir, setpasswordConfir] = useState("");
  const { uuid } = useParams();
  const handleOnChangeName = (e) => {
    setNombre(e.target.value);
  };
  const handleOnChangeLinkImg = (e) => {
    setImgLink(e.target.value);
  };
  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleOnChangePasswordNew = (e) => {
    setPasswordNew(e.target.value);
  };
  const handleOnChangePasswordConfir = (e) => {
    setpasswordConfir(e.target.value);
  };
  const handleSaveInfo = () => {
    if (nombre.length === 0) {
      Swal.fire("Error", "El nombre es obligatorio", "error");
      return;
    };
    if (nombre.length < 2) {
      Swal.fire("Error", "El nombre es demasiado corto", "error");
      return;
    };
    if (imgLink.length === 0) {
      Swal.fire("Error", "La url de la imagen es obligatoria", "error");
      return;
    };
    if (imgLink.length < 10) {
      Swal.fire("Error", "El url de la imagen es demasiada corto", "error");
      return;
    };
    let token = localStorage.getItem("token_bearer");
    axios
      .post(
        `${baseUrl}/configuration/update/profile/${uuid}`,
        {
          imgLink,
          nombre,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      )
      .then(function (response) {
        if (response.statusText === "OK") {
          if (response.data.res === "not_found_name") {
            Swal.fire("Error", "El nombre es obligatorio", "error");
            return;
          };
          if (response.data.res === "not_large") {
            Swal.fire("Error", "El nombre es demasiado corto", "error");
            return;
          };
          if (response.data.res === "not_found_url") {
            Swal.fire("Error", "La url de la imagen es obligatoria", "error");
            return;
          };
          if (response.data.res === "not_large_url") {
            Swal.fire("Error", "El url de la imagen es demasiada corto", "error");
            return;
          };
          if (response.data.res === "update_user") {
            Swal.fire(
              "Success",
              "Se ha cambiado la información del usuario exitosamente",
              "success"
            );
          }
          dispatch(
            login({
              uuid: response.data.newUser.uuid,
              name: response.data.newUser.name,
              email: response.data.newUser.email,
              profile_photo: response.data.newUser.profile_photo_url,
              img_header: response.data.newUser.img_header, 
            })
          );
        }
      })
      .catch(function (response) {
        console.log(response);
        Swal.fire("Error", "Ha sucedido un error", "error");
      });
  };
  const handleCambiarPassword = () => {
    if (passwordNew.length < 6) {
      Swal.fire("Error", "La contraseña esta muy corta", "error");
      return;
    };
    if (passwordNew !== passwordConfir) {
      Swal.fire("Error", "Las contraseña no coinciden", "error");
      return;
    };
    let token = localStorage.getItem("token_bearer");
    axios
      .post(
        `${baseUrl}/configuration/update/profile/password/${uuid}`,
        {
          password,
          passwordNew,
          passwordConfir,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      )
      .then(function (response) {
        if (response.statusText === "OK") {
          if (response.data.res === "failed_password_verify") {
            Swal.fire(
              "Error",
              "La contraseña que ingresaste no coincide con la contraseña actual de este usuario",
              "error"
            );
            return;
          }
          if (response.data.res === "failed_password_coincidir") {
            Swal.fire("Error", "Las contraseña no coinciden", "error");
            return;
          }
          if (response.data.res === "update_user") {
            Swal.fire(
              "Success",
              "La contraseña se ha cambiado exitosamente",
              "success"
            );
          } 
        }
      })
      .catch(function (response) {
        console.log(response);
        Swal.fire("Error", "Ha sucedido un error", "error");
      });
  };
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
