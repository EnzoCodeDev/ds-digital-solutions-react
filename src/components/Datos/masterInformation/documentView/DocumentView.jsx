import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { Print } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { DocumentMasterInfoNew } from "../../../../redux/actions/documentMasterAction";
import { ViewDocumentMaster } from "../../../../redux/actions/formDocumentParametrizacionAction";
import {
  infoCelda,
  listArray,
  titleColumns,
  indexTypeCelda,
} from "../../../../helpers/typeCelda";
import { DocumentViewIndex } from "./DocumentViewIndex";
export const DocumentView = () => {
  //Esta es la url de la aplucacion para las peticiones al backend
  const baseUrl = process.env.REACT_APP_API_URL;
  let token = localStorage.getItem("token_bearer");
  //Inicial state nuevo documento
  const inicialStateOption = [
    {
      card: "inhabilidado",
      optionValue: "undefined",
      titleCard: "",
      text: "",
      linkDescription: "",
      link: "",
      descripcionArchivo: "",
      archivo: "",
      archivo_extesion: "",
      heigth: { state: true },
      img: "",
      img_extesion: "",
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
    {
      card: 1,
      optionValue: "Texto",
      titleCard: "",
      text: "",
      linkDescription: "",
      link: "",
      img: "",
      img_extesion: "",
      descripcionArchivo: "",
      archivo: "",
      archivo_extesion: "",
      heigth: { state: true },
      tabla: { column: [1], row: [1] },
      tablaTypeCelda: {
        title_columna: titleColumns,
        celda: ["0", "Título"],
        type: indexTypeCelda,
        lista: listArray,
        celdaType: ["0", "Título"],
        typeCeldaInfo: [infoCelda],
      },
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
  //Verificar si es para editar o crear
  const { uuid } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ViewDocumentMaster(uuid));
  }, [dispatch, uuid]);
  //Traer los estados globales de los state
  let documentMaster = useSelector(
    (state) => state.documentMaster.documentMaster
  );
  let { aplicar, name, identity } = useSelector(
    (state) => state.infoUserDeligenciar.infoUser
  );
  const { img_header } = useSelector((state) => state.auth);
  const documentMasterHead = documentMaster.DocumentMasterHead;
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
  useEffect(() => {
    let array = [];
    if (documentMasterHead.data_basic === null) {
    } else {
      array.push(...JSON.parse(documentMasterHead.data_basic));
      setDataBasicCount(JSON.parse(documentMasterHead.position_data_basic));
      setDataBasic([...array]);
    }
  }, [
    documentMasterHead.position_data_basic,
    documentMasterHead.process_type,
    documentMasterHead.process_description,
    documentMasterHead.data_basic,
    documentMasterHead.process_link,
  ]);
  //Renderizar los datos de la tarjeta de la aplicacion
  useEffect(() => {
    let arrayOptioValue = [
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
    ];
    if (documentMaster.res) {
      //Renderiazado de los datos del las targetas del documento
      documentMaster.DocumentMasterBody.map(function (DocumentMasterBody) {
        return arrayOptioValue.push({
          card_id: DocumentMasterBody.id,
          card: DocumentMasterBody.number_card,
          link: DocumentMasterBody.link === null ? "" : DocumentMasterBody.link,
          linkDescription:
            DocumentMasterBody.link_description === null
              ? ""
              : DocumentMasterBody.link_description,
          archivo:
            DocumentMasterBody.file === null ? "" : DocumentMasterBody.file,
          descripcionArchivo:
            DocumentMasterBody.file_description === null
              ? ""
              : DocumentMasterBody.file_description,
          img:
            DocumentMasterBody.image === null ? "" : DocumentMasterBody.image,
          heigth: { state: true },
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
          tablaTypeCelda: {
            title_columna:
              DocumentMasterBody.title_columns !== null
                ? JSON.parse(DocumentMasterBody.title_columns)
                : titleColumns,
            celda:
              DocumentMasterBody.type_celda !== null
                ? JSON.parse(DocumentMasterBody.type_celda)
                : ["0", "Título"],
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
                : JSON.stringify(["0", "Título"]),
            typeCeldaInfo: JSON.parse(DocumentMasterBody.card_info_table),
          },
        });
      });
      setOption(arrayOptioValue);
      let newArray = JSON.parse(documentMaster.DocumentMasterHead.position);
      setArrayCard(newArray);
    }
    //Ognorando dependencias para que solo se llame una vez
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
    optionInfo[id].tablaTypeCelda.typeCeldaInfo[0][
      option[id].tablaTypeCelda.type.indexOf(parseInt(parametro_opcional))
    ].titleCelda = e.target.value;
    setOption(optionInfo);
  };
  //vigilar el estado del text de cada celda
  const handletextCelda = (e, id, parametro_opcional) => {
    let optionInfo = [...option];
    optionInfo[id].tablaTypeCelda.typeCeldaInfo[0][
      option[id].tablaTypeCelda.type.indexOf(parseInt(parametro_opcional))
    ].textDescription = e.target.value;
    setOption(optionInfo);
  };
  //Vigilar el estado de cada de cada lista de la celda
  const handleOnChangeTextList = (e, id, listCelda, parametro_opcional) => {
    let optionInfo = [...option];
    optionInfo[id].tablaTypeCelda.typeCeldaInfo[0][
      option[id].tablaTypeCelda.type.indexOf(parseInt(parametro_opcional))
    ].lista[listCelda] = e.target.value;
    setOption(optionInfo);
  };
  //Vigilar el estado del link de cada celda
  const handleLink = (e, id, parametro_opcional) => {
    let optionInfo = [...option];
    optionInfo[id].tablaTypeCelda.typeCeldaInfo[0][
      option[id].tablaTypeCelda.type.indexOf(parseInt(parametro_opcional))
    ].link = e.target.value;
    setOption(optionInfo);
  };
  //Vigilar el estado de cada descripcion del link de cada celda
  const handleLinkDescription = (e, id, parametro_opcional) => {
    let optionInfo = [...option];
    optionInfo[id].tablaTypeCelda.typeCeldaInfo[0][
      option[id].tablaTypeCelda.type.indexOf(parseInt(parametro_opcional))
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
        optionInfo[id].tablaTypeCelda.typeCeldaInfo[0][
          option[id].tablaTypeCelda.type.indexOf(
            parseInt(parametro_opcional)
          )
        ].img = base64;
        optionInfo[id].tablaTypeCelda.typeCeldaInfo[0][
          option[id].tablaTypeCelda.type.indexOf(
            parseInt(parametro_opcional)
          )
        ].img_extension =
          extensiones_permitidas[extensiones_permitidas.indexOf(extension)];
        setOption(optionInfo);
      };
    });
  };
  //Guarda informacion
  const handleSaveInfo = () => {
    dispatch(
      DocumentMasterInfoNew(
        documentMasterHead,
        dataBasic,
        dataBasicCount,
        aplicarState,
        nombre,
        identificacion,
        option
      )
    );
  };
  return (
    <DocumentViewIndex
      name={name}
      option={option}
      procesos={procesos}
      identity={identity}
      arrayCard={arrayCard}
      dataBasic={dataBasic}
      img_header={img_header}
      subProceso={subProceso}
      handleDate={handleDate}
      handleLink={handleLink}
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
      documentMasterHead={documentMasterHead}
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
