import React from "react";
// import { Search, ArrowDropDown } from "@material-ui/icons";
export const DocumentOptionTable = ({ total }) => {
  return (
    <div className="option_table">
      <div className="option_sub_table">
        <div className="container_filter">
          {/* <div className="filter_global">
            <input
              className={"input_global_filter"}
              placeholder="Filtro global"
            />
            <Search className="search" />
          </div> */}
          <div className='resuls'>
            <span>
              Número de resultados:<b> {total}</b>
            </span>
          </div>
          {/* <div className="option">
            <span className="option_parrafo">Mas opciones</span>
            <ArrowDropDown className="option_icon" />
          </div> */}
        </div>
      </div>
    </div>
  );
};
