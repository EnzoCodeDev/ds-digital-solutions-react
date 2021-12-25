import React from "react";

export const InputImg = ({classNameForm,classNameInput1, classNameInput2}) => {
  return (
    <div
      className={classNameForm}
      name="subida-imagenes"
      encType="multipart/formdata"
    >
      <input className={classNameInput1} type="file" name="imagen1"/>
      {/* <input className={classNameInput2} type="submit" name="subir-imagen" value="Enviar imagen" /> */}
    </div>
  );
};
