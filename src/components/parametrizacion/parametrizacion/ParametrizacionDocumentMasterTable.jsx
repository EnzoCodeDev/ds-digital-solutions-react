//Tabla de documentos de la master
import React, { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useTable } from 'react-table'
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { useHistory } from "react-router";
import { GROUPED_COLUMNS } from "./columsDocumentInfo";
import { Navbar } from "../../navbar/Navbar";
import { ButtonOpen } from "../../../helpers/ButtomOpen";
import { DocumentMasterPaginateInit } from '../../../redux/actions/formDocumentTableParametrizacionActions';
import { DocumentMasterPaginateNavigate } from "../../../redux/actions/formDocumentTableParametrizacionActions";
import { DefaultValueDocumentMaster } from "../../../redux/actions/formDocumentParametrizacionAction";
import { ParametrizacionDocumentMasterOptionTable } from "./ParametrizacionDocumentMasterOptionTable";
//Documentacion de react-table-v6
// https://github.com/tannerlinsley/react-table/tree/v6#
export const  ParametrizacionDocumentMasterTable = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let datas = useSelector((state) => state.document.document.data);
  useEffect(() => {
    dispatch(DefaultValueDocumentMaster());
  },[dispatch]);
  useEffect(() => {
    dispatch(DocumentMasterPaginateInit());
  },[dispatch]);
  //De aqui se desestructura los datos de los datos de laravel donde
  //se destructura tambien los url para la paginacion de laravel
  const { first, last, next, prev } = useSelector(
    (state) => state.document.document.links
  );
  const { current_page, last_page, total, from, to } = useSelector(
    (state) => state.document.document.meta
  );
  const columns = useMemo(() => GROUPED_COLUMNS, []);
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
      history.push(`/newDocument/${uuid}`);
    }
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
      <ButtonOpen />
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
    </div>
  );
};
