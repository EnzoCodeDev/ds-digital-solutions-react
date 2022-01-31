import React from "react";
import { useHistory } from "react-router";
//Iconos de material ui icons https://mui.com/components/material-icons/
import {
  // LockOpen,
  ExitToApp,
  // Translate,
  // ForumOutlined,
  // SettingsOutlined,
  PersonOutlineOutlined,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../redux/actions/auth";
export const PopolProfile = ({ infoProfile, setInfoProfile, infoMenssages, setInfoMenssages }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { uuid } = useSelector((state) => state.auth);
  //Eventos del popol del profile 
  // const handleConfig = () => {
  //   setInfoProfile(false);
  // }
  // const handleTranslate = () => {
  //   setInfoProfile(false);
  //   history.push('/translate')
  // };
  const handleProfile = ()=>{
    history.replace(`profile/${uuid}`);
    setInfoProfile(false);
  }
  // const handleMessage = ()=>{
  //   setInfoProfile(false);
  //   setInfoMenssages(!infoMenssages);
  // }
  // const handleBlock = ()=> {
  //   setInfoProfile(false);
  // }
  const handleLogout = () => {
    setInfoProfile(false);
    dispatch(startLogout());
  }
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
