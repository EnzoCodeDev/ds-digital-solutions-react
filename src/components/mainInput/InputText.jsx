import React from "react";

export const InputText = ({
  id,
  name,
  value,
  state,
  setState,
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
