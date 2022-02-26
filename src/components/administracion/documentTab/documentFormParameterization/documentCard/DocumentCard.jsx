import React from "react";
//Libreria de material ui para los icons
//importacion de tipos de celda por defecto
import {
  listArray,
  typeCelda,
  infoCelda,
  titleColumns,
  indexTypeCelda,
} from "../../../../../helpers/typeCelda";
import { DocumentCardIndex } from "./DocumentCardIndex";
export const DocumentCard = ({
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
