import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GetApp } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Navbar } from "../../navbar/Navbar";
import { ViewDocumentMaster } from "../../../redux/actions/documentMasterAction";
import {
  infoCelda,
  listArray,
  titleColumns,
  indexTypeCelda,
} from "../../../helpers/typeCelda";
export const DocumentMasterDeliView = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  let token = localStorage.getItem("token_bearer");
  //Inicial state nuevo documento
  const inicialStateOption = [
    [
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
    ],
    [
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
    ],
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
      [
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
      ],
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
        return arrayOptioValue.push([
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
        ]);
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
        if (option[i][0].card_id === documentMasterInfoTable[t].id_card) {
          if (documentMasterInfoTable[t].type_celda === "Título texto") {
            optionInfo[i][0].tablaTypeCelda.typeCeldaInfo[0][
              option[i][0].tablaTypeCelda.type.indexOf(
                parseInt(documentMasterInfoTable[t].index_celda)
              )
            ].titleCelda = documentMasterInfoTable[t].title_celda;
            optionInfo[i][0].tablaTypeCelda.typeCeldaInfo[0][
              option[i][0].tablaTypeCelda.type.indexOf(
                parseInt(documentMasterInfoTable[t].index_celda)
              )
            ].textDescription = documentMasterInfoTable[t].text_description;
            setOption(optionInfo);
          }
          if (documentMasterInfoTable[t].type_celda === "Imagen") {
            optionInfo[i][0].tablaTypeCelda.typeCeldaInfo[0][
              option[i][0].tablaTypeCelda.type.indexOf(
                parseInt(documentMasterInfoTable[t].index_celda)
              )
            ].img = documentMasterInfoTable[t].img;
            setOption(optionInfo);
          }
          if (documentMasterInfoTable[t].type_celda === "Imagen titulo") {
            optionInfo[i][0].tablaTypeCelda.typeCeldaInfo[0][
              option[i][0].tablaTypeCelda.type.indexOf(
                parseInt(documentMasterInfoTable[t].index_celda)
              )
            ].titleCelda = documentMasterInfoTable[t].title_celda;
            optionInfo[i][0].tablaTypeCelda.typeCeldaInfo[0][
              option[i][0].tablaTypeCelda.type.indexOf(
                parseInt(documentMasterInfoTable[t].index_celda)
              )
            ].img = documentMasterInfoTable[t].img;
            setOption(optionInfo);
          }
          if (documentMasterInfoTable[t].type_celda === "link") {
            optionInfo[i][0].tablaTypeCelda.typeCeldaInfo[0][
              option[i][0].tablaTypeCelda.type.indexOf(
                parseInt(documentMasterInfoTable[t].index_celda)
              )
            ].link = documentMasterInfoTable[t].link;
            optionInfo[i][0].tablaTypeCelda.typeCeldaInfo[0][
              option[i][0].tablaTypeCelda.type.indexOf(
                parseInt(documentMasterInfoTable[t].index_celda)
              )
            ].linkDescription = documentMasterInfoTable[t].link_description;
            setOption(optionInfo);
          }
          if (documentMasterInfoTable[t].type_celda === "fecha") {
            optionInfo[i][0].tablaTypeCelda.typeCeldaInfo[0][
              option[i][0].tablaTypeCelda.type.indexOf(
                parseInt(documentMasterInfoTable[t].index_celda)
              )
            ].titleCelda = documentMasterInfoTable[t].title_celda;
            optionInfo[i][0].tablaTypeCelda.typeCeldaInfo[0][
              option[i][0].tablaTypeCelda.type.indexOf(
                parseInt(documentMasterInfoTable[t].index_celda)
              )
            ].textDescription = documentMasterInfoTable[t].fecha;
            setOption(optionInfo);
          }
          if (documentMasterInfoTable[t].type_celda === "lista") {
            optionInfo[i][0].tablaTypeCelda.typeCeldaInfo[0][
              option[i][0].tablaTypeCelda.type.indexOf(
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
    <div>
      <Navbar />
      <div className={"form-previow-view-deli"}>
        <div className="header-container">
          <div className="header-1">
            <span className="a">
              <span className="b">Codigo:</span> {codigo}
            </span>
            <span className="a">
              <span className="b">Version:</span> Versión:{" "}
              {documentMasterHead.version}
            </span>
            {/* <span className="a">
              <span className="b">Aprovado:</span> Documento nuevo
            </span> */}
          </div>
          <div className="check-container">
            {/* <span>Lo eh leido</span>
            <input type="checkbox"></input> */}
          </div>
          <div className="imprimir">
            {/* <Print />
            <span> Imprimir</span> */}
          </div>
        </div>
        <div className="header-container2">
          <div className="header-2">
            <span className="a">
              <span className="b">Fecha de creación:</span>{" "}
              {moment(documentMasterHead.created_at).format("LLLL") ===
              "Fecha inválida"
                ? moment().format("LLLL")
                : moment(documentMasterHead.created_at).format("LLLL")}
            </span>
          </div>
        </div>
        <div className="container-aperture">
          <div className="border_top"></div>
          <div className="aperture">
            <div className="part_1">
              <div className="codigo">
                <div className="container_codigo">
                  <span>Cód. {codigo}</span>
                </div>
              </div>
              <div className="version">
                <div className="container_version">
                  <span>Versión: {documentMasterHead.version}</span>
                </div>
              </div>
              <div className="date">
                <div className="container_date">
                  <p className="span">Fecha de entrada en Vigencia: </p>
                  <span className="caducidad">
                    {moment(documentMasterHead.created_at).format("L") ===
                    "Fecha inválida"
                      ? moment().format("L")
                      : moment(documentMasterHead.created_at).format("L")}
                  </span>
                </div>
              </div>
            </div>
            <div className="part_2">
              <div className="container_format">
                <div className="container_sub_format">
                  <h5>Formato</h5>
                  <h6>{formato}</h6>
                </div>
              </div>
            </div>
            <div className="part_3">
              <div className="imagen_container">
                <img className="imagen" src={img_header} alt="logo" />
              </div>
            </div>
          </div>
          <div className="border_bottom"></div>
        </div>
        <div className="container_datos_basicos">
          <div className="container_sub_data_basics">
            <div className="header">
              <h6 className="celda_title">Datos Básicos</h6>
            </div>
            <div className="container_body">
              <div className="celda_title_text">
                <div className="header_titlee">
                  <h6 className="celda_title_inputt">{"Proceso"}</h6>
                </div>
                <div className="text_body">
                  <div className="linea3"></div>
                  <p className="procesos">{proceso} </p>
                </div>
              </div>
              <div className="celda_title_text">
                <div className="header_titlee">
                  <h6 className="celda_title_inputt">{"Sub proceso"}</h6>
                </div>
                <div className="text_body">
                  <div className="linea3"></div>
                  <p className="procesos">{subProceso} </p>
                </div>
              </div>
              {dataBasicCount.map((proceso_id) => (
                <div key={proceso_id} className="celda_title_text">
                  <div className="header_titlee">
                    <h6 className="celda_title_inputt">
                      {" "}
                      {dataBasic[proceso_id - 1][0].title.trim().length === 0
                        ? "Titulo no introducido"
                        : `${dataBasic[proceso_id - 1][0].title}:`}
                    </h6>
                  </div>{" "}
                  {dataBasic[proceso_id - 1][0].type === "Texto" && (
                    <div className="text_body">
                      <p className="text_data_basics">
                        {dataBasic[proceso_id - 1][0].info}
                      </p>
                    </div>
                  )}
                  {dataBasic[proceso_id - 1][0].type === "Link" && (
                    <div className="text_body">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`${dataBasic[proceso_id - 1][0].link}`}
                      >
                        {dataBasic[proceso_id - 1][0].info}
                      </a>
                    </div>
                  )}
                  {dataBasic[proceso_id - 1][0].type === "Fecha" && (
                    <div className="text_body">
                      <p className="text_data_date">
                        {dataBasic[proceso_id - 1][0].info}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {arrayCard.map((card_id) => (
          <div key={card_id}>
            {option[card_id][0].optionValue === "Tabla" && (
              <h6 className="titleColumn">{option[card_id][0].titleCard}</h6>
            )}
            <div className="tabla-container ">
              {option[card_id][0].optionValue === "Texto" && (
                <div className="container_text">
                  <h6 className="textt">{option[card_id][0].titleCard}</h6>
                  <div className="container_sub_text">
                    <div className="subContainer">
                      <h6 className="text">
                        {option[card_id][0].text_description_item}
                      </h6>
                    </div>
                  </div>
                </div>
              )}
              {option[card_id][0].optionValue === "Link" && (
                <div className="container_link">
                  <h6 className="textt">{option[card_id][0].titleCard}</h6>
                  <div className="container_sub_link">
                    <div className="subContainer">
                      <a
                        target="_blank"
                        className="title"
                        rel="noopener noreferrer"
                        href={option[card_id][0].link}
                      >
                        {option[card_id][0].linkDescription}
                      </a>
                    </div>
                  </div>
                </div>
              )}
              {option[card_id][0].optionValue === "Imagen" && (
                <div className="container_imagen_previous">
                  <h6 className="textt">{option[card_id][0].titleCard}</h6>
                  <div className="container_imagen_sub_previous">
                    <img
                      className="imagen"
                      src={option[card_id][0].img}
                      alt="texto descriptivo"
                    />
                  </div>
                </div>
              )}
              {option[card_id][0].optionValue === "Archivo" && (
                <div className="container_archivo">
                  <h6 className="textt">{option[card_id][0].titleCard}</h6>
                  <div className="container_sub_archivo">
                    <div className="subContainer">
                      <div className="download_file_container">
                        <span> Descargar archivo</span>
                        <GetApp
                          className="icon"
                          onClick={(e) =>
                            downloadFile(
                              e,
                              option[card_id][0].titleCard,
                              option[card_id][0].archivo
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {option[card_id][0].optionValue === "Fecha" && (
                <div className="container_text">
                  <h6 className="textt">{option[card_id][0].titleCard}</h6>
                  <div className="container_sub_text">
                    <div className="subContainer">
                      <h6 className="text">{option[card_id][0].date}</h6>
                    </div>
                  </div>
                </div>
              )}
              {option[card_id][0].optionValue === "Tabla" && (
                <div className="tabla-subContainer animate__animated animate__fadeIn">
                  {option[card_id][0].tabla.row.map((id_column) => (
                    <div
                      className={
                        "row " +
                        (option[card_id][0].tabla.row.length === 1
                          ? "active"
                          : "")
                      }
                      key={id_column}
                    >
                      {option[card_id][0].tabla.column.map((id_row) => (
                        <div className="column" key={id_row}>
                          <div
                            className={
                              "columns " + (id_column === 1 && "active")
                            }
                          ></div>
                          {id_column === 1 && (
                            <>
                              <div className="header_title">
                                <h6 className={"celda_title_input"}>
                                  {
                                    option[card_id][0].tablaTypeCelda
                                      .title_columna[
                                      option[
                                        card_id
                                      ][0].tablaTypeCelda.type.indexOf(
                                        parseInt(`${id_column}${id_row}`)
                                      )
                                    ]
                                  }
                                </h6>
                              </div>
                              <div className="linea"></div>
                            </>
                          )}
                          {option[card_id][0].tablaTypeCelda.celda[
                            option[card_id][0].tablaTypeCelda.type.indexOf(
                              parseInt(`${id_column}${id_row}`)
                            )
                          ] === "Título" && (
                            <div className="celda_title">
                              <div className="header_title">
                                <h6 className={"celda_title_inputt"}>
                                  {
                                    option[card_id][0].tablaTypeCelda
                                      .typeCeldaInfo[0][
                                      option[
                                        card_id
                                      ][0].tablaTypeCelda.type.indexOf(
                                        parseInt(`${id_column}${id_row}`)
                                      )
                                    ].titleCelda
                                  }
                                </h6>
                              </div>
                              <div className="linea"></div>
                            </div>
                          )}
                          {option[card_id][0].tablaTypeCelda.celda[
                            option[card_id][0].tablaTypeCelda.type.indexOf(
                              parseInt(`${id_column}${id_row}`)
                            )
                          ] === "Título texto" && (
                            <div className="celda_title_text">
                              <div className="header_titlee">
                                <h6 className="celda_title_inputt">
                                  {
                                    option[card_id][0].tablaTypeCelda
                                      .typeCeldaInfo[0][
                                      option[
                                        card_id
                                      ][0].tablaTypeCelda.type.indexOf(
                                        parseInt(`${id_column}${id_row}`)
                                      )
                                    ].titleCelda
                                  }
                                </h6>
                              </div>
                              <div className="text_body">
                                <div className="linea"></div>
                                <p>
                                  {
                                    option[card_id][0].tablaTypeCelda
                                      .typeCeldaInfo[0][
                                      option[
                                        card_id
                                      ][0].tablaTypeCelda.type.indexOf(
                                        parseInt(`${id_column}${id_row}`)
                                      )
                                    ].textDescription
                                  }
                                </p>
                              </div>
                            </div>
                          )}
                          {option[card_id][0].tablaTypeCelda.celda[
                            option[card_id][0].tablaTypeCelda.type.indexOf(
                              parseInt(`${id_column}${id_row}`)
                            )
                          ] === "Fecha" && (
                            <div className="celda_title_text">
                              <div className="header_titlee">
                                <h6 className="celda_title_inputt">
                                  {
                                    option[card_id][0].tablaTypeCelda
                                      .typeCeldaInfo[0][
                                      option[
                                        card_id
                                      ][0].tablaTypeCelda.type.indexOf(
                                        parseInt(`${id_column}${id_row}`)
                                      )
                                    ].titleCelda
                                  }
                                </h6>
                              </div>
                              <div className="text_body">
                                <div className="linea"></div>
                                <p>
                                  {
                                    option[card_id][0].tablaTypeCelda
                                      .typeCeldaInfo[0][
                                      option[
                                        card_id
                                      ][0].tablaTypeCelda.type.indexOf(
                                        parseInt(`${id_column}${id_row}`)
                                      )
                                    ].textDescription
                                  }
                                </p>
                              </div>
                            </div>
                          )}
                          {option[card_id][0].tablaTypeCelda.celda[
                            option[card_id][0].tablaTypeCelda.type.indexOf(
                              parseInt(`${id_column}${id_row}`)
                            )
                          ] === "Imagen" && (
                            <div className="imagen_container">
                              {option[card_id][0].tablaTypeCelda
                                .typeCeldaInfo[0][
                                option[card_id][0].tablaTypeCelda.type.indexOf(
                                  parseInt(`${id_column}${id_row}`)
                                )
                              ].img !== null && (
                                <img
                                  className="imagen"
                                  src={
                                    option[card_id][0].tablaTypeCelda
                                      .typeCeldaInfo[0][
                                      option[
                                        card_id
                                      ][0].tablaTypeCelda.type.indexOf(
                                        parseInt(`${id_column}${id_row}`)
                                      )
                                    ].img
                                  }
                                  alt="texto descriptivo"
                                />
                              )}
                            </div>
                          )}
                          {option[card_id][0].tablaTypeCelda.celda[
                            option[card_id][0].tablaTypeCelda.type.indexOf(
                              parseInt(`${id_column}${id_row}`)
                            )
                          ] === "Imagen título" && (
                            <div className="imagen_title">
                              <div className="header_titleee">
                                <h6 className="celda_title_inputtt">
                                  {
                                    option[card_id][0].tablaTypeCelda
                                      .typeCeldaInfo[0][
                                      option[
                                        card_id
                                      ][0].tablaTypeCelda.type.indexOf(
                                        parseInt(`${id_column}${id_row}`)
                                      )
                                    ].titleCelda
                                  }
                                </h6>
                              </div>
                              <div className="imagen_container">
                                {option[card_id][0].tablaTypeCelda
                                  .typeCeldaInfo[0][
                                  option[
                                    card_id
                                  ][0].tablaTypeCelda.type.indexOf(
                                    parseInt(`${id_column}${id_row}`)
                                  )
                                ].img !== null && (
                                  <img
                                    className="imagen"
                                    src={
                                      option[card_id][0].tablaTypeCelda
                                        .typeCeldaInfo[0][
                                        option[
                                          card_id
                                        ][0].tablaTypeCelda.type.indexOf(
                                          parseInt(`${id_column}${id_row}`)
                                        )
                                      ].img
                                    }
                                    alt="texto descriptivo"
                                  />
                                )}
                              </div>
                            </div>
                          )}
                          {option[card_id][0].tablaTypeCelda.celda[
                            option[card_id][0].tablaTypeCelda.type.indexOf(
                              parseInt(`${id_column}${id_row}`)
                            )
                          ] === "Lista" && (
                            <div className="list">
                              <ul>
                                {option[card_id][0].tablaTypeCelda.lista[
                                  option[
                                    card_id
                                  ][0].tablaTypeCelda.type.indexOf(
                                    parseInt(`${id_column}${id_row}`)
                                  )
                                ].map((listCelda) => (
                                  <div
                                    key={listCelda}
                                    className="container_list"
                                  >
                                    <li>
                                      <p>
                                        {" "}
                                        {
                                          option[card_id][0].tablaTypeCelda
                                            .typeCeldaInfo[0][
                                            option[
                                              card_id
                                            ][0].tablaTypeCelda.type.indexOf(
                                              parseInt(`${id_column}${id_row}`)
                                            )
                                          ].lista[listCelda]
                                        }
                                      </p>
                                    </li>
                                  </div>
                                ))}
                              </ul>
                            </div>
                          )}
                          {option[card_id][0].tablaTypeCelda.celda[
                            option[card_id][0].tablaTypeCelda.type.indexOf(
                              parseInt(`${id_column}${id_row}`)
                            )
                          ] === "Link" && (
                            <div className="link">
                              <div className="celda_container_link"></div>
                              <div className="link_body">
                                <div className="linea"></div>
                                <a
                                  target="_blank"
                                  className="title"
                                  rel="noopener noreferrer"
                                  href={
                                    option[card_id][0].tablaTypeCelda
                                      .typeCeldaInfo[0][
                                      option[
                                        card_id
                                      ][0].tablaTypeCelda.type.indexOf(
                                        parseInt(`${id_column}${id_row}`)
                                      )
                                    ].link
                                  }
                                >
                                  {
                                    option[card_id][0].tablaTypeCelda
                                      .typeCeldaInfo[0][
                                      option[
                                        card_id
                                      ][0].tablaTypeCelda.type.indexOf(
                                        parseInt(`${id_column}${id_row}`)
                                      )
                                    ].linkDescription
                                  }
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
