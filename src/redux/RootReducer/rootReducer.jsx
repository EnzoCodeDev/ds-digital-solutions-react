//Aqui se combina todos los reducers que tenemos para asi volverlos a entorno de nuestra app
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { authReducer } from "../reducer/authReducer";
import { calendarReducer } from '../reducer/calendarReducer';
import { formDocumentReducer} from "../reducer/formDocumentTableReducer";
import { formDocumentViewReducer } from "../reducer/formDocumentReducer";
import { uiReducer } from '../reducer/uiReducer';
//Esta parte es muy esencial para el optimo funcionamineto del redux y todos sus estados que maneja
const createRootReducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    calendar: calendarReducer,
    documentMaster: formDocumentViewReducer,
    document: formDocumentReducer,
    ui: uiReducer,
  });
export default createRootReducers;
