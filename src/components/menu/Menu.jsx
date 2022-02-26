//scss se gestiona de ./styles/components/home/_menu.scss
import React, { useState, useEffect } from "react";
//iconos gestionados de material ui icons https://mui.com/components/material-icons/
import { useHistory } from "react-router";
import { MenuIndex } from "./MenuIndex";
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
    <MenuIndex
      menuOpen={menuOpen}
      setMenuOpen={setMenuOpen}
      SubMenuOpen={SubMenuOpen}
      SubMenuOpen2={SubMenuOpen2}
      setSubMenuOpen={setSubMenuOpen}
      handleProcesos={handleProcesos}
      setSubMenuOpen2={setSubMenuOpen2}
      menuOpenSubMenu={menuOpenSubMenu}
      handleSubProceso={handleSubProceso}
      SubMenuOpenDatos={SubMenuOpenDatos}
      SubMenuOpenTareas={SubMenuOpenTareas}
      SubMenuOpenAcceso={SubMenuOpenAcceso}
      setSubMenuOpenDatos={setSubMenuOpenDatos}
      setSubMenuOpenTareas={setSubMenuOpenTareas}
      setSubMenuOpenAcceso={setSubMenuOpenAcceso}
      handleMasterDocument={handleMasterDocument}
      handleParametrizacion={handleParametrizacion}
      SubMenuOpenEvaluacion={SubMenuOpenEvaluacion}
      SubMenuOpenVisualizacion={SubMenuOpenVisualizacion}
      setSubMenuOpenEvaluacion={setSubMenuOpenEvaluacion}
      SubMenuOpenParametrizacion={SubMenuOpenParametrizacion}
      setSubMenuOpenVisualizacion={setSubMenuOpenVisualizacion}
      setSubMenuOpenParametrizacion={setSubMenuOpenParametrizacion}
    />
  );
}
