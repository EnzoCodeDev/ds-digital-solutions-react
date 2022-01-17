import React from "react";
//A este input se llama y se le pueden pasar cierta clase de parametros
export const InputText = ({
  id,
  name,
  value,
  onChange,
  className,
  placeholder,
  defaultValue,
  parametro_opcional,
}) => {
  return (
    <input
      type="text"
      name={name}
      value={value}
      className={className}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={(e) => onChange(e,id, parametro_opcional)}
    />
  );
};
