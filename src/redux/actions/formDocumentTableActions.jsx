import { types } from "../types/types";
import axios from "axios";
const baseUrl = process.env.REACT_APP_API_URL;
export const DocumentMasterPaginateInit = () => {
  let token = localStorage.getItem("token_bearer");
  return async (dispatch) => {
    axios
      .get(`${baseUrl}/dataMasterHead/index`, {
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
          console.log(response);
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
