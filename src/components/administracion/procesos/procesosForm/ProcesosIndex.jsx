import React from "react";
import { Navbar } from "../../../navbar/Navbar";
import './procesosForm.scss';
export const ProcesosIndex = ({
  uuid,
  proceso,
  handleProceso,
  handleSaveProceso,
  handleUpdateProceso,
}) => {
  return (
    <div>
      <Navbar />
      <div className="container_procesos">
        <div className="sub_container_procesos">
          <form
            onSubmit={
              uuid === undefined ? handleSaveProceso : handleUpdateProceso
            }
          >
            <div className="container_input_procesos">
              <input
                onChange={handleProceso}
                className="input_procesos"
                placeholder="Proceso"
                defaultValue={proceso}
              />
            </div>
            <div className="container_button_save">
              <button type="submit" className="button_save">
                {uuid === undefined ? "Guardar proceso" : "Actualizar proceso"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
