import { format } from "date-fns";
export const GROUPED_COLUMNS = [
  {
    Header: "Informacion del sub proceso",
    Footer: "Name",
    columns: [
      {
        Header: "Sub proceso",
        Footer: "Sub proceso",
        accessor: "sub_proceso",
      },
      {
        Header: "Fecha de creación",
        Footer: "Fecha de creación",
        accessor: "created_at",
        sticky: 'center',
        Cell: ({ value }) => {
          return format(new Date(value), "dd/MM/yyyy");
        },
      },
      {
        Header: "Ultima actualización",
        Footer: "Ultima actualización",
        accessor: "updated_at",
        Cell: ({ value }) => {
          return format(new Date(value), "dd/MM/yyyy");
        },
      }
    ],
  },
  {
    Header: "Creador del Sub proceso",
    Footer: "Creador del Sub proceso",
    columns: [
      {
        Header: "Nombre",
        Footer: "Nombre",
        accessor: "name",
      },
      {
        Header: "Email",
        Footer: "Email",
        accessor: "email",
      },
    ],
  },
];
