import React from "react";
export const PopolSistem = ({ infoSistem, setInfoSistem, setSistem }) => {
  const handleSistem = (e, sistema) => {
    setSistem(sistema);
    setInfoSistem(false);
  };
  return (
    <div>
      <div className={"popolSistem " + (infoSistem && "active")}>
        <ul>
          <ol onClick={(e) => handleSistem(e, "Sistema de gestión de calidad")}>
            <span className="infoModal"> Sistema de gestión de calidad </span>
          </ol>
          <ol>
            <span className="infoModal">
              {" "}
              Sistema de gestión de mantenimiento
            </span>
          </ol>
        </ul>
      </div>
    </div>
  );
};
