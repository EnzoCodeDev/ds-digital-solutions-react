import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { indexTypeCelda } from "../../../../helpers/typeCelda";
import { DocumentFormDeliIndex } from "./DocumentFormDeliIndex";
export const DocumentFormDeli = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  let token = localStorage.getItem("token_bearer");
  const [dataView, setDataView] = useState({
    res: false,
    DocumentMasterHead: {
      data_basic: null,
      version: 0,
    },
  });
  const { uuid } = useParams();
  //Traer ek datos
  useEffect(() => {
    if (uuid) {
      let token = localStorage.getItem("token_bearer");
      axios
        .get(`${baseUrl}/datos/index/${uuid}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          setDataView(response.data);
          console.log(response.data);
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
  }, [uuid, baseUrl]);
  //Inicial state nuevo documento
  const inicialStateOption = [
    {
      card: "inhabilidado",
      optionValue: "inhabilidado",
    },
    {
      card: "inhabilidado",
      optionValue: "inhabilidado",
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
  const [template, setTemplate] = useState("");
  const [description, setDescription] = useState("");
  //Manejo de que tipo de informacion quiere insertar el usuario en las tarjetas
  const [option, setOption] = useState(inicialStateOption);
  //Manejo de las tarjetas
  const [arrayCard, setArrayCard] = useState([]);
  //Manejo de las datas de cada tarjetas
  const [dataBasic, setDataBasic] = useState(initialStateDataBasic);
  //Manejo de la ultima tarjeta que se hizo
  const [dataBasicCount, setDataBasicCount] = useState([]);
  //Este state se hizo con el fin de soluccionar un bug que habia al cargar los datos de las tablas
  const [cargueTable, setCargueTable] = useState(false);
  const { img_header } = useSelector((state) => state.auth);
  //Renderizado de los datos basicos de la aplicacion si vienen en el dispacth
  useEffect(() => {
    let array = [];
    if (dataView.DocumentMasterHead.data_basic !== null) {
      array.push(...JSON.parse(dataView.DocumentMasterHead.data_basic));
      setDataBasicCount(
        JSON.parse(dataView.DocumentMasterHead.position_data_basic)
      );
      setDataBasic([...array]);
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
        titleCard: "",
        optionValue: "inhabilidado",
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
        img: "",
        card: 0,
        card_id: 0,
      },
    ];
    if (dataView.res) {
      //Renderiazado de los datos de la cabeza del formulario
      setCodigo(dataView.DocumentMasterHead.code);
      setFormato(dataView.DocumentMasterHead.format);
      setTemplate(dataView.DocumentMasterHead.template);
      setDescription(dataView.DocumentMasterHead.description);
      dataView.DocumentMasterBody.map(function (DocumentMasterBody) {
        //Aqui se hace un map para el body y un for eah para verificar que dato es para cada body
        //Dependiendo el id coincidan con el body
        const arrayInfo = [];
        let titles = JSON.parse(DocumentMasterBody.title_columns) || [];
        let tablas = {};
        let title = ["", "Título texto"];
        let listas = [[0], [0]];
        let infoCelda = [];
        for (let r = 0; r < 5 * 20; r++) {
          infoCelda.push({
            celda: "",
            titleCelda: "",
            titleColumna: "",
            textDescription: "",
            link: "",
            linkDescription: "",
            img: null,
            lista: ["", "", "", "", "", "", "", "", "", ""],
          });
        }
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
          typeCeldaInfo: infoCelda,
        };
        for (let i = 0; i < dataView.DocumentMasterInfo.length; i++) {
          if (
            dataView.DocumentMasterInfo[i].id_card === DocumentMasterBody.id
          ) {
            arrayInfo.push({
              id_card: dataView.DocumentMasterInfo[i].id_card,
              id_header: dataView.DocumentMasterInfo[i].id_header,
              title_card: dataView.DocumentMasterInfo[i].title_card,
              text_description: dataView.DocumentMasterInfo[i].text_description,
              link: dataView.DocumentMasterInfo[i].link,
              link_description: dataView.DocumentMasterInfo[i].link_description,
              text_description_item:
                dataView.DocumentMasterInfo[i].text_description_item,
              date: dataView.DocumentMasterInfo[i].date,
              file: dataView.DocumentMasterInfo[i].file,
              file_description: dataView.DocumentMasterInfo[i].file_description,
              card_info_table: dataView.DocumentMasterInfo[i].card_info_table,
              img: dataView.DocumentMasterInfo[i].img,
            });
          }
        }
        return arrayOptioValue.push({
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
          tablaTypeCelda: { tablas },
        });
      });
      setOption(arrayOptioValue);
      let newArray = JSON.parse(dataView.DocumentMasterHead.position);
      setArrayCard(newArray);
      setCargueTable(true);
    }
    //Ignorando dependencias para que solo se llame una vez
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dataView.DocumentMasterHead.code,
    dataView.DocumentMasterHead.format,
    dataView.DocumentMasterHead.template,
    dataView.DocumentMasterHead.description,
    dataView.DocumentMasterHead.position,
    dataView.DocumentMasterBody,
    dataView.res,
  ]);
  //Renderizar los datos de la tabla
  if (cargueTable) {
    for (let i = 0; i < option.length; i++) {
      let optionInfo = [...option];
      for (let t = 0; t < dataView.DocumentMasterInfoTable.length; t++) {
        if (optionInfo[i].card_id === dataView.DocumentMasterInfoTable[i].id_card) {
          if (
            dataView.DocumentMasterInfo[t].type_celda === "Título texto"
          ) {
            optionInfo[i].tablaTypeCelda.typeCeldaInfo[
              indexTypeCelda.indexOf(
                parseInt(dataView.DocumentMasterInfoTable[t].index_celda)
              )
            ].titleCelda = dataView.DocumentMasterInfoTable[t].title_celda;
            optionInfo[i].tablaTypeCelda.typeCeldaInfo[
              indexTypeCelda.indexOf(
                parseInt(dataView.DocumentMasterInfoTable[t].index_celda)
              )
            ].textDescription =
              dataView.DocumentMasterInfoTable[t].text_description;
            setOption(optionInfo);
          }
          if (dataView.DocumentMasterInfo[t].type_celda  === "Imagen") {
            optionInfo[i].tablaTypeCelda.typeCeldaInfo[
              indexTypeCelda.indexOf(
                parseInt(dataView.DocumentMasterInfoTable[t].index_celda)
              )
            ].img = dataView.DocumentMasterInfoTable[t].img;
            setOption(optionInfo);
          }
          if (
            dataView.DocumentMasterInfoTable[t].type_celda === "Imagen titulo"
          ) {
            optionInfo[i].tablaTypeCelda.typeCeldaInfo[
              indexTypeCelda.indexOf(
                parseInt(dataView.DocumentMasterInfoTable[t].index_celda)
              )
            ].titleCelda = dataView.DocumentMasterInfoTable[t].title_celda;
            optionInfo[i].tablaTypeCelda.typeCeldaInfo[
              indexTypeCelda.indexOf(
                parseInt(dataView.DocumentMasterInfoTable[t].index_celda)
              )
            ].img = dataView.DocumentMasterInfoTable[t].img;
            setOption(optionInfo);
          }
          if (dataView.DocumentMasterInfoTable[t].type_celda === "link") {
            optionInfo[i].tablaTypeCelda.typeCeldaInfo[
              indexTypeCelda.indexOf(
                parseInt(dataView.DocumentMasterInfoTable[t].index_celda)
              )
            ].link = dataView.DocumentMasterInfoTable[t].link;
            optionInfo[i].tablaTypeCelda.typeCeldaInfo[
              indexTypeCelda.indexOf(
                parseInt(dataView.DocumentMasterInfoTable[t].index_celda)
              )
            ].linkDescription =
              dataView.DocumentMasterInfoTable[t].link_description;
            setOption(optionInfo);
          }
          if (dataView.DocumentMasterInfoTable[t].type_celda === "fecha") {
            optionInfo[i].tablaTypeCelda.typeCeldaInfo[
              indexTypeCelda.indexOf(
                parseInt(dataView.DocumentMasterInfoTable[t].index_celda)
              )
            ].titleCelda = dataView.DocumentMasterInfoTable[t].title_celda;
            optionInfo[i].tablaTypeCelda.typeCeldaInfo[
              indexTypeCelda.indexOf(
                parseInt(dataView.DocumentMasterInfoTable[t].index_celda)
              )
            ].textDescription = dataView.DocumentMasterInfoTable[t].fecha;
            setOption(optionInfo);
          }
          if (dataView.DocumentMasterInfoTable[t].type_celda === "lista") {
            optionInfo[i].tablaTypeCelda.typeCeldaInfo[
              indexTypeCelda.indexOf(
                parseInt(dataView.DocumentMasterInfoTable[t].index_celda)
              )
            ].lista = JSON.parse(dataView.documentMasterInfoTable[t].lista);
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
      template={template}
      dataView={dataView}
      arrayCard={arrayCard}
      dataBasic={dataBasic}
      img_header={img_header}
      description={description}
      downloadFile={downloadFile}
      dataBasicCount={dataBasicCount}
    />
  );
};
