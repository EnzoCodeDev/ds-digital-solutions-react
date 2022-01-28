import axios from "axios";
//libreria de swal para mostrar alert https://sweetalert2.github.io/
import Swal from "sweetalert2";
import { types } from "../types/types";
const baseUrl = process.env.REACT_APP_API_URL;
export const DocumentMasterPaginateInit = () => {
  let token = localStorage.getItem("token_bearer");
  return async (dispatch) => {
    axios
      .get(`${baseUrl}/datos/index`, {
        headers: {
          //En la peticion get se tuvieron que enviar estos encabezados
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        let documentMaster = response.data;
        dispatch(documentMasterPaginateInit(documentMaster));
      })
      .catch(function (response) {
        console.log(response);
      });
  };
};
//Esta es la peticion para paginar la peticion
export const DocumentMasterPaginateNavigate = (paginate) => {
  return async (dispatch) => {
    let token = localStorage.getItem("token_bearer");
    axios
      .get(paginate, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        if (response) {
          let document = response.data;
          dispatch(documentMasterPaginateInit(document));
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  };
};
const documentMasterPaginateInit = (document) => ({
  type: types.DocumentMasterPaginateInit,
  payload: document,
});
//Este es el dispach para ver el formulario,
export const ViewDocumentMaster = (uuid) => {
  return async (dispatch) => {
    if (uuid === undefined) {
      return;
    }
    let token = localStorage.getItem("token_bearer");
    axios
      .get(`${baseUrl}/datos/index/${uuid}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        let documentMaster = response.data;
        dispatch(viewDocumentMaster(documentMaster));
        console.log(documentMaster);
      })
      .catch(function (response) {
        console.log(response);
        Swal.fire(
          "Error",
          "Hubo un error al consultar el formulario , por favor verificalo",
          "error"
        );
      });
  };
};
const viewDocumentMaster = (documentMaster) => ({
  type: types.documentViewDocumentMaster,
  payload: documentMaster,
});
export const DocumentMasterInfoNew = (documentHead, name, identity, option) => {
  return async (dispatch) => {
    for (let i = 0; i < option.length; i++) {
      if (option[i][0].optionValue === "Tabla") {
        if (option[i][0].titleCard === "") {
          Swal.fire(
            "Falta información",
            `Falta el titulo en una tabla`,
            "error"
          );
          return;
        }
      }
      if (option[i][0].optionValue === "Texto") {
        if (option[i][0].titleCard === "") {
          Swal.fire(
            "Falta información",
            `Falta el titulo en una caja texto`,
            "error"
          );
          return;
        }
        if (option[i][0].text === "") {
          Swal.fire(
            "Falta información",
            `Falta la descripcion en una caja de texto`,
            "error"
          );
          return;
        }
      }
      // if (option[i][0].optionValue === "Imagen") {
      // }
      if (option[i][0].optionValue === "Link") {
        if (option[i][0].link === "") {
          Swal.fire(
            "Falta información",
            `Falta el link en una caja texto`,
            "error"
          );
          return;
        }
        if (option[i][0].linkDescription === "") {
          Swal.fire(
            "Falta información",
            `Falta la descripcion del link en una caja de texto`,
            "error"
          );
          return;
        }
      }
      // if (option[i][0].optionValue === "Lista") {
      // }
    }
    //Esta es la validacion de los datos del usuario antes de enviar al backend
    let nombre = name === "" ? null : name;
    let identificacion = identity === "" ? null : identity;
    let token = localStorage.getItem("token_bearer");
    axios
      .post(
        `${baseUrl}/datos/store `,
        {
          documentHead,
          nombre,
          identificacion,
          option,
        },
        {
          //En la peticion post se tuvo que enviar estos encabezados ya que no los queria recibir
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      )
      .then(function (response) {
        if (response) {
          if (response.data.res) {
            Swal.fire(
              "Success",
              "Se ha deligenciado exitosamente el documento",
              "success"
            );
            return;
          }
        }
      })
      .catch(function (response) {
        Swal.fire(
          "Error",
          "No se pudo guardar el formulario, por favor verificalo",
          "error"
        );
      });
  };
};
