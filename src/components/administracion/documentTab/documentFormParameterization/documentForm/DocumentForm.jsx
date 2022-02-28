import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { DocumentMasterPaginateInit } from "../../../../../redux/actions/formDocumentTableParametrizacionActions";
import {
  ViewDocumentMaster,
  UpdateDocumentMaster,
} from "../../../../../redux/actions/formDocumentParametrizacionAction";
import { indexTypeCelda } from "../../../../../helpers/typeCelda";
import { DocumentFormIndex } from "./DocumentFormIndex";
const baseUrl = process.env.REACT_APP_API_URL;
//Este es el formulario paraparametrizar un documento
export const DocumentForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { uuid } = useParams();
  //Hacer el dispach si viene un uuid en la url para consultar
  useEffect(() => {
    dispatch(ViewDocumentMaster(uuid));
  }, [dispatch, uuid]);
  //Tomar del redux el estado del documento que estamos modificando
  let documentMaster = useSelector(
    (state) => state.documentMaster.documentMaster
  );
  if (documentMaster.res === "success_update") {
    dispatch(DocumentMasterPaginateInit());
    history.push("/documentation-master-list");
  }
  //Inicial state del formulario cuando se va a crear nuevo
  const inicialStateOption = [
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
    {
      card: 1,
      optionValue: "Texto",
      titleCard: "",
      text: "",
      tabla: { column: [1], row: [1] },
      tablaTypeCelda: {
        title_columna: ["", ""],
        celda: ["", "Título texto"],
        type: indexTypeCelda,
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
    dispatch(DocumentMasterPaginateInit());
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
        if (optionTarget[i].optionValue !== "Tabla") {
          if (optionTarget[i].titleCard.length === 0) {
            Swal.fire(
              "Error",
              `Falta el titulo en la tarjeta tipo ${optionTarget[i].optionValue}`,
              "error"
            );
            return;
          }
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
                  option[i].tablaTypeCelda.type.indexOf(parseInt(`${r}${c}`))
                ],
              lista:
                option[i].tablaTypeCelda.lista[
                  option[i].tablaTypeCelda.type.indexOf(parseInt(`${r}${c}`))
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
                history.push(`/editDocument/${response.data.DocumentMasterHead.uuid}`);
              } else if (result.isDenied) {
                history.push('/documentation-master-list');
              };
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
    e.preventDefault();
    const code = codigo;
    const format = formato;
    const position = arrayCard;
    const process_option = dataBasic[0][0].option;
    const sub_process_option = dataBasic[1][0].option;
    const optionTarget = [...option];
    dispatch(
      UpdateDocumentMaster(
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
        optionTarget
      )
    );
  };
  //Renderizado de los datos basicos de la aplicacion
  useEffect(() => {
    if (documentMaster.res === "success_view") {
      let array = [];
      if (documentMaster.DocumentMasterHead.data_basic === null) {
      } else {
        array.push(...JSON.parse(documentMaster.DocumentMasterHead.data_basic));
        setDataBasicCount(
          JSON.parse(documentMaster.DocumentMasterHead.position_data_basic)
        );
        setDataBasic([...array]);
        setDataBasicUlti(
          JSON.parse(documentMaster.DocumentMasterHead.position_data_basic)
            .length + 2
        );
      }
    }
  }, [
    documentMaster.res,
    documentMaster.DocumentMasterHead.position_data_basic,
    documentMaster.DocumentMasterHead.process_type,
    documentMaster.DocumentMasterHead.process_description,
    documentMaster.DocumentMasterHead.data_basic,
    documentMaster.DocumentMasterHead.process_link,
  ]);
  //Renderizar los datos de la tarjeta de la aplicacion
  useEffect(() => {
    let arrayOptioValue = [
      {
        titleCard: "",
        optionValue: "undefined",
        text: "",
        tabla: { column: [], row: [] },
        tablaTypeCelda: {
          title_columna: [],
          celda: [],
          type: [],
          lista: [],
          celdaType: [],
        },
        linkTitle: "",
        link: "",
        heigth: { state: true },
        img: "",
        card: 0,
      },
    ];
    if (documentMaster.res === "success_view") {
      //Renderiazado de los datos de la cabeza del formulario
      setCodigo(documentMaster.DocumentMasterHead.code);
      setFormato(documentMaster.DocumentMasterHead.format);
      setTemplate(documentMaster.DocumentMasterHead.template);
      setDescription(documentMaster.DocumentMasterHead.description);
      documentMaster.DocumentMasterBody.map(function (DocumentMasterBody) {
        return arrayOptioValue.push({
          card: DocumentMasterBody.number_card,
          link: DocumentMasterBody.link === null ? "" : DocumentMasterBody.link,
          linkDescription:
            DocumentMasterBody.link_description === null
              ? ""
              : DocumentMasterBody.link_description,
          archivo:
            DocumentMasterBody.file === null ? "" : DocumentMasterBody.file,
          descripcionArchivo:
            DocumentMasterBody.file_description === null
              ? ""
              : DocumentMasterBody.file_description,
          img:
            DocumentMasterBody.image === null ? "" : DocumentMasterBody.image,
          heigth: { state: true },
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
          tablaTypeCelda: {
            title_columna:
              DocumentMasterBody.title_columns !== null
                ? JSON.parse(DocumentMasterBody.title_columns)
                : ["", "Título texto"],
            celda:
              DocumentMasterBody.type_celda !== null
                ? JSON.parse(DocumentMasterBody.type_celda)
                : ["0"],
            type:
              DocumentMasterBody.identity_data_position !== null
                ? JSON.parse(DocumentMasterBody.identity_data_position)
                : indexTypeCelda,
            lista:
              DocumentMasterBody.list_value_celda !== null
                ? JSON.parse(DocumentMasterBody.list_value_celda)
                : [[0], [0]],
            typeCeldaInfo:
              DocumentMasterBody.type_celda !== null
                ? JSON.parse(DocumentMasterBody.card_info_table)
                : ["sdbsadko"],
          },
        });
      });
      setOption(arrayOptioValue);
      let newArray = JSON.parse(documentMaster.DocumentMasterHead.position);
      setArrayCard(newArray);
      setUltime(newArray.length);
    }
    //Ognorando dependencias para que solo se llame una vez
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    documentMaster.DocumentMasterHead.code,
    documentMaster.DocumentMasterHead.format,
    documentMaster.DocumentMasterHead.template,
    documentMaster.DocumentMasterHead.description,
    documentMaster.DocumentMasterHead.position,
    documentMaster.DocumentMasterBody,
    documentMaster.res,
  ]);
  return (
    <DocumentFormIndex
      lista={lista}
      codigo={codigo}
      option={option}
      ultime={ultime}
      preview={preview}
      formato={formato}
      setLista={setLista}
      setOption={setOption}
      arrayCard={arrayCard}
      setUltime={setUltime}
      dataBasic={dataBasic}
      handleBack={handleBack}
      handleTitle={handleTitle}
      listaUltime={listaUltime}
      setArrayCard={setArrayCard}
      handleRemove={handleRemove}
      handlePreview={handlePreview}
      documentMaster={documentMaster}
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
