import React, { useEffect, useMemo } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { DocumentMasterPaginateInit, DocumentMasterPaginateNavigate } from "../../redux/actions/documentMasterAction";
import { DefaultValueDocumentMaster } from "../../redux/actions/formDocumentMasterAction";
import { Navbar } from "../navbar/Navbar";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { COLUMNS } from "./columsDocumentInfo";
import { DeligenciarModal } from "./DeligenciarModal";
import { uiOpenModal } from '../../redux/actions/ui';
// import { ButtonOpen } from "../../helpers/ButtomOpen";
// import { DocumentMasterPaginateNavigate } from "../../redux/actions/formDocumentTableActions";
// import { DefaultValueDocumentMaster } from "../../redux/actions/formDocumentMasterAction";
import { ParametrizacionDocumentMasterOptionTable } from "./ParametrizacionDocumentMasterOptionTable";
export const DocumentMasterIndex = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(DefaultValueDocumentMaster());
  },[dispatch]);
  useEffect(() => {
    dispatch(DocumentMasterPaginateInit());
  }, [dispatch]);
  let datas = useSelector((state) => state.document.document.data);
   //De aqui se desestructura los datos de los datos de laravel donde
  //se destructura tambien los url para la paginacion de laravel
  const { first, last, next, prev } = useSelector(
    (state) => state.document.document.links
  );
  const { current_page, last_page, total, from, to } = useSelector(
    (state) => state.document.document.meta
  );
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => datas, [datas]);
  //Esta configuracion es propia de laravel para paginacion
  // Paginacion siguiente
  const handlePrevious = (e) => {
    e.stopPropagation();
    dispatch(DocumentMasterPaginateNavigate(prev));
  };
  //paginacion anterior
  const handleNext = (e) => {
    e.stopPropagation();
    dispatch(DocumentMasterPaginateNavigate(next));
  };
  //Primera paginacion
  const handleFirst = (e) => {
    e.stopPropagation();
    dispatch(DocumentMasterPaginateNavigate(first));
  };
  //Ultima paginacion
  const handleLast = (e) => {
    e.stopPropagation();
    dispatch(DocumentMasterPaginateNavigate(last));
  };
  const handleTypeColumns = (rowInfo) => {
    if (rowInfo) {
      const uuid = rowInfo.original.uuid;
      history.push(`/viewDocumentDeli/${uuid}`);
    }
  };
  const handleClickNewDeligenciamiento = ()=> {
    dispatch( uiOpenModal() );
  };
  return (
    <div>
      <Navbar />
      <div className="documentMaster">
        <ParametrizacionDocumentMasterOptionTable total={total} />
        <ReactTable
          data={data}
          columns={columns}
          minRows={13}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                handleTypeColumns(rowInfo);
                if (handleOriginal) {
                  handleOriginal();
                }
              },
            };
          }}
        />
            </div>
            <button
            className="btn btn-danger fab"
            onClick={ handleClickNewDeligenciamiento }
        >
            <i className="fas fa-plus"></i>
        </button>
    )
      <div className="navigation">
        <div className="navigation_sub">
          <div className="pagination">
            <div className="pagination_firts">
              <button onClick={handleFirst}>Primera pagina</button>
            </div>
            <div className="pagination_menu">
              <button onClick={handlePrevious}>{"Anterior"}</button>
              <span className="page">
                pagina{" "}
                <strong>
                  {current_page} de {last_page}
                </strong>{" "}
              </span>
              <button onClick={handleNext}>{"Siguiente"}</button>
            </div>
            <div className="pagination_last">
              <button onClick={handleLast}>Ultima pagina</button>
            </div>
          </div>
          <div className="content">
            <span>
              Contenido del{" "}
              <strong>
                {from} al {to}
              </strong>{" "}
            </span>
          </div>
        </div>
      </div>
      <DeligenciarModal/>
    </div>
  );
};
