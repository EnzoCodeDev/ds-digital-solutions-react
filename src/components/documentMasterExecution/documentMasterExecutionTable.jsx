//Tabla de documentos de la master
import React, { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useTable } from 'react-table'
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { useHistory } from "react-router";
import { COLUMNS } from "./columnsDocumentInfo";
import { Navbar } from "../navbar/Navbar";
import { ButtonOpen } from "../../helpers/ButtomOpen";
import { DocumentMasterPaginateNavigate } from "../../redux/actions/formDocumentTableActions";
import { DefaultValueDocumentMaster } from "../../redux/actions/formDocumentMasterAction";
import { DocumentMasterExecutionOptionTable } from "./DocumentMasterExecutionOptionTable";
//Documentacion de react-table-v6
// https://github.com/tannerlinsley/react-table/tree/v6#
export const DocumentMasterExecutionTable = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let datas = useSelector((state) => state.document.document.data);
  useEffect(() => {
    dispatch(DefaultValueDocumentMaster());
  });
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
  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   useTable({
  //     columns,
  //     data,
  //   });
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
      history.push(`/documentMasterExecutionTable/${uuid}`);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="documentMaster">
        <DocumentMasterExecutionOptionTable total={total} />
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
        {/* <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroups) => (
              <tr {...headerGroups.getHeaderGroupProps()}>
                {headerGroups.headers.map((columns) => (
                  <th {...columns.getHeaderProps()}
                //   style={{
                //    borderBottom: 'solid 3px red',
                //    background: 'aliceblue',
                //    color: 'black',
                //    fontWeight: 'bold',
                //  }}
                 >
                    {columns.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}
                    //     style={{
                    //     padding: '10px',
                    //    border: 'solid 1px gray',
                    //    background: 'papayawhip',
                    //  }}
                     >{cell.render("Cell")}</td>
                      );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table> */}
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
