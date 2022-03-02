//Tabla de documentos de la master
import React, { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-table-v6/react-table.css";
import { useHistory } from "react-router";
import { GROUPED_COLUMNS } from "./columsDocumentInfo";
import { DocumentMasterPaginateInit } from "../../../../../redux/actions/formDocumentTableParametrizacionActions";
import { DocumentMasterPaginateNavigate } from "../../../../../redux/actions/formDocumentTableParametrizacionActions";
import { DocumentTableIndex } from "./DocumentTableIndex";
//Documentacion de react-table-v6
// https://github.com/tannerlinsley/react-table/tree/v6#
export const DocumentTable = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let datas = useSelector((state) => state.document.document.data);
  useEffect(() => {
    dispatch(DocumentMasterPaginateInit());
  }, [dispatch]);
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
      history.push(`/editDocument/${uuid}`);
    }
  };
  return (
    <DocumentTableIndex
      to={to}
      from={from}
      total={total}
      data={data}
      columns={columns}
      last_page={last_page}
      handleNext={handleNext}
      handleLast={handleLast}
      handleFirst={handleFirst}
      current_page={current_page}
      handlePrevious={handlePrevious}
      handleTypeColumns={handleTypeColumns}
    />
  );
};
