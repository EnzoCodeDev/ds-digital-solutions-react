import { format } from "date-fns";
export const GROUPED_COLUMNS = [
  {
    Header: "Información del documento",
    Footer: "Name",
    columns: [
      {
        Header: "Codigo",
        Footer: "Codigo",
        accessor: "code",
        sticky: 'left'
      },
      {
        Header: "Formato",
        Footer: "Formato",
        accessor: "format",
      },
      {
        Header: "Plantilla",
        Footer: "Plantilla",
        accessor: "template",
      },
      {
        Header: "Descripción",
        Footer: "Descripción",
        accessor: "description",
    
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
    Header: "Elaboro",
    Footer: "Elaboro",
    columns: [
      {
        Header: "Nombre",
        Footer: "Nombre",
        accessor: "name",
        sticky: 'left'
      },
      {
        Header: "Email",
        Footer: "Email",
        accessor: "email",
        sticky: 'left'
      },
    ],
  },
  {
    Header: "Mas información",
    Footer: "Estado",
    columns: [
      {
        Header: "Estado",
        Footer: "Estado",
        accessor: "state_document",
      },
    ],
  },
];