import { format } from "date-fns";
export const COLUMNS = [
  {
    Header: "Proceso",
    Footer: "Proceso",
    accessor: "process_select",
    sticky: 'left',
  },
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
    Header: "Elaborado",
    Footer: "Elaborado",
    accessor: "name",
    sticky: 'left'
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
];
export const GROUPED_COLUMNS = [
  {
    Header: "Filtros Home page",
    Footer: "Name",
    columns: [
      {
        Header: "Sistema",
        Footer: "First name",
        accessor: "management_system",
        sticky: 'left'
      },
      {
        Header: "Tema",
        Footer: "Last name",
        accessor: "theme",
        sticky: 'left'
      },
    ],
  },
  {
    Header: "Descripcion informacion del documento",
    Footer: "Info",
    columns: [
      {
        Header: "Proceso",
        Footer: "Date of birth",
        accessor: "process",
      },
      {
        Header: "Titulo",
        Footer: "Country",
        accessor: "title",
      },
      {
        Header: "Codigo",
        Footer: "Phone",
        accessor: "code",
      },
      {
        Header: "Revision",
        Footer: "Email",
        accessor: "revision",
      },
    ],
  },
  {
    Header: "Flujo de informacio de documento",
    Footer: "Name",
    columns: [
      {
        Header: "Elaborado",
        Footer: "First name",
        accessor: "elaborate",
        sticky: 'left'
      },
      {
        Header: "Revision",
        Footer: "Last name",
        accessor: "check",
        sticky: 'left'
      },
      {
        Header: "Aprovado",
        Footer: "Date of birth",
        accessor: "approve",
      },
    ],
  },
  {
    Header: "Fechas",
    Footer: "Info",
    columns: [
      {
        Header: "Frecuencia",
        Footer: "Phone",
        accessor: "frequencies",
      },
      {
        Header: "Cargue",
        Footer: "Email",
        accessor: "created_at",
        Cell: ({ value }) => {
          return format(new Date(value), "dd/MM/yyyy");
        },
    
      },
      {
        Header: "Ultima actualizacion",
        Footer: "Email",
        accessor: "update_at",    
      },
      {
        Header: "Vencimiento",
        Footer: "Email",
        accessor: "expiration",
      },
    ],
  }
];
