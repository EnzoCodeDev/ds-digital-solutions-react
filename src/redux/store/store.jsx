//Configuracion del redux
import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "../RootReducer/rootReducer";
export const history = createBrowserHistory();
const routerMiddlewares = routerMiddleware(history);
//Se hace de esta  manera ya que asi podemos guardar
//varias funciones que guardo en el store
const middleware = [ReduxThunk, routerMiddlewares];
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
export const store = createStore(
  //Es para tener las rutas al tanto del redux
  createRootReducer(history),
  // Para poder que funcione redux en las redux deltoolp
  composeEnhancers(applyMiddleware(...middleware))
);
