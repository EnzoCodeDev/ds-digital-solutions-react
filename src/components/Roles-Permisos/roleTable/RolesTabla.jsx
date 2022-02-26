import React from "react";
import { useHistory } from "react-router";
import { RolesTablaIndex } from "./RolesTablaIndex";
export const RolesTabla = () => {
  const history = useHistory();
  const columns = [
    {
      title: "Roles",
      field: "role",
    },
    {
      title: "Descripcion del roles",
      field: "description",
    },
  ];
  const data = [
    { role: "administrador", description: "Administrador" },
    { role: "administrador", description: "Administrador" },
    { role: "administrador", description: "Administrador" },
    { role: "administrador", description: "Administrador" },
  ];
  const CreateRole = () => {
    history.push("/roles/create");
  };
  return (
    <RolesTablaIndex CreateRole={CreateRole} columns={columns} data={data} />
  );
};
