import React from "react";

export const InputTextearea = ({
  id,
  name,
  cols,
  rows,
  onChange,
  className,
  placeholder,
  parametro_opcional,
}) => {
  return (
    <textarea
      required
      name={name}
      cols={cols}
      rows={rows}
      onChange={(e) => onChange(e,id, parametro_opcional)}
      className={className}
      placeholder={placeholder}
    ></textarea>
  );
};
