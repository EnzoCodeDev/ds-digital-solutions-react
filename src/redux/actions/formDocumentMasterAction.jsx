import axios from "axios";
import Swal from "sweetalert2";
import { types } from "../types/types";
import { DocumentMasterPaginateInit } from "./formDocumentTableActions";
const baseUrl = process.env.REACT_APP_API_URL;
//Manejo del formulario sus peticiones y sus respuestas
export const DefaultValueDocumentMaster = () => ({
  type: types.documentDefaultDocumentMaster,
});
//Este es el dispach para ver el formulario,
export const ViewDocumentMaster = (uuid) => {
  return async (dispatch) => {
    if (uuid === undefined) {
      return;
    }
    let token = localStorage.getItem("token_bearer");
    axios
      .get(`${baseUrl}/dataMasterHead/index/${uuid}`, {
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

//Esta es la peicion para guardar el formulario
export const NewDocumetMaster = (
  code,
  format,
  template,
  position,
  dataBasic,
  description,
  process_link,
  process_type,
  dataBasicCount,
  process_description,
  optionTarget
) => {
  return async (dispatch) => {
    //Validacion de los datos del formulario y el proceso
    if (
      code.trim().length === 0 ||
      format.trim().length === 0 ||
      template.trim().length === 0 ||
      description.trim().length === 0
    ) {
      Swal.fire("Error", "Falta informacion del formulario", "error");
      return;
    }
    if (process_type === "Texto") {
      if (process_description.trim().length === 0) {
        Swal.fire("Error", "Falta la descripcion del proceso", "error");
        return;
      }
    }
    if (process_type === "Link") {
      if (process_description.trim().length === 0) {
        Swal.fire("Error", "Falta el link del proceso", "error");
        return;
      }
      if (process_link === undefined) {
        Swal.fire(
          "Error",
          "Falta la descripcion del link del proceso",
          "error"
        );
        return;
      }
      if (process_link.trim().length === 0) {
        Swal.fire(
          "Error",
          "Falta la descripcion del link del proceso",
          "error"
        );
        return;
      }
    }
    //Validacion de los datos basicos
    for (let i = 0; i < dataBasicCount.length; i++) {
      if (dataBasic[dataBasicCount[i] - 1][0].title.trim() === "") {
        Swal.fire(
          "Error",
          "Falta el titulo de uno de los datos basicos o remueve el dato basico",
          "error"
        );
        return;
      }
      if (dataBasic[dataBasicCount[i] - 1][0].type === "Texto") {
        if (dataBasic[dataBasicCount[i] - 1][0].description.trim() === "") {
          Swal.fire(
            "Error",
            "Falta la descripcion de uno de los datos basicos o remueve el dato basico",
            "error"
          );
          return;
        }
      }
      if (dataBasic[dataBasicCount[i] - 1][0].type === "Link") {
        if (dataBasic[dataBasicCount[i] - 1][0].descriptionLink.trim() === "") {
          Swal.fire(
            "Error",
            "Falta la descripcion del link de uno de los datos basicos o remueve el dato basico",
            "error"
          );
          return;
        }
        if (dataBasic[dataBasicCount[i] - 1][0].description.trim() === "") {
          Swal.fire(
            "Error",
            "Falta el link de uno de los datos basicos o remueve el dato basico",
            "error"
          );
          return;
        }
      }
    }
    const data_basic = [...dataBasic];
    data_basic.shift();
    let token = localStorage.getItem("token_bearer");
    //Validaciones de frontend para el formulario
    axios
      .post(
        `${baseUrl}/dataMasterHead/store `,
        {
          code,
          format,
          template,
          position,
          data_basic,
          description,
          process_link,
          process_type,
          dataBasicCount,
          process_description,
          optionTarget,
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
          if (response.data.res === "failed code") {
            Swal.fire("Error", "Este codigo ya esta en uso", "error");
            return;
          }
          if (response.data.res === "success_new") {
            Swal.fire(
              "Success",
              "Se ha guardado exitosamente el formulario",
              "success"
            );
            dispatch(DocumentMasterPaginateInit());
            dispatch(newDocumetMaster(response.data));
            return;
          }
        }
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
const newDocumetMaster = (documentMaster) => ({
  type: types.documentNewDocumentMaster,
  payload: documentMaster,
});

export const UpdateDocumentMaster = (
  uuid,
  code,
  format,
  template,
  position,
  dataBasic,
  description,
  process_link,
  process_type,
  dataBasicCount,
  process_description,
  optionTarget
) => {
  return async (dispatch) => {
     //Validacion de los datos del formulario y el proceso
     if (
      code.trim().length === 0 ||
      format.trim().length === 0 ||
      template.trim().length === 0 ||
      description.trim().length === 0
    ) {
      Swal.fire("Error", "Falta informacion del formulario", "error");
      return;
    }
    if (process_type === "Texto") {
      if (process_description.trim().length === 0) {
        Swal.fire("Error", "Falta la descripcion del proceso", "error");
        return;
      }
    }
    if (process_type === "Link") {
      if (process_description.trim().length === 0) {
        Swal.fire("Error", "Falta el link del proceso", "error");
        return;
      }
      if (process_link === undefined) {
        Swal.fire(
          "Error",
          "Falta la descripcion del link del proceso",
          "error"
        );
        return;
      }
      if (process_link.trim().length === 0) {
        Swal.fire(
          "Error",
          "Falta la descripcion del link del proceso",
          "error"
        );
        return;
      }
    }
    //Validacion de los datos basicos
    for (let i = 0; i < dataBasicCount.length; i++) {
      if (dataBasic[dataBasicCount[i] - 1][0].title.trim() === "") {
        Swal.fire(
          "Error",
          "Falta el titulo de uno de los datos basicos o remueve el dato basico",
          "error"
        );
        return;
      }
      if (dataBasic[dataBasicCount[i] - 1][0].type === "Texto") {
        if (dataBasic[dataBasicCount[i] - 1][0].description.trim() === "") {
          Swal.fire(
            "Error",
            "Falta la descripcion de uno de los datos basicos o remueve el dato basico",
            "error"
          );
          return;
        }
      }
      if (dataBasic[dataBasicCount[i] - 1][0].type === "Link") {
        if (dataBasic[dataBasicCount[i] - 1][0].descriptionLink.trim() === "") {
          Swal.fire(
            "Error",
            "Falta la descripcion del link de uno de los datos basicos o remueve el dato basico",
            "error"
          );
          return;
        }
        if (dataBasic[dataBasicCount[i] - 1][0].description.trim() === "") {
          Swal.fire(
            "Error",
            "Falta el link de uno de los datos basicos o remueve el dato basico",
            "error"
          );
          return;
        }
      }
    }
    const data_basic = [...dataBasic];
    data_basic.shift();
    let token = localStorage.getItem("token_bearer");
    //Validaciones de frontend para el formulario
    axios
      .post(
        `${baseUrl}/dataMasterHead/update/${uuid}`,
        {
          uuid,
          code,
          format,
          template,
          position,
          data_basic,
          description,
          process_link,
          process_type,
          dataBasicCount,
          process_description,
          optionTarget
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
          if (response.data.res === "failed code") {
            Swal.fire("Error", "Este codigo ya esta en uso", "error");
            return;
          }
          if (response.data.res === "success_update") {
            Swal.fire(
              "Success",
              "Se ha actualizado exitosamente el formulario",
              "success"
            );
            dispatch(DocumentMasterPaginateInit());
            dispatch(updateDocumetMaster(response.data));
            return;
          }
        }
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
const updateDocumetMaster = (documentMaster) => ({
  type: types.documentUpdateDocumentMaster,
  payload: documentMaster,
});

export const DeletedDocumentMaster = (uuid) => {
  return async (dispatch) => {};
};
