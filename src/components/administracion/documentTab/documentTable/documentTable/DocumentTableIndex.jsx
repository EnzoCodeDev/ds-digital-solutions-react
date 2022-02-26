import React from "react";
import ReactTable from "react-table-v6";
import { Navbar } from "../../../../navbar/Navbar";
import { ButtonOpen } from "../../../../../helpers/ButtomOpen";
import { ParametrizacionDocumentMasterOptionTable } from "../documentTableOption/DocumentOptionTable";
import "./documentTable.scss";
export const DocumentTableIndex = ({
  to,
  from,
  total,
  data,
  columns,
  last_page,
  handleNext,
  handleLast,
  handleFirst,
  current_page,
  handlePrevious,
  handleTypeColumns,
}) => {
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
