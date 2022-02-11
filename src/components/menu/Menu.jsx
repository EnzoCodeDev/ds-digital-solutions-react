//scss se gestiona de ./styles/components/home/_menu.scss
import React, { useState, useEffect } from "react";
//iconos gestionados de material ui icons https://mui.com/components/material-icons/
import {
  Code,
  // Eject,
  Error,
  Email,
  AllOut,
  Search,
  Subject,
  Details,
  AlarmOn,
  Timeline,
  MenuOpen,
  BarChart,
  CallSplit,
  ExitToApp,
  ArrowRight,
  Assignment,
  DonutLarge,
  Description,
  LibraryBooks,
  Announcement,
  LocalActivity,
  QueuePlayNext,
  ContactSupport,
  FormatIndentIncrease,
  // CalendarTodayOutlined,
} from "@material-ui/icons";
import { useHistory } from "react-router";
export function Menu({ menuOpen, setMenuOpen }) {
  const history = useHistory();
  //Manejo de enventos del sub menu
  const handleParametrizacion = () => {
    setMenuOpen(false);
    history.push("/documentation-master-list");
    localStorage.setItem("pagina", "parametrizacion");
  };
  const handleProcesos = () => {
    setSubMenuOpen2(!SubMenuOpen2);
    history.push("/procesos");
    localStorage.setItem("pagina", "proceso");
  };
  const handleSubProceso = () => {
    setMenuOpen(false);
    history.push("/subProcesos");
    localStorage.setItem("pagina", "subproceso");
  };
  const handleMasterDocument = () => {
    setMenuOpen(false);
    history.push("/documentMaster");
    localStorage.setItem("pagina", "maestroinformacion");
  };
  // const handleCalendar = () => {
  //   setMenuOpen(false);
  //   history.push("/calendar");
  // };

  //Manejo de los submenus con los state
  const [SubMenuOpen, setSubMenuOpen] = useState(false);
  const [SubMenuOpen2, setSubMenuOpen2] = useState(false);
  const [SubMenuOpenParametrizacion, setSubMenuOpenParametrizacion] =
    useState(false);
  const [SubMenuOpenDatos, setSubMenuOpenDatos] = useState(false);
  const [SubMenuOpenVisualizacion, setSubMenuOpenVisualizacion] =
    useState(false);
  const [SubMenuOpenTareas, setSubMenuOpenTareas] = useState(false);
  const [SubMenuOpenEvaluacion, setSubMenuOpenEvaluacion] = useState(false);
  const [SubMenuOpenAcceso, setSubMenuOpenAcceso] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("pagina") === "parametrizacion") {
      setSubMenuOpenParametrizacion(true);
    }
    if (localStorage.getItem("pagina") === "proceso") {
      setSubMenuOpenParametrizacion(true);
    }
    if (localStorage.getItem("pagina") === "subproceso") {
      setSubMenuOpenParametrizacion(true);
    }
    if (localStorage.getItem("pagina") === "maestroinformacion") {
      setSubMenuOpenDatos(true);
    }
  }, []);
  const menuOpenSubMenu = (subMenu) => {
    setMenuOpen(true);
    if (subMenu === "parametrizacion") {
      setSubMenuOpenParametrizacion(true);
    }
    if (subMenu === "datos") {
      setSubMenuOpenDatos(true);
    }
    if (subMenu === "visualizacion") {
      setSubMenuOpenVisualizacion(true);
    }
    if (subMenu === "tareas") {
      setSubMenuOpenTareas(true);
    }
    if (subMenu === "evaluacion") {
      setSubMenuOpenEvaluacion(true);
    }
    if (subMenu === "accesos") {
      setSubMenuOpenAcceso(true);
    }
  };

  return (
    <div className={"menu " + (menuOpen && "active")}>
      <div className={"container_menu"}>
        <div className={"container_parametrization"}>
          <div className="header">
            <div
              onClick={() =>
                setSubMenuOpenParametrizacion(menuOpen ? !SubMenuOpenParametrizacion : true )
              }
              className="container_icon_principal"
            >
              <QueuePlayNext
                className="icon"
                onClick={() => menuOpenSubMenu("parametrizacion")}
              />
              <div className="container_content">
                <span className="maestros_title">ADMINISTRACIÓN</span>
                <ArrowRight
                  className={
                    "iconSubMenu " + (SubMenuOpenParametrizacion && "active")
                  }
                />
              </div>
            </div>
          </div>
          {menuOpen && SubMenuOpenParametrizacion && (
            <div
              className={
                "animate__animated animate__fadeInLeft container_sub_menu " +
                (SubMenuOpenParametrizacion && "active")
              }
            >
              <ul>
                {localStorage.getItem("pagina") === "proceso" ? (
                  <li className="active">
                    <DonutLarge />
                    <b> Procesos</b>
                  </li>
                ) : (
                  <li onClick={handleProcesos}>
                    <DonutLarge />
                    <b> Procesos</b>
                  </li>
                )}
                {localStorage.getItem("pagina") === "subproceso" ? (
                  <li className="active">
                    <Subject />
                    <b> Sub procesos</b>
                  </li>
                ) : (
                  <li onClick={handleSubProceso}>
                    <Subject />
                    <b> Sub procesos</b>
                  </li>
                )}
                {localStorage.getItem("pagina") === "parametrizacion" ? (
                  <li className="active">
                    <FormatIndentIncrease />
                    <b> Ficha de documentos</b>
                  </li>
                ) : (
                  <li onClick={handleParametrizacion}>
                    <FormatIndentIncrease />
                    <b> Ficha de documentos</b>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
        <div className="container_maestros">
          <div className="header">
            <div
              onClick={() => setSubMenuOpenDatos(menuOpen ? !SubMenuOpenDatos : true )}
              className="container_icon_principal"
            >
              <Description
                className="icon"
                onClick={() => menuOpenSubMenu("datos")}
              />
              <div className="container_content">
                <span className="maestros_title">DATOS</span>
                <ArrowRight
                  className={"iconSubMenu " + (SubMenuOpenDatos && "active")}
                />
              </div>
            </div>
          </div>
          {menuOpen && SubMenuOpenDatos && (
            <div
              className={
                " animate__animated animate__fadeInLeft container_sub_menu " +
                (SubMenuOpenDatos && "active")
              }
            >
              <ul>
                {localStorage.getItem("pagina") === "maestroinformacion" ? (
                  <li className="active">
                    <LibraryBooks />
                    <b> Maestro de información</b>
                  </li>
                ) : (
                  <li onClick={handleMasterDocument}>
                    <LibraryBooks />
                    <b> Maestro de información</b>
                  </li>
                )}
                <li onClick={() => setSubMenuOpen(!SubMenuOpen)}>
                  <Code />
                  <b> Maestro de indicadores</b>
                </li>
                {/* <li onClick={() => setSubMenuOpen2(!SubMenuOpen2)}>
                  <Eject />
                  <b> Maestro de ejecucion</b>
                </li> */}
                <li onClick={() => setSubMenuOpen2(!SubMenuOpen2)}>
                  <MenuOpen />
                  <b> Maestro de tareas</b>
                </li>
                <li onClick={() => setSubMenuOpen2(!SubMenuOpen2)}>
                  <BarChart />
                  <b> Maestro de evaluación</b>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="visualizacion_container">
          <div className="header">
            <div
              onClick={() =>
                setSubMenuOpenVisualizacion(menuOpen ? !SubMenuOpenVisualizacion : true )
              }
              className="container_icon_principal"
            >
              <Timeline
                className="icon"
                onClick={() => menuOpenSubMenu("visualizacion")}
              />
              <div className="container_content">
                <span className="visualizacion_title">VISUALIZACIÓN</span>
                <ArrowRight
                  className={
                    "iconSubMenu " + (SubMenuOpenVisualizacion && "active")
                  }
                />
              </div>
            </div>
          </div>
          {menuOpen && SubMenuOpenVisualizacion && (
            <div
              className={
                " animate__animated animate__fadeInLeft container_sub_menu " +
                (SubMenuOpenVisualizacion && "active")
              }
            >
              <ul>
                <li onClick={() => setMenuOpen(false)}>
                  <Details />
                  <b> Organigrama</b>
                </li>
                <li onClick={() => setMenuOpen(false)}>
                  <AllOut />
                  <b> Procesos</b>
                </li>
                <li onClick={() => setMenuOpen(false)}>
                  <Error />
                  <b> Riesgos</b>
                </li>
                <li onClick={() => setMenuOpen(false)}>
                  <CallSplit />
                  <b> Indicaciones</b>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="tareas_container">
          <div className="header">
            <div
              onClick={() => setSubMenuOpenTareas(menuOpen ? !SubMenuOpenTareas : true )}
              className="container_icon_principal"
            >
              <Assignment
                className="icon"
                onClick={() => menuOpenSubMenu("tareas")}
              />
              <div className="container_content">
                <span className="tareas_title">TAREAS</span>
                <ArrowRight
                  className={"iconSubMenu " + (SubMenuOpenTareas && "active")}
                />
              </div>
            </div>
          </div>
          {menuOpen && SubMenuOpenTareas && (
            <div
              className={
                "animate__animated animate__fadeInLeft container_sub_menu " +
                (SubMenuOpenTareas && "active")
              }
            >
              <ul>
                <li>
                  <Assignment />
                  <b> Tareas</b>
                </li>
                <li onClick={() => setMenuOpen(false)}>
                  <ContactSupport />
                  <b> Novedades</b>
                </li>
                {/* <li onClick={handleCalendar}>
            <CalendarTodayOutlined />
            <b> Calendario de eventos</b>
            <ArrowRight className="icon" />
          </li> */}
              </ul>
            </div>
          )}
        </div>
        <div className="evaluacion_container">
          <div className="header">
            <div
              onClick={() => setSubMenuOpenEvaluacion(menuOpen ? !SubMenuOpenEvaluacion : true )}
              className="container_icon_principal"
            >
              <Search
                className="icon"
                onClick={() => menuOpenSubMenu("evaluacion")}
              />
              <div className="container_content">
                <span className="evaluacion_title">EVALUACIÓN</span>
                <ArrowRight
                  className={
                    "iconSubMenu " + (SubMenuOpenEvaluacion && "active")
                  }
                />
              </div>
            </div>
          </div>
          {menuOpen && SubMenuOpenEvaluacion && (
            <div
              className={
                "animate__animated animate__fadeInLeft container_sub_menu " +
                (SubMenuOpenEvaluacion && "active")
              }
            >
              <ul>
                <li>
                  <AlarmOn />
                  <b> Cumplimientos</b>
                </li>
                <li onClick={() => setMenuOpen(false)}>
                  <LocalActivity />
                  <b> Auditorias</b>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="accesos_container">
          <div className="header">
            <div
              onClick={() => setSubMenuOpenAcceso(menuOpen ? !SubMenuOpenAcceso : true )}
              className="container_icon_principal"
            >
              <ExitToApp
                className="icon"
                onClick={() => menuOpenSubMenu("accesos")}
              />
              <div className="container_content">
                <span className="accesos_title">ACCESOS</span>
                <ArrowRight
                  className={"iconSubMenu " + (SubMenuOpenAcceso && "active")}
                />
              </div>
            </div>
          </div>
          {menuOpen && SubMenuOpenAcceso && (
            <div
              className={
                " animate__animated animate__fadeInLeft container_sub_menu " +
                (SubMenuOpenAcceso && "active")
              }
            >
              <ul>
                <li>
                  <ExitToApp />
                  <b> Accesos favoritos</b>
                </li>
                <li onClick={() => setMenuOpen(false)}>
                  <Announcement />
                  <b> Administrador chat</b>
                </li>
                <li onClick={() => setMenuOpen(false)}>
                  <Email />
                  <b> Correo</b>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
