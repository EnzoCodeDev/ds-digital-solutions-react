import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router";
import { Navbar } from "../../navbar/Navbar";
export const SubProcesosScreen = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const { uuid } = useParams();
  const [subProcesos, setSubProcesos] = useState("");
  const [procesos, setProcesos] = useState([]);
  const [procesoSelect, setprocesoSelect] = useState("");
  const [procesId, setProcesId] = useState("");
  //estado del input sub proceso
  const handleSubProceso = (e) => {
    setSubProcesos(e.target.value);
  };
  //estado del input search para los procesos
  const handleProceso = (e, process, process_id) => {
    e.preventDefault();
    setprocesoSelect(process);
    setProcesId(process_id);
  };
  //Hacer la peticion si viene un uuid
  useEffect(() => {
    if (uuid === undefined) {
      return;
    }
    let token = localStorage.getItem("token_bearer");
    axios
      .get(`${baseUrl}/parametrizacion/index/subProcess/${uuid}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setSubProcesos(response.data.Sub_Proceso.subProceso);
        setprocesoSelect(response.data.proceso.process);
        setProcesId(response.data.proceso.id);  
      })
      .catch(function (response) {
        console.log(response);
      });
  }, [uuid, baseUrl]);
  //Traer los procesos a travez de este search
  const handleSearchProcess = (e) => {
    if (e.target.value === undefined) {
      return;
    }
    if (e.target.value.length <= 2) {
      return;
    }
    let token = localStorage.getItem("token_bearer");
    axios
      .get(`${baseUrl}/parametrizacion/search/subproceso/${e.target.value}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        timeout: 1500,
      })
      .then(function (response) {
        setProcesos(response.data.proceso);
      })
      .catch(function (response) {
        console.log(response);
      });
  };
  const handleSaveSubProceso = (e) => {
    e.preventDefault();
    if (subProcesos.length < 2) {
      Swal.fire(
        "Upss...",
        "Por favor introduce un subproceso para guardar",
        "error"
      );
      return;
    }
    if (procesoSelect === "") {
      Swal.fire("No seleccionado", "Por favor seleccione un proceso", "error");
      return;
    }
    let token = localStorage.getItem("token_bearer");
    axios
      .post(
        `${baseUrl}/parametrizacion/store/subProceso`,
        {
          subProcesos,
          procesId,
        },
        {
          //En la peticion post se tuvo que enviar estos encabezados ya que no los queria recibir
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      )
      .then(function (response) {
        if (response.data.res === "new_sub_process") {
          Swal.fire(
            "Exito",
            "El subproceso se ha creado exitosamente",
            "success"
          );
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  };
  const handleUpdateSubProceso = (e)=> {
    e.preventDefault();
    if (subProcesos.length < 2) {
      Swal.fire(
        "Upss...",
        "Por favor introduce un subproceso para guardar",
        "error"
      );
      return;
    }
    if (procesoSelect === "") {
      Swal.fire("No seleccionado", "Por favor seleccione un proceso", "error");
      return;
    }
    let token = localStorage.getItem("token_bearer");
    axios
      .put(
        `${baseUrl}/parametrizacion/update/subProceso/${uuid}`,
        {
          subProcesos,
          procesId,
        },
        {
          //En la peticion post se tuvo que enviar estos encabezados ya que no los queria recibir
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      )
      .then(function (response) {
        if (response.data.res === "update_sub_process") {
          Swal.fire(
            "Exito",
            "El subproceso se ha actualizado exitosamente",
            "success"
          );
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  };
  return (
    <div>
      <Navbar />
      <div className="container_sub_procesos">
        <div className="sub_container_procesos">
          <h3>{procesoSelect}</h3>
          <form onSubmit={uuid === undefined ? handleSaveSubProceso : handleUpdateSubProceso}>
            <div className="container_input_procesos">
              <input
                onChange={handleSubProceso}
                className="input_procesos"
                placeholder="Sub proceso"
                defaultValue={subProcesos}
              />
            </div>
            <div className="container_button_save">
              <button type="submit" className="button_save">
                {uuid === undefined ? 'Guardar sub proceso' : 'Actualizar sub proceso'}
              </button>
            </div>
            <div className="conatiner_input_search">
              <input
                onChange={handleSearchProcess}
                className="input_procesos"
                placeholder="Buscar proceso"
              />
            </div>
          </form>
          <div className="container_busqueda">
            <div className="title_search">
              {procesos[0] === undefined ? (
                <h5>No se ha encontrado un dato que coincida </h5>
              ) : (
                <h5>Busqueda relacionadas</h5>
              )}
            </div>
            {/* onClick={(e) => viewDocument(document.uuid)} */}
            {procesos.map((proceso) => (
              <div key={proceso.id}>
                <h6
                  onClick={(e) => handleProceso(e, proceso.process, proceso.id)}
                >
                  {proceso.process}
                </h6>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
