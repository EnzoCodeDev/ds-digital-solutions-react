import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import moment from "moment";
import { Navbar } from "../navbar/Navbar";
export const TranslateScreen = () => {
  const history = useHistory();
  const { t, i18n } = useTranslation("global");
  //Funciones para cambiar el idioma de la aplicacion 
  const handleSpanish = () => {
    i18n.changeLanguage("es");
    moment.locale('es');
    history.goBack()
  };
  const handleEnglish = () => {
    i18n.changeLanguage("en");
    moment.locale('en'); 
    history.goBack()
  };
  const handleFrances = () => {
    i18n.changeLanguage("fr");
    history.goBack();
  };
  const handlePortugues = () => {
    i18n.changeLanguage("pt_BR");
    history.goBack()
  };
  return (
    <div>
      <Navbar />
      <div className="translateScreen">
        <div className="container">
          <div className="subContainer">
            <h1>{t("translate.lenguage")}</h1>
          </div>
          <p>{t("translate.text-info")}</p>
          <div className="linea"></div>
          <div className="lenguageContainer">
            <div className="lenguage">
              <div className="content">
                <p className="p1">{t("translate.english")}</p>
                <p className="p2" onClick={handleEnglish}>
                  English
                </p>
              </div>
            </div>
            <div className="lenguage">
              <div className="content">
                <p className="p1">{t("translate.spanish")}</p>
                <p className="p2" onClick={handleSpanish}>
                  Español
                </p>
              </div>
            </div>
            <div className="lenguage">
              <div className="content">
                <p className="p1">{t("translate.frances")}</p>
                <p className="p2" onClick={handleFrances}>
                  Français
                </p>
              </div>
            </div>
            <div className="lenguage">
              <div className="content">
                <p className="p1">{t("translate.Portuguese-from-Brazil")}</p>
                <p className="p2" onClick={handlePortugues}>
                Português do (Brasil)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
