import React from "react";
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
  const dispatch = useDispatch();
  const history = useHistory();
  const { modalOpen } = useSelector((state) => state.ui);
  let dataDocument = useSelector(
    (state) => state.documentMasterr.documentMaster.documentMaster
  );
  const closeModal = () => {
    // TODO: cerrar el modal
    dispatch(uiCloseModal());
  };
  const searchDocumentMaster = (e) => {
    dispatch(DocumentSearch(e.target.value));
  };
  const viewDocument = (uuid) => {
    history.push(`/viewDocument/${uuid}`);
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
        <div className="container_input">
          <InputText
            name={"inputSearch"}
            onChange={searchDocumentMaster}
            placeholder={"Buscar un documento para deligenciar"}
            className={"searchDocumentMaster"}
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
