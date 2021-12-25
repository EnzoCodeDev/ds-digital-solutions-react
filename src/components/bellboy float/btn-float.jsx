import React from "react";
import { Visibility } from "@material-ui/icons";
export const BtnFloat = ({onClick}) => {
  return (
    <button
      className="btn-float"
      onClick={onClick}
    > <span>Preview</span>
      <Visibility />
    </button>
  );
};
