import { types } from "../types/types";
//Por default la infoamcion del usuario
export const DefaultInfoUser = () => ({
  type: types.infoUsersDefault,
});
//Tambien esta informacion para guardar mas informacion del usuario
export const NewInfoUser = (aplicar, name, identity) => ({
  type: types.infoUserNew,
  payload: {aplicar: aplicar, name: name, identity: identity },
});
