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
