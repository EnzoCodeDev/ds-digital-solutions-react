import React from "react";
import MaterialTable from "material-table";
export const RolesTablaIndex = ({ CreateRole, columns, data }) => {
  return (
    <div>
      <div onClick={CreateRole}>Crear role</div>
      <MaterialTable
        columns={columns}
        data={data}
        title={"Roles"}
        actions={[
          {
            icon: "edit",
            tooltip: "Editar rol",
            onClick: (event, rowData) => alert("Editar"),
          },
          {
            icon: "delete",
            tooltip: "Eliminar rol",
            onClick: (event, rowData) => alert("eliminar"),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
        localization={{
          header: {
            actions: "Acciones",
          },
        }}
      />
      {/* <div onClick={}>Crear nuevo role</div> */}
    </div>
  );
};
