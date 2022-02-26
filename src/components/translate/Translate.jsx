import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import moment from "moment";
import { TranslateIndex } from "./TranslateIndex";
export const Translate = () => {
  const history = useHistory();
  const { t, i18n } = useTranslation("global");
  //Funciones para cambiar el idioma de la aplicacion
  const handleSpanish = () => {
    i18n.changeLanguage("es");
    moment.locale("es");
    history.goBack();
  };
  const handleEnglish = () => {
    i18n.changeLanguage("en");
    moment.locale("en");
    history.goBack();
  };
  const handleFrances = () => {
    i18n.changeLanguage("fr");
    history.goBack();
  };
  const handlePortugues = () => {
    i18n.changeLanguage("pt_BR");
    history.goBack();
  };
  return (
    <TranslateIndex
      t={t}
      handleEnglish={handleEnglish}
      handleSpanish={handleSpanish}
      handleFrances={handleFrances}
      handlePortugues={handlePortugues}
    />
  );
};
