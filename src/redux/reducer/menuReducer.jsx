import { types } from "../types/types";
const initialState = {
  infoMenu: {
    menu: false,
    subMenuParametrizacion: false,
    subMenuDatos: false,
    subMenuVisualizacion: false,
    subMenuTareas: false,
    subMenuEvaluacion: false,
    subMenuAcceso: false,
    currentAcceso: '',
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