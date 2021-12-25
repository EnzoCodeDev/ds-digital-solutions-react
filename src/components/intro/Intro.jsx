//scss se gestiona de ./styles/components/home/_intro.scss
import React, { useState } from "react";
import { Navbar } from "../navbar/Navbar";
import { Content } from "./Content";

export const Intro = () => {
  //Aqui se manejan los estados de toda la intro , navbar, menu, mensajes,notifcationes
  // para manejar las transiciones o activaro o descativalos
  const [infoProfile, setInfoProfile] = useState(false);
  return (
    //Esta es toda la parte visual de la aplicacion 
    //fragmentados por variosa componentes
    //Tambien pasamos los estamos a los componenetes necesarios
    <div className="section_intro">
      <Navbar/>
      <div className={"section_unique "}>
        <Content  infoProfile={infoProfile} setInfoProfile={setInfoProfile} />
      </div>
    </div>
  );
};
