import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
// import { Print } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { indexTypeCelda } from "../../../../helpers/typeCelda";
import { DocumentViewIndex } from "./DocumentViewIndex";
export const DocumentView = () => {
  const [codigo, setCodigo] = useState("");
  const [formato, setFormato] = useState("");
  const [template, setTemplate] = useState("");
  const [description, setDescription] = useState("");
  let token = localStorage.getItem("token_bearer");
  const { uuid } = useParams();
  const baseUrl = process.env.REACT_APP_API_URL;
  const [dataView, setDataView] = useState({
    res: false,
    DocumentMasterHead: {
      data_basic: null,
      version: 0,
    },
  });
  //Traer ek datos
  useEffect(() => {
    if (uuid) {
      let token = localStorage.getItem("token_bearer");
      axios
        .get(`${baseUrl}/parametrizacion/index/${uuid}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          setDataView(response.data);
        })
        .catch(function (response) {
          console.log(response);
          Swal.fire(
            "Error",
            "Hubo un error al consultar el formulario , por favor verificalo",
            "error"
          );
        });
    }
  }, [uuid, baseUrl]);
  //Inicial state nuevo documento
  const inicialStateOption = [
    {
      card: "inhabilidado",
    },
  ];
  //Inicial estate de los estados de la tarjetas de los datos basicos
  const initialStateDataBasic = [
    [
      {
        id: 1,
        type: "Select",
        title: "Proceso",
        option: "Lorem ipsum dolor",
      },
    ],
    [
      {
        id: 2,
        type: "Select",
        title: "Subproceso",
        option: "Lorem ipsum dolor",
      },
    ],
  ];
  //Traer los estados globales de los state
  let { aplicar, name, identity } = useSelector(
    (state) => state.infoUserDeligenciar.infoUser
  );
  const { img_header } = useSelector((state) => state.auth);
  //Manejo de fechas
  //Use state de la cabeza del formulario
  //Manejo de que tipo de informacion quiere insertar el usuario en las tarjetas
  const [option, setOption] = useState(inicialStateOption);
  //Manejo de las tarjetas
  const [arrayCard, setArrayCard] = useState([1]);
  //Manejo de los datos basicos del documento de cada tarjetas
  const [dataBasic, setDataBasic] = useState(initialStateDataBasic);
  //Manejo del id de cada tarjeta del proceso
  const [dataBasicCount, setDataBasicCount] = useState([]);
  //Manejo de los procesos
  const [procesos, setProcesos] = useState([]);
  //Manejo de los subProcesos
  const [subProceso, setSubProceso] = useState([]);
  //Manejo del estado de la aplicacion de documento en general o a usuario
  const [aplicarState, setAplicar] = useState(aplicar);
  //Manejo de identificacion
  const [identificacion, setIdentificacion] = useState(identity);
  //manejo de nombre
  const [nombre, setNombre] = useState(name);
  //Renderizado de los datos basicos de la aplicacion
  //Renderizado de los datos basicos de la aplicacion
  useEffect(() => {
    if (dataView.res === "success_view") {
      let array = [];
      if (dataView.DocumentMasterHead.data_basic === null) {
      } else {
        array.push(...JSON.parse(dataView.DocumentMasterHead.data_basic));
        setDataBasicCount(
          JSON.parse(dataView.DocumentMasterHead.position_data_basic)
        );
        setDataBasic([...array]);
      }
    }
  }, [
    dataView.res,
    dataView.DocumentMasterHead.data_basic,
    dataView.DocumentMasterHead.position_data_basic,
  ]);
  //Renderizar los datos de la tarjeta de la aplicacion
  //Renderizar los datos de la tarjeta de la aplicacion
  useEffect(() => {
    let arrayOptioValue = [
      {
        card: "inhabilidado",
      },
    ];
    if (dataView.res === "success_view") {
      //Renderiazado de los datos de la cabeza del formulario
      setCodigo(dataView.DocumentMasterHead.code);
      setFormato(dataView.DocumentMasterHead.format);
      setTemplate(dataView.DocumentMasterHead.template);
      setDescription(dataView.DocumentMasterHead.description);
      //renderizado de los datos de las tarjetas
      dataView.DocumentMasterBody.map(function (DocumentMasterBody) {
        let titles = JSON.parse(DocumentMasterBody.title_columns) || [];
        let tablas = {};
        let title = ["", "Título texto"];
        let listas = [[0], [0]];
        let infoCelda = [];
        for (let r = 0; r < 5 * 20; r++) {
          infoCelda.push({
            celda: "",
            titleCelda: "",
            titleColumna: "",
            textDescription: "",
            link: "",
            linkDescription: "",
            img: null,
            lista: ["", "", "", "", "", "", "", "", "", ""],
          });
        }
        //Renderizados de las tablas si vienen
        for (let i = 0; i < dataView.DocumentMasterBodyTable.length; i++) {
          if (
            DocumentMasterBody.id ===
            dataView.DocumentMasterBodyTable[i].id_card
          ) {
            title[
              indexTypeCelda.indexOf(
                parseInt(dataView.DocumentMasterBodyTable[i].index_table)
              )
            ] = dataView.DocumentMasterBodyTable[i].type_celda;
            listas[
              indexTypeCelda.indexOf(
                parseInt(dataView.DocumentMasterBodyTable[i].index_table)
              )
            ] = JSON.parse(dataView.DocumentMasterBodyTable[i].type_lista);
          }
        }
        tablas = {
          title_columna: ["", ...titles],
          celda: title,
          lista: listas,
          typeCeldaInfo: infoCelda,
        };
        return arrayOptioValue.push({
          card_id: DocumentMasterBody.id,
          card: DocumentMasterBody.number_card,
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
          tablaTypeCelda: tablas,
        });
      });
      setOption(arrayOptioValue);
      setArrayCard(JSON.parse(dataView.DocumentMasterHead.position));
    }
    //Ognorando dependencias para que solo se llame una vez
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dataView.res,
    dataView.DocumentMasterHead.data_basic,
    dataView.DocumentMasterHead.position_data_basic,
  ]);
  useEffect(() => {
    axios
      .get(`${baseUrl}/datos/index/process/all`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setProcesos(response.data.procesos);
      })
      .catch(function (response) {
        console.log(response);
      });
  }, [baseUrl, token]);
  //Manejar el select de procesos para traer los sub procesos mediante peticion axios
  const handleValueProceso = (e, id) => {
    let opcionData = [...dataBasic];
    opcionData[id - 1][0].option = e.target.value;
    setDataBasic(opcionData);
    axios
      .get(`${baseUrl}/datos/index/Subprocess/${e.target.value}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        //validar los datos con los que vienen
        let opcionData = [...dataBasic];
        if (response.data.sub_procesos.length === 0) {
          opcionData[1][0].option = "";
        }
        setSubProceso(response.data.sub_procesos);
      })
      .catch(function (response) {
        console.log(response);
      });
    setDataBasic(opcionData);
  };
  //Vigilar el estado del sub proceso
  const handleValueSubProceso = (e, id) => {
    let opcionData = [...dataBasic];
    opcionData[id - 1][0].option = e.target.value;
    setDataBasic(opcionData);
  };
  //Vigilar el estado de la caja del texto los datos basicos
  const handleValueText = (e, id) => {
    let opcionData = [...dataBasic];
    opcionData[id - 1][0].info = e.target.value;
    setDataBasic(opcionData);
  };
  //Vigilar el estado de dato basico tipo fecha
  const handleValueDate = (e, id) => {
    let opcionData = [...dataBasic];
    opcionData[id - 1][0].info = e.target.value;
    setDataBasic(opcionData);
  };
  //vigilar el estado del dato basico tipo link
  const handleValueLink = (e, id) => {
    let opcionData = [...dataBasic];
    opcionData[id - 1][0].link = e.target.value;
    setDataBasic(opcionData);
  };
  //Manejo para aplicar documento en general o a usuario
  const handleValueAplicar = (e) => {
    setAplicar(e.target.value);
  };
  //Manejo de la identificacion del usuario
  const handleIdentificacion = (e) => {
    setIdentificacion(e.target.value);
  };
  //Manejo del nombre del usuario
  const handleNombre = (e) => {
    setNombre(e.target.value);
  };
  //Vigilar los estados de los input de descripcion del texto
  const handleOnChangeText = (e, id) => {
    let optionInfo = [...option];
    optionInfo[id].textDescription = e.target.value;
    setOption(optionInfo);
  };
  //Vigilar el estado del input del link descripcion
  const handleDescripcionLinkChange = (e, id) => {
    let optionInfo = [...option];
    optionInfo[id].linkDescription = e.target.value;
    setOption(optionInfo);
  };
  //Vigilar el estado del input link
  const handleOnchangeLink = (e, id) => {
    let optionInfo = [...option];
    optionInfo[id].link = e.target.value;
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
      }
      //Validar tamaño de la imagen en MB
      var tamano = 5;
      if (archive.size / 1048576 > tamano) {
        alert("El archivo no puede superar los " + tamano + "MB");
        return;
      }
      //Convertir imagen a base 64
      let reader = new FileReader();
      reader.readAsDataURL(archive);
      reader.onload = function () {
        let base64 = reader.result;
        optionInfo[id].img = base64;
        optionInfo[id].img_extesion =
          extensiones_permitidas[extensiones_permitidas.indexOf(extension)];
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
      }
      //Validar tamaño del archivo en MB
      var tamano = 10;
      if (archive.size / 1048576 > tamano) {
        alert("El archivo no puede superar los " + tamano + "MB");
        return;
      }
      //Convertir imagen a base 64
      let reader = new FileReader();
      reader.readAsDataURL(archive);
      reader.onload = function () {
        let base64 = reader.result;
        //Archivo
        optionInfo[id].archivo = base64;
        //Extension
        optionInfo[id].archivo_extesion =
          extensiones_permitidas[extensiones_permitidas.indexOf(extension)];
        setOption(optionInfo);
      };
    });
  };
  //Vigilar el estado de la tarjeta tipo fecha
  const handleDate = (e, id) => {
    let optionInfo = [...option];
    optionInfo[id].date = e.target.value;
    setOption(optionInfo);
  };
  //Vigilar el estado de cada titulo de cada celda
  const handletitleCelda = (e, id, parametro_opcional) => {
    let optionInfo = [...option];
    optionInfo[id].tablaTypeCelda.typeCeldaInfo[
      indexTypeCelda.indexOf(parseInt(parametro_opcional))
    ].titleCelda = e.target.value;
    setOption(optionInfo);
  };
  //vigilar el estado del text de cada celda
  const handletextCelda = (e, id, parametro_opcional) => {
    let optionInfo = [...option];
    optionInfo[id].tablaTypeCelda.typeCeldaInfo[
      indexTypeCelda.indexOf(parseInt(parametro_opcional))
    ].textDescription = e.target.value;
    setOption(optionInfo);
  };
  //Vigilar el estado de cada de cada lista de la celda
  const handleOnChangeTextList = (e, id, listCelda, parametro_opcional) => {
    let optionInfo = [...option];
    optionInfo[id].tablaTypeCelda.typeCeldaInfo[
      indexTypeCelda.indexOf(parseInt(parametro_opcional))
    ].lista[listCelda] = e.target.value;
    setOption(optionInfo);
  };
  //Vigilar el estado del link de cada celda
  const handleLink = (e, id, parametro_opcional) => {
    let optionInfo = [...option];
    optionInfo[id].tablaTypeCelda.typeCeldaInfo[
      indexTypeCelda.indexOf(parseInt(parametro_opcional))
    ].link = e.target.value;
    setOption(optionInfo);
  };
  //Vigilar el estado de cada descripcion del link de cada celda
  const handleLinkDescription = (e, id, parametro_opcional) => {
    let optionInfo = [...option];
    optionInfo[id].tablaTypeCelda.typeCeldaInfo[
      indexTypeCelda.indexOf(parseInt(parametro_opcional))
    ].linkDescription = e.target.value;
    setOption(optionInfo);
  };
  //Logica para guardar para convertir la imagen de la tabla a archivo 64
  const converterFileBase64Table = (e, id, parametro_opcional) => {
    let optionInfo = [...option];
    var extensiones_permitidas = [".png", ".jpg", ".jpeg"];
    Array.from(e.target.files).forEach((archive) => {
      var ultimo_punto = archive.name.lastIndexOf(".");
      var extension = archive.name.slice(ultimo_punto, archive.name.length);
      if (extensiones_permitidas.indexOf(extension) === -1) {
        alert("Extensión de imagen no valida");
        return;
      }
      //Validar tamaño de la imagen en MB
      var tamano = 5;
      if (archive.size / 1048576 > tamano) {
        alert("El archivo no puede superar los " + tamano + "MB");
        return;
      }
      //Convertir imagen a base 64
      let reader = new FileReader();
      reader.readAsDataURL(archive);
      reader.onload = function () {
        let base64 = reader.result;
        optionInfo[id].tablaTypeCelda.typeCeldaInfo[
          indexTypeCelda.indexOf(parseInt(parametro_opcional))
        ].img = base64;
        optionInfo[id].tablaTypeCelda.typeCeldaInfo[
          indexTypeCelda.indexOf(parseInt(parametro_opcional))
        ].img_extension =
          extensiones_permitidas[extensiones_permitidas.indexOf(extension)];
        setOption(optionInfo);
      };
    });
  };
  //Guarda informacion
  const handleSaveInfo = () => {
    //Validar todos los datos de la aplicacion
    if (
      dataBasic[0][0].option === "Lorem ipsum dolor" ||
      dataBasic[0][0].option === "0"
    ) {
      Swal.fire("Falta el proceso", `Falta el proceso del documento`, "error");
      return;
    }
    if (
      dataBasic[1][0].option === "Lorem ipsum dolor" ||
      dataBasic[1][0].option === "0" ||
      dataBasic[1][0].option.length === 0
    ) {
      Swal.fire(
        "Falta el subproceso",
        `Falta el subproceso del documento`,
        "error"
      );
      return;
    }
    for (let i = 0; i < dataBasicCount.length; i++) {
      if (dataBasic[dataBasicCount[i] - 1][0].type === "Texto") {
        if (
          dataBasic[dataBasicCount[i] - 1][0].info === null ||
          dataBasic[dataBasicCount[i] - 1][0].info.trim() === ""
        ) {
          Swal.fire(
            "Error",
            "Falta la descripción de uno de los datos basicos tipo texto",
            "error"
          );
          return;
        }
      }
      if (dataBasic[dataBasicCount[i] - 1][0].type === "Link") {
        if (
          dataBasic[dataBasicCount[i] - 1][0].link === undefined ||
          dataBasic[dataBasicCount[i] - 1][0].link.trim() === ""
        ) {
          Swal.fire(
            "Error",
            "Falta el link en uno de los datos basicos",
            "error"
          );
          return;
        }
      }
    }
    if (aplicarState === "2") {
      if (nombre.trim().length === 0) {
        Swal.fire(
          "Falta información del usuario",
          `Falta el nombre del usuario para aplicar el documento`,
          "error"
        );
        return;
      }
      if (identificacion.trim().length === 0) {
        Swal.fire(
          "Falta información del usuario",
          `Falta la identificacion del usuario para aplicar el documento`,
          "error"
        );
        return;
      }
    }
    for (let i = 0; i < option.length; i++) {
      if (option[i].optionValue !== "undefined") {
        if (option[i].optionValue === "Texto") {
          if (
            option[i].textDescription === undefined ||
            option[i].textDescription.trim() === ""
          ) {
            Swal.fire(
              "Falta la descripción",
              `Falta la descripción de una de una de la(s) cajas tipo ${option[i].optionValue}`,
              "error"
            );
            return;
          }
        }
        if (option[i].optionValue === "Imagen") {
          if (option[i].img === undefined) {
            Swal.fire(
              "Falta la imagen",
              `Falta cargar la imagen de una de la(s) cajas tipo ${option[i].optionValue}`,
              "error"
            );
            return;
          }
        }
        if (option[i].optionValue === "Link") {
          if (option[i].link === undefined || option[i].link.trim() === "") {
            Swal.fire(
              "Falta el enlace",
              `Falta el enlace del link de una de la(s) cajas tipo ${option[i].optionValue}`,
              "error"
            );
            return;
          }
          if (
            option[i].linkDescription === undefined ||
            option[i].linkDescription.trim() === ""
          ) {
            Swal.fire(
              "Falta la descripción",
              `Falta la descripción del link de una de la(s) cajas tipo ${option[i].optionValue}`,
              "error"
            );
            return;
          }
        }
        if (option[i].optionValue === "Archivo") {
          if (option[i].archivo === undefined) {
            Swal.fire(
              "Falta el archivo",
              `Falta el archivo de una de la(s) cajas tipo ${option[i].optionValue}`,
              "error"
            );
            return;
          }
        }
        if (option[i].optionValue === "Fecha") {
          if (option[i].date === undefined || option[i].date.trim() === "") {
            Swal.fire(
              "Falta la fecha",
              `Falta la fecha de una de la(s) cajas tipo ${option[i].optionValue}`,
              "error"
            );
            return;
          }
        }
        //Logica para la tabla no le falte ni un solo dato es un poco compleja por la parte dinamica
        if (option[i].optionValue === "Tabla") {
          //Cuantas columnas hay
          let arrayTable = [];
          for (let c = 1; c < option[i].tabla.column.length + 1; c++) {
            //cuantas filas hay
            for (let r = 1; r < option[i].tabla.row.length + 1; r++) {
              //Validar  celda tipo titulo texto
              if (
                option[i].tablaTypeCelda.celda[
                  indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                ] === "Título texto"
              ) {
                if (
                  option[i].tablaTypeCelda.typeCeldaInfo[
                    indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                  ].titleCelda === null ||
                  option[i].tablaTypeCelda.typeCeldaInfo[
                    indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                  ].titleCelda.trim() === ""
                ) {
                  Swal.fire(
                    "Falta el titulo",
                    `Falta el titulo de una de la(s) celdas`,
                    "error"
                  );
                  return;
                }
                if (
                  option[i].tablaTypeCelda.typeCeldaInfo[
                    indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                  ].textDescription === null ||
                  option[i].tablaTypeCelda.typeCeldaInfo[
                    indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                  ].textDescription.trim() === ""
                ) {
                  Swal.fire(
                    "Falta la descripción",
                    `Falta la descripción de una de la(s) celdas`,
                    "error"
                  );
                  return;
                }
                arrayTable.push({
                  type: "Título texto",
                  index: parseInt(`${r}${c}`),
                  titleCelda:
                    option[i].tablaTypeCelda.typeCeldaInfo[
                      indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                    ].titleCelda,
                  textDescription:
                    option[i].tablaTypeCelda.typeCeldaInfo[
                      indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                    ].textDescription,
                });
              }
              //Validar celda tipo imagen
              if (
                option[i].tablaTypeCelda.celda[
                  indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                ] === "Imagen"
              ) {
                if (
                  option[i].tablaTypeCelda.typeCeldaInfo[
                    indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                  ].img === null ||
                  option[i].tablaTypeCelda.typeCeldaInfo[
                    indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                  ].img.trim() === ""
                ) {
                  Swal.fire(
                    "Falta el imagen",
                    `Falta la imagen en una de la(s) celdas`,
                    "error"
                  );
                  return;
                }
                arrayTable.push({
                  type: "Imagen",
                  index: parseInt(`${r}${c}`),
                  img: option[i].tablaTypeCelda.typeCeldaInfo[
                    indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                  ].img,
                  img_extesion:
                    option[i].tablaTypeCelda.typeCeldaInfo[
                      indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                    ].img_extension,
                });
              }
              //Validar celda tipo titulo imagen
              if (
                option[i].tablaTypeCelda.celda[
                  indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                ] === "Imagen título"
              ) {
                if (
                  option[i].tablaTypeCelda.typeCeldaInfo[
                    indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                  ].titleCelda === null ||
                  option[i].tablaTypeCelda.typeCeldaInfo[
                    indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                  ].titleCelda.trim() === ""
                ) {
                  Swal.fire(
                    "Falta el titulo",
                    `Falta el titulo de una de la(s) celdas tipo titulo imagen`,
                    "error"
                  );
                  return;
                }
                if (
                  option[i].tablaTypeCelda.typeCeldaInfo[
                    indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                  ].img === null ||
                  option[i].tablaTypeCelda.typeCeldaInfo[
                    indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                  ].img.trim() === ""
                ) {
                  Swal.fire(
                    "Falta la imagen",
                    `Falta la imagen de una de la(s) celdas`,
                    "error"
                  );
                  return;
                }
                arrayTable.push({
                  type: "Imagen titulo",
                  index: parseInt(`${r}${c}`),
                  titleCelda:
                    option[i].tablaTypeCelda.typeCeldaInfo[
                      indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                    ].titleCelda,
                  img: option[i].tablaTypeCelda.typeCeldaInfo[
                    indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                  ].img,
                  img_extesion:
                    option[i].tablaTypeCelda.typeCeldaInfo[
                      indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                    ].img_extension,
                });
              }
              //validar celda tipo link
              if (
                option[i].tablaTypeCelda.celda[
                  indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                ] === "Link"
              ) {
                if (
                  option[i].tablaTypeCelda.typeCeldaInfo[
                    indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                  ].link === null ||
                  option[i].tablaTypeCelda.typeCeldaInfo[
                    indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                  ].link.trim() === ""
                ) {
                  Swal.fire(
                    "Falta el enlace",
                    `Falta el enlace en una de la(s) celdas`,
                    "error"
                  );
                  return;
                }
                if (
                  option[i].tablaTypeCelda.typeCeldaInfo[
                    indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                  ].linkDescription === null ||
                  option[i].tablaTypeCelda.typeCeldaInfo[
                    indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                  ].linkDescription.trim() === ""
                ) {
                  Swal.fire(
                    "Falta la descripción",
                    `Falta la descripción de un enlace de una de la(s) celdas`,
                    "error"
                  );
                  return;
                }
                arrayTable.push({
                  type: "link",
                  index: parseInt(`${r}${c}`),
                  link: option[i].tablaTypeCelda.typeCeldaInfo[
                    indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                  ].link,
                  linkDescription:
                    option[i].tablaTypeCelda.typeCeldaInfo[
                      indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                    ].linkDescription,
                });
              }
              //Validar celda tipo fecha
              if (
                option[i].tablaTypeCelda.celda[
                  indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                ] === "Fecha"
              ) {
                if (
                  option[i].tablaTypeCelda.typeCeldaInfo[
                    indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                  ].titleCelda === null ||
                  option[i].tablaTypeCelda.typeCeldaInfo[
                    indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                  ].titleCelda.trim() === ""
                ) {
                  Swal.fire(
                    "Falta el titulo",
                    `Falta el titulo de una de la(s) celdas tipo fecha`,
                    "error"
                  );
                  return;
                }
                if (
                  option[i].tablaTypeCelda.typeCeldaInfo[
                    indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                  ].textDescription === null ||
                  option[i].tablaTypeCelda.typeCeldaInfo[
                    indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                  ].textDescription.trim() === ""
                ) {
                  Swal.fire(
                    "Falta la fecha",
                    `Falta la fecha de una de la(s) celdas`,
                    "error"
                  );
                  return;
                }
                arrayTable.push({
                  type: "fecha",
                  index: parseInt(`${r}${c}`),
                  titleCelda:
                    option[i].tablaTypeCelda.typeCeldaInfo[
                      indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                    ].titleCelda,
                  fecha:
                    option[i].tablaTypeCelda.typeCeldaInfo[
                      indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                    ].textDescription,
                });
              }
              if (
                option[i].tablaTypeCelda.celda[
                  indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                ] === "Lista"
              ) {
                // for (
                //   let l = 0;
                //   l <
                //   option[i].tablaTypeCelda.lista[
                //     indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                //   ].length;
                //   l++
                // ) {
                //   if (
                //     option[i].tablaTypeCelda.typeCeldaInfo[
                //       indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                //     ].lista[i] === null ||
                //     option[i].tablaTypeCelda.typeCeldaInfo[
                //       indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                //     ].lista[i].trim() === ""
                //   ) {
                //     Swal.fire(
                //       "Falta información en la lista",
                //       `Falta información en una de las listas de una de la(s) celdas`,
                //       "error"
                //     );
                //     return;
                //   }
                // }
                arrayTable.push({
                  type: "lista",
                  index: parseInt(`${r}${c}`),
                  lista:
                    option[i].tablaTypeCelda.typeCeldaInfo[
                      indexTypeCelda.indexOf(parseInt(`${r}${c}`))
                    ].lista,
                });
              }
            }
          }
          option[i].tablasValue = arrayTable;
        }
      }
    }
    //Datos del usuario
    let name = aplicarState === "1" ? null : nombre;
    let identity = aplicarState === "1" ? null : identificacion;
    //Datos del proceso y sub proceso
    let proceso = dataBasic[0][0].option;
    let subProceso = dataBasic[1][0].option;
    let token = localStorage.getItem("token_bearer");
    let documentMasterHead = dataView.DocumentMasterHead;
    axios
      .post(
        `${baseUrl}/datos/store`,
        {
          documentMasterHead,
          dataBasic,
          dataBasicCount,
          aplicarState,
          name,
          identity,
          option,
          proceso,
          subProceso,
        },
        {
          //En la peticion post se tuvo que enviar estos encabezados ya que no los queria recibir
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      )
      .then(function (response) {
        if (response) {
          if (response.data.res) {
            Swal.fire(
              "Success",
              "Se ha deligenciado exitosamente el documento",
              "success"
            );
            return;
          }
        }
      })
      .catch(function (response) {
        Swal.fire(
          "Error",
          "No se pudo guardar el formulario, por favor verificalo",
          "error"
        );
      });
  };
  return (
    <DocumentViewIndex
      name={name}
      codigo={codigo}
      option={option}
      formato={formato}
      dataView={dataView}
      procesos={procesos}
      identity={identity}
      template={template}
      arrayCard={arrayCard}
      dataBasic={dataBasic}
      img_header={img_header}
      subProceso={subProceso}
      handleDate={handleDate}
      handleLink={handleLink}
      description={description}
      aplicarState={aplicarState}
      handleNombre={handleNombre}
      dataBasicCount={dataBasicCount}
      handleSaveInfo={handleSaveInfo}
      handletextCelda={handletextCelda}
      handleValueText={handleValueText}
      handleValueLink={handleValueLink}
      handleValueDate={handleValueDate}
      handletitleCelda={handletitleCelda}
      handleOnChangeText={handleOnChangeText}
      handleOnchangeLink={handleOnchangeLink}
      handleValueProceso={handleValueProceso}
      handleValueAplicar={handleValueAplicar}
      converterFileBase64={converterFileBase64}
      handleIdentificacion={handleIdentificacion}
      handleValueSubProceso={handleValueSubProceso}
      handleLinkDescription={handleLinkDescription}
      handleOnChangeTextList={handleOnChangeTextList}
      converterFileBase64Table={converterFileBase64Table}
      converterFileBase64Archive={converterFileBase64Archive}
      handleDescripcionLinkChange={handleDescripcionLinkChange}
    />
  );
};
