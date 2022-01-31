import { types } from "../types/types";
const initialState = {
  documentMaster: {
    res: false,
    DocumentMasterHead: {
      id: "",
      user_id: "",
      uuid: "",
      version: 0,
      code: "",
      format: "",
      template: "",
      description: "",
      process_type: "",
      process_description: "",
      process_link: null,
      logo_header: "",
      position: "",
      data_basic: JSON.stringify([]),
      position_data_basic: JSON.stringify([]),
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
    DocumentMasterInfo: {
      id: "",
      id_card: "",
      id_header: "",
      title_card: "",
      text_description: "",
      file: "",
      file_description: "",
      link: "",
      link_description: "",
      card_info_table: "",
      created_at: "",
      num_version: "",
      type_card: "",
      updated_at: "",
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
