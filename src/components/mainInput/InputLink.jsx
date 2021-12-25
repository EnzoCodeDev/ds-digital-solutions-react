import React from "react";
export const InputLink = ({
  id,
  name,
  value,
  onChange,
  className,
  placeholder,
}) => {
  return (
      <input
      type="url"
      name={name}
      value={value}
      className={className}
      placeholder={placeholder}
      onChange={(e)=>onChange(e,id)}
      ></input>
  );
};
