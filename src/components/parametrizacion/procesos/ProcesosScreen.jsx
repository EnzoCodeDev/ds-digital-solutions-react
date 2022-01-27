import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router";
import { Navbar } from "../../navbar/Navbar";

export const ProcesosScreen = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const { uuid } = useParams();
  const [proceso, setProceso] = useState("");
  //Hacer la peticion si viene el uuid
  useEffect(() => {
    if (uuid === undefined) {
      return;
    }
    let token = localStorage.getItem("token_bearer");
    axios
      .get(`${baseUrl}/parametrizacion/index/process/${uuid}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setProceso(response.data.Proceso.process);
      })
      .catch(function (response) {
        console.log(response);
      });
  }, [uuid, baseUrl]);
  const handleProceso = (e) => {
    setProceso(e.target.value);
  };
  const handleSaveProceso = () => {
    if (proceso.length < 1) {
      Swal.fire(
        "Upss...",
        "Por favor introduce un proceso para guardar",
        "error"
      );
      return;
    }
    let token = localStorage.getItem("token_bearer");
    axios
      .post(
        `${baseUrl}/parametrizacion/store/proceso`,
        {
          proceso,
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
        if (response.data.res === "exists_process") {
          Swal.fire("Ya existe", "El proceso ya existe", "error");
          return;
        }
        if (response.data.res === "new_process") {
          console.log(response);
          Swal.fire("Exito", "El proceso se ha creado exitosamente", "success");
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  };
  const handleUpdateProceso = ()=> {
    if (proceso.length < 1) {
      Swal.fire(
        "Upss...",
        "Por favor introduce un proceso para guardar",
        "error"
      );
      return;
    }
    let token = localStorage.getItem("token_bearer");
    axios
      .post(
        `${baseUrl}/parametrizacion/update/proceso/${uuid}`,
        {
          proceso,
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
        if (response.data.res === "exists_process") {
          Swal.fire("Ya existe", "El proceso ya existe", "error");
          return;
        }
        if (response.data.res === "update_process") {
          Swal.fire("Exito", "El proceso se ha actualizado exitosamente", "success");
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  };
  return (
    <div>
      <Navbar />
      <div className="container_procesos">
        <div className="sub_container_procesos">
          <div className="container_input_procesos">
            <input
              onChange={handleProceso}
              className="input_procesos"
              placeholder="Proceso"
              defaultValue={proceso}
            />
          </div>
          <div className="container_button_save">
            {uuid === undefined ? (
              <button onClick={handleSaveProceso} className="button_save">
                Guardar proceso
              </button>
            ) : (
              <button onClick={handleUpdateProceso} className="button_save">
                Actualizar proceso
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
