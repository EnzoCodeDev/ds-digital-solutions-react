import React from "react";
export const InputSelect = ({
  id,
  name,
  option,
  onclick,
  onChange,
  selected,
  className,
  parametro_opcional,
}) => {
  //Esta logica es por si no viene un onClick en los
  //componentes y no mande un error
  const onclic = () => {
    return;
  };
  const onClick = onclick === undefined ? onclic : onclick;
  //Reutilizacion del componente del select recibe parametro opcionales
  return (
    <select
      name={`${name}`}
      onChange={onChange}
      className={className}
      defaultValue={selected}
      onClick={(e) => onClick(e, id, parametro_opcional)}
    >
      {option.map((optionValue) => (
        <>
          {optionValue === selected ? (
            <option selected key={optionValue}>
              {optionValue}
            </option>
          ) : (
            <option key={optionValue}>{optionValue}</option>
          )}
        </>
      ))}
    </select>
  );
};
