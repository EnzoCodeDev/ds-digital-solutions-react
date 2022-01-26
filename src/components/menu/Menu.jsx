//scss se gestiona de ./styles/components/home/_menu.scss
import React, { useState } from "react";
//iconos gestionados de material ui icons https://mui.com/components/material-icons/
import {
  Code,
  Eject,
  Error,
  Email,
  AllOut,
  Search,
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
  };
  const handleMasterDocument = () => {
    setMenuOpen(false);
    history.push("/documentMaster");
  };
  // const handleCalendar = () => {
  //   setMenuOpen(false);
  //   history.push("/calendar");
  // };
  //Manejo de los submenus con los state
  const [SubMenuOpen, setSubMenuOpen] = useState(false);
  const [SubMenuOpen2, setSubMenuOpen2] = useState(false);
  return (
    <div className={"menu " + (menuOpen && "active")}>
      <div className={"container_parametrization"}>
        <div className="header">
          <QueuePlayNext className="icon" />
          <span className="maestros_title">PARAMETRIZACIÓN</span>
        </div>
        <ul>
        <li onClick={() => setSubMenuOpen2(!SubMenuOpen2)}>
            <DonutLarge />
            <b> Procesos</b>
            <ArrowRight className={"icon " + (SubMenuOpen && "active")} />
          </li>
          <li onClick={() => setSubMenuOpen2(!SubMenuOpen2)}>
            <DonutLarge />
            <b> SubProcesos</b>
            <ArrowRight className={"icon " + (SubMenuOpen && "active")} />
          </li>
          <li onClick={handleParametrizacion}>
            <FormatIndentIncrease />
            <b> Parametrización</b>
            <ArrowRight className={"icon " + (SubMenuOpen && "active")} />
          </li>
        </ul>
      </div>
      <div className="container_maestros">
        <div className="header">
          <Description className="icon" />
          <span className="maestros_title">DATOS</span>
        </div>
        <ul>
          <li onClick={handleMasterDocument}>
            <LibraryBooks />
            <b> Maestro de información</b>
            <ArrowRight className={"icon " + (SubMenuOpen && "active")} />
          </li>
          <li onClick={() => setSubMenuOpen(!SubMenuOpen)}>
            <Code />
            <b> Maestro de indicadores</b>
            <ArrowRight className="icon" />
          </li>
          <li onClick={() => setSubMenuOpen2(!SubMenuOpen2)}>
            <Eject />
            <b> Maestro de ejecucion</b>
            <ArrowRight className="icon" />
          </li>
          <li onClick={() => setSubMenuOpen2(!SubMenuOpen2)}>
            <MenuOpen />
            <b> Maestro de tareas</b>
            <ArrowRight className={"icon " + (SubMenuOpen2 && "active")} />
            <ul className={"ul-menu " + (SubMenuOpen2 && "active-sub-menu2 ")}>
              {/* <li>
                <ArrowForwardIos className="icons" />
                <span className="submenu"> Hola</span>
              </li>
              <li>
                <ArrowForwardIos className="icons" />
                <span className="submenu"> Hola</span>
              </li>
              <li>
                <ArrowForwardIos className="icons" />
                <span className="submenu"> Hola</span>
              </li>
              <li>
                <ArrowForwardIos className="icons" />
                <span className="submenu"> Hola</span>
              </li> */}
            </ul>
          </li>
          <li onClick={() => setSubMenuOpen2(!SubMenuOpen2)}>
            <BarChart />
            <b> Maestro de evaluación</b>
            <ArrowRight className="icon" />
          </li>
        </ul>
      </div>
      <div className="visualizacion_container">
        <div className="header">
          <Timeline className="icon" />
          <span className="visualizacion_title">VISUALIZACION</span>
        </div>
        <ul>
          <li onClick={() => setMenuOpen(false)}>
            <Details />
            <b> Organigrama</b>
            <ArrowRight className="icon" />
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <AllOut />
            <b> Procesos</b>
            <ArrowRight className="icon" />
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <Error />
            <b> Riesgos</b>
            <ArrowRight className="icon" />
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <CallSplit />
            <b> Indicaciones</b>
            <ArrowRight className="icon" />
          </li>
        </ul>
      </div>
      <div className="tareas_container">
        <div className="header">
          <Assignment className="icon" />
          <span className="tareas_title">TAREAS</span>
        </div>
        <ul>
          <li>
            <Assignment />
            <b> Tareas</b>
            <ArrowRight className="icon" />
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <ContactSupport />
            <b> Novedades</b>
            <ArrowRight className="icon" />
          </li>
          {/* <li onClick={handleCalendar}>
            <CalendarTodayOutlined />
            <b> Calendario de eventos</b>
            <ArrowRight className="icon" />
          </li> */}
        </ul>
      </div>
      <div className="evaluacion_container">
        <div className="header">
          <Search className="icon" />
          <span className="evaluacion_title">EVALUACION</span>
        </div>
        <ul>
          <li>
            <AlarmOn />
            <b> Cumplimientos</b>
            <ArrowRight className="icon" />
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <LocalActivity />
            <b> Auditorias</b>
            <ArrowRight className="icon" />
          </li>
        </ul>
      </div>
      <div className="accesos_container">
        <div className="header">
          <ExitToApp className="icon" />
          <span className="accesos_title">ACCESOS</span>
        </div>
        <ul>
          <li>
            <ExitToApp />
            <b> Accesos favoritos</b>
            <ArrowRight className="icon" />
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <Announcement />
            <b> Administrador chat</b>
            <ArrowRight className="icon" />
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <Email />
            <b> Correo</b>
            <ArrowRight className="icon" />
          </li>
        </ul>
      </div>
    </div>
  );
}
