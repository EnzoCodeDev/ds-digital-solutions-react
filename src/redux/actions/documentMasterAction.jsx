import axios from "axios";
import Swal from "sweetalert2";
import { types } from "../types/types";
const baseUrl = process.env.REACT_APP_API_URL;
export const DocumentMasterPaginateInit = () => {
  let token = localStorage.getItem("token_bearer");
  return async (dispatch) => {
    axios
      .get(`${baseUrl}/documentMaster/index`, {
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

export const DocumentSearch = (parametro) => {
  return async (dispatch) => {
    if (parametro === undefined) {
      return;
    }
    if (parametro.length <= 2) {
      return;
    }
    let token = localStorage.getItem("token_bearer");
    axios
      .get(`${baseUrl}/documentMaster/search/${parametro}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        timeout: 1500,
      })
      .then(function (response) {
        let documentMaster = response.data;
        dispatch(documentSearch(documentMaster));
      })
      .catch(function (response) {});
  };
};
const documentSearch = (documentMaster) => ({
  type: types.DocumentMastersearch,
  payload: documentMaster,
});
//Este es el dispach para ver el formulario,
export const ViewDocumentMaster = (uuid) => {
  return async (dispatch) => {
    if (uuid === undefined) {
      return;
    }
    let token = localStorage.getItem("token_bearer");
    axios
      .get(`${baseUrl}/documentMaster/index/${uuid}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        let documentMaster = response.data;
        dispatch(viewDocumentMaster(documentMaster));
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
export const DocumentMasterInfoNew = (documentHead, option) => {
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
      if (option[i][0].optionValue === "Archivo") {
        if (option[i][0].archivo === "") {
          Swal.fire(
            "Error",
            `Falta el link del archivo en una caja texto`,
            "error"
          );
          return;
        }
        if (option[i][0].descripcionArchivo === "") {
          Swal.fire(
            "Error",
            `Falta la descripcion del link del archivo en una caja de texto`,
            "error"
          );
          return;
        }
      }
    }
    let token = localStorage.getItem("token_bearer");
    axios
      .post(
        `${baseUrl}/documentMaster/store `,
        {
          documentHead,
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