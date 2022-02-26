import React from "react";
import { SistemIndex } from "./SistemIndex";
export const Sistem = ({ infoSistem, setInfoSistem, setSistem }) => {
  const handleSistem = (e, sistema) => {
    setSistem(sistema);
    setInfoSistem(false);
  };
  return <SistemIndex infoSistem={infoSistem} handleSistem={handleSistem} />;
};
