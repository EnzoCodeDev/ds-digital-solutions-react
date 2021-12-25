//Manejo de la autenticacion
import { types } from "../types/types";
import axios from "axios";
import Swal from "sweetalert2";
import { eventLogout } from "./events";
import { DocumentMasterPaginateInit } from "./formDocumentTableActions";
const baseUrl = process.env.REACT_APP_API_URL;
//Login de un usuario
export const startLogin = (email, password) => {
  return async (dispatch) => {
    axios
      .post(`${baseUrl}/auth/login`, {
        email,
        password,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        if (response.statusText === "OK") {
          //Guardar  datos en el localStorages
          localStorage.setItem("token_bearer", response.data.access_token);
          localStorage.setItem("token-init-date", new Date().getTime());
          dispatch(
            login({
              uuid: response.data[0].uuid,
              name: response.data[0].name,
              email: response.data[0].email,
              profile_photo: response.data[0].profile_photo_url,
            })
          );
          //Este dispach es para cargar los datos de la tabla
          dispatch(DocumentMasterPaginateInit());
        }
      })
      .catch(function (response) {
        console.log(response);
        Swal.fire("Error", "La contraseña o email son incorrectas", "error");
      });
  };
};
//Registrar un nuevo usuario
export const StartRegister = (email, password, names, lastName) => {
  return async (dispatch) => {
    //Validaciones del frontend
    if (names.length <= 0) {
      Swal.fire("Error", "El nombre es requerido", "error");
      return;
    }
    if (names.length >= 150) {
      Swal.fire("Error", "El nombre es demasiado largo", "error");
      return;
    }
    if (email.length === 0) {
      Swal.fire("Error", "El email es requerido", "error");
      return;
    }
    if (password.length <= 7) {
      Swal.fire("Error", "La contraseña es muy corta", "error");
      return;
    }
    const name = `${names} ${lastName}`;
    axios
      .post(`${baseUrl}/auth/register`, {
        name,
        email,
        password,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        if (response.data.response === "El email ya existe") {
          Swal.fire("Error", "Este email ya esta en uso", "error");
          return;
        }
        if (response.statusText === "Created") {
          Swal.fire(
            "Success",
            "Te haz registrado registrado exitosamente",
            "success"
          );
        }
      });
    axios
      .post(`${baseUrl}/auth/login`, {
        email,
        password,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        if (response.statusText === "OK") {
          //Guardar  datos en el localStorages
          localStorage.setItem("token_bearer", response.data.access_token);
          localStorage.setItem("token-init-date", new Date().getTime());
          dispatch(
            login({
              uuid: response.data[0].uuid,
              name: response.data[0].name,
              email: response.data[0].email,
              profile_photo: response.data[0].profile_photo_url,
            })
          );
          //Este dispach es para cargar los datos de la tabla
          dispatch(DocumentMasterPaginateInit());
        }
      })
      .catch(function (response) {
        console.log(response);
        Swal.fire("Error", "No se pudo registrar el usuario", "error");
      });
  };
};
//Aver si hay credenciales de token y tienen una seccion abierta actualmente
export const startChecking = () => {
  return async (dispatch) => {
    let token = localStorage.getItem("token_bearer") || null;
    if (token === null) {
      return;
    }
    axios
      .get(`${baseUrl}/auth/refresh`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then(function (response) {
        if (response.statusText === "OK") {
          localStorage.setItem("token_bearer", response.data.access_token);
          localStorage.setItem("token-init-date", new Date().getTime());
          dispatch(
            login({
              uuid: response.data[0].uuid,
              name: response.data[0].name,
              email: response.data[0].email,
              profile_photo: response.data[0].profile_photo_url,
            })
          );
          //Este dispach es para cargar los datos de la tabla
          dispatch(DocumentMasterPaginateInit());
        }
      })
      .catch(function (error) {
        console.log(error);
        dispatch(checkingFinish());
        return;
      });
  };
};
export const login = (user) => ({
  type: types.authLogin,
  payload: user,
});
//Finalizar seccion del usuario, borrar y  invalidar  token para evitar
//otro inicio de seccion involuntario
export const startLogout = () => {
  return (dispatch) => {
    let token = localStorage.getItem("token_bearer");
    axios
      .get(`${baseUrl}/auth/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then(function (response) {
        if (response.statusText === "OK") {
          localStorage.clear();
          dispatch(eventLogout());
          dispatch(logout());
          Swal.fire("Success", "Seccion finalizada", "success");
        }
      })
      .catch(function (error) {
        console.log(error);
        return;
      });
  };
};
const checkingFinish = () => ({ type: types.authCheckingFinish });
const logout = () => ({ type: types.authLogout });
