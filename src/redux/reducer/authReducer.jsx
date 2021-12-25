import { types } from "../types/types";
const initialState = {
  checking: false,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        checking: true,
      };
      case types.authCheckingFinish:
        return {
          ...state,
          checking: false,
        }
    case types.authLogout:
      return {
        checking: false,
      };
    default:
      return state;
  }
};
