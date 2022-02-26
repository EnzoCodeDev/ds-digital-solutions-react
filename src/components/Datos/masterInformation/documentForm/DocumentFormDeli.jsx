import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { ViewDocumentMaster } from "../../../../redux/actions/documentMasterAction";
import {
  infoCelda,
  listArray,
  titleColumns,
  indexTypeCelda,
} from "../../../../helpers/typeCelda";
import { DocumentFormDeliIndex } from "./DocumentFormDeliIndex";
export const DocumentFormDeli = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  let token = localStorage.getItem("token_bearer");
  //Inicial state nuevo documento
  const inicialStateOption = [
    {
      card: "inhabilidado",
      optionValue: "undefined",
      titleCard: "",
      text: "",
      linkDescription: "",
      link: "",
      descripcionArchivo: "",
      archivo: "",
      heigth: { state: true },
      img: "",
      tabla: { column: [], row: [] },
      tablaTypeCelda: {
        title_columna: [],
        celda: [],
        type: [],
        lista: [],
        celdaType: [],
        typeCeldaInfo: [infoCelda],
      },
    },
    {
      card: 1,
      optionValue: "Texto",
      titleCard: "",
      text: "",
      linkDescription: "",
      link: "",
      img: "",
      descripcionArchivo: "",
      archivo: "",
      heigth: { state: true },
      tabla: { column: [1], row: [1] },
      tablaTypeCelda: {
        title_columna: titleColumns,
        celda: ["0", "Título"],
        type: indexTypeCelda,
        lista: listArray,
        celdaType: ["0", "Título"],
        typeCeldaInfo: [infoCelda],
      },
    },
  ];
  //Inicial estate de los estados de la tarjetas de los datos basicos
  const initialStateDataBasic = [
    [
      {
        id: 1,
        type: "Texto",
        title: "Proceso",
        description: "",
      },
    ],
  ];
  //Use state de la cabeza del formulario
  const [codigo, setCodigo] = useState("");
  const [formato, setFormato] = useState("");
  //Manejo de que tipo de informacion quiere insertar el usuario en las tarjetas
  const [option, setOption] = useState(inicialStateOption);
  //Manejo de las tarjetas
  const [arrayCard, setArrayCard] = useState([1]);
  //Manejo de las datas de cada tarjetas
  const [dataBasic, setDataBasic] = useState(initialStateDataBasic);
  //Manejo de la ultima tarjeta que se hizo
  const [dataBasicCount, setDataBasicCount] = useState([]);
  //Este state se hizo con el fin de soluccionar un bug que habia al cargar los datos de las tablas
  const [cargueTable, setCargueTable] = useState(false);
  const { uuid } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ViewDocumentMaster(uuid));
  }, [dispatch, uuid]);
  let documentMaster = useSelector(
    (state) => state.documentMaster.documentMaster
  );
  const { img_header } = useSelector((state) => state.auth);
  const documentMasterHead = documentMaster.DocumentMasterHead;
  const documentMasterInfo = documentMaster.DocumentMasterInfo;
  const documentMasterInfoTable =
    documentMaster.DocumentMasterInfoTable === undefined
      ? ""
      : documentMaster.DocumentMasterInfoTable;
  const proceso =
    documentMaster.proceso === undefined ? "" : documentMaster.proceso.process;
  const subProceso =
    documentMaster.Sub_proceso === undefined
      ? ""
      : documentMaster.Sub_proceso.subProceso;
  //Renderizado de los datos basicos de la aplicacion si vienen en el dispacth
  useEffect(() => {
    let array = [];
    if (documentMasterHead.data_basic !== null) {
      array.push(...JSON.parse(documentMasterHead.data_basic));
      setDataBasicCount(JSON.parse(documentMasterHead.position_data_basic));
      setDataBasic([...array]);
    }
  }, [
    documentMasterHead.position_data_basic,
    documentMasterHead.process_type,
    documentMasterHead.process_description,
    documentMasterHead.data_basic,
    documentMasterHead.process_link,
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
            typeCeldaInfo: [],
          },
          linkTitle: "",
          link: "",
          heigth: { state: true },
          img: "",
          card: 0,
          card_id: 0,
        },
    ];
    if (documentMaster.res) {
      //Renderiazado de los datos de la cabeza del formulario
      setCodigo(documentMaster.DocumentMasterHead.code);
      setFormato(documentMaster.DocumentMasterHead.format);
      documentMaster.DocumentMasterBody.map(function (DocumentMasterBody) {
        //Aqui se hace un map para el body y un for eah para verificar que dato es para cada body
        //Dependiendo el id coincidan con el body
        const arrayInfo = [];
        for (let i = 0; i < documentMasterInfo.length; i++) {
          if (documentMasterInfo[i].id_card === DocumentMasterBody.id) {
            arrayInfo.push({
              id_card: documentMasterInfo[i].id_card,
              id_header: documentMasterInfo[i].id_header,
              title_card: documentMasterInfo[i].title_card,
              text_description: documentMasterInfo[i].text_description,
              link: documentMasterInfo[i].link,
              link_description: documentMasterInfo[i].link_description,
              text_description_item:
                documentMasterInfo[i].text_description_item,
              date: documentMasterInfo[i].date,
              file: documentMasterInfo[i].file,
              file_description: documentMasterInfo[i].file_description,
              card_info_table: documentMasterInfo[i].card_info_table,
              img: documentMasterInfo[i].img,
            });
          }
        }
        return arrayOptioValue.push(
          {
            card_id: DocumentMasterBody.id,
            card: DocumentMasterBody.number_card,
            titleCard: arrayInfo[0].title_card,
            text:
              arrayInfo[0].text_description === null
                ? ""
                : arrayInfo[0].text_description,
            text_description_item:
              arrayInfo[0].text_description_item === null
                ? ""
                : arrayInfo[0].text_description_item,
            date: arrayInfo[0].date === null ? "" : arrayInfo[0].date,
            link: arrayInfo[0].link === null ? "" : arrayInfo[0].link,
            linkDescription:
              arrayInfo[0].link_description === null
                ? ""
                : arrayInfo[0].link_description,
            archivo: arrayInfo[0].file === null ? "" : arrayInfo[0].file,
            descripcionArchivo:
              arrayInfo[0].file_description === null
                ? ""
                : arrayInfo[0].file_description,
            img: arrayInfo[0].img === null ? "" : arrayInfo[0].img,
            heigth: { state: true },
            optionValue: DocumentMasterBody.select_value,
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
                  : titleColumns,
              celda:
                DocumentMasterBody.type_celda !== null
                  ? JSON.parse(DocumentMasterBody.type_celda)
                  : ["0", "Título"],
              type:
                DocumentMasterBody.identity_data_position !== null
                  ? JSON.parse(DocumentMasterBody.identity_data_position)
                  : indexTypeCelda,
              lista:
                DocumentMasterBody.list_value_celda !== null
                  ? JSON.parse(DocumentMasterBody.list_value_celda)
                  : null,
              celdaType:
                DocumentMasterBody.type_celda !== null
                  ? DocumentMasterBody.type_celda
                  : JSON.stringify(["0", "Título"]),
              typeCeldaInfo: JSON.parse(DocumentMasterBody.card_info_table),
            },
          },
        );
      });
      setOption(arrayOptioValue);
      let newArray = JSON.parse(documentMaster.DocumentMasterHead.position);
      setArrayCard(newArray);
      setCargueTable(true);
    }
    //Ignorando dependencias para que solo se llame una vez
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
  //Renderizar los datos de la tabla
  if (cargueTable) {
    for (let i = 0; i < option.length; i++) {
      let optionInfo = [...option];
      for (let t = 0; t < documentMasterInfoTable.length; t++) {
        if (option[i].card_id === documentMasterInfoTable[t].id_card) {
          if (documentMasterInfoTable[t].type_celda === "Título texto") {
            optionInfo[i].tablaTypeCelda.typeCeldaInfo[0][
              option[i].tablaTypeCelda.type.indexOf(
                parseInt(documentMasterInfoTable[t].index_celda)
              )
            ].titleCelda = documentMasterInfoTable[t].title_celda;
            optionInfo[i].tablaTypeCelda.typeCeldaInfo[0][
              option[i].tablaTypeCelda.type.indexOf(
                parseInt(documentMasterInfoTable[t].index_celda)
              )
            ].textDescription = documentMasterInfoTable[t].text_description;
            setOption(optionInfo);
          }
          if (documentMasterInfoTable[t].type_celda === "Imagen") {
            optionInfo[i].tablaTypeCelda.typeCeldaInfo[0][
              option[i].tablaTypeCelda.type.indexOf(
                parseInt(documentMasterInfoTable[t].index_celda)
              )
            ].img = documentMasterInfoTable[t].img;
            setOption(optionInfo);
          }
          if (documentMasterInfoTable[t].type_celda === "Imagen titulo") {
            optionInfo[i].tablaTypeCelda.typeCeldaInfo[0][
              option[i].tablaTypeCelda.type.indexOf(
                parseInt(documentMasterInfoTable[t].index_celda)
              )
            ].titleCelda = documentMasterInfoTable[t].title_celda;
            optionInfo[i].tablaTypeCelda.typeCeldaInfo[0][
              option[i].tablaTypeCelda.type.indexOf(
                parseInt(documentMasterInfoTable[t].index_celda)
              )
            ].img = documentMasterInfoTable[t].img;
            setOption(optionInfo);
          }
          if (documentMasterInfoTable[t].type_celda === "link") {
            optionInfo[i].tablaTypeCelda.typeCeldaInfo[0][
              option[i].tablaTypeCelda.type.indexOf(
                parseInt(documentMasterInfoTable[t].index_celda)
              )
            ].link = documentMasterInfoTable[t].link;
            optionInfo[i].tablaTypeCelda.typeCeldaInfo[0][
              option[i].tablaTypeCelda.type.indexOf(
                parseInt(documentMasterInfoTable[t].index_celda)
              )
            ].linkDescription = documentMasterInfoTable[t].link_description;
            setOption(optionInfo);
          }
          if (documentMasterInfoTable[t].type_celda === "fecha") {
            optionInfo[i].tablaTypeCelda.typeCeldaInfo[0][
              option[i].tablaTypeCelda.type.indexOf(
                parseInt(documentMasterInfoTable[t].index_celda)
              )
            ].titleCelda = documentMasterInfoTable[t].title_celda;
            optionInfo[i].tablaTypeCelda.typeCeldaInfo[0][
              option[i].tablaTypeCelda.type.indexOf(
                parseInt(documentMasterInfoTable[t].index_celda)
              )
            ].textDescription = documentMasterInfoTable[t].fecha;
            setOption(optionInfo);
          }
          if (documentMasterInfoTable[t].type_celda === "lista") {
            optionInfo[i].tablaTypeCelda.typeCeldaInfo[0][
              option[i].tablaTypeCelda.type.indexOf(
                parseInt(documentMasterInfoTable[t].index_celda)
              )
            ].lista = JSON.parse(documentMasterInfoTable[t].lista);
            setOption(optionInfo);
          }
        }
      }
    }
    setCargueTable(false);
  }
  //Logica para descargar un archivo
  const downloadFile = (e, title, archive) => {
    //Obtener la extension del archivo
    let archive_extension = archive.split("/")[0];
    axios
      .post(
        `${baseUrl}/datos/download/file`,
        {
          archive,
        },
        {
          responseType: "blob",
          onDownloadProgress: (progressEvent) => {
            var percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(percentCompleted);
          },
          //En la peticion post se tuvo que enviar estos encabezados ya que no los queria recibir
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      )
      .then(function (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${title}${archive_extension}`);
        document.body.appendChild(link);
        link.click();
      })
      .catch(function (response) {
        console.log(response);
      });
  };
  return (
    <DocumentFormDeliIndex
      option={option}
      codigo={codigo}
      formato={formato}
      proceso={proceso}
      arrayCard={arrayCard}
      dataBasic={dataBasic}
      img_header={img_header}
      subProceso={subProceso}
      downloadFile={downloadFile}
      dataBasicCount={dataBasicCount}
      documentMasterHead={documentMasterHead}
    />
  );
};
