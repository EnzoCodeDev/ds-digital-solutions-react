import { types } from "../types/types";
//Por default la infoamcion del usuario
export const DefaultInfoUser = () => ({
  type: types.infoUsersDefault,
});
//Tambien esta informacion para guardar mas informacion del usuario
export const NewInfoUser = (name, identity) => ({
  type: types.infoUserNew,
  payload: { name: name, identity: identity },
});
