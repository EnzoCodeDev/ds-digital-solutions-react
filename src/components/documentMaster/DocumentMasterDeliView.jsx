import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Print } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useForm } from "../../hooks/useForm";
import { Navbar } from "../navbar/Navbar";
import { ViewDocumentMaster } from "../../redux/actions/documentMasterAction";
import {
  typeCelda,
  infoCelda,
  listArray,
  titleColumns,
  indexTypeCelda,
} from "../../helpers/typeCelda";
export const DocumentMasterDeliView = () => {
  //Manejo de que tipo es cada celda
  const [tableColumnsTypeValue, handletableColumnsTypeValueChange] =
    useForm(typeCelda);
  //Inicial state nuevo documento
  const celdass = Object.values(tableColumnsTypeValue);
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
  //Manejo de que tipo de informacion quiere insertar el usuario en las tarjetas
  const [option, setOption] = useState(inicialStateOption);
  //Manejo de las tarjetas
  const [arrayCard, setArrayCard] = useState([1]);
  //Manejo de las datas de cada tarjetas
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
  const documentMasterInfo = documentMaster.DocumentMasterInfo;
  //Renderizado de los datos basicos de la aplicacion si vienen en el dispacth
  useEffect(() => {
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
          descriptionLink:
            documentMaster.DocumentMasterHead.process_link === null
              ? ""
              : documentMaster.DocumentMasterHead.process_link,
        },
      ],
    ];
    if (documentMaster.DocumentMasterHead.data_basic) {
      array.push(...JSON.parse(documentMaster.DocumentMasterHead.data_basic));
    }
    setDataBasicCount(
      JSON.parse(documentMaster.DocumentMasterHead.position_data_basic)
    );
    setDataBasic([...array]);
  }, [
    documentMaster.DocumentMasterHead.position_data_basic,
    documentMaster.DocumentMasterHead.process_type,
    documentMaster.DocumentMasterHead.process_description,
    documentMaster.DocumentMasterHead.data_basic,
    documentMaster.DocumentMasterHead.process_link,
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
        console.log(documentMasterInfo);
        console.log(documentMasterInfo.length);
        for (let i = 0; i < documentMasterInfo.length; i++) {
          if (documentMasterInfo[i].id_card === DocumentMasterBody.id) {
            arrayInfo.push({
              id_card: documentMasterInfo[i].id_card,
              id_header: documentMasterInfo[i].id_header,
              title_card: documentMasterInfo[i].title_card,
              text_description: documentMasterInfo[i].text_description,
              link: documentMasterInfo[i].link,
              link_description: documentMasterInfo[i].link_description,
              file: documentMasterInfo[i].file,
              file_description: documentMasterInfo[i].file_description,
              card_info_table: documentMasterInfo[i].card_info_table,
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
            img:
              DocumentMasterBody.image === null ? "" : DocumentMasterBody.image,
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
              typeCeldaInfo: JSON.parse(arrayInfo[0].card_info_table),
            },
          },
        ]);
      });
      setOption(arrayOptioValue);
      let newArray = JSON.parse(documentMaster.DocumentMasterHead.position);
      setArrayCard(newArray);
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
  //Vigilar el estado de los inputs de text
  const handleOnChangeTitleCard = (e, id) => {
    let optionInfo = [...option];
    optionInfo[id][0].titleCard = e.target.value;
    setOption(optionInfo);
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
              <h6 className="titleColumn">{option[card_id][0].titleCard}</h6>
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
                                <h6 className={"celda_title_input"}>
                                  {
                                    option[card_id][0].tablaTypeCelda
                                      .typeCeldaInfo[0][
                                      option[
                                        card_id
                                      ][0].tablaTypeCelda.type.indexOf(
                                        parseInt(`${id_column}${id_row}`)
                                      )
                                    ].titleColumna
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
                                        placeholder={`Ingresa lista: ${
                                          listCelda + 1
                                        }`}
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
                                <h6 className="celda_title_input">
                                  Título del link:
                                </h6>
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
                  <h6 className="textt">{option[card_id][0].titleCard}</h6>
                  <div className="container_sub_text">
                    <div className="subContainer">
                      <h6 className="text">{option[card_id][0].text}</h6>
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
                      src="https://intersindicalaragon.org/wp-content/uploads/icono-facebook.png"
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
