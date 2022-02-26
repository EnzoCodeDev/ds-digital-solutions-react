//scss se gestiona de ./styles/components/home/_navbar.scss
import React, { useState, useEffect, useRef } from "react";
//Los iconos son gestionados por material ui icons
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { NavbarIndex } from "./NavbarIndex";
export function Navbar() {
  const history = useHistory();
  const { name, profile_photo, img_header } = useSelector(
    (state) => state.auth
  );
  //Estado de los popol, menu y notificaciones del navbar
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [infoNotificacion, setInfoNotificacion] = useState(false);
  const [infoProfile, setInfoProfile] = useState(false);
  const [infoMenssages, setInfoMenssages] = useState(false);
  const [infoSistem, setInfoSistem] = useState(false);
  const [sistem, setSistem] = useState("Sistema de gestión de calidad");
  //Esta logica es para cerrar los popol cuando se le den click fuera de ellos
  let navbarRef = useRef();
  useEffect(() => {
    let handler = (event) => {
      if (!navbarRef.current.contains(event.target)) {
        setInfoProfile(false);
        setInfoNotificacion(false);
        setInfoMenssages(false);
        setInfoSistem(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [navbarRef]);
  //Se debieron sacar los estados para poder tenerlos sin propagacion
  //Ocultar o ver info del profile
  //Eventos del navbar
  const handleInfo = (e) => {
    e.stopPropagation();
    setInfoProfile(!infoProfile);
    setInfoNotificacion(false);
    setInfoMenssages(false);
    setInfoSistem(false);
  };
  //ocultar o ver info de las notificaciones
  const handleNotification = (e) => {
    e.stopPropagation();
    setInfoNotificacion(!infoNotificacion);
    setInfoProfile(false);
    setInfoMenssages(false);
    setInfoSistem(false);
  };
  //ocultar o ver info de los mensajes
  const handleMessages = (e) => {
    e.stopPropagation();
    setInfoProfile(false);
    setInfoNotificacion(false);
    setInfoSistem(false);
    setInfoMenssages(!infoMenssages);
  };
  //Ocultar las opciones de sistema
  const handleSistem = (e) => {
    e.stopPropagation();
    setInfoNotificacion(false);
    setInfoProfile(false);
    setInfoMenssages(false);
    setInfoSistem(!infoSistem);
  };
  //ocultar cualquier popol despues de un click por fuera
  const handleResetPopol = () => {
    setInfoProfile(false);
    setInfoNotificacion(false);
    setInfoMenssages(false);
    setInfoSistem(false);
  };
  const handleIntro = () => {
    setMenuOpen(false);
    history.push("/intro");
  };
  return (
    <NavbarIndex
      name={name}
      sistem={sistem}
      search={search}
      menuOpen={menuOpen}
      setSearch={setSearch}
      navbarRef={navbarRef}
      setSistem={setSistem}
      infoSistem={infoSistem}
      handleInfo={handleInfo}
      img_header={img_header}
      setMenuOpen={setMenuOpen}
      handleIntro={handleIntro}
      infoProfile={infoProfile}
      handleSistem={handleSistem}
      infoMenssages={infoMenssages}
      setInfoSistem={setInfoSistem}
      profile_photo={profile_photo}
      setInfoProfile={setInfoProfile}
      handleMessages={handleMessages}
      handleResetPopol={handleResetPopol}
      infoNotificacion={infoNotificacion}
      setInfoMenssages={setInfoMenssages}
      handleNotification={handleNotification}
      setInfoNotificacion={setInfoNotificacion}
    />
  );
}
