import React from 'react'
import moment from "moment";
import './documentPreviow.scss';
export const DocumentPreviousIndex = ({
    option,
    codigo,
    preview,
    version,
    formato,
    dataBasic,
    arrayCard,
    created_at,
    img_header,
    dataBasicCount,
}) => {
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
                  <h6 className="celda_title_inputt">
                    {" "}
                    {dataBasic[0][0].title}:
                  </h6>
                </div>
                <div className="text_body">
                  <div className="linea1"></div>
                  <p>{dataBasic[0][0].option} </p>
                </div>
              </div>
              <div className="celda_title_text">
                <div className="header_titlee">
                  <h6 className="celda_title_inputt">
                    {" "}
                    {dataBasic[1][0].title}:
                  </h6>
                </div>
                <div className="text_body">
                  <div className="linea3"></div>
                  <p>{dataBasic[1][0].option} </p>
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
                  </div>
                  <div className="text_body">
                    {dataBasic[proceso_id - 1][0].type === "Texto" && (
                      <>
                        <div className="linea1"></div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                      </>
                    )}
                    {dataBasic[proceso_id - 1][0].type === "Link" && (
                      <>
                        <div className="linea2"></div>
                        <>
                          <div className="linea2"></div>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://www.federico-toledo.com/sitios-de-prueba-para-practicar/`}
                          >
                            {dataBasic[proceso_id - 1][0].info}
                          </a>
                        </>
                      </>
                    )}
                    {dataBasic[proceso_id - 1][0].type === "Fecha" && (
                      <>
                        <div className="linea4"></div>
                        <p>{moment().format("LLLL")}</p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Logica para agregar la tabla a las visualizaciones */}
        <div className="container_content_static">
          {arrayCard.map((card_id) => (
            <div key={card_id}>
              <div className="tabla-container ">
                {option[card_id].optionValue === "Texto" && (
                  <div className="container_text">
                    {option[card_id].titleCard.trim().length === 0 ? (
                      <h6 className="textt">Titulo del texto no introducido</h6>
                    ) : (
                      <h6 className="textt">{option[card_id].titleCard}</h6>
                    )}
                    <div className="container_sub_text">
                      <div className="subContainer">
                        <h6 className="text">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </h6>
                      </div>
                    </div>
                  </div>
                )}
                {option[card_id].optionValue === "Link" && (
                  <div className="container_link">
                    {option[card_id].titleCard.trim().length === 0 ? (
                      <h6 className="textt">Titulo del link no introducido</h6>
                    ) : (
                      <h6 className="textt">{option[card_id].titleCard}</h6>
                    )}
                    <div className="container_sub_link">
                      <div className="subContainer">
                        <a
                          target="_blank"
                          className="title"
                          rel="noopener noreferrer"
                          href={"https://es.lipsum.com/"}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                {option[card_id].optionValue === "Imagen" && (
                  <div className="container_imagen_previous">
                    {option[card_id].titleCard.trim().length === 0 ? (
                      <h6 className="textt">
                        Titulo del imagen no introducido
                      </h6>
                    ) : (
                      <h6 className="textt">{option[card_id].titleCard}</h6>
                    )}
                    <div className="container_imagen_sub_previous">
                      <img
                        className="imagen"
                        src={img_header}
                        alt="texto descriptivo"
                      />
                    </div>
                  </div>
                )}
                {option[card_id].optionValue === "Archivo" && (
                  <div className="container_archivo">
                    {option[card_id].titleCard.trim().length === 0 ? (
                      <h6 className="textt">
                        Titulo del archivo no introducido
                      </h6>
                    ) : (
                      <h6 className="textt">{option[card_id].titleCard}</h6>
                    )}
                    <div className="container_sub_archivo">
                      <div className="subContainer">
                        <a
                          target="_blank"
                          className="title"
                          rel="noopener noreferrer"
                          href={
                            "http://www.unimetro.edu.co/wp-content/uploads/2019/09/PEI-2019-2-1.pdf"
                          }
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                {option[card_id].optionValue === "Fecha" && (
                  <div className="container_fecha">
                    {option[card_id].titleCard.trim().length === 0 ? (
                      <h6 className="textt">Titulo del fecha no introducido</h6>
                    ) : (
                      <h6 className="textt">{option[card_id].titleCard}</h6>
                    )}
                    <div className="container_sub_fecha">
                      <div className="subContainer">
                        <h4>{moment().format("LLLL")}</h4>
                      </div>
                    </div>
                  </div>
                )}
                {option[card_id].optionValue === "Tabla" && (
                  <div className="tabla-subContainer animate__animated animate__fadeIn">
                    <div className="header_title_tabla">
                      {option[card_id].titleCard.trim().length === 0 ? (
                        <h6 className="textt">
                          Titulo de tabla no introducido
                        </h6>
                      ) : (
                        <h6 className="textt">
                          {option[card_id].titleCard}
                        </h6>
                      )}
                    </div>
                    {option[card_id].tabla.row.map((id_column) => (
                      <div className="row" key={id_column}>
                        {option[card_id].tabla.column.map((id_row) => (
                          <div className="column" key={id_row}>
                            <div
                              className={
                                "columns " +
                                (option[card_id].tablaTypeCelda.celda[
                                  option[
                                    card_id
                                  ].tablaTypeCelda.type.indexOf(
                                    parseInt(`${id_column}${id_row}`)
                                  )
                                ] === "Título" && "active")
                              }
                            ></div>
                            {id_column === 1 && (
                              <>
                                <div className="header_title">
                                  <h6 className={"celda_title_input"}>
                                    {option[card_id].tablaTypeCelda
                                      .title_columna[
                                      option[
                                        card_id
                                      ].tablaTypeCelda.type.indexOf(
                                        parseInt(`${id_column}${id_row}`)
                                      )
                                    ] === ""
                                      ? "Titulo de la columna no introducido"
                                      : option[card_id].tablaTypeCelda
                                          .title_columna[
                                          option[
                                            card_id
                                          ].tablaTypeCelda.type.indexOf(
                                            parseInt(`${id_column}${id_row}`)
                                          )
                                        ]}
                                  </h6>
                                </div>
                                <div className="linea"></div>
                              </>
                            )}
                            {option[card_id].tablaTypeCelda.celda[
                              option[card_id].tablaTypeCelda.type.indexOf(
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
                                  </p>
                                </div>
                              </div>
                            )}
                            {option[card_id].tablaTypeCelda.celda[
                              option[card_id].tablaTypeCelda.type.indexOf(
                                parseInt(`${id_column}${id_row}`)
                              )
                            ] === "Imagen" && (
                              <div className="imagen_container">
                                <img
                                  className="imagen"
                                  src={img_header}
                                  alt="texto descriptivo"
                                />
                              </div>
                            )}
                            {option[card_id].tablaTypeCelda.celda[
                              option[card_id].tablaTypeCelda.type.indexOf(
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
                                    src={img_header}
                                    alt="texto descriptivo"
                                  />
                                </div>
                              </div>
                            )}
                            {option[card_id].tablaTypeCelda.celda[
                              option[card_id].tablaTypeCelda.type.indexOf(
                                parseInt(`${id_column}${id_row}`)
                              )
                            ] === "Lista" && (
                              <div className="list">
                                <ul>
                                  {option[card_id].tablaTypeCelda.lista[
                                    option[
                                      card_id
                                    ].tablaTypeCelda.type.indexOf(
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
                            {option[card_id].tablaTypeCelda.celda[
                              option[card_id].tablaTypeCelda.type.indexOf(
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
                            {option[card_id].tablaTypeCelda.celda[
                              option[card_id].tablaTypeCelda.type.indexOf(
                                parseInt(`${id_column}${id_row}`)
                              )
                            ] === "Fecha" && (
                              <div className="fecha">
                                <div className="header_titlee">
                                  <h6 className="celda_title_inputt">
                                    {" "}
                                    Título de la fecha:
                                  </h6>
                                </div>
                                <div className="text_body">
                                  <div className="linea"></div>
                                  <p>{moment().format("LLLL")}</p>
                                </div>
                              </div>
                              // <div className="celda_titlea">
                              //   <div className="header_titlea">
                              //     <h6 className={"celda_title_inputa"}>
                              //       Título de la fecha:
                              //     </h6>
                              //   </div>
                              //   <div className="linea"></div>
                              //   <p>{moment().format("LLLL")}</p>
                              // </div>
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
    </div>
  )
}
