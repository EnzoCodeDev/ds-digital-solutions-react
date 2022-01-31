import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { useHistory } from "react-router";
import { uiCloseModal } from "../../../redux/actions/ui";
import { NewInfoUser } from "../../../redux/actions/infoUserDeligenciarAction";
const customStyles = {
  content: {
    top: "53%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");
export const DeligenciarModal = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const history = useHistory();
  const [identity, setIdentity] = useState("");
  const [name, setName] = useState("");
  const [aplicar, setAplicar] = useState("1");
  const [result, setResult] = useState([]);
  const { modalOpen } = useSelector((state) => state.ui);
  const closeModal = () => {
    // TODO: cerrar el modal
    dispatch(uiCloseModal());
  };
  //Peticion para traer lo que se esta buscando en el input
  const searchDocumentMaster = (e) => {
    if (e.target.value === undefined) {
      return;
    }
    if (e.target.value.length <= 2) {
      return;
    }
    let token = localStorage.getItem("token_bearer");
    axios
      .get(`${baseUrl}/datos/search/${e.target.value}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        timeout: 1500,
      })
      .then(function (response) {
        setResult(response.data.documentMaster);
      })
      .catch(function (response) {
        console.log(response);
      });
  };
  const handleValueAplicar = (e) => {
    setAplicar(e.target.value);
  };
  const handleCc = (e) => {
    setIdentity(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const viewDocument = (uuid_document) => {
    dispatch(NewInfoUser(aplicar, name, identity));
    history.push(`/viewDocument/${uuid_document}`);
    dispatch(uiCloseModal());
  };
  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <div className="document_master_index">
        <div className="container_header">
          <div className="type_select">
            <select onClick={handleValueAplicar} className="selected">
              <option value="1">Aplicar documento en general</option>
              <option value="2">Aplicar documento a un usuario</option>
            </select>
          </div>
          <div className="container_input">
            <input
              type="text"
              name={"inputSearch"}
              onChange={searchDocumentMaster}
              placeholder={"Buscar un documento para deligenciar"}
              className={"searchDocumentMaster"}
            />
          </div>
        </div>
        {aplicar === "2" && (
          <div className="container_input_info animate__animated animate__fadeIn">
            <input
              type="text"
              name={"inputCc"}
              onChange={handleCc}
              placeholder={"Identificación"}
              className={"inputCc"}
            />
            <input
              type="text"
              name={"inputName"}
              onChange={handleName}
              placeholder={"Nombre"}
              className={"inputName"}
            />
          </div>
        )}
        <div className="container_busqueda">
          <div className="title_search">
            {result[0] === undefined ? (
              <h5>No se ha encontrado un dato que coincida </h5>
            ) : (
              <h5>Busqueda relacionadas</h5>
            )}
          </div>
          {result.map((document) => (
            <div key={document.id} onClick={(e) => viewDocument(document.uuid)}>
              <h6>{document.format}</h6>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
