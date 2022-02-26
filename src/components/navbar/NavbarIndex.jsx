import React from "react";
import {
  Search,
  ChatOutlined,
  ArrowDropDown,
  NotificationsNoneRounded,
} from "@material-ui/icons";
import { Menu } from "../menu/Menu";
import { Message } from "../popol/message/Message";
import { Profile } from "../popol/profile/Profile";
import { Notification } from "../popol/notification/Notificacion";
import { Sistem } from "../popol/sistem/Sistem";
import './navbar.scss';
export const NavbarIndex = ({
  name,
  sistem,
  search,
  menuOpen,
  setSearch,
  navbarRef,
  setSistem,
  infoSistem,
  handleInfo,
  img_header,
  setMenuOpen,
  handleIntro,
  infoProfile,
  handleSistem,
  infoMenssages,
  setInfoSistem,
  profile_photo,
  setInfoProfile,
  handleMessages,
  handleResetPopol,
  infoNotificacion,
  setInfoMenssages,
  handleNotification,
  setInfoNotificacion,
}) => {
  return (
    <div ref={navbarRef}>
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Message
        infoMenssages={infoMenssages}
        setInfoMenssages={setInfoMenssages}
      />
      <Profile
        infoProfile={infoProfile}
        setInfoProfile={setInfoProfile}
        infoMenssages={infoMenssages}
        setInfoMenssages={setInfoMenssages}
      />
      <Notification
        infoNotificacion={infoNotificacion}
        setInfoNotificacion={setInfoNotificacion}
      />
      <Sistem
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
};
