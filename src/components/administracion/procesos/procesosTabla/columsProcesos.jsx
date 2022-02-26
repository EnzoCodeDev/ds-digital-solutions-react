import { format } from "date-fns";
export const GROUPED_COLUMNS = [
  {
    Header: "Informacion del proceso",
    Footer: "Name",
    columns: [
      {
        Header: "Proceso",
        Footer: "Proceso",
        accessor: "proceso",
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
    Header: "Creador del proceso",
    Footer: "Creador del proceso",
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
