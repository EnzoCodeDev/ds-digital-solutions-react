import { types } from "../types/types";
const initialState = {
  documentMaster: {
    res: false,
    DocumentMasterHead: {
      id: "",
      user_id: "",
      uuid: "",
      version: "",
      code: "",
      format: "",
      template: "",
      description: "",
      process_type: "",
      process_description: "",
      logo_header: "",
      position: "",
      data_basic_type1: "",
      data_basic_title1: "",
      data_basic_description1: "",
      data_basic_type2: "",
      data_basic_title2: "",
      data_basic_description2: "",
      data_basic_type3: "",
      data_basic_title3: "",
      data_basic_description3: "",
      created_at: "",
      updated_at: "",
    },
    DocumentMasterBody: {
      id: "",
      id_header: "",
      number_card: "",
      title_card: "",
      select_value: "",
      text_description: "",
      image: "",
      link: "",
      link_description: "",
      file: "",
      file_description: "",
      list: "",
      columns: "",
      row: "",
      identity_data_position: "",
      type_celda: "",
      title_columns: "",
      list_value_celda: "",
      created_at: "",
      updated_at: "",
    },
    DocumentMasterBodyTable: {
      current_page: "",
      last_page: "",
      total: "",
      from: "",
      to: "",
    },
  },
};
export const formDocumentViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.documentDefaultDocumentMaster:
      return {
        documentMaster: initialState.documentMaster,
      };
    case types.documentViewDocumentMaster:
      return {
        ...state,
        documentMaster: action.payload,
      };
    case types.documentNewDocumentMaster:
      return {
        ...state,
        documentMaster: action.payload,
      };
    case types.documentUpdateDocumentMaster:
      return {
        ...state,
        documentMaster: action.payload,
      };
    case types.documentDeletedDocumentMaster:
      return {
        ...state,
        documentMaster: action.payload,
      };
    default:
      return state;
  }
};
