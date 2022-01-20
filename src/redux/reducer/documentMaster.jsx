import { types } from "../types/types";
const initialState = {
  documentMaster: {
    res: false,
    documentMaster: [
      {
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
        process_link: null,
        logo_header: "",
        position: "",
        data_basic: JSON.stringify([]),
        position_data_basic: JSON.stringify([]),
        created_at: "",
        updated_at: "",
      },
    ],
  },
};
export const documentMaster = (state = initialState, action) => {
  switch (action.type) {
    case types.DocumentMastersearch:
      return {
        ...state,
        documentMaster: action.payload,
      };
    case types.DocumentMasterSave:
      return {
        ...state,
        documentMaster: action.payload,
      };

    default:
      return state;
  }
};
