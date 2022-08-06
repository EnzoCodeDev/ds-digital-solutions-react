import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { indexTypeCelda } from "../../../../../helpers/typeCelda";
import { DocumentFormIndex } from "./DocumentFormIndex";
const baseUrl = process.env.REACT_APP_API_URL;
//Este es el formulario paraparametrizar un documento
export const DocumentForm = () => {
  const history = useHistory();
  const { uuid } = useParams();
  const [dataView, setDataView] = useState({
    res: false,
    DocumentMasterHead: {
      data_basic: null,
    },
  });
  //Hacer la peticion si viene un uuid en la url para consultar
  useEffect(() => {
    if (uuid) {
      let token = localStorage.getItem("token_bearer");
      axios
        .get(`${baseUrl}/parametrizacion/index/${uuid}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          setDataView(response.data);
        })
        .catch(function (response) {
          console.log(response);
          Swal.fire(
            "Error",
            "Hubo un error al consultar el formulario , por favor verificalo",
            "error"
          );
        });
    }
  }, [uuid]);
  //Inicial state del formulario cuando se va a crear nuevo
  const inicialStateOption = [
    {
      card: 0,
      optionValue: "undefined",
    },
    {
      card: 1,
      optionValue: "Texto",
      titleCard: "",
      text: "",
      tabla: { column: [1], row: [1] },
      tablaTypeCelda: {
        title_columna: ["", ""],
        celda: ["", "Título texto"],
        lista: [[0], [0]],
      },
    },
  ];
  //Inicial estate de los estados de la tarjetas de los datos basicos
  const initialStateDataBasic = [
    [
      {
        id: 1,
        type: "Select",
        title: "Proceso",
        option: "Lorem ipsum dolor",
      },
    ],
    [
      {
        id: 2,
        type: "Select",
        title: "Subproceso",
        option: "Lorem ipsum dolor",
      },
    ],
  ];
  //Use state de la cabeza del formulario
  const [codigo, setCodigo] = useState("");
  const [formato, setFormato] = useState("");
  const [template, setTemplate] = useState("");
  const [description, setDescription] = useState("");
  //Manejo de que tipo de informacion quiere insertar el usuario en las tarjetas
  const [option, setOption] = useState(inicialStateOption);
  //Manejo de las tarjetas
  const [arrayCard, setArrayCard] = useState([1]);
  //Control de la ultima tarjeta que se creo
  const [ultime, setUltime] = useState(1);
  //Uso del tipo de datos lista
  const [lista, setLista] = useState([1]);
  //Mantener el estate de la ultima lista
  const [listaUltime, setListaUltime] = useState(1);
  //Ver vista previas
  const [preview, setPreview] = useState(false);
  //Manejo de las datas de cada tarjetas
  const [dataBasic, setDataBasic] = useState(initialStateDataBasic);
  //Manejo del id de cada tarjeta del proceso
  const [dataBasicCount, setDataBasicCount] = useState([]);
  //Manejo de la ultima tarjeta que se hizo
  const [dataBasicUlti, setDataBasicUlti] = useState(2);
  //Validaciones para traer la informacion e insertarla en los inputs del formulario
  //Mantener el estado del codigo
  const handleInputCode = (e) => {
    setCodigo(e.target.value);
  };
  //Mantener el estado del formato
  const handleInputFormat = (e) => {
    setFormato(e.target.value);
  };
  //Mantener el estado de la plantilla
  const handleInputTemplate = (e) => {
    setTemplate(e.target.value);
  };
  //Mantener el estado de la descripcion
  const handleInputDescription = (e) => {
    setDescription(e.target.value);
  };
  //Pagina anterior
  const handleBack = () => {
    history.push("/documentation-master-list");
  };
  //Vista previa del documento
  const handlePreview = () => {
    setPreview(!preview);
  };
  //Agregar dato basico
  const handleAddDataBasic = () => {
    if (dataBasicCount.length <= 1) {
      let procesos = [...dataBasic];
      setDataBasic([
        ...procesos,
        [
          {
            id: dataBasicUlti + 1,
            type: "Texto",
            title: "",
            info: "",
          },
        ],
      ]);
      let newArrayCard = [...dataBasicCount, dataBasicUlti + 1];
      setDataBasicCount(newArrayCard);
      setDataBasicUlti(dataBasicUlti + 1);
    }
  };
  //Eliminar una tarjeta de datos basicos
  const handleRemove = () => {
    if (dataBasic.length === 1) {
      return;
    } else {
      let opcionData = [...dataBasic];
      let dataBasicCounts = [...dataBasicCount];
      dataBasicCounts.pop();
      opcionData.splice(dataBasicUlti, 1, [
        {
          id: "",
          type: "undefined",
          title: "",
          description: "",
          descriptionLink: "",
        },
      ]);
      setDataBasicCount([...dataBasicCounts]);
      setDataBasic([...opcionData]);
    }
  };
  //vigilar que tipo de select es en datos basicos
  const handleTypeSelect = (e, id) => {
    let opcionData = [...dataBasic];
    opcionData[id - 1][0].type = e.target.value;
    setDataBasic(opcionData);
  };
  const handleSelectProceso = (e, id) => {
    let opcionData = [...dataBasic];
    opcionData[id - 1][0].option = e.target.value;
    setDataBasic(opcionData);
  };
  //Ttulo de datos basicos
  const handleTitle = (e, id) => {
    let opcionData = [...dataBasic];
    opcionData[id - 1][0].title = e.target.value;
    setDataBasic(opcionData);
  };
  //Descripcion de datos basicos
  const handleDescripcion = (e, id) => {
    let opcionData = [...dataBasic];
    opcionData[id - 1][0].info = e.target.value;
    setDataBasic(opcionData);
  };
  //Renderizado de los datos basicos de la aplicacion
  useEffect(() => {
    if (dataView.res === "success_view") {
      let array = [];
      if (dataView.DocumentMasterHead.data_basic === null) {
      } else {
        array.push(...JSON.parse(dataView.DocumentMasterHead.data_basic));
        setDataBasicCount(
          JSON.parse(dataView.DocumentMasterHead.position_data_basic)
        );
        setDataBasic([...array]);
        setDataBasicUlti(
          JSON.parse(dataView.DocumentMasterHead.position_data_basic).length + 2
        );
      }
    }
  }, [
    dataView.res,
    dataView.DocumentMasterHead.data_basic,
    dataView.DocumentMasterHead.position_data_basic,
  ]);
  //Renderizar los datos de la tarjeta de la aplicacion
  useEffect(() => {
    let arrayOptioValue = [
      {
        card: 0,
        optionValue: "undefined",
        titleCard: "",
        text: "",
        tabla: { column: [], row: [] },
        tablaTypeCelda: {
          title_columna: [],
          celda: [],
          type: [],
          lista: [],
        },
      },
    ];
    if (dataView.res === "success_view") {
      //Renderiazado de los datos de la cabeza del formulario
      setCodigo(dataView.DocumentMasterHead.code);
      setFormato(dataView.DocumentMasterHead.format);
      setTemplate(dataView.DocumentMasterHead.template);
      setDescription(dataView.DocumentMasterHead.description);
      //renderizado de los datos de las tarjetas
      dataView.DocumentMasterBody.map(function (DocumentMasterBody) {
        let titles = JSON.parse(DocumentMasterBody.title_columns) || [];
        let tablas = {};
        let title = ["", "Título texto"];
        let listas = [[0], [0]];
        //Renderizados de las tablas si vienen
        for (let i = 0; i < dataView.DocumentMasterBodyTable.length; i++) {
          if (
            DocumentMasterBody.id ===
            dataView.DocumentMasterBodyTable[i].id_card
          ) {
            title[
              indexTypeCelda.indexOf(
                parseInt(dataView.DocumentMasterBodyTable[i].index_table)
              )
            ] = dataView.DocumentMasterBodyTable[i].type_celda;
            listas[
              indexTypeCelda.indexOf(
                parseInt(dataView.DocumentMasterBodyTable[i].index_table)
              )
            ] = JSON.parse(dataView.DocumentMasterBodyTable[i].type_lista);
          }
        }
        tablas = {
          title_columna: ["", ...titles],
          celda: title,
          lista: listas,
        };
        return arrayOptioValue.push({
          card: DocumentMasterBody.number_card,
          titleCard: DocumentMasterBody.title_card,
          optionValue: DocumentMasterBody.select_value,
          text:
            DocumentMasterBody.text_description === null
              ? ""
              : DocumentMasterBody.text_description,
          tabla: {
            column:
              JSON.parse(DocumentMasterBody.columns) === null
                ? [1]
                : JSON.parse(DocumentMasterBody.columns),
            row:
              JSON.parse(DocumentMasterBody.row) === null
                ? [1]
                : JSON.parse(DocumentMasterBody.row),
          },
          tablaTypeCelda: tablas,
        });
      });
      let newArray = JSON.parse(dataView.DocumentMasterHead.position);
      setOption(arrayOptioValue);
      setArrayCard(JSON.parse(dataView.DocumentMasterHead.position));
      setUltime(newArray.length);
    }
    //Ognorando dependencias para que solo se llame una vez
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dataView.res,
    dataView.DocumentMasterHead.data_basic,
    dataView.DocumentMasterHead.position_data_basic,
  ]);
  //Funcion para crear un nuevo formulario
  const handleDocument = (e) => {
    let arrayTableCelda = [];
    let titleColumna = [];
    e.preventDefault();
    const code = codigo;
    const format = formato;
    const position = arrayCard;
    const process_option = dataBasic[0][0].option;
    const sub_process_option = dataBasic[1][0].option;
    const optionTarget = [...option];
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
      if (optionTarget[i].optionValue !== "undefined") {
        if (optionTarget[i].titleCard.length === 0) {
          Swal.fire(
            "Error",
            `Falta el titulo en la tarjeta tipo ${optionTarget[i].optionValue}`,
            "error"
          );
          return;
        }
        if (optionTarget[i].optionValue !== "Tabla") {
          if (optionTarget[i].text.length === 0) {
            Swal.fire(
              "Error",
              `Falta la descripcion del item en la tarjeta tipo ${optionTarget[i].optionValue}`,
              "error"
            );
            return;
          }
        }
      }
      //Validar de que todos los titulos de la columna vengan
      if (optionTarget[i].optionValue === "Tabla") {
        for (let c = 1; c < optionTarget[i].tabla.column.length + 1; c++) {
          if (optionTarget[i].tablaTypeCelda.title_columna[c].trim() === "") {
            Swal.fire(
              "Error",
              `Falta el titulo de una de las columnas`,
              "error"
            );
            return;
          }
          titleColumna.push(optionTarget[i].tablaTypeCelda.title_columna[c]);
          //cuantas filas hay
          for (let r = 1; r < option[i].tabla.row.length + 1; r++) {
            arrayTableCelda.push({
              typeCelda:
                option[i].tablaTypeCelda.celda[
                  indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                ],
              lista:
                option[i].tablaTypeCelda.lista[
                  indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                ],
              index: parseInt(`${r}${c}`),
            });
          }
        }
        optionTarget[i].arrayTable = arrayTableCelda;
        optionTarget[i].arrayTitleColumns = JSON.stringify(titleColumna);
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
                history.push(
                  `/editDocument/${response.data.DocumentMasterHead.uuid}`
                );
              } else if (result.isDenied) {
                history.push("/documentation-master-list");
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
  //Esta funcion al dispacth que actualiza un formulario
  const handleDocumentUpdate = (e) => {
    let arrayTableCelda = [];
    let titleColumna = [];
    e.preventDefault();
    const code = codigo;
    const format = formato;
    const position = arrayCard;
    const process_option = dataBasic[0][0].option;
    const sub_process_option = dataBasic[1][0].option;
    const optionTarget = [...option];
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
      if (optionTarget[i].optionValue !== "undefined") {
        if (optionTarget[i].titleCard.length === 0) {
          Swal.fire(
            "Error",
            `Falta el titulo en la tarjeta tipo ${optionTarget[i].optionValue}`,
            "error"
          );
          return;
        }
        if (optionTarget[i].optionValue !== "Tabla") {
          if (optionTarget[i].text.length === 0) {
            Swal.fire(
              "Error",
              `Falta la descripcion del item en la tarjeta tipo ${optionTarget[i].optionValue}`,
              "error"
            );
            return;
          }
        }
      }
      //Validar de que todos los titulos de la columna vengan
      if (optionTarget[i].optionValue === "Tabla") {
        for (let c = 1; c < optionTarget[i].tabla.column.length + 1; c++) {
          if (optionTarget[i].tablaTypeCelda.title_columna[c].trim() === "") {
            Swal.fire(
              "Error",
              `Falta el titulo de una de las columnas`,
              "error"
            );
            return;
          }
          titleColumna.push(optionTarget[i].tablaTypeCelda.title_columna[c]);
          //cuantas filas hay
          for (let r = 1; r < option[i].tabla.row.length + 1; r++) {
            console.log(parseInt(`${r}${c}`));
            arrayTableCelda.push({
              typeCelda:
                option[i].tablaTypeCelda.celda[
                  indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                ],
              lista:
                option[i].tablaTypeCelda.lista[
                  indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                ],
              index: parseInt(`${r}${c}`),
            });
          }
        }
        optionTarget[i].arrayTable = arrayTableCelda;
        optionTarget[i].arrayTitleColumns = JSON.stringify(titleColumna);
      }
    }
    console.log(arrayTableCelda);
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
      .put(
        `${baseUrl}/parametrizacion/update/${uuid}`,
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
          if (response.data.res === "success_update") {
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
                history.push(
                  `/editDocument/${response.data.DocumentMasterHead.uuid}`
                );
              } else if (result.isDenied) {
                history.push("/documentation-master-list");
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
  return (
    <DocumentFormIndex
      lista={lista}
      codigo={codigo}
      option={option}
      ultime={ultime}
      preview={preview}
      formato={formato}
      dataView={dataView}
      setLista={setLista}
      template={template}
      setOption={setOption}
      arrayCard={arrayCard}
      setUltime={setUltime}
      dataBasic={dataBasic}
      handleBack={handleBack}
      description={description}
      handleTitle={handleTitle}
      listaUltime={listaUltime}
      setArrayCard={setArrayCard}
      handleRemove={handleRemove}
      handlePreview={handlePreview}
      dataBasicCount={dataBasicCount}
      setListaUltime={setListaUltime}
      handleDocument={handleDocument}
      handleInputCode={handleInputCode}
      handleTypeSelect={handleTypeSelect}
      handleDescripcion={handleDescripcion}
      handleInputFormat={handleInputFormat}
      handleAddDataBasic={handleAddDataBasic}
      handleSelectProceso={handleSelectProceso}
      handleInputTemplate={handleInputTemplate}
      handleDocumentUpdate={handleDocumentUpdate}
      handleInputDescription={handleInputDescription}
    />
  );
};
