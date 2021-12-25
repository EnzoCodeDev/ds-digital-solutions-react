import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Print } from "@material-ui/icons";
import moment from "moment";
import { ViewDocumentMaster } from "../../redux/actions/formDocumentMasterAction";
export const DocumentMasterExecutionFill = () => {
  const { uuid } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ViewDocumentMaster(uuid));
  }, [dispatch, uuid]);
  const DocumentMasterHead = useSelector(
    (state) => state.documentMaster.documentMaster.DocumentMasterHead
  );
  const DocumentMasterBody = useSelector(
    (state) => state.documentMaster.documentMaster.DocumentMasterBody
  );
  //   console.log(DocumentMasterHead);
  console.log(DocumentMasterBody);
  return (
    <div>
      <div className={"form-previow active"}>
        <div className="header-container">
          <div className="header-1">
            <span className="a">
              <span className="b">Codigo:</span>{" "}
              {DocumentMasterHead.code.trim().length === 0
                ? "AAA111"
                : DocumentMasterHead.code}
            </span>
            <span className="a">
              <span className="b">Version:</span> Versión:{" "}
              {DocumentMasterHead.version.length === 0
                ? 1
                : DocumentMasterHead.version}
            </span>
            <span className="a">
              <span className="b">Aprovado:</span> Documento nuevo
            </span>
          </div>
          <div className="check-container">
            <span>Lo eh leido</span>
            <input type="checkbox"></input>
          </div>
          <div className="imprimir">
            <Print />
            <span> Imprimir</span>
          </div>
        </div>
        <div className="header-container2">
          <div className="header-2">
            <span className="a">
              <span className="b">Fecha de creación:</span>{" "}
              {moment(DocumentMasterHead.created_at).format("LLLL") ===
              "Fecha inválida"
                ? moment().format("LLLL")
                : moment(DocumentMasterHead.created_at).format("LLLL")}
            </span>
          </div>
        </div>
        <div className="container-aperture">
          <div className="border_top"></div>
          <div className="aperture">
            <div className="part_1">
              <div className="codigo">
                <div className="container_codigo">
                  <span>
                    Cód.{" "}
                    {DocumentMasterHead.code.trim().length === 0
                      ? "AAA111"
                      : DocumentMasterHead.code}
                  </span>
                </div>
              </div>
              <div className="version">
                <div className="container_version">
                  <span>
                    Versión:{" "}
                    {DocumentMasterHead.version.length === 0
                      ? 1
                      : DocumentMasterHead.version}
                  </span>
                </div>
              </div>
              <div className="date">
                <div className="container_date">
                  <p className="span">Fecha de entrada en Vigencia: </p>
                  <span className="caducidad">
                    {moment(DocumentMasterHead.created_at).format("L") ===
                    "Fecha inválida"
                      ? moment().format("L")
                      : moment(DocumentMasterHead.created_at).format("L")}
                  </span>
                </div>
              </div>
            </div>
            <div className="part_2">
              <div className="container_format">
                <div className="container_sub_format">
                  <h5>Formato</h5>
                  <h6>
                    {DocumentMasterHead.format.trim().length === 0
                      ? "Aun no lo haz especificado"
                      : DocumentMasterHead.format}
                  </h6>
                </div>
              </div>
            </div>
            <div className="part_3">
              <div className="imagen_container">
                <img
                  className="imagen"
                  src="/logo/ds-digital-solutions-logo.png"
                  alt="logo"
                />
              </div>
            </div>
          </div>
          <div className="border_bottom"></div>
        </div>
      </div>
    </div>
  );
};
