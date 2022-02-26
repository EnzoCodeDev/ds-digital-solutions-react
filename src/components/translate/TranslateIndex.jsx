import React from "react";
import { Navbar } from "../navbar/Navbar";
import './translate.scss';
export const TranslateIndex = ({
  t,
  handleEnglish,
  handleSpanish,
  handleFrances,
  handlePortugues,
}) => {
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
