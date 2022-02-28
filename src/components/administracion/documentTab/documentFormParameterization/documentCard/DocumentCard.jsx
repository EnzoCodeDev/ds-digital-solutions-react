import React from "react";
//Libreria de material ui para los icons
//importacion de tipos de celda por defecto
import { indexTypeCelda } from "../../../../../helpers/typeCelda";
import { DocumentCardIndex } from "./DocumentCardIndex";
export const DocumentCard = ({
  ultime,
  option,
  setOption,
  arrayCard,
  setUltime,
  setArrayCard,
}) => {
  //Logica para agregar un nueva tarjeta
  const handleAdd = () => {
    const newArrayCard = [...arrayCard, ultime + 1];
    setArrayCard(newArrayCard);
    const optionArray = [...option];
    setOption([
      ...optionArray,
      {
        card: ultime + 1,
        optionValue: "Texto",
        titleCard: "",
        text: "",
        tabla: { column: [1], row: [1] },
        tablaTypeCelda: {
          title_columna: ["", ""],
          celda: ['', 'Título texto'],
          type: indexTypeCelda,
          lista: [[0], [0]],
        },
      },
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
      optionArrayy.splice(card_id, 1, {
        card: "inhabilidado",
      });
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
  //Que tipo de targeta es
  const handleTarget = (e, id) => {
    let optionValue = e.target.value;
    const optionInfo = [...option];
    optionInfo[id].optionValue = optionValue;
    setOption(optionInfo);
  };
  //Logica para agregar al estate cuantas columnas
  const handleTargetColumns = (e, id) => {
    let optionValue = e.target.value;
    let optionInfo = [...option];
    let arraycolumns = [];
    let arrayTypeList = [[0]];
    let arrayTypeCelda = ["0"];
    let arrayTitleCelda = [""];
    for (let i = 1; i <= optionValue; i++) {
      arraycolumns.push(i);
      arrayTypeCelda.push(
        optionInfo[id].tablaTypeCelda.celda[i] === undefined
          ? "Título texto"
          : optionInfo[id].tablaTypeCelda.celda[i]
      );
      arrayTypeList.push(
        optionInfo[id].tablaTypeCelda.lista[i] === undefined
          ? [0]
          : optionInfo[id].tablaTypeCelda.lista[i]
      );
      arrayTitleCelda.push(
        optionInfo[id].tablaTypeCelda.title_columna[i] === undefined
          ? ""
          : optionInfo[id].tablaTypeCelda.title_columna[i]
      );
    }
    optionInfo[id].tabla.column = arraycolumns;
    optionInfo[id].tablaTypeCelda.title_columna = arrayTitleCelda;
    optionInfo[id].tablaTypeCelda.lista = arrayTypeList;
    optionInfo[id].tablaTypeCelda.celda = arrayTypeCelda;
    setOption(optionInfo);
  };
  //Guardar en el state filas columnas quiere el usuario
  const handleTargetRows = (e, id) => {
    let optionValue = e.target.value;
    let optionInfo = [...option];
    let arrayRows = [];
    let arrayTypeCelda = [];
    let arrayTypeList = [];
    for (let i = 1; i <= optionValue; i++) {
      arrayRows.push(i);
    }
    //Manejo por almenos 20 columnas
    for (let i = 1; i <= optionValue * 20; i++) {
      arrayTypeCelda.push(
        optionInfo[id].tablaTypeCelda.celda[i] === undefined
          ? "Título texto"
          : optionInfo[id].tablaTypeCelda.celda[i]
      );
      arrayTypeList.push(
        optionInfo[id].tablaTypeCelda.lista[i] === undefined
          ? [0]
          : optionInfo[id].tablaTypeCelda.lista[i]
      );
    }
    optionInfo[id].tabla.row = arrayRows;
    optionInfo[id].tablaTypeCelda.celda = arrayTypeCelda;
    optionInfo[id].tablaTypeCelda.lista = arrayTypeList;
    setOption(optionInfo);
  };
  //Agregar que tipo de celda quiere cada usuario
  const handleFileValuesCelda = (e, id, parametro_opcional) => {
    let optionInfo = [...option];
    e.stopPropagation();
    optionInfo[id].tablaTypeCelda.celda[
      option[id].tablaTypeCelda.type.indexOf(parseInt(parametro_opcional))
    ] = e.target.value;
    setOption(optionInfo);
  };
  //En estos estados tenemos el value de todos los input de este formulario
  //Titulo principal de la tarjeta
  const handleOnChangeTitleCard = (e, id) => {
    let optionInfo = [...option];
    optionInfo[id].titleCard = e.target.value;
    setOption(optionInfo);
  };
  //Vigilar el estado del input del textearea
  const handleOnChangeText = (e, id) => {
    let optionInfo = [...option];
    optionInfo[id].text = e.target.value;
    setOption(optionInfo);
  };
  //Vigila que titulo de cada columna
  const handletitleColumns = (e, id, parametro_opcional) => {
    let optionInfo = [...option];
    optionInfo[id].tablaTypeCelda.title_columna[
      option[id].tablaTypeCelda.type.indexOf(parseInt(parametro_opcional))
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
    optionInfo[id].tablaTypeCelda.lista[
      option[id].tablaTypeCelda.type.indexOf(parseInt(parametro_opcional))
    ] = array;
    setOption(optionInfo);
  };
  return (
    <DocumentCardIndex
      option={option}
      arrayCard={arrayCard}
      handleAdd={handleAdd}
      handleDown={handleDown}
      handleClimp={handleClimp}
      handleTarget={handleTarget}
      handleRemove={handleRemove}
      handleSelectList={handleSelectList}
      handleTargetRows={handleTargetRows}
      handleOnChangeText={handleOnChangeText}
      handletitleColumns={handletitleColumns}
      handleTargetColumns={handleTargetColumns}
      handleFileValuesCelda={handleFileValuesCelda}
      handleOnChangeTitleCard={handleOnChangeTitleCard}
    />
  );
};
