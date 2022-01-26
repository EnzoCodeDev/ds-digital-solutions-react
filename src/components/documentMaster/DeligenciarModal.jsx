import React, {useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { useHistory } from "react-router";
import { uiCloseModal } from "../../redux/actions/ui";
import { DocumentSearch } from "../../redux/actions/documentMasterAction";
import { InputText } from "../mainInput/InputText";
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
  const [cc, setCc] = useState('');
  const [name, setName] = useState('');
  const { modalOpen } = useSelector((state) => state.ui);
  let dataDocument = useSelector(
    (state) => state.documentMasterr.documentMaster.documentMaster
  );
  const { uuid } = useSelector((state) => state.auth);
  const closeModal = () => {
    // TODO: cerrar el modal
    dispatch(uiCloseModal());
  };
  const searchDocumentMaster = (e) => {
    dispatch(DocumentSearch(e.target.value));
  };
  const handleCc = (e) => {
     setCc(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const viewDocument = (uuid_document) => {
    history.push(`/viewDocument/${uuid_document}`);
    dispatch(uiCloseModal());
    let token = localStorage.getItem("token_bearer");
    axios
      .post(
        `${baseUrl}/configuration/searchInfo/${uuid}`,
        {
          cc,
          name
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      )
      .then(function (response) {
        if (response.statusText === "OK") {
        };
      })
      .catch(function (response) {
        console.log(response);
        Swal.fire("Error", "Ha sucedido un error", "error");
      });
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
        <div className="container_input">
          <InputText
            name={"inputSearch"}
            onChange={searchDocumentMaster}
            placeholder={"Buscar un documento para deligenciar"}
            className={"searchDocumentMaster"}
          />
        </div>
        <div className='container_input_info'>
          <InputText
            name={"inputCc"}
            onChange={handleCc}
            placeholder={"Identificación"}
            className={"inputCc"}
          />
          <InputText
            name={"inputName"}
            onChange={handleName}
            placeholder={"Nombre"}
            className={"inputName"}
          />
        </div>
        <div className="container_busqueda">
          <div className="title_search">
            {dataDocument[0] === undefined ? (
              <h5>No se ha encontrado un dato que coincida </h5>
            ) : (
              <h5>Busqueda relacionadas</h5>
            )}
          </div>
          {dataDocument.map((document) => (
            <div key={document.id} onClick={(e) => viewDocument(document.uuid)}>
              <h6>{document.format}</h6>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
