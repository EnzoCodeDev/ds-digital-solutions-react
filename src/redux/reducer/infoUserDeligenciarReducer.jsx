import { types } from "../types/types";
const initialState = {
  infoUser: {
    aplicar: '1',
    name: "",
    identity: "",
  },
};
export const infoUserDeligenciarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.infoUsersDefault:
      return {
        infoUser: initialState.infoUser,
      };
    case types.infoUserNew:
      return {
        ...state,
        infoUser: action.payload,
      };
    default:
      return state;
  }
};
