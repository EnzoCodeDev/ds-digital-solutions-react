import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { DocumentSearch } from "../../redux/actions/documentMasterAction";
import { Navbar } from "../navbar/Navbar";
import { InputText } from "../mainInput/InputText";
export const DocumentMasterIndex = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let dataDocument = useSelector(
    (state) => state.documentMasterr.documentMaster.documentMaster
  );
  const searchDocumentMaster = (e) => {
    dispatch(DocumentSearch(e.target.value));
  };
  const viewDocument = (uuid) => {
    history.push(`/viewDocument/${uuid}`);
  };
  return (
    <div>
      <Navbar />
      <div className="document_master_index">
        <h1>Hola mundo</h1>
        <InputText
          name={"inputSearch"}
          onChange={searchDocumentMaster}
          placeholder={"Buscar documento"}
          className={"searchDocumentMaster"}
        />
        {dataDocument.map((document) => (
          <div key={document.id} onClick={(e) => viewDocument(document.uuid)}>
            {document.format}
          </div>
        ))}
      </div>
    </div>
  );
};
