import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Print } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useForm } from "../../hooks/useForm";
// import { useHistory } from "react-router";
// import { DocumentSearch } from '../../redux/actions/documentMasterAction';
import { Navbar } from "../navbar/Navbar";
import { ViewDocumentMaster } from "../../redux/actions/formDocumentMasterAction";
// import { InputText } from "../mainInput/InputText";
import {
  typeCelda,
  infoCelda,
  listArray,
  titleColumns,
  indexTypeCelda,
} from "../../helpers/typeCelda";
export const DocumentMasterView = () => {
  //Manejo de que tipo es cada celda
  const [tableColumnsTypeValue, handletableColumnsTypeValueChange] =
    useForm(typeCelda);
  //Inicial state nuevo documento
  const celdass = Object.values(tableColumnsTypeValue);
  const inicialStateOption = [
    [
      {
        card: 0,
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
          celda: ["0", ...celdass],
          type: indexTypeCelda,
          lista: listArray,
          celdaType: JSON.stringify(["0", ...celdass]),
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
  const [template, setTemplate] = useState("");
  const [description, setDescription] = useState("");
  //Manejo de que tipo de informacion quiere insertar el usuario en las tarjetas
  const [option, setOption] = useState(inicialStateOption);
  //Manejo de las tarjetas
  const [arrayCard, setArrayCard] = useState([1]);
  //Control de la ultima tarjeta que se creo
  const [ultime, setUltime] = useState(1);
  //Manejo de las datas de cada tarjetas
  const [dataBasic, setDataBasic] = useState(initialStateDataBasic);
  //Manejo del id de cada tarjeta del proceso
  const [dataBasicCount, setDataBasicCount] = useState([]);
  //Manejo de la ultima tarjeta que se hizo
  const [dataBasicUlti, setDataBasicUlti] = useState(1);
  const { uuid } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ViewDocumentMaster(uuid));
  }, [dispatch, uuid]);
  let documentMaster = useSelector(
    (state) => state.documentMaster.documentMaster
  );
  const documentMasterHead = documentMaster.DocumentMasterHead;
  //Renderizado de los datos basicos de la aplicacion
  useEffect(() => {
    let arrayNumber = [];
    let array = [
      [
        {
          id: 1,
          type:
            documentMaster.DocumentMasterHead.process_type.trim().length === 0
              ? "Texto"
              : documentMaster.DocumentMasterHead.process_type,
          title: "Proceso",
          description: documentMaster.DocumentMasterHead.process_description,
        },
      ],
    ];
    if (documentMaster.DocumentMasterHead.data_basic_title1) {
      array.push([
        {
          id: 2,
          type: documentMaster.DocumentMasterHead.data_basic_type1,
          title: documentMaster.DocumentMasterHead.data_basic_title1,
          description:
            documentMaster.DocumentMasterHead.data_basic_description1,
        },
      ]);
      arrayNumber.push(2);
    }
    if (documentMaster.DocumentMasterHead.data_basic_title2) {
      array.push([
        {
          id: 3,
          type: documentMaster.DocumentMasterHead.data_basic_type2,
          title: documentMaster.DocumentMasterHead.data_basic_title2,
          description:
            documentMaster.DocumentMasterHead.data_basic_description2,
        },
      ]);
      arrayNumber.push(3);
    }
    if (documentMaster.DocumentMasterHead.data_basic_title3) {
      array.push([
        {
          id: 4,
          type: documentMaster.DocumentMasterHead.data_basic_type3,
          title: documentMaster.DocumentMasterHead.data_basic_title3,
          description:
            documentMaster.DocumentMasterHead.data_basic_description3,
        },
      ]);
      arrayNumber.push(4);
    }
    setDataBasicCount(arrayNumber);
    setDataBasic([...array]);
    setDataBasicUlti(arrayNumber.length + 1);
  }, [
    documentMaster.DocumentMasterHead.process_type,
    documentMaster.DocumentMasterHead.process_description,
    documentMaster.DocumentMasterHead.data_basic_title1,
    documentMaster.DocumentMasterHead.data_basic_type1,
    documentMaster.DocumentMasterHead.data_basic_description1,
    documentMaster.DocumentMasterHead.data_basic_type2,
    documentMaster.DocumentMasterHead.data_basic_title2,
    documentMaster.DocumentMasterHead.data_basic_description2,
    documentMaster.DocumentMasterHead.data_basic_type3,
    documentMaster.DocumentMasterHead.data_basic_title3,
    documentMaster.DocumentMasterHead.data_basic_description3,
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
        },
      ],
    ];
    if (documentMaster.res) {
      //Renderiazado de los datos de la cabeza del formulario
      setCodigo(documentMaster.DocumentMasterHead.code);
      setFormato(documentMaster.DocumentMasterHead.format);
      setTemplate(documentMaster.DocumentMasterHead.template);
      setDescription(documentMaster.DocumentMasterHead.description);
      documentMaster.DocumentMasterBody.map(function (DocumentMasterBody) {
        return arrayOptioValue.push([
          {
            card: DocumentMasterBody.number_card,
            link:
              DocumentMasterBody.link === null ? "" : DocumentMasterBody.link,
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
                  : titleColumns,
              celda:
                DocumentMasterBody.type_celda !== null
                  ? JSON.parse(DocumentMasterBody.type_celda)
                  : ["0", ...celdass],
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
                  : JSON.stringify(["0", ...celdass]),
              typeCeldaInfo: [infoCelda],
            },
          },
        ]);
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
  //Vigilar el estado de los inputs de text
  const handleOnChangeTitleCard = (e, id) => {
    let optionInfo = [...option];
    optionInfo[id][0].titleCard = e.target.value;
    setOption(optionInfo);
  };
  const handleOnChangeText = (e, id) => {
    let optionInfo = [...option];
    optionInfo[id][0].text = e.target.value;
    setOption(optionInfo);
  };
  //Vigilar el estado del input del link
  const handleDescripcionLinkChange = (e, id) => {
    let optionInfo = [...option];
    optionInfo[id][0].linkDescription = e.target.value;
    setOption(optionInfo);
  };
  const handleOnchangeLink = (e, id) => {
    let optionInfo = [...option];
    optionInfo[id][0].link = e.target.value;
    setOption(optionInfo);
  };
  const handleDescripcionArchivoChange = (e, id) => {
    let optionInfo = [...option];
    optionInfo[id][0].descripcionArchivo = e.target.value;
    setOption(optionInfo);
  };
  const handleOnchangeArchivo = (e, id) => {
    let optionInfo = [...option];
    optionInfo[id][0].archivo = e.target.value;
    setOption(optionInfo);
  };
  //Vigila que titulo de cada columna
  const handletitleColumns = (e, id, parametro_opcional) => {
    let optionInfo = [...option];
    optionInfo[id][0].tablaTypeCelda.title_columna[
      option[id][0].tablaTypeCelda.type.indexOf(parseInt(parametro_opcional))
    ] = e.target.value;
    setOption(optionInfo);
  };
  const handletitleCelda = (e, id, parametro_opcional) => {
    let optionInfo = [...option];
    optionInfo[id][0].tablaTypeCelda.typeCeldaInfo[0][
      option[id][0].tablaTypeCelda.type.indexOf(parseInt(parametro_opcional))
    ].titleCelda = e.target.value;
    setOption(optionInfo);
  };
  const handletextCelda = (e, id, parametro_opcional) => {
    let optionInfo = [...option];
    optionInfo[id][0].tablaTypeCelda.typeCeldaInfo[0][
      option[id][0].tablaTypeCelda.type.indexOf(parseInt(parametro_opcional))
    ].textDescription = e.target.value;
    setOption(optionInfo);
  };
  const handleLink = (e, id, parametro_opcional) => {
    let optionInfo = [...option];
    optionInfo[id][0].tablaTypeCelda.typeCeldaInfo[0][
      option[id][0].tablaTypeCelda.type.indexOf(parseInt(parametro_opcional))
    ].link = e.target.value;
    setOption(optionInfo);
  };
  const handleLinkDescription = (e, id, parametro_opcional) => {
    let optionInfo = [...option];
    optionInfo[id][0].tablaTypeCelda.typeCeldaInfo[0][
      option[id][0].tablaTypeCelda.type.indexOf(parseInt(parametro_opcional))
    ].linkDescription = e.target.value;
    setOption(optionInfo);
  };
  return (
    <div>
      <Navbar />
      <div className={"form-previow-deli"}>
        <div className="header-container">
          <div className="header-1">
            <span className="a">
              <span className="b">Codigo:</span> {codigo}
            </span>
            <span className="a">
              <span className="b">Version:</span> Versión:{" "}
              {documentMasterHead.version}
            </span>
            <span className="a">
              <span className="b">Aprovado:</span> Documento nuevo
            </span>
          </div>
          <div className="check-container">
            <span>Lo eh leido</span>
            <input type="checkbox"></input>
          </div>
          <div className="imprimir">
            <Print />
            <span> Imprimir</span>
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
                      ? moment().format("LLLL")
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
                <img
                  className="imagen"
                  src="/logo/ds-digital-solutions-logo.png"
                  alt="logo"
                />
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
                  {documentMasterHead.process_type === "Texto" ? (
                    <>
                      <div className="linea1"></div>
                      <p>{documentMasterHead.process_description} </p>
                    </>
                  ) : (
                    <>
                      <div className="linea2"></div>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`${documentMasterHead.process_description}`}
                      >
                        {documentMasterHead.process_description}{" "}
                      </a>
                    </>
                  )}
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
                  {dataBasic[proceso_id - 1][0].description.length === 0 ? (
                    ""
                  ) : (
                    <div className="text_body">
                      {dataBasic[proceso_id - 1][0].type === "Texto" ? (
                        <>
                          <div className="linea1"></div>
                          <p>{dataBasic[proceso_id - 1][0].description}</p>
                        </>
                      ) : (
                        <>
                          <div className="linea2"></div>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`${dataBasic[proceso_id - 1][0].description}`}
                          >
                            {dataBasic[proceso_id - 1][0].description}
                          </a>
                        </>
                      )}
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
              <>
                <input
                  type="text"
                  state={option}
                  className={"titleColumn"}
                  name={`text${card_id}`}
                  onChange={(e) => handleOnChangeTitleCard(e, card_id)}
                  placeholder={"Ingresa el titulo de la columna aqui"}
                  defaultValue={option[card_id][0].titleCard}
                ></input>
              </>
            )}
            <div className="tabla-container ">
              {option[card_id][0].optionValue === "Tabla" && (
                <div className="tabla-subContainer animate__animated animate__fadeIn">
                  {option[card_id][0].tabla.row.map((id_column) => (
                    <div className="row" key={id_column}>
                      {option[card_id][0].tabla.column.map((id_row) => (
                        <div className="column" key={id_row}>
                          <div
                            className={
                              "columns " +
                              (option[card_id][0].tablaTypeCelda.celda[
                                option[card_id][0].tablaTypeCelda.type.indexOf(
                                  parseInt(`${id_column}${id_row}`)
                                )
                              ] === "Título" && "active")
                            }
                          ></div>
                          {id_column === 1 && (
                            <>
                              <div className="header_title">
                                <input
                                  type="text"
                                  className={"celda_title_input"}
                                  name={parseInt(`${id_row}${id_column}`)}
                                  onChange={(e) =>
                                    handletitleColumns(
                                      e,
                                      card_id,
                                      `${id_column}${id_row}`
                                    )
                                  }
                                  placeholder={"*Titulo de columna"}
                                  // defaultValue={
                                  //   option[card_id][0].tablaTypeCelda
                                  //     .title_columna[
                                  //     option[
                                  //       card_id
                                  //     ][0].tablaTypeCelda.type.indexOf(
                                  //       parseInt(`${id_row}${id_column}`)
                                  //     )
                                  //   ] === "No"
                                  //     ? ""
                                  //     : option[card_id][0].tablaTypeCelda
                                  //         .title_columna[
                                  //         option[
                                  //           card_id
                                  //         ][0].tablaTypeCelda.type.indexOf(
                                  //           parseInt(`${id_row}${id_column}`)
                                  //         )
                                  //       ]
                                  // }
                                ></input>
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
                                {/* <h6 className={"celda_title_inputt"}> */}
                                <input
                                  type="text"
                                  className={"celda_title_inputt"}
                                  name={parseInt(`${id_row}${id_column}`)}
                                  onChange={(e) =>
                                    handletitleCelda(
                                      e,
                                      card_id,
                                      `${id_column}${id_row}`
                                    )
                                  }
                                  placeholder={"*Titulo de la celda"}
                                  // defaultValue={
                                  //   option[card_id][0].tablaTypeCelda
                                  //     .title_columna[
                                  //     option[
                                  //       card_id
                                  //     ][0].tablaTypeCelda.type.indexOf(
                                  //       parseInt(`${id_row}${id_column}`)
                                  //     )
                                  //   ] === "No"
                                  //     ? ""
                                  //     : option[card_id][0].tablaTypeCelda
                                  //         .title_columna[
                                  //         option[
                                  //           card_id
                                  //         ][0].tablaTypeCelda.type.indexOf(
                                  //           parseInt(`${id_row}${id_column}`)
                                  //         )
                                  //       ]
                                  // }
                                ></input>
                                {/* </h6> */}
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
                                <input
                                  type="text"
                                  className={"celda_title_inputt"}
                                  name={parseInt(`${id_row}${id_column}`)}
                                  onChange={(e) =>
                                    handletitleCelda(
                                      e,
                                      card_id,
                                      `${id_column}${id_row}`
                                    )
                                  }
                                  placeholder={"*Titulo de la celda"}
                                  // defaultValue={
                                  //   option[card_id][0].tablaTypeCelda
                                  //     .title_columna[
                                  //     option[
                                  //       card_id
                                  //     ][0].tablaTypeCelda.type.indexOf(
                                  //       parseInt(`${id_row}${id_column}`)
                                  //     )
                                  //   ] === "No"
                                  //     ? ""
                                  //     : option[card_id][0].tablaTypeCelda
                                  //         .title_columna[
                                  //         option[
                                  //           card_id
                                  //         ][0].tablaTypeCelda.type.indexOf(
                                  //           parseInt(`${id_row}${id_column}`)
                                  //         )
                                  //       ]
                                  // }
                                ></input>
                              </div>
                              <div className="text_body">
                                <div className="linea"></div>
                                <textarea
                                  className={"textarea"}
                                  name={parseInt(`${id_row}${id_column}`)}
                                  onChange={(e) =>
                                    handletextCelda(
                                      e,
                                      card_id,
                                      `${id_column}${id_row}`
                                    )
                                  }
                                  placeholder={"Descripcion"}
                                  // defaultValue={
                                  //   option[card_id][0].tablaTypeCelda
                                  //     .title_columna[
                                  //     option[
                                  //       card_id
                                  //     ][0].tablaTypeCelda.type.indexOf(
                                  //       parseInt(`${id_row}${id_column}`)
                                  //     )
                                  //   ] === "No"
                                  //     ? ""
                                  //     : option[card_id][0].tablaTypeCelda
                                  //         .title_columna[
                                  //         option[
                                  //           card_id
                                  //         ][0].tablaTypeCelda.type.indexOf(
                                  //           parseInt(`${id_row}${id_column}`)
                                  //         )
                                  //       ]
                                  // }
                                  rows={"7"}
                                  cols={"30"}
                                ></textarea>
                              </div>
                            </div>
                          )}
                          {option[card_id][0].tablaTypeCelda.celda[
                            option[card_id][0].tablaTypeCelda.type.indexOf(
                              parseInt(`${id_column}${id_row}`)
                            )
                          ] === "Imagen" && (
                            <div className="imagen_container">
                              <img
                                className="imagen"
                                src="https://intersindicalaragon.org/wp-content/uploads/icono-facebook.png"
                                alt="texto descriptivo"
                              />
                            </div>
                          )}
                          {option[card_id][0].tablaTypeCelda.celda[
                            option[card_id][0].tablaTypeCelda.type.indexOf(
                              parseInt(`${id_column}${id_row}`)
                            )
                          ] === "Imagen título" && (
                            <div className="imagen_title">
                              <div className="header_titleee">
                                <input
                                  type="text"
                                  className={"celda_title_inputtt"}
                                  name={parseInt(`${id_row}${id_column}`)}
                                  onChange={(e) =>
                                    handletitleCelda(
                                      e,
                                      card_id,
                                      `${id_column}${id_row}`
                                    )
                                  }
                                  placeholder={"*Titulo de la imagen"}
                                  // defaultValue={
                                  //   option[card_id][0].tablaTypeCelda
                                  //     .title_columna[
                                  //     option[
                                  //       card_id
                                  //     ][0].tablaTypeCelda.type.indexOf(
                                  //       parseInt(`${id_row}${id_column}`)
                                  //     )
                                  //   ] === "No"
                                  //     ? ""
                                  //     : option[card_id][0].tablaTypeCelda
                                  //         .title_columna[
                                  //         option[
                                  //           card_id
                                  //         ][0].tablaTypeCelda.type.indexOf(
                                  //           parseInt(`${id_row}${id_column}`)
                                  //         )
                                  //       ]
                                  // }
                                ></input>
                              </div>
                              <div className="imagen_container">
                                <img
                                  className="imagen"
                                  src="https://intersindicalaragon.org/wp-content/uploads/icono-facebook.png"
                                  alt="texto descriptivo"
                                />
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
                                      <input
                                        type="text"
                                        state={option}
                                        className={"celda_title_input"}
                                        name={`text${card_id}`}
                                        onChange={(e) =>
                                          handleOnChangeTitleCard(e, card_id)
                                        }
                                        placeholder={
                                          "Ingresa información aquí(Obligatorio)"
                                        }
                                        // defaultValue={
                                        //   option[card_id][0].titleCard
                                        // }
                                      ></input>
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
                              <div className="celda_container_link">
                                <input
                                  type="text"
                                  className={"celda_title_inputt"}
                                  name={parseInt(`${id_row}${id_column}`)}
                                  onChange={(e) =>
                                    handleLink(
                                      e,
                                      card_id,
                                      `${id_column}${id_row}`
                                    )
                                  }
                                  placeholder={"Titulo de la celda"}
                                  // defaultValue={
                                  //   option[card_id][0].tablaTypeCelda
                                  //     .title_columna[
                                  //     option[
                                  //       card_id
                                  //     ][0].tablaTypeCelda.type.indexOf(
                                  //       parseInt(`${id_row}${id_column}`)
                                  //     )
                                  //   ] === "No"
                                  //     ? ""
                                  //     : option[card_id][0].tablaTypeCelda
                                  //         .title_columna[
                                  //         option[
                                  //           card_id
                                  //         ][0].tablaTypeCelda.type.indexOf(
                                  //           parseInt(`${id_row}${id_column}`)
                                  //         )
                                  //       ]
                                  // }
                                  // className={"InputLink"}
                                  // name={`archivo${card_id}`}
                                  // type="url"
                                  // defaultValue={option[card_id][0].archivo}
                                  // //   onChange={(e) =>
                                  // //     handleOnchangeArchivo(e, card_id)
                                  // //   }
                                  // placeholder={"Agrega tu enlace aqui"}
                                ></input>
                                <input
                                  type="text"
                                  className={"celda_title_inputt"}
                                  name={parseInt(`${id_row}${id_column}`)}
                                  onChange={(e) =>
                                    handleLinkDescription(
                                      e,
                                      card_id,
                                      `${id_column}${id_row}`
                                    )
                                  }
                                  placeholder={"Titulo de la celda"}
                                  // defaultValue={
                                  //   option[card_id][0].tablaTypeCelda
                                  //     .title_columna[
                                  //     option[
                                  //       card_id
                                  //     ][0].tablaTypeCelda.type.indexOf(
                                  //       parseInt(`${id_column}${id_row}`)
                                  //     )
                                  //   ] === "No"
                                  //     ? ""
                                  //     : option[card_id][0].tablaTypeCelda
                                  //         .title_columna[
                                  //         option[
                                  //           card_id
                                  //         ][0].tablaTypeCelda.type.indexOf(
                                  //           parseInt(`${id_row}${id_column}`)
                                  //         )
                                  //       ]
                                  // }
                                  // className={"InputLink"}
                                  // name={`archivo${card_id}`}
                                  // type="url"
                                  // defaultValue={option[card_id][0].archivo}
                                  // //   onChange={(e) =>
                                  // //     handleOnchangeArchivo(e, card_id)
                                  // //   }
                                  // placeholder={"Agrega tu enlace aqui"}
                                ></input>
                                {/* <input
                                  type="text"
                                  state={option}
                                  className={"celda_title_input"}
                                  name={`text${card_id}`}
                                  onChange={(e) =>
                                    handleOnChangeTitleCard(e, card_id)
                                  }
                                  placeholder={
                                    "Ingresa información aquí(Obligatorio)"
                                  }
                                  defaultValue={option[card_id][0].titleCard}
                                ></input> */}
                                {/* <h6 className="celda_title_input">
                                  Título del link:
                                </h6> */}
                              </div>
                              <div className="link_body">
                                <div className="linea"></div>
                                {/* <input
                                  className={"InputLink"}
                                  name={`archivo${card_id}`}
                                  type="url"
                                  defaultValue={option[card_id][0].archivo}
                                  //   onChange={(e) =>
                                  //     handleOnchangeArchivo(e, card_id)
                                  //   }
                                  placeholder={"Agrega tu enlace aqui"}
                                ></input>
                                <input
                                  name={`text${card_id}`}
                                  className={"input-title-img"}
                                  placeholder={"Descripción del link"}
                                  defaultValue={
                                    option[card_id][0].descripcionArchivo
                                  }
                                  //   onChange={(e) =>
                                  //     handleDescripcionArchivoChange(e, card_id)
                                  //   }
                                ></input> */}
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
              {option[card_id][0].optionValue === "Texto" && (
                <div className="container_text">
                  <input
                    type="text"
                    state={option}
                    className={"textt"}
                    name={`text${card_id}`}
                    onChange={(e) => handleOnChangeTitleCard(e, card_id)}
                    placeholder={"*Ingresa el titulo del texto aqui"}
                    defaultValue={option[card_id][0].titleCard}
                  ></input>
                  {/* <h6 className="textt">Titulo del texto no introducido</h6> */}
                  <div className="container_sub_text">
                    <div className="subContainer">
                      <textarea
                        rows={"3"}
                        cols={"30"}
                        className={"text"}
                        name={`textarea${card_id}`}
                        placeholder={"Escribe el texto"}
                        defaultValue={option[card_id][0].text}
                        onChange={(e) => handleOnChangeText(e, card_id)}
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}
              {option[card_id][0].optionValue === "Link" && (
                <div className="container_link">
                  <input
                    type="text"
                    state={option}
                    className={"textt"}
                    name={`text${card_id}`}
                    onChange={(e) => handleOnChangeTitleCard(e, card_id)}
                    placeholder={"*Ingrese el titulo del link aqui"}
                    defaultValue={option[card_id][0].titleCard}
                  ></input>
                  <div className="container_sub_link">
                    <input
                      type="url"
                      className={"InputLink"}
                      name={`link${card_id}`}
                      defaultValue={option[card_id][0].link}
                      onChange={(e) => handleOnchangeLink(e, card_id)}
                      placeholder={"Agrega tu enlace aqui"}
                    ></input>
                    <input
                      name={`text${card_id}`}
                      className={"input-title-img"}
                      placeholder={"Descripción del enlace"}
                      defaultValue={option[card_id][0].linkDescription}
                      onChange={(e) => handleDescripcionLinkChange(e, card_id)}
                    ></input>
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
                  {option[card_id][0].titleCard.trim().length === 0 ? (
                    <h6 className="textt">Titulo del imagen no introducido</h6>
                  ) : (
                    <h6 className="textt">{option[card_id][0].titleCard}</h6>
                  )}
                  <div className="container_imagen_sub_previous">
                    <img
                      className="imagen"
                      src="https://intersindicalaragon.org/wp-content/uploads/icono-facebook.png"
                      alt="texto descriptivo"
                    />
                  </div>
                </div>
              )}
              {option[card_id][0].optionValue === "Archivo" && (
                <div className="container_archivo">
                  <input
                    type="text"
                    state={option}
                    className={"textt"}
                    name={`text${card_id}`}
                    onChange={(e) => handleOnChangeTitleCard(e, card_id)}
                    placeholder={"*Ingrese el titulo del archivo aqui"}
                    defaultValue={option[card_id][0].titleCard}
                  ></input>
                  <div className="container_sub_archivo">
                    <input
                      className={"InputLink"}
                      name={`archivo${card_id}`}
                      type="url"
                      defaultValue={option[card_id][0].archivo}
                      onChange={(e) => handleOnchangeArchivo(e, card_id)}
                      placeholder={"Agrega tu enlace aqui"}
                    ></input>
                    <input
                      name={`text${card_id}`}
                      className={"input-title-img"}
                      placeholder={"Descripción del archivo"}
                      defaultValue={option[card_id][0].descripcionArchivo}
                      onChange={(e) =>
                        handleDescripcionArchivoChange(e, card_id)
                      }
                    ></input>
                    <div className="subContainer">
                      <a
                        target="_blank"
                        className="title"
                        rel="noopener noreferrer"
                        href={option[card_id][0].archivo}
                      >
                        {option[card_id][0].descripcionArchivo}
                      </a>
                    </div>
                  </div>
                </div>
              )}
              {option[card_id][0].optionValue === "Lista" && (
                <div>
                  <h1>{`lista${card_id}`}</h1>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
