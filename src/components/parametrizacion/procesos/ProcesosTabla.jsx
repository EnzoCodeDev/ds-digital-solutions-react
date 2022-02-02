import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { useHistory } from "react-router";
import { GROUPED_COLUMNS } from "./columsProcesos";
import { Navbar } from "../../navbar/Navbar";
export const ProcesosTabla = () => {
  const history = useHistory();
  //Datos de la tabla
  const [dataProceso, setDataProceso] = useState([]);
  const [paginate, setPaginate] = useState({
    first: "",
    last: "",
    next: "",
    prev: "",
  });
  //Informacion de la paginacion
  const [infoPaginate, setInfoPaginate] = useState({
    current_page: "",
    from: "",
    last_page: "",
    links: "",
    path: "",
    per_page: "",
    to: "",
    total: "",
  });
  const baseUrl = process.env.REACT_APP_API_URL;
  const columns = useMemo(() => GROUPED_COLUMNS, []);
  const data = useMemo(() => dataProceso, [dataProceso]);
  useEffect(() => {
    let token = localStorage.getItem("token_bearer");
    axios
      .get(`${baseUrl}/parametrizacion/index/process/table`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setDataProceso(response.data.data);
        setPaginate(response.data.links);
        setInfoPaginate(response.data.meta);
      })
      .catch(function (response) {
        console.log(response);
      });
  }, [baseUrl]);
  const handlePaginate = (e, paginate) => {
    if (paginate === null) {
      return;
    }
    let token = localStorage.getItem("token_bearer");
    axios
      .get(paginate, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        if (response) {
          setDataProceso(response.data.data);
          setPaginate(response.data.links);
          setInfoPaginate(response.data.meta);
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  };
  const handleTypeColumns = (rowInfo) => {
    if (rowInfo) {
      const uuid = rowInfo.original.uuid;
      history.push(`/procesosEdit/${uuid}`);
    }
  };
  const handleCreateProcess = () => {
    history.push(`/procesosCreate`);
  };
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
      <button
        className="btn btn-danger fab"
        onClick={ handleCreateProcess }
      >
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
