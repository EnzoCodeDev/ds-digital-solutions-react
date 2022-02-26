import React from "react";
import {
  // LockOpen,
  ExitToApp,
  // Translate,
  // ForumOutlined,
  // SettingsOutlined,
  PersonOutlineOutlined,
} from "@material-ui/icons";
import "./profile.scss";
export const ProfileIndex = ({ infoProfile, handleProfile, handleLogout }) => {
  return (
    <div>
      <div className={"modalProfile " + (infoProfile && "active")}>
        <ul>
          {/* <ol onClick={handleConfig}>
          <SettingsOutlined className="icon" />
          <span className="infoModal"> Configuración</span>
        </ol>
        <ol onClick={handleTranslate}>
          <Translate className="icon" />
          <span className="infoModal"> Idiomas</span>
        </ol> */}
          <ol onClick={handleProfile}>
            <PersonOutlineOutlined className="icon" />
            <span className="infoModal"> Ver perfil</span>
          </ol>
          {/* <ol onClick={handleMessage}>
          <ForumOutlined className="icon" />
          <span className="infoModal"> Mensajes</span>
        </ol>
        <ol onClick={handleBlock}>
          <LockOpen className="icon" />
          <span className="infoModal"> Bloquear</span>
        </ol> */}
          <ol onClick={handleLogout}>
            <ExitToApp className="icon" />
            <span className="infoModal"> Cerrar sesión </span>
          </ol>
        </ul>
      </div>
    </div>
  );
};
