import React from "react";
import moment from "moment";
import { GetApp } from "@material-ui/icons";
import { Navbar } from "../../../navbar/Navbar";
import "./documentForm.scss";
import { indexTypeCelda } from "../../../../helpers/typeCelda";
export const DocumentFormDeliIndex = ({
  option,
  codigo,
  formato,
  template,
  dataView,
  arrayCard,
  dataBasic,
  img_header,
  description,
  downloadFile,
  dataBasicCount,
}) => {
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
              {dataView.DocumentMasterHead.version}
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
              {moment(dataView.DocumentMasterHead.created_at).format("LLLL") ===
              "Fecha inválida"
                ? moment().format("LLLL")
                : moment(dataView.DocumentMasterHead.created_at).format("LLLL")}
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
                  <span>Versión: {dataView.DocumentMasterHead.version}</span>
                </div>
              </div>
              <div className="date">
                <div className="container_date">
                  <p className="span">Fecha de entrada en Vigencia: </p>
                  <span className="caducidad">
                    {moment(dataView.DocumentMasterHead.created_at).format(
                      "L"
                    ) === "Fecha inválida"
                      ? moment().format("L")
                      : moment(dataView.DocumentMasterHead.created_at).format(
                          "L"
                        )}
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
                  <p className="procesos">{} </p>
                </div>
              </div>
              <div className="celda_title_text">
                <div className="header_titlee">
                  <h6 className="celda_title_inputt">{"Sub proceso"}</h6>
                </div>
                <div className="text_body">
                  <div className="linea3"></div>
                  <p className="procesos">{} </p>
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
            {option[card_id].optionValue === "Tabla" && (
              <h6 className="titleColumn">{option[card_id].titleCard}</h6>
            )}
            <div className="tabla-container ">
              {option[card_id].optionValue === "Texto" && (
                <div className="container_text">
                  <h6 className="textt">{option[card_id].titleCard}</h6>
                  <div className="container_sub_text">
                    <div className="subContainer">
                      <h6 className="text">
                        {option[card_id].text_description_item}
                      </h6>
                    </div>
                  </div>
                </div>
              )}
              {option[card_id].optionValue === "Link" && (
                <div className="container_link">
                  <h6 className="textt">{option[card_id].titleCard}</h6>
                  <div className="container_sub_link">
                    <div className="subContainer">
                      <a
                        target="_blank"
                        className="title"
                        rel="noopener noreferrer"
                        href={option[card_id].link}
                      >
                        {option[card_id].linkDescription}
                      </a>
                    </div>
                  </div>
                </div>
              )}
              {option[card_id].optionValue === "Imagen" && (
                <div className="container_imagen_previous">
                  <h6 className="textt">{option[card_id].titleCard}</h6>
                  <div className="container_imagen_sub_previous">
                    <img
                      className="imagen"
                      src={option[card_id].img}
                      alt="texto descriptivo"
                    />
                  </div>
                </div>
              )}
              {option[card_id].optionValue === "Archivo" && (
                <div className="container_archivo">
                  <h6 className="textt">{option[card_id].titleCard}</h6>
                  <div className="container_sub_archivo">
                    <div className="subContainer">
                      <div className="download_file_container">
                        <span> Descargar archivo</span>
                        <GetApp
                          className="icon"
                          onClick={(e) =>
                            downloadFile(
                              e,
                              option[card_id].titleCard,
                              option[card_id].archivo
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {option[card_id].optionValue === "Fecha" && (
                <div className="container_text">
                  <h6 className="textt">{option[card_id].titleCard}</h6>
                  <div className="container_sub_text">
                    <div className="subContainer">
                      <h6 className="text">{option[card_id].date}</h6>
                    </div>
                  </div>
                </div>
              )}
              {option[card_id].optionValue === "Tabla" && (
                <div className="tabla-subContainer animate__animated animate__fadeIn">
                  {/* {option[card_id].tabla.row.map((id_column) => (
                    <div
                      className={
                        "row " +
                        (option[card_id].tabla.row.length === 1 ? "active" : "")
                      }
                      key={id_column}
                    >
                      {option[card_id].tabla.column.map((id_row) => (
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
                                    option[card_id].tablaTypeCelda
                                      .title_columna[
                                      indexTypeCelda.indexOf(
                                        parseInt(`${id_column}${id_row}`)
                                      )
                                    ]
                                  }
                                </h6>
                              </div>
                              <div className="linea"></div>
                            </>
                          )}
                          {option[card_id].tablaTypeCelda.celda[
                            indexTypeCelda.indexOf(
                              parseInt(`${id_column}${id_row}`)
                            )
                          ] === "Título" && (
                            <div className="celda_title">
                              <div className="header_title">
                                <h6 className={"celda_title_inputt"}>
                                  {
                                    option[card_id].tablaTypeCelda
                                      .typeCeldaInfo[
                                      indexTypeCelda.indexOf(
                                        parseInt(`${id_column}${id_row}`)
                                      )
                                    ].titleCelda
                                  }
                                </h6>
                              </div>
                              <div className="linea"></div>
                            </div>
                          )}
                          {option[card_id].tablaTypeCelda.celda[
                            indexTypeCelda.indexOf(
                              parseInt(`${id_column}${id_row}`)
                            )
                          ] === "Título texto" && (
                            <div className="celda_title_text">
                              <div className="header_titlee">
                                <h6 className="celda_title_inputt">
                                  {
                                    option[card_id].tablaTypeCelda
                                      .typeCeldaInfo[
                                      indexTypeCelda.indexOf(
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
                                    option[card_id].tablaTypeCelda
                                      .typeCeldaInfo[
                                      indexTypeCelda.indexOf(
                                        parseInt(`${id_column}${id_row}`)
                                      )
                                    ].textDescription
                                  }
                                </p>
                              </div>
                            </div>
                          )}
                          {option[card_id].tablaTypeCelda.celda[
                            indexTypeCelda.indexOf(
                              parseInt(`${id_column}${id_row}`)
                            )
                          ] === "Fecha" && (
                            <div className="celda_title_text">
                              <div className="header_titlee">
                                <h6 className="celda_title_inputt">
                                  {
                                    option[card_id].tablaTypeCelda
                                      .typeCeldaInfo[
                                      indexTypeCelda.indexOf(
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
                                    option[card_id].tablaTypeCelda
                                      .typeCeldaInfo[
                                      indexTypeCelda.indexOf(
                                        parseInt(`${id_column}${id_row}`)
                                      )
                                    ].textDescription
                                  }
                                </p>
                              </div>
                            </div>
                          )}
                          {option[card_id].tablaTypeCelda.celda[
                            indexTypeCelda.indexOf(
                              parseInt(`${id_column}${id_row}`)
                            )
                          ] === "Imagen" && (
                            <div className="imagen_container">
                              {option[card_id].tablaTypeCelda.typeCeldaInfo[
                                indexTypeCelda.indexOf(
                                  parseInt(`${id_column}${id_row}`)
                                )
                              ].img !== null && (
                                <img
                                  className="imagen"
                                  src={
                                    option[card_id].tablaTypeCelda
                                      .typeCeldaInfo[
                                      indexTypeCelda.indexOf(
                                        parseInt(`${id_column}${id_row}`)
                                      )
                                    ].img
                                  }
                                  alt="texto descriptivo"
                                />
                              )}
                            </div>
                          )}
                          {option[card_id].tablaTypeCelda.celda[
                            indexTypeCelda.indexOf(
                              parseInt(`${id_column}${id_row}`)
                            )
                          ] === "Imagen título" && (
                            <div className="imagen_title">
                              <div className="header_titleee">
                                <h6 className="celda_title_inputtt">
                                  {
                                    option[card_id].tablaTypeCelda
                                      .typeCeldaInfo[
                                      indexTypeCelda.indexOf(
                                        parseInt(`${id_column}${id_row}`)
                                      )
                                    ].titleCelda
                                  }
                                </h6>
                              </div>
                              <div className="imagen_container">
                                {option[card_id].tablaTypeCelda.typeCeldaInfo[
                                  indexTypeCelda.indexOf(
                                    parseInt(`${id_column}${id_row}`)
                                  )
                                ].img !== null && (
                                  <img
                                    className="imagen"
                                    src={
                                      option[card_id].tablaTypeCelda
                                        .typeCeldaInfo[
                                        indexTypeCelda.indexOf(
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
                          {option[card_id].tablaTypeCelda.celda[
                            indexTypeCelda.indexOf(
                              parseInt(`${id_column}${id_row}`)
                            )
                          ] === "Lista" && (
                            <div className="list">
                              <ul>
                                {option[card_id].tablaTypeCelda.lista[
                                  indexTypeCelda.indexOf(
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
                                          option[card_id].tablaTypeCelda
                                            .typeCeldaInfo[
                                            indexTypeCelda.indexOf(
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
                          {option[card_id].tablaTypeCelda.celda[
                            indexTypeCelda.indexOf(
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
                                    option[card_id].tablaTypeCelda
                                      .typeCeldaInfo[
                                      indexTypeCelda.indexOf(
                                        parseInt(`${id_column}${id_row}`)
                                      )
                                    ].link
                                  }
                                >
                                  {
                                    option[card_id].tablaTypeCelda
                                      .typeCeldaInfo[
                                      indexTypeCelda.indexOf(
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
                  ))}*/}
                </div>
              )} 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
