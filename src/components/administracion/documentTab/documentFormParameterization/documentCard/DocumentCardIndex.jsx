import React from "react";
import {
  AddCircleOutline,
  NotInterested,
  ArrowBackIos,
} from "@material-ui/icons";
import { indexTypeCelda } from "../../../../../helpers/typeCelda";
import "./documentCard.scss";
export const DocumentCardIndex = ({
  option,
  arrayCard,
  handleAdd,
  handleDown,
  handleClimp,
  handleTarget,
  handleRemove,
  handleSelectList,
  handleTargetRows,
  handleOnChangeText,
  handletitleColumns,
  handleTargetColumns,
  handleFileValuesCelda,
  handleOnChangeTitleCard,
}) => {
  return (
    <div>
      {/* Este es el mapeo para renderizado de componentes y saber cuantos hay */}
      {arrayCard.map((card_id) => (
        //Estas clases se le agregaron para animacion de la libreria animation
        //Esta se encuentra en cdn desde la raiz principal (public/index)
        <div
          key={card_id}
          className="container-group animate__animated animate__slideInUp"
        >
          <div className={"container-card "}>
            <div className="header-card">
              {option[card_id].titleCard.length === 0 ? (
                <h3>Ingresa la descripción aquí</h3>
              ) : (
                <h3>{option[card_id].titleCard}</h3>
              )}
            </div>
            <div className="linear"></div>
            <div className="content">
              {/* Titulo de la card */}
              <input
                type="text"
                state={option}
                className={"input1"}
                name={`text${card_id}`}
                onChange={(e) => handleOnChangeTitleCard(e, card_id)}
                placeholder={"Ingresa información aquí(Obligatorio)"}
                defaultValue={option[card_id].titleCard}
              ></input>
              <select
                className="select"
                value={option[card_id].optionValue}
                onChange={(e) => handleTarget(e, card_id)}
              >
                <option>Texto</option>
                <option>Tabla</option>
                <option>Imagen</option>
                <option>Link</option>
                <option>Archivo</option>
                <option>Fecha</option>
              </select>
            </div>
            {/* Renderizar campo del cuantas tablas y columnas*/}
            {option[card_id].optionValue === "Tabla" ? (
              <div>
                <div className="columns-row animate__animated animate__fadeIn">
                  <div>
                    <span>Cuantas columnas</span>
                    <select
                      className="select_columns"
                      value={
                        option[card_id].tabla.column === null
                          ? 1
                          : option[card_id].tabla.column[
                              option[card_id].tabla.column.length - 1
                            ]
                      }
                      onChange={(e) => handleTargetColumns(e, card_id)}
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                  <div>
                    <span>Cuantas filas</span>
                    <select
                      className="select_row"
                      value={
                        option[card_id].tabla.row === null
                          ? 1
                          : option[card_id].tabla.row[
                              option[card_id].tabla.row.length - 1
                            ]
                      }
                      onChange={(e) => handleTargetRows(e, card_id)}
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </div>
                </div>
                {/* Renderizar tabla */}
                <div className="tabla-subContainer animate__animated animate__fadeIn">
                  {option[card_id].tabla.column.map((id_column) => (
                    <div className="row" key={id_column}>
                      <div className="rows"></div>
                      {option[card_id].tabla.row.map((id_row) => (
                        <div className="column" key={id_row}>
                          <div className="columns"></div>
                          <div className="celda_type">
                            {id_row === 1 && (
                              <>
                                <div className="header_title">
                                  <input
                                    type="text"
                                    className={"celda_title_input"}
                                    defaultValue={
                                      option[card_id].tablaTypeCelda
                                        .title_columna[
                                        indexTypeCelda.indexOf(
                                          parseInt(`${id_row}${id_column}`)
                                        )
                                      ]
                                    }
                                    name={parseInt(`${id_row}${id_column}`)}
                                    onChange={(e) =>
                                      handletitleColumns(
                                        e,
                                        card_id,
                                        `${id_row}${id_column}`
                                      )
                                    }
                                    placeholder={"*Titulo de columna"}
                                  ></input>
                                </div>
                                <div className="linea"></div>
                              </>
                            )}
                            <div className="celda_list animate__animated animate__fadeIn">
                              {/* Renderizar campo del select para cada tipo de celda */}
                              <select
                                className="select_columns"
                                value={
                                  option[card_id].tablaTypeCelda.celda[
                                    indexTypeCelda.indexOf(
                                      parseInt(`${id_row}${id_column}`)
                                    )
                                  ]
                                }
                                onChange={(e) =>
                                  handleFileValuesCelda(
                                    e,
                                    card_id,
                                    `${id_row}${id_column}`
                                  )
                                }
                              >
                                <option>Título texto</option>
                                <option>Imagen</option>
                                <option>Imagen título</option>
                                <option>Lista</option>
                                <option>Link</option>
                                <option>Fecha</option>
                              </select>
                              {option[card_id].tablaTypeCelda.celda[
                                indexTypeCelda.indexOf(
                                  parseInt(`${id_row}${id_column}`)
                                )
                              ] === "Lista" && (
                                //cuantas listas queria el usuario por celda
                                <select
                                  className="select_columns"
                                  value={
                                    option[card_id].tablaTypeCelda.lista[
                                      indexTypeCelda.indexOf(
                                        parseInt(`${id_row}${id_column}`)
                                      )
                                    ][
                                      option[card_id].tablaTypeCelda.lista[
                                        indexTypeCelda.indexOf(
                                          parseInt(`${id_row}${id_column}`)
                                        )
                                      ].length - 1
                                    ] + 1
                                  }
                                  onChange={(e) =>
                                    handleSelectList(
                                      e,
                                      card_id,
                                      `${id_row}${id_column}`
                                    )
                                  }
                                >
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                                  <option>6</option>
                                  <option>7</option>
                                </select>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="inputText">
                <div>
                  <span className="span2">Descripcion del item</span>
                  <textarea
                    rows={"3"}
                    cols={"30"}
                    className={"textarea"}
                    name={`textarea${card_id}`}
                    placeholder={"Escribe el texto"}
                    onChange={(e) => handleOnChangeText(e, card_id)}
                    defaultValue={option[card_id].text}
                  ></textarea>
                </div>
              </div>
            )}
          </div>
          <div className="add-remove">
            <AddCircleOutline className="add" onClick={handleAdd} />
            <NotInterested
              className="remove"
              onClick={(e) => handleRemove(card_id)}
            />
          </div>
          <div className="climp-down">
            <ArrowBackIos
              className="climp"
              onClick={(e) => handleClimp(card_id, e)}
            />
            <ArrowBackIos
              className="down"
              onClick={(e) => handleDown(card_id, e)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
