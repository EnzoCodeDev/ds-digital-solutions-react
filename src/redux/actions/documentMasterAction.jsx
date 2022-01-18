import axios from "axios";
import Swal from "sweetalert2";
import { types } from "../types/types";
const baseUrl = process.env.REACT_APP_API_URL;
export const DocumentSearch = (parametro) => {
  return async (dispatch) => {
    if (parametro === undefined) {
      return;
    }
    let token = localStorage.getItem("token_bearer");
    axios
      .post(
        `${baseUrl}/documentMaster/search`,
        {
          search: parametro,
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
        let documentMaster = response.data;
        dispatch(documentSearch(documentMaster));
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
const documentSearch = (documentMaster) => ({
  type: types.DocumentMastersearch,
  payload: documentMaster,
});
export const DocumentMasterInfoNew = (id_header, version, option) => {
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
          id_header,
          version,
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
        console.log(response);
        // if (response) {
        //   if (response.data.res === "failed code") {
        //     Swal.fire("Error", "Este codigo ya esta en uso", "error");
        //     return;
        //   }
        //   if (response.data.res === "success_new") {
        //     Swal.fire(
        //       "Success",
        //       "Se ha guardado exitosamente el formulario",
        //       "success"
        //     );
        //     // dispatch(DocumentMasterPaginateInit());
        //     // dispatch(newDocumetMaster(response.data));
        //     return;
        //   }
        // }
      })
      .catch(function (response) {
        console.log(response);
        Swal.fire(
          "Error",
          "No se pudo guardar el formulario, por favor verificalo",
          "error"
        );
      });
  };
};
// const documentSearch = (documentMaster) => ({
//   type: types.DocumentMastersearch,
//   payload: documentMaster,
// });
