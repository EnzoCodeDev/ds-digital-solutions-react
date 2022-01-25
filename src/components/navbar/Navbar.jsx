//scss se gestiona de ./styles/components/home/_navbar.scss
import React, { useState, useEffect, useRef } from "react";
//Los iconos son gestionados por material ui icons
import {
  NotificationsNoneRounded,
  ChatOutlined,
  Search,
  ArrowDropDown,
} from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Menu } from "../menu/Menu";
import { PopolMessage } from "../popol/popolMessage";
import { PopolProfile } from "../popol/PopolProfile";
import { PopolNotification } from "../popol/PopolNotificacion";
import { PopolSistem } from "../popol/PopolSistem";
export function Navbar() {
  const history = useHistory();
  const { name } = useSelector((state) => state.auth);
  const { profile_photo, img_header } = useSelector((state) => state.auth);
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
    <div ref={navbarRef}>
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <PopolMessage
        infoMenssages={infoMenssages}
        setInfoMenssages={setInfoMenssages}
      />
      <PopolProfile
        infoProfile={infoProfile}
        setInfoProfile={setInfoProfile}
        infoMenssages={infoMenssages}
        setInfoMenssages={setInfoMenssages}
      />
      <PopolNotification
        infoNotificacion={infoNotificacion}
        setInfoNotificacion={setInfoNotificacion}
      />
      <PopolSistem
        infoSistem={infoSistem}
        setInfoSistem={setInfoSistem}
        setSistem={setSistem}
      />
      <div className={"topbar active"} onClick={handleResetPopol}>
        <div className="wrapper">
          <div className="right">
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              <span className="line1"></span>
              <span className="line2"></span>
              <span className="line3"></span>
            </div>
            <div className="container_user_img_url">
              <img className="user_img_url" alt="logo" src={img_header}></img>
            </div>
            <div className="container_logo">
              <img
                onClick={handleIntro}
                className="logo"
                alt="logo"
                src="/logo/ds-digital-solutions-logo.png"
              ></img>
            </div>
            <div className="container_sistema">
              <h6>{sistem}</h6>
            </div>
            <div className="itemContainer_sistem" onClick={handleSistem}>
              <div className={"icon " + (infoSistem && "active")}>
                <ArrowDropDown />
              </div>
            </div>
          </div>
          <div className="right">
            <div className="searchInput">
              <input
                className={"input " + (search && "active")}
                placeholder="Search"
              />
            </div>
            <Search className="search" onClick={() => setSearch(!search)} />
            <div className="itemContainer" onClick={handleNotification}>
              <NotificationsNoneRounded className="icon" />
              <span className="iconBagne">0</span>
            </div>
            <div className="itemContainer" onClick={handleMessages}>
              <ChatOutlined className="icon" />
              <span className="iconMessage">0</span>
            </div>
            <div className="itemContainer">
              <div className="imgContainer">
                <img src={profile_photo} alt="profile_photo" />
              </div>
            </div>
            <div className="itemContainer">
              <span>{name}</span>
            </div>
            <div className="itemContainer" onClick={handleInfo}>
              <div className={"icon " + (infoProfile && "active")}>
                <ArrowDropDown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
