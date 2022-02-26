import React from "react";
import { Navbar } from "../../../navbar/Navbar";
import './subProcesoForm.scss';
export const SubProcesosFormIndex = ({
  uuid,
  procesos,
  subProcesos,
  procesoSelect,
  handleProceso,
  handleSubProceso,
  handleSearchProcess,
  handleSaveSubProceso,
  handleUpdateSubProceso,
}) => {
  return (
    <div>
      <Navbar />
      <div className="container_sub_procesos">
        <div className="sub_container_procesos">
          <h3>{procesoSelect}</h3>
          <form
            onSubmit={
              uuid === undefined ? handleSaveSubProceso : handleUpdateSubProceso
            }
          >
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
                {uuid === undefined
                  ? "Guardar sub proceso"
                  : "Actualizar sub proceso"}
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
