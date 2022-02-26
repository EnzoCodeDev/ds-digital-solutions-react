import React from "react";
import "./sistem.scss";
export const SistemIndex = ({ infoSistem, handleSistem }) => {
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
