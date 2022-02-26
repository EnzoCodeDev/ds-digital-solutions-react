import React, { useEffect, useMemo } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  DocumentMasterPaginateInit,
  DocumentMasterPaginateNavigate,
} from "../../../../../redux/actions/documentMasterAction";
import { DefaultValueDocumentMaster } from "../../../../../redux/actions/formDocumentParametrizacionAction";
import "react-table-v6/react-table.css";
import { COLUMNS } from "./columsDocumentInfo";
import { uiOpenModal } from "../../../../../redux/actions/ui";
// import { ButtonOpen } from "../../helpers/ButtomOpen";
// import { DocumentMasterPaginateNavigate } from "../../redux/actions/formDocumentTableActions";
// import { DefaultValueDocumentMaster } from "../../redux/actions/formDocumentMasterAction";
import { DocumentTableIndex } from "./DocumentTableIndex";
export const DocumentTableDeli = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(DefaultValueDocumentMaster());
  }, [dispatch]);
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
  const handleClickNewDeligenciamiento = () => {
    dispatch(uiOpenModal());
  };
  return (
    <DocumentTableIndex
      to={to}
      total={total}
      data={data}
      from={from}
      columns={columns}
      last_page={last_page}
      handleLast={handleLast}
      handleNext={handleNext}
      handleFirst={handleFirst}
      current_page={current_page}
      handlePrevious={handlePrevious}
      handleTypeColumns={handleTypeColumns}
      handleClickNewDeligenciamiento={handleClickNewDeligenciamiento}
    />
  );
};
