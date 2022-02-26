import React from "react";
import ReactTable from "react-table-v6";
import { Navbar } from "../../../../navbar/Navbar";
import { DocumentOptionTable } from "../documentOptionTable/DocumentOptionTable";
import { DeligenciarModal } from "../documentTableModal/DeligenciarModal";
import './documentTable.scss';
export const DocumentTableIndex = ({
  to,
  total,
  data,
  from,
  columns,
  last_page,
  handleLast,
  handleNext,
  handleFirst,
  current_page,
  handlePrevious,
  handleTypeColumns,
  handleClickNewDeligenciamiento,
}) => {
  return (
    <div>
      <Navbar />
      <div className="documentMaster">
        <DocumentOptionTable total={total} />
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
        onClick={handleClickNewDeligenciamiento}
      >
        <i className="fas fa-plus"></i>
      </button>
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
      <DeligenciarModal />
    </div>
  );
};
