import React from "react";
// import { Print } from "@material-ui/icons";
import { useSelector } from "react-redux";
import moment from "moment";
export const ParametrizacionDocumentMasterFormPreviow = ({
  codigo,
  option,
  formato,
  preview,
  arrayCard,
  dataBasic,
  dataBasicCount,
}) => {
  const { created_at, version } = useSelector(
    (state) => state.documentMaster.documentMaster.DocumentMasterHead
  );
  const { img_header } = useSelector((state) => state.auth);
  return (
    <div>
      <div className={"form-previow " + (preview && "active")}>
        <div className="header-container">
          <div className="header-1">
            <span className="a">
              <span className="b">Codigo:</span>{" "}
              {codigo.trim().length === 0 ? "AAA111" : codigo}
            </span>
            <span className="a">
              <span className="b">Version:</span> Versión:{" "}
              {version === 0 ? 1 : version}
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
              {moment(created_at).format("LLLL") === "Fecha inválida"
                ? moment().format("LLLL")
                : moment(created_at).format("LLLL")}
            </span>
          </div>
        </div>
        <div className="container-aperture">
          <div className="border_top"></div>
          <div className="aperture">
            <div className="part_1">
              <div className="codigo">
                <div className="container_codigo">
                  <span>
                    Cód. {codigo.trim().length === 0 ? "AAA111" : codigo}
                  </span>
                </div>
              </div>
              <div className="version">
                <div className="container_version">
                  <span>Versión: {version === 0 ? 1 : version}</span>
                </div>
              </div>
              <div className="date">
                <div className="container_date">
                  <p className="span">Fecha de entrada en Vigencia: </p>
                  <span className="caducidad">
                    {moment(created_at).format("L") === "Fecha inválida"
                      ? moment().format("L")
                      : moment(created_at).format("L")}
                  </span>
                </div>
              </div>
            </div>
            <div className="part_2">
              <div className="container_format">
                <div className="container_sub_format">
                  <h5>Formato</h5>
                  <h6>
                    {formato.trim().length === 0
                      ? "Aun no lo haz especificado"
                      : formato}
                  </h6>
                </div>
              </div>
            </div>
            <div className="part_3">
              <div className="imagen_container">
                <img
                  className="imagen"
                  src={img_header}
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
                  <h6 className="celda_title_inputt">
                    {" "}
                    {dataBasic[0][0].title}:
                  </h6>
                </div>
                <div className="text_body">
                  {dataBasic[0][0].type === "Texto" ? (
                    <>
                      <div className="linea1"></div>
                      <p>{dataBasic[0][0].description} </p>
                    </>
                  ) : (
                    <>
                      <div className="linea2"></div>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`${dataBasic[0][0].descriptionLink}`}
                      >
                        {dataBasic[0][0].description}{" "}
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
                            href={`${
                              dataBasic[proceso_id - 1][0].descriptionLink
                            }`}
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
        {/* Logica para agregar la tabla a las visualizaciones */}
        {arrayCard.map((card_id) => (
          <div key={card_id}>
            {option[card_id][0].optionValue === "Tabla" && (
              <>
                {option[card_id][0].titleCard.trim().length === 0 ? (
                  <h6 className="text">Titulo de tabla no introducido</h6>
                ) : (
                  <h6 className="text">{option[card_id][0].titleCard}</h6>
                )}
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
                                <h6 className={"celda_title_input"}>
                                  Título de la columna:
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
                            <div className="celda_titlea">
                              <div className="header_titlea">
                                <h6 className={"celda_title_inputa"}>
                                  Título de la celda:
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
                                  {" "}
                                  Título de texto:
                                </h6>
                              </div>
                              <div className="text_body">
                                <div className="linea"></div>
                                <p>
                                  "Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit, sed do eiusmod tempor
                                  incididunt ut labore et dolore magna aliqua.
                                  Ut enim ad minim veniam, quis nostrud
                                  exercitation ullamco laboris nisi ut aliquip
                                  ex ea commodo consequat. Duis aute irure dolor
                                  in reprehenderit"
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
                                  Título de imagen:
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
                                    <li>Lista N°:{listCelda + 1}</li>
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
                                    "https://espanol.cdc.gov/coronavirus/2019-ncov/index.html"
                                  }
                                >
                                  Pagina de prueba sobre información del covid
                                  19
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
                  {option[card_id][0].titleCard.trim().length === 0 ? (
                    <h6 className="textt">Titulo del texto no introducido</h6>
                  ) : (
                    <h6 className="textt">{option[card_id][0].titleCard}</h6>
                  )}
                  <div className="container_sub_text">
                    <div className="subContainer">
                      <h6 className="text">{option[card_id][0].text}</h6>
                    </div>
                  </div>
                </div>
              )}
              {option[card_id][0].optionValue === "Link" && (
                <div className="container_link">
                  {option[card_id][0].titleCard.trim().length === 0 ? (
                    <h6 className="textt">Titulo del link no introducido</h6>
                  ) : (
                    <h6 className="textt">{option[card_id][0].titleCard}</h6>
                  )}
                  <div className="container_sub_link">
                    <div className="subContainer">
                      <a
                        target="_blank"
                        className="title"
                        rel="noopener noreferrer"
                        href={"https://www.hbomax.com/co/es"}
                        // href={option[card_id][0].link}
                      >
                        Pagina de HBO
                        {/* {option[card_id][0].linkDescription} */}
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
                  {option[card_id][0].titleCard.trim().length === 0 ? (
                    <h6 className="textt">Titulo del archivo no introducido</h6>
                  ) : (
                    <h6 className="textt">{option[card_id][0].titleCard}</h6>
                  )}
                  <div className="container_sub_archivo">
                    <div className="subContainer">
                      <a
                        target="_blank"
                        className="title"
                        rel="noopener noreferrer"
                        // href={option[card_id][0].archivo}
                        href={
                          "http://www.unimetro.edu.co/wp-content/uploads/2019/09/PEI-2019-2-1.pdf"
                        }
                      >
                        Pagina de prueba proyecto Educativo Institucional
                      </a>
                    </div>
                  </div>
                </div>
              )}
              {/* {option[card_id][0].optionValue === "Lista" && (
                <div>
                  <h1>{`lista${card_id}`}</h1>
                </div>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
