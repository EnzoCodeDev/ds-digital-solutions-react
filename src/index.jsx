import React from "react";
import ReactDOM from "react-dom";
import './styles/styles.scss';
import App from "./App";
import { store } from "./redux/store/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { resources } from "./translations/global";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/store/store";
//Este es el i18Next para las traducciones de react
//El use de lenguaje detector es para determinar un idioma dependiendo el lugar del computador
i18next.use(LanguageDetector).init({
  resources, 
});
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
