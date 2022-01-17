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
    default:
      return state;
  }
};
