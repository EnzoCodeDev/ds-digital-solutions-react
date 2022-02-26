import React from "react";
import moment from "moment";
import { Help } from "@material-ui/icons";
import { Navbar } from "../../../navbar/Navbar";
import "./documentView.scss";
export const DocumentViewIndex = ({
  name,
  option,
  procesos,
  identity,
  arrayCard,
  dataBasic,
  img_header,
  subProceso,
  handleDate,
  handleLink,
  aplicarState,
  handleNombre,
  dataBasicCount,
  handleSaveInfo,
  handletextCelda,
  handleValueText,
  handleValueLink,
  handleValueDate,
  handletitleCelda,
  handleOnChangeText,
  documentMasterHead,
  handleOnchangeLink,
  handleValueProceso,
  handleValueAplicar,
  converterFileBase64,
  handleIdentificacion,
  handleValueSubProceso,
  handleLinkDescription,
  handleOnChangeTextList,
  converterFileBase64Table,
  converterFileBase64Archive,
  handleDescripcionLinkChange,
}) => {
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
                  <div className="select_procesos">
                    <select
                      // value={
                      //   dataBasic[0][0].option === "Lorem ipsum dolor"
                      //     ? ""
                      //     : dataBasic[0][0].option
                      // }
                      onChange={(e) => handleValueProceso(e, 1)}
                      className="selected"
                    >
                      <option value="0">--Seleccionar proceso--</option>
                      {procesos.map((process) => (
                        <option key={process.id} value={process.id}>
                          {process.process}
                        </option>
                      ))}
                    </select>
                    <i></i>
                  </div>
                </div>
              </div>
              <div className="celda_title_text">
                <div className="header_titlee">
                  <h6 className="celda_title_inputt">{"Sub proceso"}</h6>
                </div>
                <div className="text_body">
                  <div className="linea3"></div>
                  <div className="select_sub_procesos">
                    {subProceso.length === 0 ? (
                      <p>Este proceso no tiene subProcesos</p>
                    ) : (
                      <select
                        onClick={(e) => handleValueSubProceso(e, 2)}
                        className="selected"
                      >
                        <option value="0">--Seleccionar subproceso--</option>
                        {subProceso.map((subProcess) => (
                          <option key={subProcess.id} value={subProcess.id}>
                            {subProcess.subProceso}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
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
                      <div className="linea1"></div>
                      <textarea
                        className="text"
                        onChange={(e) => handleValueText(e, proceso_id)}
                      ></textarea>
                    </div>
                  )}
                  {dataBasic[proceso_id - 1][0].type === "Link" && (
                    <>
                      <div className="text_body">
                        <div className="linea2"></div>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`${
                            dataBasic[proceso_id - 1][0].link === undefined
                              ? ""
                              : dataBasic[proceso_id - 1][0].link
                          }`}
                        >
                          {dataBasic[proceso_id - 1][0].info}
                        </a>
                      </div>
                      <div className="input-url">
                        <input
                          type="url"
                          onChange={(e) => handleValueLink(e, proceso_id)}
                          placeholder="Agrega la url aqui"
                          className="input"
                        ></input>
                      </div>
                    </>
                  )}
                  {dataBasic[proceso_id - 1][0].type === "Fecha" && (
                    <div className="text_body">
                      <div className="linea4"></div>
                      <div className="container_input_date">
                        <input
                          type="date"
                          className="form-control"
                          onChange={(e) => handleValueDate(e, proceso_id)}
                        ></input>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="container_apli">
          <div className="sub_container_apli">
            <div className="content_container_apli">
              <div className="select">
                <select value={aplicarState} onChange={handleValueAplicar}>
                  <option value="1">Aplicar documento en general</option>
                  <option value="2">Aplicar documento a un usuario</option>
                </select>
              </div>
              {aplicarState === "2" && (
                <>
                  <div className="inputName  animate__animated animate__fadeIn">
                    <input
                      type="text"
                      name={"inputCc"}
                      onChange={handleIdentificacion}
                      placeholder={"Identificación"}
                      className={"inputCc"}
                      defaultValue={identity}
                    />
                  </div>
                  <div className="input_identify animate__animated animate__fadeIn">
                    <input
                      type="text"
                      name={"inputName"}
                      onChange={handleNombre}
                      placeholder={"Nombre"}
                      className={"inputName"}
                      defaultValue={name}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {arrayCard.map((card_id) => (
          <div key={card_id}>
            <div className="tabla-container ">
              {option[card_id].optionValue === "Texto" && (
                <div className="container_text">
                  <div className="container_input">
                    <h6 title={option[card_id].text} className={"textt"}>
                      {option[card_id].titleCard}
                    </h6>
                    <div title={option[card_id].text}>
                      <Help />
                    </div>
                  </div>
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
              {option[card_id].optionValue === "Link" && (
                <div className="container_link">
                  <div className="container_input">
                    <h6 title={option[card_id].text} className={"textt"}>
                      {option[card_id].titleCard}
                    </h6>
                    <div title={option[card_id].text}>
                      <Help />
                    </div>
                  </div>
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
                  <div className="container_input">
                    <h6 title={option[card_id].text} className={"textt"}>
                      {option[card_id].titleCard}
                    </h6>
                    <div title={option[card_id].text}>
                      <Help />
                    </div>
                  </div>
                  <div className="container_imagen_sub_previous">
                    <div className="input_container_img">
                      <input
                        className="input_img"
                        accept=".png, .jpg, .jpeg"
                        type="file"
                        onChange={(e) => converterFileBase64(e, card_id)}
                      ></input>
                      {option[card_id].img === undefined
                        ? "Cargar Imagen"
                        : "Cambiar imagen"}
                    </div>
                    {option[card_id].img !== undefined && (
                      <img
                        className="imagen"
                        src={option[card_id].img}
                        alt="texto descriptivo"
                      />
                    )}
                  </div>
                </div>
              )}
              {option[card_id].optionValue === "Archivo" && (
                <div className="container_archivo">
                  <div className="container_input">
                    <h6 title={option[card_id].text} className={"textt"}>
                      {option[card_id].titleCard}
                    </h6>
                    <div title={option[card_id].text}>
                      <Help />
                    </div>
                  </div>
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
              {option[card_id].optionValue === "Fecha" && (
                <div className="container_fecha">
                  <div className="container_input">
                    <h6 title={option[card_id].text} className={"textt"}>
                      {option[card_id].titleCard}
                    </h6>
                    <div title={option[card_id].text}>
                      <Help />
                    </div>
                  </div>
                  <div className="container_sub_text">
                    <div className="subContainer">
                      <input
                        onChange={(e) => handleDate(e, card_id)}
                        type="datetime-local"
                      ></input>
                    </div>
                  </div>
                </div>
              )}
              {option[card_id].optionValue === "Tabla" && (
                <div className="tabla-subContainer animate__animated animate__fadeIn">
                  <div className="container_header">
                    <h6 title={option[card_id].text} className={"textt"}>
                      {option[card_id].titleCard}
                    </h6>
                    <div title={option[card_id].text}>
                      <Help />
                    </div>
                  </div>
                  {option[card_id].tabla.row.map((id_column) => (
                    <div
                      className={
                        "row " +
                        (option[card_id].tabla.row.length === 1 ? "active" : "")
                      }
                      key={id_column}
                    >
                      {option[card_id].tabla.column.map((id_row) => (
                        <div className="column" key={id_row}>
                          <div className={"columns "}></div>
                          {id_column === 1 && (
                            <>
                              <div className="header_title">
                                <input
                                  type="text"
                                  className={"celda_title_input"}
                                  readOnly
                                  name={parseInt(`${id_row}${id_column}`)}
                                  defaultValue={
                                    option[card_id].tablaTypeCelda
                                      .title_columna[
                                      option[
                                        card_id
                                      ].tablaTypeCelda.type.indexOf(
                                        parseInt(`${id_column}${id_row}`)
                                      )
                                    ]
                                  }
                                  placeholder={"*Titulo de columna"}
                                ></input>
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
                                  rows={"6"}
                                  cols={"30"}
                                ></textarea>
                              </div>
                            </div>
                          )}
                          {option[card_id].tablaTypeCelda.celda[
                            option[card_id].tablaTypeCelda.type.indexOf(
                              parseInt(`${id_column}${id_row}`)
                            )
                          ] === "Imagen" && (
                            <div className="imagen_container">
                              <div className="input_container_img">
                                <input
                                  className="input_img"
                                  accept=".png, .jpg, .jpeg"
                                  type="file"
                                  onChange={(e) =>
                                    converterFileBase64Table(
                                      e,
                                      card_id,
                                      parseInt(`${id_column}${id_row}`)
                                    )
                                  }
                                ></input>
                                {option[card_id].tablaTypeCelda
                                  .typeCeldaInfo[0][
                                  option[card_id].tablaTypeCelda.type.indexOf(
                                    parseInt(`${id_column}${id_row}`)
                                  )
                                ].img === null
                                  ? "Cargar Imagen"
                                  : "Cambiar imagen"}
                              </div>
                              <div className="container_img">
                                {option[card_id].tablaTypeCelda
                                  .typeCeldaInfo[0][
                                  option[card_id].tablaTypeCelda.type.indexOf(
                                    parseInt(`${id_column}${id_row}`)
                                  )
                                ].img !== null && (
                                  <img
                                    className="imagen"
                                    src={
                                      option[card_id].tablaTypeCelda
                                        .typeCeldaInfo[0][
                                        option[
                                          card_id
                                        ].tablaTypeCelda.type.indexOf(
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
                            option[card_id].tablaTypeCelda.type.indexOf(
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
                                <div className="input_container_img_title">
                                  <input
                                    className="input_img"
                                    accept=".png, .jpg, .jpeg"
                                    type="file"
                                    onChange={(e) =>
                                      converterFileBase64Table(
                                        e,
                                        card_id,
                                        parseInt(`${id_column}${id_row}`)
                                      )
                                    }
                                  ></input>
                                  {option[card_id].img === undefined
                                    ? "Cargar Imagen"
                                    : "Cambiar imagen"}
                                </div>
                                {option[card_id].tablaTypeCelda
                                  .typeCeldaInfo[0][
                                  option[card_id].tablaTypeCelda.type.indexOf(
                                    parseInt(`${id_column}${id_row}`)
                                  )
                                ].img !== null && (
                                  <img
                                    className="imagenes"
                                    src={
                                      option[card_id].tablaTypeCelda
                                        .typeCeldaInfo[0][
                                        option[
                                          card_id
                                        ].tablaTypeCelda.type.indexOf(
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
                            option[card_id].tablaTypeCelda.type.indexOf(
                              parseInt(`${id_column}${id_row}`)
                            )
                          ] === "Lista" && (
                            <div className="list">
                              <ul>
                                {option[card_id].tablaTypeCelda.lista[
                                  option[card_id].tablaTypeCelda.type.indexOf(
                                    parseInt(`${id_column}${id_row}`)
                                  )
                                ].map((listCelda) => (
                                  <div
                                    key={listCelda}
                                    className="container_list"
                                  >
                                    <li>
                                      <textarea
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
                                          option[card_id].tablaTypeCelda
                                            .typeCeldaInfo[0][
                                            option[
                                              card_id
                                            ].tablaTypeCelda.type.indexOf(
                                              parseInt(`${id_column}${id_row}`)
                                            )
                                          ].lista[listCelda]
                                        }
                                      ></textarea>
                                    </li>
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
                                <input
                                  type="text"
                                  autoComplete="off"
                                  className={"celda_title_inputt1"}
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
                                  className={"celda_title_inputt2"}
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
                                    option[card_id].tablaTypeCelda
                                      .typeCeldaInfo[0][
                                      option[
                                        card_id
                                      ].tablaTypeCelda.type.indexOf(
                                        parseInt(`${id_column}${id_row}`)
                                      )
                                    ].link
                                  }
                                >
                                  {
                                    option[card_id].tablaTypeCelda
                                      .typeCeldaInfo[0][
                                      option[
                                        card_id
                                      ].tablaTypeCelda.type.indexOf(
                                        parseInt(`${id_column}${id_row}`)
                                      )
                                    ].linkDescription
                                  }
                                </a>
                              </div>
                            </div>
                          )}
                          {option[card_id].tablaTypeCelda.celda[
                            option[card_id].tablaTypeCelda.type.indexOf(
                              parseInt(`${id_column}${id_row}`)
                            )
                          ] === "Fecha" && (
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
                                <input
                                  type="date"
                                  onChange={(e) =>
                                    handletextCelda(
                                      e,
                                      card_id,
                                      `${id_column}${id_row}`
                                    )
                                  }
                                ></input>
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
        <button className="btn-float boton_save" onClick={handleSaveInfo}>
          {" "}
          <span>Guardar</span>
        </button>
      </div>
    </div>
  );
};
