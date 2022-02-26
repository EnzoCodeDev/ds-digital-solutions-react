import React from "react";
import { Navbar } from "../../navbar/Navbar";
import "./rolesForm.scss";
export const RoleFormIndex = ({
  permisos,
  handleSaveRole,
  handleNameRole,
  handleDescripcionRole,
  handleSelectPermision,
}) => {
  return (
    <div>
      <Navbar />
      <form onSubmit={handleSaveRole}>
        <div className="container_roles">
          <div className="sub_contaner_roles">
            <div className="container_info_role">
              <div className="container_name">
                <div className="container_title">
                  <span>Nombre del rol</span>
                </div>
                <div className="container_input">
                  <input
                    onChange={handleNameRole}
                    placeholder="Nombre del rol"
                    type="text"
                    className=""
                  ></input>
                </div>
              </div>
              <div className="container_description">
                <div className="container_title">
                  <span>Descripción del rol</span>
                </div>
                <div className="container_input">
                  <input
                    onChange={handleDescripcionRole}
                    placeholder="Descripción del rol"
                    type="text"
                    className=""
                  ></input>
                </div>
              </div>
            </div>
            <div>
              <h5>Permisos disponibles</h5>
              <div className="container_permisos">
                <div className="container_options">
                  <div className="header">
                    <b>Accesos al menú</b>
                  </div>
                  {permisos.map((permiso) => (
                    <div className="container_description" key={permiso.id}>
                      {permiso.seccion === "menu" && (
                        <div className="container_content">
                          <div className="description">
                            <h6>{permiso.description}</h6>
                          </div>
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                handleSelectPermision(e, permiso.name)
                              }
                            ></input>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="container_options">
                  <div className="header">
                    <b>Accesos a los submenú</b>
                  </div>
                  {permisos.map((permiso) => (
                    <div className="container_description" key={permiso.id}>
                      {permiso.seccion === "submenu" && (
                        <div className="container_content">
                          <div className="description">
                            <h6>{permiso.description}</h6>
                          </div>
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                handleSelectPermision(e, permiso.name)
                              }
                            ></input>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="container_options">
                  <div className="header">
                    <b>Funciones de la parametrización</b>
                  </div>
                  {permisos.map((permiso) => (
                    <div className="container_description" key={permiso.id}>
                      {permiso.seccion === "parametrizacion" && (
                        <div className="container_content">
                          <div className="description">
                            <h6>{permiso.description}</h6>
                          </div>
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                handleSelectPermision(e, permiso.name)
                              }
                            ></input>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="container_options">
                  <div className="header">
                    <b>Funciones de los procesos</b>
                  </div>
                  {permisos.map((permiso) => (
                    <div className="container_description" key={permiso.id}>
                      {permiso.seccion === "proceso" && (
                        <div className="container_content">
                          <div className="description">
                            <h6>{permiso.description}</h6>
                          </div>
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                handleSelectPermision(e, permiso.name)
                              }
                            ></input>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="container_options">
                  <div className="header">
                    <b>Funciones de los subprocesos</b>
                  </div>
                  {permisos.map((permiso) => (
                    <div className="container_description" key={permiso.id}>
                      {permiso.seccion === "subproceso" && (
                        <div className="container_content">
                          <div className="description">
                            <h6>{permiso.description}</h6>
                          </div>
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                handleSelectPermision(e, permiso.name)
                              }
                            ></input>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="container_options">
                  <div className="header">
                    <b>Funciones de maestro de información</b>
                  </div>
                  {permisos.map((permiso) => (
                    <div className="container_description" key={permiso.id}>
                      {permiso.seccion === "maestro informacion" && (
                        <div className="container_content">
                          <div className="description">
                            <h6>{permiso.description}</h6>
                          </div>
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                handleSelectPermision(e, permiso.name)
                              }
                            ></input>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button type="submit" className="botom-flotante">
              Guardar rol
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
