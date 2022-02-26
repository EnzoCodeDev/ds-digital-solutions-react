import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "react-table-v6/react-table.css";
import { useHistory } from "react-router";
import { GROUPED_COLUMNS } from "./columsProcesos";
import { ProcesosTablaIndex } from "../procesosTabla/ProcesosTablaIndex";
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
    <ProcesosTablaIndex
      data={data}
      columns={columns}
      paginate={paginate}
      infoPaginate={infoPaginate}
      handlePaginate={handlePaginate}
      handleTypeColumns={handleTypeColumns}
      handleCreateProcess={handleCreateProcess}
    />
  );
};
