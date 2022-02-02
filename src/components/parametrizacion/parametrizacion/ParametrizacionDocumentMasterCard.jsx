import React from "react";
//Libreria de material ui para los icons
import {
  AddCircleOutline,
  NotInterested,
  ArrowBackIos,
} from "@material-ui/icons";
//importaciones de los inputs
import { InputSelect } from "../../mainInput/InputSelect";
//importacion de tipos de celda por defecto
import {
  listArray,
  typeCelda,
  infoCelda,
  titleColumns,
  indexTypeCelda,
} from "../../../helpers/typeCelda";
export const ParametrizacionDocumentMasterCard = ({
  lista,
  ultime,
  option,
  setLista,
  setOption,
  arrayCard,
  setUltime,
  listaUltime,
  setArrayCard,
  setListaUltime,
  tableColumnsTypeValue,
  handletableColumnsTypeValueChange,
}) => {
  //Logica para agregar un nueva tarjeta
  const handleAdd = () => {
    const newArrayCard = [...arrayCard, ultime + 1];
    const optionArray = [...option];
    setArrayCard(newArrayCard);
    setOption([
      ...optionArray,
      [
        {
          card: ultime + 1,
          optionValue: "Texto",
          titleCard: "",
          text: "",
          linkDescription: "",
          link: "",
          descripcionArchivo: "",
          archivo: "",
          img: "",
          heigth: { state: true },
          tabla: { column: [1], row: [1] },
          tablaTypeCelda: {
            title_columna: titleColumns,
            celda: typeCelda,
            celdaType: JSON.stringify(typeCelda),
            type: indexTypeCelda,
            lista: listArray,
            typeCeldaInfo: infoCelda,
          },
        },
      ],
    ]);
    setUltime(ultime + 1);
  };
  //Logica para remover una nueva tarjeta
  const handleRemove = (card_id) => {
    if (arrayCard.length === 1) {
      return;
    } else {
      let optionArrayy = [...option];
      let item = arrayCard.indexOf(card_id);
      arrayCard.splice(item, 1);
      optionArrayy.splice(card_id, 1, [
        {
          card: "inhabilidado",
          optionValue: "no",
          titleCard: "no",
          linkDescription: "",
          link: "no",
          descripcionArchivo: "",
          archivo: "",
          img: "no",
          text: "no",
          heigth: { state: true },
          tabla: { column: "no", row: "no" },
          tablaTypeCelda: {
            title_columna: titleColumns,
            celda: [],
            celdaType: JSON.stringify(typeCelda),
            type: indexTypeCelda,
            lista: listArray,
          },
        },
      ]);
      setOption([...optionArrayy]);
      setArrayCard([...arrayCard]);
    }
  };
  //Logica para cambiar de posicion para subirla
  const handleClimp = (card_id) => {
    const item = arrayCard.indexOf(card_id);
    const posicion = arrayCard[item];
    const posicion2 = arrayCard[item - 1];
    if (posicion2 === undefined) {
      return;
    } else {
      arrayCard[item] = posicion2;
      arrayCard[item - 1] = posicion;
      setArrayCard([...arrayCard]);
    }
  };
  //Logica para cambiar de posicion para bajarla
  const handleDown = (card_id) => {
    const item = arrayCard.indexOf(card_id);
    const posicion = arrayCard[item];
    const posicion2 = arrayCard[item + 1];
    if (posicion2 === undefined) {
      return;
    } else {
      arrayCard[item] = posicion2;
      arrayCard[item + 1] = posicion;
      setArrayCard([...arrayCard]);
    }
  };
  //Esta logica es para agregar el estado la opcion del formulario
  //Y que tipo de datos y datos se han insertado
  const handleTarget = (e, id) => {
    let optionValue = e.target.value;
    const optionInfo = [...option];
    //Validaciones para restaurar los tipos de datos requeridos por el usuario
    if (optionValue === "Texto") {
      optionInfo[id][0].optionValue = optionValue;
      optionInfo[id][0].heigth.state = true;
      setOption(optionInfo);
    }
    if (optionValue === "Tabla") {
      optionInfo[id][0].optionValue = optionValue;
      optionInfo[id][0].heigth.state = true;
      setOption(optionInfo);
    }
    if (optionValue === "Imagen") {
      optionInfo[id][0].optionValue = optionValue;
      optionInfo[id][0].heigth.state = false;
      setOption(optionInfo);
    }
    if (optionValue === "Link") {
      optionInfo[id][0].optionValue = optionValue;
      optionInfo[id][0].heigth.state = false;
      setOption(optionInfo);
    }
    if (optionValue === "Archivo") {
      optionInfo[id][0].optionValue = optionValue;
      optionInfo[id][0].heigth.state = false;
      setOption(optionInfo);
    }
    if (optionValue === "Fecha") {
      optionInfo[id][0].optionValue = optionValue;
      optionInfo[id][0].heigth.state = false;
      setOption(optionInfo);
    }
  };
  //Logica para agregar al estate cuantas columnas
  const handleTargetColumns = (e, id) => {
    let optionValue = e.target.value;
    let optionInfo = [...option];
    const arraycolumns = [];
    for (let i = 1; i <= optionValue; i++) {
      arraycolumns.push(i);
    }
    optionInfo[id][0].tabla.column = arraycolumns;
    let number = optionInfo[id][0].tabla.row.length * 10;
    let arrayTypeColumns = [];
    arrayTypeColumns.push("0");
    for (let i = 1; i <= number; i++) {
      arrayTypeColumns.push(
        optionInfo[id][0].tablaTypeCelda.celda[i] === undefined
          ? "Título texto"
          : optionInfo[id][0].tablaTypeCelda.celda[i]
      );
    }
    optionInfo[id][0].tablaTypeCelda.celda = arrayTypeColumns;
    let arrayTypeList = [];
    arrayTypeList.push([0]);
    for (let i = 1; i <= number; i++) {
      arrayTypeList.push(
        optionInfo[id][0].tablaTypeCelda.lista[i] === undefined
          ? [0]
          : optionInfo[id][0].tablaTypeCelda.lista[i]
      );
    }
    optionInfo[id][0].tablaTypeCelda.lista = arrayTypeList;
    let arrayTypeCeldaInfo = [];
    for (let i = 0; i <= number; i++) {
      arrayTypeCeldaInfo.push({
        celda: "",
        titleColumna: "",
        titleCelda: "",
        textDescription: "",
        link: "",
        linkDescription: "",
        img: "",
        lista: ["", "", "", "", "", "", "", "", "", ""],
      });
    }
    optionInfo[id][0].tablaTypeCelda.typeCeldaInfo = [arrayTypeCeldaInfo];
    setOption(optionInfo);
  };
  //Guardar en el state filas columnas quiere el usuario
  const handleTargetRows = (e, id) => {
    let optionValue = e.target.value;
    let optionInfo = [...option];
    const arrayRows = [];
    for (let i = 1; i <= optionValue; i++) {
      arrayRows.push(i);
    }
    optionInfo[id][0].tabla.row = arrayRows;
    //Si se van agregar mas columnas o filas en la tabla validar esta multiplicacion
    //Ya que esta multiplicacion identifica el valor de cuantas filas multiplicado por 10
    //Que es maximo de columnas si quieres mas columnas aumenta el resultado
    //Se hixo con el fin de un bug que es del recorrer los datos no dan y a la hora de guardar no guardan bien.
    //Tambien para evitar gastar recursos en la base de datos
    let number = optionInfo[id][0].tabla.row.length * 10;
    let arrayTypeColumns = [];
    for (let i = 0; i <= number; i++) {
      arrayTypeColumns.push(
        optionInfo[id][0].tablaTypeCelda.celda[i] === undefined
          ? "Título texto"
          : optionInfo[id][0].tablaTypeCelda.celda[i]
      );
    }
    optionInfo[id][0].tablaTypeCelda.celda = arrayTypeColumns;
    let arrayTypeList = [];
    arrayTypeList.push([0]);
    for (let i = 0; i <= number; i++) {
      arrayTypeList.push(
        optionInfo[id][0].tablaTypeCelda.lista[i] === undefined
          ? [0]
          : optionInfo[id][0].tablaTypeCelda.lista[i]
      );
    }
    optionInfo[id][0].tablaTypeCelda.lista = arrayTypeList;
    let arrayTypeCeldaInfo = [];
    for (let i = 0; i <= number; i++) {
      arrayTypeCeldaInfo.push({
        celda: "",
        titleColumna: "",
        titleCelda: "",
        textDescription: "",
        link: "",
        linkDescription: "",
        img: "",
        lista: ["", "", "", "", "", "", "", "", "", ""],
      });
    }
    optionInfo[id][0].tablaTypeCelda.typeCeldaInfo = [arrayTypeCeldaInfo];
    setOption(optionInfo);
  };
  //Agregar que tipo de celda quiere cada usuario
  const handleFileValuesCelda = (e, id, parametro_opcional) => {
    let optionInfo = [...option];
    e.stopPropagation();
    optionInfo[id][0].tablaTypeCelda.celda[
      option[id][0].tablaTypeCelda.type.indexOf(parseInt(parametro_opcional))
    ] = e.target.value;
    optionInfo[id][0].tablaTypeCelda.celdaType = JSON.stringify([
      ...optionInfo[id][0].tablaTypeCelda.celda,
    ]);
    setOption(optionInfo);
  };
  //En estos estados tenemos el value de todos los input de este formulario
  //Titulo principal de la tarjeta
  const handleOnChangeTitleCard = (e, id) => {
    let optionInfo = [...option];
    optionInfo[id][0].titleCard = e.target.value;
    setOption(optionInfo);
  };
  //Vigilar el estado del input del textearea
  const handleOnChangeText = (e, id) => {
    let optionInfo = [...option];
    optionInfo[id][0].text = e.target.value;
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
  //Guardar que tipo de lista por celda
  const handleSelectList = (e, id, parametro_opcional) => {
    e.stopPropagation();
    let optionInfo = [...option];
    let array = [];
    for (let i = 0; i < e.target.value; i++) {
      array.push(i);
    }
    optionInfo[id][0].tablaTypeCelda.lista[
      option[id][0].tablaTypeCelda.type.indexOf(parseInt(parametro_opcional))
    ] = array;
    setOption(optionInfo);
  };
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
          <div
            className={
              "container-card " + (option[card_id][0].heigth.state && "active")
            }
          >
            <div className="header-card">
              {option[card_id][0].titleCard.length === 0 ? (
                <h3>Ingresa la descripción aquí</h3>
              ) : (
                <h3>{option[card_id][0].titleCard}</h3>
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
                defaultValue={option[card_id][0].titleCard}
              ></input>
              <InputSelect
                id={card_id}
                className={"select"}
                name={"optionValue"}
                onclick={handleTarget}
                selected={option[card_id][0].optionValue}
                option={[
                  "Texto",
                  "Tabla",
                  "Imagen",
                  "Link",
                  "Archivo",
                  "Fecha",
                ]}
              />
            </div>
            {/* Renderizar campo del texto */}
            {option[card_id][0].optionValue === "Texto" && (
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
                    defaultValue={option[card_id][0].text}
                  ></textarea>
                </div>
              </div>
            )}
            {/* Renderizar campo de las imagenes*/}
            {option[card_id][0].optionValue === "Imagen" && (
              <div className="inputImg">
                <div>
                  <span className="span2">Descripcion del item</span>
                  <textarea
                    rows={"3"}
                    cols={"30"}
                    className={"textarea"}
                    name={`textarea${card_id}`}
                    placeholder={"Escribe el texto"}
                    onChange={(e) => handleOnChangeText(e, card_id)}
                    defaultValue={option[card_id][0].text}
                  ></textarea>
                </div>
              </div>
            )}
            {/* Renderizar campo del link*/}
            {option[card_id][0].optionValue === "Link" && (
              <div className="inputLink">
                <div>
                  <span className="span2">Descripcion del item</span>
                  <textarea
                    rows={"3"}
                    cols={"30"}
                    className={"textarea"}
                    name={`textarea${card_id}`}
                    placeholder={"Escribe el texto"}
                    onChange={(e) => handleOnChangeText(e, card_id)}
                    defaultValue={option[card_id][0].text}
                  ></textarea>
                </div>
              </div>
            )}
            {/* Renderizar campo del archivo*/}
            {option[card_id][0].optionValue === "Archivo" && (
              <div className="inputFile">
                <div>
                  <span className="span2">Descripcion del item</span>
                  <textarea
                    rows={"3"}
                    cols={"30"}
                    className={"textarea"}
                    name={`textarea${card_id}`}
                    placeholder={"Escribe el texto"}
                    onChange={(e) => handleOnChangeText(e, card_id)}
                    defaultValue={option[card_id][0].text}
                  ></textarea>
                </div>
              </div>
            )}
            {/* Renderizar campo del Fecha*/}
            {option[card_id][0].optionValue === "Fecha" && (
              <div className="inputFecha">
                <div>
                  <span className="span2">Descripcion del item</span>
                  <textarea
                    rows={"3"}
                    cols={"30"}
                    className={"textarea"}
                    name={`textarea${card_id}`}
                    placeholder={"Escribe el texto"}
                    onChange={(e) => handleOnChangeText(e, card_id)}
                    defaultValue={option[card_id][0].text}
                  ></textarea>
                </div>
              </div>
            )}
            {/* Renderizar campo del cuantas tablas y columnas*/}
            {option[card_id][0].optionValue === "Tabla" && (
              <div>
                <div className="columns-row animate__animated animate__fadeIn">
                  <div>
                    <span>Cuantas columnas</span>
                    <InputSelect
                      id={card_id}
                      className={"select_columns"}
                      onclick={handleTargetColumns}
                      name={`tableColums${card_id}`}
                      selected={
                        option[card_id][0].tabla.column === null
                          ? 1
                          : option[card_id][0].tabla.column[
                              option[card_id][0].tabla.column.length - 1
                            ]
                      }
                      option={["1", "2", "3", "4", "5"]}
                    />
                  </div>
                  <div>
                    <span>Cuantas filas</span>
                    <InputSelect
                      id={card_id}
                      className={"select_row"}
                      selected={
                        option[card_id][0].tabla.row === null
                          ? 1
                          : option[card_id][0].tabla.row[
                              option[card_id][0].tabla.row.length - 1
                            ]
                      }
                      option={["1", "2", "3", "N"]}
                      onclick={handleTargetRows}
                      name={`tableRows${card_id}`}
                    />
                  </div>
                </div>
                {/* Renderizar tabla */}
                {option[card_id][0].optionValue === "Tabla" && (
                  <div className="tabla-subContainer animate__animated animate__fadeIn">
                    {option[card_id][0].tabla.column.map((id_column) => (
                      <div className="row" key={id_column}>
                        <div className="rows"></div>
                        {option[card_id][0].tabla.row.map((id_row) => (
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
                                        option[card_id][0].tablaTypeCelda
                                          .title_columna[
                                          option[
                                            card_id
                                          ][0].tablaTypeCelda.type.indexOf(
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
                                <InputSelect
                                  id={card_id}
                                  selected={
                                    option[card_id][0].tablaTypeCelda.celda[
                                      option[
                                        card_id
                                      ][0].tablaTypeCelda.type.indexOf(
                                        parseInt(`${id_row}${id_column}`)
                                      )
                                    ]
                                  }
                                  className={"select_columns"}
                                  onclick={handleFileValuesCelda}
                                  name={`${`${id_row}${id_column}`}`}
                                  onChange={handletableColumnsTypeValueChange}
                                  parametro_opcional={`${id_row}${id_column}`}
                                  option={[
                                    "Título texto",
                                    "Imagen",
                                    "Imagen título",
                                    "Lista",
                                    "Link",
                                    "Fecha",
                                  ]}
                                />
                                {option[card_id][0].tablaTypeCelda.celda[
                                  option[
                                    card_id
                                  ][0].tablaTypeCelda.type.indexOf(
                                    parseInt(`${id_row}${id_column}`)
                                  )
                                ] === "Lista" && (
                                  //cuantas listas queria el usuario por celda
                                  <InputSelect
                                    id={card_id}
                                    onclick={handleSelectList}
                                    className={"select_columns"}
                                    selected={
                                      option[card_id][0].tablaTypeCelda.lista[
                                        option[
                                          card_id
                                        ][0].tablaTypeCelda.type.indexOf(
                                          parseInt(`${id_row}${id_column}`)
                                        )
                                      ][
                                        option[card_id][0].tablaTypeCelda.lista[
                                          option[
                                            card_id
                                          ][0].tablaTypeCelda.type.indexOf(
                                            parseInt(`${id_row}${id_column}`)
                                          )
                                        ].length - 1
                                      ] + 1
                                    }
                                    name={`${`${id_row}${id_column}`}`}
                                    option={["1", "2", "3", "4", "5", "6", "7"]}
                                    parametro_opcional={`${id_row}${id_column}`}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
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
