import axios from "axios";
//libreria de swal para mostrar alert https://sweetalert2.github.io/
import Swal from "sweetalert2";
import { types } from "../types/types";
import { DocumentMasterPaginateInit } from "./formDocumentTableParametrizacionActions";
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
      .get(`${baseUrl}/parametrizacion/index/${uuid}`, {
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
  process_option,
  sub_process_option,
  dataBasicCount,
  optionTarget,
  handleViewEdit
) => {
  return async (dispatch) => {
    //Validacion de los datos del formulario principales
    if (
      code.trim().length === 0 ||
      format.trim().length === 0 ||
      template.trim().length === 0 ||
      description.trim().length === 0
    ) {
      Swal.fire("Error", "Falta informacion del formulario", "error");
      return;
    }
    //Validacion de los titulos de la tarjetas
    for (let i = 0; i < optionTarget.length; i++) {
      if (optionTarget[i][0].optionValue !== "undefined") {
        if (optionTarget[i][0].optionValue !== "Tabla") {
          if (optionTarget[i][0].titleCard.length === 0) {
            Swal.fire(
              "Error",
              `Falta el titulo en la tarjeta tipo ${optionTarget[i][0].optionValue}`,
              "error"
            );
            return;
          }
          if (optionTarget[i][0].text.length === 0) {
            Swal.fire(
              "Error",
              `Falta la descripcion del item en la tarjeta tipo ${optionTarget[i][0].optionValue}`,
              "error"
            );
            return;
          }
        }
      }
      //Validar de que todos los titulos de la columna vengan
      if (optionTarget[i][0].optionValue === "Tabla") {
        for (let c = 1; c < optionTarget[i][0].tabla.column.length + 1; c++) {
          if(optionTarget[i][0].tablaTypeCelda.title_columna[c].trim() === ''){
            Swal.fire(
              "Error",
              `Falta el titulo de una de las columnas`,
              "error"
            );
            return;
          }
        }
      }
    }
    //Validacion de los datos del proceso
    if (process_option.trim().length === 0) {
      Swal.fire("Error", "Por favor selecciona un proceso", "error");
      return;
    }
    //Validacion de los datos del proceso
    if (sub_process_option.trim().length === 0) {
      Swal.fire("Error", "Por favor selecciona un Subproceso", "error");
      return;
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
      if (dataBasic[dataBasicCount[i] - 1][0].type === "Link") {
        if (
          dataBasic[dataBasicCount[i] - 1][0].info === null ||
          dataBasic[dataBasicCount[i] - 1][0].info.trim() === ""
        ) {
          Swal.fire(
            "Error",
            "Falta la descripcion del link de uno de los datos basicos o remueve el dato basico",
            "error"
          );
          return;
        }
      }
    }

    const data_basic = [...dataBasic];
    let token = localStorage.getItem("token_bearer");
    //Validaciones de frontend para el formulario
    axios
      .post(
        `${baseUrl}/parametrizacion/store `,
        {
          code,
          format,
          template,
          position,
          data_basic,
          description,
          process_option,
          sub_process_option,
          dataBasicCount,
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
            //Crear el DOCUMENTO y corfirmar si seguir editando o volver
            Swal.fire({
              title: "Exito",
              text: "Se ha guardado exitosamente el documento",
              icon: "success",
              showDenyButton: true,
              confirmButtonText: "Continuar editando",
              denyButtonText: `Regresar`,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                dispatch(DocumentMasterPaginateInit());
                dispatch(newDocumetMaster(response.data));
                handleViewEdit(response.data.DocumentMasterHead.uuid);
              } else if (result.isDenied) {
                dispatch(DocumentMasterPaginateInit());
                dispatch(newDocumetMaster(response.data));
                handleViewEdit(false);
              }
            });
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
  dataBasicCount,
  process_option,
  sub_process_option,
  optionTarget,
  handleViewEdit
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
    //Validacion de los titulos de la tarjetas
    for (let i = 0; i < optionTarget.length; i++) {
      if (optionTarget[i][0].optionValue !== "undefined") {
        if (optionTarget[i][0].titleCard.length === 0) {
          Swal.fire(
            "Error",
            `Falta el titulo en la tarjeta tipo ${optionTarget[i][0].optionValue}`,
            "error"
          );
          return;
        }
        if (optionTarget[i][0].optionValue !== "Tabla") {
          if (optionTarget[i][0].text.length === 0) {
            Swal.fire(
              "Error",
              `Falta la descripcion del item en la tarjeta tipo ${optionTarget[i][0].optionValue}`,
              "error"
            );
            return;
          }
        }
      }
      //Validar de que todos los titulos de la columna vengan
      if (optionTarget[i][0].optionValue === "Tabla") {
        for (let c = 1; c < optionTarget[i][0].tabla.column.length + 1; c++) {
          if(optionTarget[i][0].tablaTypeCelda.title_columna[c].trim() === ''){
            Swal.fire(
              "Error",
              `Falta el titulo de una de las columnas`,
              "error"
            );
            return;
          }
        }

      }
    }
    //Validacion de los datos del proceso
    if (process_option.trim().length === 0) {
      Swal.fire("Error", "Por favor selecciona un proceso", "error");
      return;
    }
    //Validacion de los datos del proceso
    if (sub_process_option.trim().length === 0) {
      Swal.fire("Error", "Por favor selecciona un Subproceso", "error");
      return;
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
      if (dataBasic[dataBasicCount[i] - 1][0].type === "Link") {
        if (dataBasic[dataBasicCount[i] - 1][0].info === null) {
          Swal.fire(
            "Error",
            "Falta la descripcion del link de uno de los datos basicos o remueve el dato basico",
            "error"
          );
          return;
        }
        if (dataBasic[dataBasicCount[i] - 1][0].info.trim() === "") {
          Swal.fire(
            "Error",
            "Falta la descripcion del link de uno de los datos basicos o remueve el dato basico",
            "error"
          );
          return;
        }
      }
    }
    const data_basic = [...dataBasic];
    let token = localStorage.getItem("token_bearer");
    //Validaciones de frontend para el formulario
    axios
      .put(
        `${baseUrl}/parametrizacion/update/${uuid}`,
        {
          uuid,
          code,
          format,
          template,
          position,
          data_basic,
          description,
          process_option,
          sub_process_option,
          dataBasicCount,
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
          if (response.data.res === "success_update") {
            //Actualizar el documento y corfirmar si seguir editando o volver
            Swal.fire({
              title: "Exito",
              text: "Se ha actualizado exitosamente el documento",
              icon: "success",
              showDenyButton: true,
              confirmButtonText: "Continuar editando",
              denyButtonText: `Regresar`,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                dispatch(DocumentMasterPaginateInit());
                dispatch(updateDocumetMaster(response.data));
                handleViewEdit(response.data.DocumentMasterHead.uuid);
              } else if (result.isDenied) {
                dispatch(DocumentMasterPaginateInit());
                dispatch(updateDocumetMaster(response.data));
                handleViewEdit(false);
              }
            });
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
