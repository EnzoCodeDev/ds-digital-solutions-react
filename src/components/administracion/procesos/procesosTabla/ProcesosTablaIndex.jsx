import React from "react";
import { Navbar } from "../../../navbar/Navbar";
import ReactTable from "react-table-v6";
import './procesosTable.scss';
export const ProcesosTablaIndex = ({
  data,
  columns,
  paginate,
  infoPaginate,
  handlePaginate,
  handleTypeColumns,
  handleCreateProcess,
}) => {
  return (
    <div>
      <Navbar />
      <div className="container_table_procesos">
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
      <button className="btn btn-danger fab" onClick={handleCreateProcess}>
        <i className="fas fa-plus"></i>
      </button>
      <div className="navigation">
        <div className="navigation_sub">
          <div className="pagination">
            <div className="pagination_firts">
              <button onClick={(e) => handlePaginate(e, paginate.first)}>
                Primera pagina
              </button>
            </div>
            <div className="pagination_menu">
              <button onClick={(e) => handlePaginate(e, paginate.prev)}>
                {"Anterior"}
              </button>
              <span className="page">
                pagina{" "}
                <strong>
                  {infoPaginate.current_page} de {infoPaginate.last_page}
                </strong>{" "}
              </span>
              <button onClick={(e) => handlePaginate(e, paginate.next)}>
                {"Siguiente"}
              </button>
            </div>
            <div className="pagination_last">
              <button onClick={(e) => handlePaginate(e, paginate.last)}>
                Ultima pagina
              </button>
            </div>
          </div>
          <div className="content">
            <span>
              Contenido del{" "}
              <strong>
                {infoPaginate.from} al {infoPaginate.to}
              </strong>{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
