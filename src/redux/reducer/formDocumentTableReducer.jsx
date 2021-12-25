import { types } from "../types/types";
const initialState = {
  document: {
    data: [],
    links: {
      first: "",
      last: "",
      next: "",
      prev: "",
    },
    meta: {
      current_page: "",
      last_page: "",
      total: "",
      from: "",
      to: "",
    },
  },
};
export const formDocumentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DocumentMasterPaginateInit:
      return {
        ...state,
        document: action.payload,
      };
    default:
      return state;
  }
};
