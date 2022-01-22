import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Print } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
// import { useHistory } from "react-router";
import { DocumentMasterInfoNew } from "../../redux/actions/documentMasterAction";
import { Navbar } from "../navbar/Navbar";
import { ViewDocumentMaster } from "../../redux/actions/formDocumentMasterAction";
// import { InputText } from "../mainInput/InputText";
import {
  infoCelda,
  listArray,
  titleColumns,
  indexTypeCelda,
} from "../../helpers/typeCelda";
export const DocumentMasterView = () => {
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
        archivo_extesion: "",
        heigth: { state: true },
        img: "",
        img_extesion: "",
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
        img_extesion: "",
        descripcionArchivo: "",
        archivo: "",
        archivo_extesion: "",
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
  //Manejo de que tipo de informacion quiere insertar el usuario en las tarjetas
  const [option, setOption] = useState(inicialStateOption);
  //Manejo de las tarjetas
  const [arrayCard, setArrayCard] = useState([1]);
  //Manejo de los datos basicos del documento de cada tarjetas
  const [dataBasic, setDataBasic] = useState(initialStateDataBasic);
  //Manejo del id de cada tarjeta del proceso
  const [dataBasicCount, setDataBasicCount] = useState([]);
  //Manejo de la ultima tarjeta que se hizo
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
    let array = [
      [
        {
          id: 1,
          type:
            documentMasterHead.process_type.trim().length === 0
              ? "Texto"
              : documentMasterHead.process_type,
          title: "Proceso",
          description: documentMasterHead.process_description,
          descriptionLink:
            documentMasterHead.process_link === null
              ? ""
              : documentMasterHead.process_link,
        },
      ],
    ];
    if (documentMasterHead.data_basic === null) {
    } else {
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
      //Renderiazado de los datos del las targetas del documento
      documentMaster.DocumentMasterBody.map(function (DocumentMasterBody) {
        return arrayOptioValue.push([
          {
            card_id: DocumentMasterBody.id,
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
              typeCeldaInfo: [JSON.parse(DocumentMasterBody.card_info_table)],
            },
          },
        ]);
      });
      setOption(arrayOptioValue);
      let newArray = JSON.parse(documentMaster.DocumentMasterHead.position);
      setArrayCard(newArray);
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
  //Vigilar los estados de los input de descripcion del texto
  const handleOnChangeText = (e, id) => {
    let optionInfo = [...option];
    optionInfo[id][0].text = e.target.value;
    setOption(optionInfo);
  };
  //Vigilar el estado del input del link descripcion
  const handleDescripcionLinkChange = (e, id) => {
    let optionInfo = [...option];
    optionInfo[id][0].linkDescription = e.target.value;
    setOption(optionInfo);
  };
  //Vigilar el estado del input link
  const handleOnchangeLink = (e, id) => {
    let optionInfo = [...option];
    optionInfo[id][0].link = e.target.value;
    setOption(optionInfo);
  };
  //Convertir imagen a base 64
  const converterFileBase64 = (e, id) => {
    let optionInfo = [...option];
    //EXTENSIONES PERMITIDAS DE LA IMAGEN,
    var extensiones_permitidas = [".png", ".jpg", ".jpeg"];
    Array.from(e.target.files).forEach((archive) => {
      var ultimo_punto = archive.name.lastIndexOf(".");
      var extension = archive.name.slice(ultimo_punto, archive.name.length);
      if (extensiones_permitidas.indexOf(extension) === -1) {
        alert("Extensión de imagen no valida");
        return;
      };
      //Validar tamaño de la imagen en MB
      var tamano = 5;
      if (archive.size / 1048576 > tamano) {
        alert("El archivo no puede superar los " + tamano + "MB");
        return;
      };
      //Convertir imagen a base 64
      let reader = new FileReader();
      reader.readAsDataURL(archive);
      reader.onload = function () {
        let base64 = reader.result;
        optionInfo[id][0].img = base64;
        optionInfo[id][0].img_extesion = extensiones_permitidas[extensiones_permitidas.indexOf(extension)];
        setOption(optionInfo);
      };
    });
  };
  //Convertir archivo a base 64
  const converterFileBase64Archive = (e, id) => {
    let optionInfo = [...option];
    //EXTENSIONES PERMITIDAS,
    var extensiones_permitidas = [".xlsx", ".pdf", ".docx", ".pptx"];
    Array.from(e.target.files).forEach((archive) => {
      var ultimo_punto = archive.name.lastIndexOf(".");
      var extension = archive.name.slice(ultimo_punto, archive.name.length);
      if (extensiones_permitidas.indexOf(extension) === -1) {
        alert("Extensión de archivo no valida");
        return;
      };
      //Validar tamaño del archivo en MB
      var tamano = 10;
      if (archive.size / 1048576 > tamano) {
        alert("El archivo no puede superar los " + tamano + "MB");
        return;
      };
      //Convertir imagen a base 64
      let reader = new FileReader();
      reader.readAsDataURL(archive);
      reader.onload = function () {
        let base64 = reader.result;
        //Archivo
        optionInfo[id][0].archivo = base64;
        //Extension
        optionInfo[id][0].archivo_extesion = extensiones_permitidas[extensiones_permitidas.indexOf(extension)];
        setOption(optionInfo);
      };
    });
  };
  //Vigila que titulo de cada columna
  const handletitleColumns = (e, id, parametro_opcional) => {
    let optionInfo = [...option];
    optionInfo[id][0].tablaTypeCelda.typeCeldaInfo[0][
      option[id][0].tablaTypeCelda.type.indexOf(parseInt(parametro_opcional))
    ].titleColumna = e.target.value;
    setOption(optionInfo);
  };
  //Vigilar el estado de cada titulo de cada celda
  const handletitleCelda = (e, id, parametro_opcional) => {
    let optionInfo = [...option];
    optionInfo[id][0].tablaTypeCelda.typeCeldaInfo[0][
      option[id][0].tablaTypeCelda.type.indexOf(parseInt(parametro_opcional))
    ].titleCelda = e.target.value;
    setOption(optionInfo);
  };
  //vigilar el estado del text de cada celda
  const handletextCelda = (e, id, parametro_opcional) => {
    let optionInfo = [...option];
    optionInfo[id][0].tablaTypeCelda.typeCeldaInfo[0][
      option[id][0].tablaTypeCelda.type.indexOf(parseInt(parametro_opcional))
    ].textDescription = e.target.value;
    setOption(optionInfo);
  };
  //Vigilar el estado de cada de cada lista de la celda
  const handleOnChangeTextList = (e, id, listCelda, parametro_opcional) => {
    let optionInfo = [...option];
    optionInfo[id][0].tablaTypeCelda.typeCeldaInfo[0][
      option[id][0].tablaTypeCelda.type.indexOf(parseInt(parametro_opcional))
    ].lista[listCelda] = e.target.value;
    setOption(optionInfo);
  };
  //Vigilar el estado del link de cada celda
  const handleLink = (e, id, parametro_opcional) => {
    let optionInfo = [...option];
    optionInfo[id][0].tablaTypeCelda.typeCeldaInfo[0][
      option[id][0].tablaTypeCelda.type.indexOf(parseInt(parametro_opcional))
    ].link = e.target.value;
    setOption(optionInfo);
  };
  //Vigilar el estado de cada descripcion del link de cada celda
  const handleLinkDescription = (e, id, parametro_opcional) => {
    let optionInfo = [...option];
    optionInfo[id][0].tablaTypeCelda.typeCeldaInfo[0][
      option[id][0].tablaTypeCelda.type.indexOf(parseInt(parametro_opcional))
    ].linkDescription = e.target.value;
    setOption(optionInfo);
  };
  //Guarda informacion
  const handleSaveInfo = () => {
    dispatch(DocumentMasterInfoNew(documentMasterHead, option));
  };
  return (
    <div>
      <Navbar />
      <div className={"form-previow-deli"}>
        <div className="header-container">
          <div className="header-1">
            <span className="a">
              <span className="b">Codigo:</span> {documentMasterHead.code}
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
                  <span>Cód. {documentMasterHead.code}</span>
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
                  <h6>{documentMasterHead.format}</h6>
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
                                ></input>
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
                                  rows={
                                    option[card_id][0].tabla.row.length === 1
                                      ? "17"
                                      : "6"
                                  }
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
                                          handleOnChangeTextList(
                                            e,
                                            card_id,
                                            listCelda,
                                            parseInt(`${id_column}${id_row}`)
                                          )
                                        }
                                        placeholder={`Ingresa lista: ${
                                          listCelda + 1
                                        }`}
                                        defaultValue={
                                          option[card_id][0].tablaTypeCelda
                                            .typeCeldaInfo[0][
                                            option[
                                              card_id
                                            ][0].tablaTypeCelda.type.indexOf(
                                              parseInt(`${id_column}${id_row}`)
                                            )
                                          ].lista[listCelda]
                                        }
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
                                  autoComplete="off"
                                  className={"celda_title_inputt"}
                                  name={parseInt(`${id_row}${id_column}`)}
                                  onChange={(e) =>
                                    handleLink(
                                      e,
                                      card_id,
                                      `${id_column}${id_row}`
                                    )
                                  }
                                  placeholder={"Agrega tu enlace aqui"}
                                ></input>
                                <input
                                  type="text"
                                  autoComplete="off"
                                  className={"celda_title_inputt"}
                                  name={parseInt(`${id_row}${id_column}`)}
                                  onChange={(e) =>
                                    handleLinkDescription(
                                      e,
                                      card_id,
                                      `${id_column}${id_row}`
                                    )
                                  }
                                  placeholder={"Descripción del enlace aqui"}
                                ></input>
                              </div>
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
              {option[card_id][0].optionValue === "Texto" && (
                <div className="container_text">
                  <input
                    type="text"
                    state={option}
                    className={"textt"}
                    name={`text${card_id}`}
                    onChange={(e) => handleOnChangeTitleCard(e, card_id)}
                    placeholder={"*Ingresa el titulo del texto aqui"}
                  ></input>
                  <div className="container_sub_text">
                    <div className="subContainer">
                      <textarea
                        rows={"3"}
                        cols={"30"}
                        className={"text"}
                        name={`textarea${card_id}`}
                        placeholder={"Escribe el texto"}
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
                  ></input>
                  <div className="container_sub_link">
                    <input
                      type="url"
                      className={"InputLink"}
                      name={`link${card_id}`}
                      onChange={(e) => handleOnchangeLink(e, card_id)}
                      placeholder={"Agrega tu enlace aqui"}
                    ></input>
                    <input
                      name={`text${card_id}`}
                      className={"input-title-img"}
                      placeholder={"Descripción del enlace"}
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
                  <input
                    type="text"
                    state={option}
                    className={"textt"}
                    name={`text${card_id}`}
                    onChange={(e) => handleOnChangeTitleCard(e, card_id)}
                    placeholder={"*Ingresa el titulo de la imagen aqui"}
                  ></input>
                  <div className="container_imagen_sub_previous">
                    <div className="input_container_img">
                      <input
                        className="input_img"
                        accept=".png, .jpg, .jpeg"
                        type="file"
                        onChange={(e) => converterFileBase64(e, card_id)}
                      ></input>
                      Cargar Imagen
                    </div>
                    {option[card_id][0].img !== "" && (
                      <img
                        className="imagen"
                        src={option[card_id][0].img}
                        alt="texto descriptivo"
                      />
                    )}
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
                  ></input>
                  <div className="container_sub_archivo">
                    <div className="input_container_file">
                      <input
                        accept=".xlsx, .pdf, .docx, .pptx"
                        className="input_file"
                        type="file"
                        onChange={(e) => converterFileBase64Archive(e, card_id)}
                      ></input>
                      Cargar Archivo
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
        <button className="btn-float boton_save" onClick={handleSaveInfo}>
          {" "}
          <span>Guardar</span>
        </button>
      </div>
    </div>
  );
};
