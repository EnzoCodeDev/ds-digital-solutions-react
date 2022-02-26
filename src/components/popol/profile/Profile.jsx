import React from "react";
import { useHistory } from "react-router";
//Iconos de material ui icons https://mui.com/components/material-icons/
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../../redux/actions/auth";
import { ProfileIndex } from "./ProfileIndex";
export const Profile = ({
  infoProfile,
  setInfoProfile,
  infoMenssages,
  setInfoMenssages,
}) => {
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
  const handleProfile = () => {
    history.replace(`profile/${uuid}`);
    setInfoProfile(false);
  };
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
  };
  return (
    <ProfileIndex
      infoProfile={infoProfile}
      handleLogout={handleLogout}
      handleProfile={handleProfile}
    />
  );
};
