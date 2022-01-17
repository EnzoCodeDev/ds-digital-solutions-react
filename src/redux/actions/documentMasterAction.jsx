import axios from "axios";
import Swal from "sweetalert2";
import { types } from "../types/types";
const baseUrl = process.env.REACT_APP_API_URL;
export const DocumentSearch = (parametro) => {
    console.log(parametro);
  return async (dispatch) => {
    if (parametro === undefined) {
      return;
    }
    let token = localStorage.getItem("token_bearer");
    axios
      .post(`${baseUrl}/documentMaster/search`, {
          search: parametro,
      }, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json;charset=UTF-8",
        }, 
      })
      .then(function (response) {
          let documentMaster = response.data;
          dispatch(newDocumetMaster(documentMaster));
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
const newDocumetMaster = (documentMaster) => ({
  type: types.DocumentMastersearch,
  payload: documentMaster,
});