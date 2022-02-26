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
export const DocumentMasterInfoNew = (
  documentMasterHead,
  dataBasic,
  dataBasicCount,
  aplicarState,
  nombre,
  identificacion,
  option
) => {
  return async (dispatch) => {
    if (
      dataBasic[0][0].option === "Lorem ipsum dolor" ||
      dataBasic[0][0].option === "0"
    ) {
      Swal.fire("Falta el proceso", `Falta el proceso del documento`, "error");
      return;
    }
    if (
      dataBasic[1][0].option === "Lorem ipsum dolor" ||
      dataBasic[1][0].option === "0" ||
      dataBasic[1][0].option.length === 0
    ) {
      Swal.fire(
        "Falta el subproceso",
        `Falta el subproceso del documento`,
        "error"
      );
      return;
    }
    for (let i = 0; i < dataBasicCount.length; i++) {
      if (dataBasic[dataBasicCount[i] - 1][0].type === "Texto") {
        if (
          dataBasic[dataBasicCount[i] - 1][0].info === null ||
          dataBasic[dataBasicCount[i] - 1][0].info.trim() === ""
        ) {
          Swal.fire(
            "Error",
            "Falta la descripción de uno de los datos basicos tipo texto",
            "error"
          );
          return;
        }
      }
      if (dataBasic[dataBasicCount[i] - 1][0].type === "Link") {
        if (
          dataBasic[dataBasicCount[i] - 1][0].link === undefined ||
          dataBasic[dataBasicCount[i] - 1][0].link.trim() === ""
        ) {
          Swal.fire(
            "Error",
            "Falta el link en uno de los datos basicos",
            "error"
          );
          return;
        }
      }
    }
    if (aplicarState === "2") {
      if (nombre.trim().length === 0) {
        Swal.fire(
          "Falta información del usuario",
          `Falta el nombre del usuario para aplicar el documento`,
          "error"
        );
        return;
      }
      if (identificacion.trim().length === 0) {
        Swal.fire(
          "Falta información del usuario",
          `Falta la identificacion del usuario para aplicar el documento`,
          "error"
        );
        return;
      }
    }
    for (let i = 0; i < option.length; i++) {
      if (option[i].optionValue !== "undefined") {
        if (option[i].optionValue === "Texto") {
          if (
            option[i].textDescription === undefined ||
            option[i].textDescription.trim() === ""
          ) {
            Swal.fire(
              "Falta la descripción",
              `Falta la descripción de una de una de la(s) cajas tipo ${option[i].optionValue}`,
              "error"
            );
            return;
          }
        }
        if (option[i].optionValue === "Imagen") {
          if (option[i].img === undefined) {
            Swal.fire(
              "Falta la imagen",
              `Falta cargar la imagen de una de la(s) cajas tipo ${option[i].optionValue}`,
              "error"
            );
            return;
          }
        }
        if (option[i].optionValue === "Link") {
          if (
            option[i].link === undefined ||
            option[i].link.trim() === ""
          ) {
            Swal.fire(
              "Falta el enlace",
              `Falta el enlace del link de una de la(s) cajas tipo ${option[i].optionValue}`,
              "error"
            );
            return;
          }
          if (
            option[i].linkDescription === undefined ||
            option[i].linkDescription.trim() === ""
          ) {
            Swal.fire(
              "Falta la descripción",
              `Falta la descripción del link de una de la(s) cajas tipo ${option[i].optionValue}`,
              "error"
            );
            return;
          }
        }
        if (option[i].optionValue === "Archivo") {
          if (option[i].archivo === undefined) {
            Swal.fire(
              "Falta el archivo",
              `Falta el archivo de una de la(s) cajas tipo ${option[i].optionValue}`,
              "error"
            );
            return;
          }
        }
        if (option[i].optionValue === "Fecha") {
          if (
            option[i].date === undefined ||
            option[i].date.trim() === ""
          ) {
            Swal.fire(
              "Falta la fecha",
              `Falta la fecha de una de la(s) cajas tipo ${option[i].optionValue}`,
              "error"
            );
            return;
          }
        }
        //Logica para la tabla no le falte ni un solo dato es un poco compleja por la parte dinamica
        if (option[i].optionValue === "Tabla") {
          //Cuantas columnas hay
          let arrayTable = [];
          for (let c = 1; c < option[i].tabla.column.length + 1; c++) {
            //cuantas filas hay
            for (let r = 1; r < option[i].tabla.row.length + 1; r++) {
              //Validar  celda tipo titulo texto
              if (
                option[i].tablaTypeCelda.celda[
                  option[i].tablaTypeCelda.type.indexOf(parseInt(`${r}${c}`))
                ] === "Título texto"
              ) {
                if (
                  option[i].tablaTypeCelda.typeCeldaInfo[0][
                    option[i].tablaTypeCelda.type.indexOf(
                      parseInt(`${r}${c}`)
                    )
                  ].titleCelda === null ||
                  option[i].tablaTypeCelda.typeCeldaInfo[0][
                    option[i].tablaTypeCelda.type.indexOf(
                      parseInt(`${r}${c}`)
                    )
                  ].titleCelda.trim() === ""
                ) {
                  Swal.fire(
                    "Falta el titulo",
                    `Falta el titulo de una de la(s) celdas`,
                    "error"
                  );
                  return;
                }
                if (
                  option[i].tablaTypeCelda.typeCeldaInfo[0][
                    option[i].tablaTypeCelda.type.indexOf(
                      parseInt(`${r}${c}`)
                    )
                  ].textDescription === null ||
                  option[i].tablaTypeCelda.typeCeldaInfo[0][
                    option[i].tablaTypeCelda.type.indexOf(
                      parseInt(`${r}${c}`)
                    )
                  ].textDescription.trim() === ""
                ) {
                  Swal.fire(
                    "Falta la descripción",
                    `Falta la descripción de una de la(s) celdas`,
                    "error"
                  );
                  return;
                }
                arrayTable.push({
                  type: "Título texto",
                  index: parseInt(`${r}${c}`),
                  titleCelda:
                    option[i].tablaTypeCelda.typeCeldaInfo[0][
                      option[i].tablaTypeCelda.type.indexOf(
                        parseInt(`${r}${c}`)
                      )
                    ].titleCelda,
                  textDescription:
                    option[i].tablaTypeCelda.typeCeldaInfo[0][
                      option[i].tablaTypeCelda.type.indexOf(
                        parseInt(`${r}${c}`)
                      )
                    ].textDescription,
                });
              }
              //Validar celda tipo imagen
              if (
                option[i].tablaTypeCelda.celda[
                  option[i].tablaTypeCelda.type.indexOf(parseInt(`${r}${c}`))
                ] === "Imagen"
              ) {
                if (
                  option[i].tablaTypeCelda.typeCeldaInfo[0][
                    option[i].tablaTypeCelda.type.indexOf(
                      parseInt(`${r}${c}`)
                    )
                  ].img === null ||
                  option[i].tablaTypeCelda.typeCeldaInfo[0][
                    option[i].tablaTypeCelda.type.indexOf(
                      parseInt(`${r}${c}`)
                    )
                  ].img.trim() === ""
                ) {
                  Swal.fire(
                    "Falta el imagen",
                    `Falta la imagen en una de la(s) celdas`,
                    "error"
                  );
                  return;
                }
                arrayTable.push({
                  type: "Imagen",
                  index: parseInt(`${r}${c}`),
                  img: option[i].tablaTypeCelda.typeCeldaInfo[0][
                    option[i].tablaTypeCelda.type.indexOf(
                      parseInt(`${r}${c}`)
                    )
                  ].img,
                  img_extesion:
                    option[i].tablaTypeCelda.typeCeldaInfo[0][
                      option[i].tablaTypeCelda.type.indexOf(
                        parseInt(`${r}${c}`)
                      )
                    ].img_extension,
                });
              }
              //Validar celda tipo titulo imagen
              if (
                option[i].tablaTypeCelda.celda[
                  option[i].tablaTypeCelda.type.indexOf(parseInt(`${r}${c}`))
                ] === "Imagen título"
              ) {
                if (
                  option[i].tablaTypeCelda.typeCeldaInfo[0][
                    option[i].tablaTypeCelda.type.indexOf(
                      parseInt(`${r}${c}`)
                    )
                  ].titleCelda === null ||
                  option[i].tablaTypeCelda.typeCeldaInfo[0][
                    option[i].tablaTypeCelda.type.indexOf(
                      parseInt(`${r}${c}`)
                    )
                  ].titleCelda.trim() === ""
                ) {
                  Swal.fire(
                    "Falta el titulo",
                    `Falta el titulo de una de la(s) celdas tipo titulo imagen`,
                    "error"
                  );
                  return;
                }
                if (
                  option[i].tablaTypeCelda.typeCeldaInfo[0][
                    option[i].tablaTypeCelda.type.indexOf(
                      parseInt(`${r}${c}`)
                    )
                  ].img === null ||
                  option[i].tablaTypeCelda.typeCeldaInfo[0][
                    option[i].tablaTypeCelda.type.indexOf(
                      parseInt(`${r}${c}`)
                    )
                  ].img.trim() === ""
                ) {
                  Swal.fire(
                    "Falta la imagen",
                    `Falta la imagen de una de la(s) celdas`,
                    "error"
                  );
                  return;
                }
                arrayTable.push({
                  type: "Imagen titulo",
                  index: parseInt(`${r}${c}`),
                  titleCelda:
                    option[i].tablaTypeCelda.typeCeldaInfo[0][
                      option[i].tablaTypeCelda.type.indexOf(
                        parseInt(`${r}${c}`)
                      )
                    ].titleCelda,
                  img: option[i].tablaTypeCelda.typeCeldaInfo[0][
                    option[i].tablaTypeCelda.type.indexOf(
                      parseInt(`${r}${c}`)
                    )
                  ].img,
                  img_extesion:
                    option[i].tablaTypeCelda.typeCeldaInfo[0][
                      option[i].tablaTypeCelda.type.indexOf(
                        parseInt(`${r}${c}`)
                      )
                    ].img_extension,
                });
              }
              //validar celda tipo link
              if (
                option[i].tablaTypeCelda.celda[
                  option[i].tablaTypeCelda.type.indexOf(parseInt(`${r}${c}`))
                ] === "Link"
              ) {
                if (
                  option[i].tablaTypeCelda.typeCeldaInfo[0][
                    option[i].tablaTypeCelda.type.indexOf(
                      parseInt(`${r}${c}`)
                    )
                  ].link === null ||
                  option[i].tablaTypeCelda.typeCeldaInfo[0][
                    option[i].tablaTypeCelda.type.indexOf(
                      parseInt(`${r}${c}`)
                    )
                  ].link.trim() === ""
                ) {
                  Swal.fire(
                    "Falta el enlace",
                    `Falta el enlace en una de la(s) celdas`,
                    "error"
                  );
                  return;
                }
                if (
                  option[i].tablaTypeCelda.typeCeldaInfo[0][
                    option[i].tablaTypeCelda.type.indexOf(
                      parseInt(`${r}${c}`)
                    )
                  ].linkDescription === null ||
                  option[i].tablaTypeCelda.typeCeldaInfo[0][
                    option[i].tablaTypeCelda.type.indexOf(
                      parseInt(`${r}${c}`)
                    )
                  ].linkDescription.trim() === ""
                ) {
                  Swal.fire(
                    "Falta la descripción",
                    `Falta la descripción de un enlace de una de la(s) celdas`,
                    "error"
                  );
                  return;
                }
                arrayTable.push({
                  type: "link",
                  index: parseInt(`${r}${c}`),
                  link: option[i].tablaTypeCelda.typeCeldaInfo[0][
                    option[i].tablaTypeCelda.type.indexOf(
                      parseInt(`${r}${c}`)
                    )
                  ].link,
                  linkDescription:
                    option[i].tablaTypeCelda.typeCeldaInfo[0][
                      option[i].tablaTypeCelda.type.indexOf(
                        parseInt(`${r}${c}`)
                      )
                    ].linkDescription,
                });
              }
              //Validar celda tipo fecha
              if (
                option[i].tablaTypeCelda.celda[
                  option[i].tablaTypeCelda.type.indexOf(parseInt(`${r}${c}`))
                ] === "Fecha"
              ) {
                if (
                  option[i].tablaTypeCelda.typeCeldaInfo[0][
                    option[i].tablaTypeCelda.type.indexOf(
                      parseInt(`${r}${c}`)
                    )
                  ].titleCelda === null ||
                  option[i].tablaTypeCelda.typeCeldaInfo[0][
                    option[i].tablaTypeCelda.type.indexOf(
                      parseInt(`${r}${c}`)
                    )
                  ].titleCelda.trim() === ""
                ) {
                  Swal.fire(
                    "Falta el titulo",
                    `Falta el titulo de una de la(s) celdas tipo fecha`,
                    "error"
                  );
                  return;
                }
                if (
                  option[i].tablaTypeCelda.typeCeldaInfo[0][
                    option[i].tablaTypeCelda.type.indexOf(
                      parseInt(`${r}${c}`)
                    )
                  ].textDescription === null ||
                  option[i].tablaTypeCelda.typeCeldaInfo[0][
                    option[i].tablaTypeCelda.type.indexOf(
                      parseInt(`${r}${c}`)
                    )
                  ].textDescription.trim() === ""
                ) {
                  Swal.fire(
                    "Falta la fecha",
                    `Falta la fecha de una de la(s) celdas`,
                    "error"
                  );
                  return;
                }
                arrayTable.push({
                  type: "fecha",
                  index: parseInt(`${r}${c}`),
                  titleCelda:
                    option[i].tablaTypeCelda.typeCeldaInfo[0][
                      option[i].tablaTypeCelda.type.indexOf(
                        parseInt(`${r}${c}`)
                      )
                    ].titleCelda,
                  fecha:
                    option[i].tablaTypeCelda.typeCeldaInfo[0][
                      option[i].tablaTypeCelda.type.indexOf(
                        parseInt(`${r}${c}`)
                      )
                    ].textDescription,
                });
              }
              if (
                option[i].tablaTypeCelda.celda[
                  option[i].tablaTypeCelda.type.indexOf(parseInt(`${r}${c}`))
                ] === "Lista"
              ) {
                // for (
                //   let l = 0;
                //   l <
                //   option[i].tablaTypeCelda.lista[
                //     option[i].tablaTypeCelda.type.indexOf(
                //       parseInt(`${r}${c}`)
                //     )
                //   ].length;
                //   l++
                // ) {
                //   if (
                //     option[i].tablaTypeCelda.typeCeldaInfo[0][
                //       option[i].tablaTypeCelda.type.indexOf(
                //         parseInt(`${r}${c}`)
                //       )
                //     ].lista[i] === null ||
                //     option[i].tablaTypeCelda.typeCeldaInfo[0][
                //       option[i].tablaTypeCelda.type.indexOf(
                //         parseInt(`${r}${c}`)
                //       )
                //     ].lista[i].trim() === ""
                //   ) {
                //     Swal.fire(
                //       "Falta información en la lista",
                //       `Falta información en una de las listas de una de la(s) celdas`,
                //       "error"
                //     );
                //     return;
                //   }
                // }
                arrayTable.push({
                  type: "lista",
                  index: parseInt(`${r}${c}`),
                  lista:
                    option[i].tablaTypeCelda.typeCeldaInfo[0][
                      option[i].tablaTypeCelda.type.indexOf(
                        parseInt(`${r}${c}`)
                      )
                    ].lista,
                });
              }
            }
          }
          option[i].tablasValue = arrayTable;
        }
      }
    }
    //Datos del usuario
    let name = aplicarState === "1" ? null : nombre;
    let identity = aplicarState === "1" ? null : identificacion;
    //Datos del proceso y sub proceso
    let proceso = dataBasic[0][0].option;
    let subProceso = dataBasic[1][0].option;
    let token = localStorage.getItem("token_bearer");
    axios
      .post(
        `${baseUrl}/datos/store`,
        {
          documentMasterHead,
          dataBasic,
          dataBasicCount,
          aplicarState,
          name,
          identity,
          option,
          proceso,
          subProceso,
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
