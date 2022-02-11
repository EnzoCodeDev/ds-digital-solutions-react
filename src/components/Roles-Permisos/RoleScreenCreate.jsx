import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import { Navbar } from "../navbar/Navbar";
export const RoleScreenCreate = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const history = useHistory();
  let token = localStorage.getItem("token_bearer");
  const [nameRole, setNameRole] = useState("");
  const [descripcionRole, setDescripcionRole] = useState("");
  const [permisos, setPermiso] = useState([]);
  const [permisoSelected, setPermisoSelected] = useState([]);
  //Traer todos los permisos
  useEffect(() => {
    axios
      .get(`${baseUrl}/configuration/index/permision`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setPermiso(response.data.permisos);
        // setProcesos(response.data.procesos);
      })
      .catch(function (response) {
        console.log(response);
      });
  }, [baseUrl, token]);
  const handleNameRole = (e) => {
    setNameRole(e.target.value);
  };
  const handleDescripcionRole = (e) => {
    setDescripcionRole(e.target.value);
  };
  //Array de los permisos seleccionados
  const handleSelectPermision = (e, selected) => {
    let arrayAuxiliar = [...permisoSelected];
    if (e.target.checked) {
      arrayAuxiliar.push(selected);
    } else {
      let index = arrayAuxiliar.indexOf(selected);
      arrayAuxiliar.splice(index, 1);
    }
    setPermisoSelected(arrayAuxiliar);
  };
  const handleSaveRole = (e) => {
    e.preventDefault();
    if (nameRole.trim() === "") {
      Swal.fire("Ups...", "Falta el nombre del rol", "error");
      return;
    }
    if (descripcionRole.trim() === "") {
      Swal.fire("Ups...", "Falta la descripción del rol", "error");
      return;
    }
    if (permisoSelected.length === 0) {
      Swal.fire(
        "Ups...",
        "Tienes que seleccionar al menos un permiso para crear un rol",
        "error"
      );
      return;
    }
    axios
      .post(
        `${baseUrl}/configuration/store/rol`,
        {
          nameRole,
          descripcionRole,
          permisoSelected,
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
        if (response.data.res === "exist") {
          Swal.fire(
            "Ups...",
            `Ya existe un rol con el nombre ${nameRole}`,
            "error"
          );
          return;
        } else {
          if (response.data.res === "ok") {
            console.log(response.data.role.uuid);
            Swal.fire({
              title: "Exito",
              text: "El rol se ha creado exitosamente",
              icon: "success",
              showDenyButton: true,
              confirmButtonText: "Continuar editando",
              denyButtonText: `Regresar`,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                history.push(`/roles/${response.data.role.uuid}`);
              } else if (result.isDenied) {
                history.push('/roles');
              }
            });
          }
        }
      })
      .catch(function (response) {
        console.log(response);
        Swal.fire(
          "Los siento...",
          `Hubo un error al crear el rol`,
          "error"
        );
        return;
      });
  };
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
