import React from 'react';
import { KeyboardBackspace, AddBox, RemoveCircle } from "@material-ui/icons";
import { Navbar } from "../../../../navbar/Navbar";
import { DocumentCard } from '../documentCard/DocumentCard';
import { BtnFloat } from "../../../../bellboy float/btn-float";
import { DocumentPrevious } from "../documentPrevious/DocumentPreviow";
import './documentForm.scss';
export const DocumentFormIndex = ({
    lista,
    codigo,
    option,
    ultime,
    preview,
    formato,
    setLista,
    setOption,
    arrayCard,
    setUltime,
    dataBasic,
    handleBack,
    handleTitle,
    listaUltime,
    setArrayCard,
    handleRemove,
    handlePreview,
    documentMaster,
    dataBasicCount,
    setListaUltime,
    handleDocument,
    handleInputCode,
    handleTypeSelect,
    handleDescripcion,
    handleInputFormat,
    handleAddDataBasic,
    handleSelectProceso,
    handleInputTemplate,
    handleDocumentUpdate,
    tableColumnsTypeValue,
    handleInputDescription,
    handletableColumnsTypeValueChange,
}) => {
  return (
    <div>
    <Navbar />
    {/* pasar propiedades para visualizacion del formulario  */}
    <DocumentPrevious
      lista={lista}
      codigo={codigo}
      option={option}
      ultime={ultime}
      preview={preview}
      formato={formato}
      setLista={setLista}
      setOption={setOption}
      arrayCard={arrayCard}
      setUltime={setUltime}
      dataBasic={dataBasic}
      listaUltime={listaUltime}
      setArrayCard={setArrayCard}
      dataBasicCount={dataBasicCount}
      setListaUltime={setListaUltime}
    />
    <div className="newDocument">
      <div className="containerNewDocument">
        <h2 className="title">
          <KeyboardBackspace className="icon" onClick={handleBack} />
          {documentMaster.res === "success_view"
            ? "Editar documento"
            : "Nuevo documento"}
        </h2>
        <div className="container-sub-title">
          <h6 className="sub-title">
            {documentMaster.res === "success_view"
              ? "Editar informacion del documento"
              : "Informacion del nuevo documento"}
          </h6>
        </div>
        <div className="linea"></div>
        <form
          className="formNewDocument"
          onSubmit={
            documentMaster.res === "success_view"
              ? handleDocumentUpdate
              : handleDocument
          }
          encType="multipart/formdata"
        >
          <div className="input-group-container">
            <div className="input-container">
              <input
                name="codigo"
                placeholder={"Codigo *"}
                onChange={handleInputCode}
                defaultValue={documentMaster.DocumentMasterHead.code}
              ></input>
            </div>
            <div className="input-container">
              <input
                name="formato"
                placeholder={"Formato *"}
                onChange={handleInputFormat}
                defaultValue={documentMaster.DocumentMasterHead.format}
              ></input>
            </div>
            <div className="input-container">
              <input
                name={"template"}
                placeholder="Plantilla *"
                onChange={handleInputTemplate}
                defaultValue={documentMaster.DocumentMasterHead.template}
              ></input>
            </div>
            <div className="input-container">
              <input
                name={"description"}
                placeholder="Descripcion *"
                onChange={handleInputDescription}
                defaultValue={documentMaster.DocumentMasterHead.description}
              ></input>
            </div>
          </div>
          <div className="container-type-document">
            <h6>Datos basicos</h6>
          </div>
          <div className="linea-2"></div>
          <div className="container_icons">
            <span>Agregar(max 4)</span>
            <AddBox className="add" onClick={handleAddDataBasic} />
            <RemoveCircle className="remove" onClick={handleRemove} />
          </div>
          <div className="input-group-container-2">
            <div className="container_data_basic">
              <div className="container_sub_data_basic">
                <div className="header"></div>
                <div className="container_body">
                  {/* El proceso es obligatorio en los datos basicos */}
                  <div className="container_inptut1">
                    <input defaultValue="Proceso" readOnly></input>
                  </div>
                  <div className="container_select">
                    <select
                      className={"select_columns"}
                      onClick={(e) => handleSelectProceso(e, 1)}
                      name={`dataBasic${1}`}
                    >
                      <option>Lorem ipsum dolor</option>
                      <option>Lorem ipsum dolor</option>
                      <option>Lorem ipsum dolor</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="container_data_basic">
              <div className="container_sub_data_basic">
                <div className="header"></div>
                <div className="container_body">
                  {/* El sub proceso es obligatorio en los datos basicos */}
                  <div className="container_inptut1">
                    <input defaultValue="SubProceso" readOnly></input>
                  </div>
                  <div className="container_select">
                    <select
                      className={"select_columns"}
                      onClick={(e) => handleSelectProceso(e, 2)}
                      name={`dataBasic${1}`}
                    >
                      <option>Lorem ipsum dolor</option>
                      <option>Lorem ipsum dolor</option>
                      <option>Lorem ipsum dolor</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {dataBasicCount.map((proceso_id, index) => (
              <div
                key={index}
                className="container_data_basic animate__animated animate__fadeIn"
              >
                <div className="container_sub_data_basic">
                  <div className="header">
                    <div className="container_select">
                      <select
                        className="select_columns"
                        value={dataBasic[proceso_id - 1][0].type}
                        onChange={(e) => handleTypeSelect(e, proceso_id)}
                      >
                        <option>Texto</option>
                        <option>Link</option>
                        <option>Fecha</option>
                      </select>
                    </div>
                  </div>
                  <div className="container_body">
                    <div className="container_inptut1">
                      <input
                        placeholder="Titulo del dato basico"
                        name={`Titulo${proceso_id}`}
                        onChange={(e) => handleTitle(e, proceso_id)}
                        defaultValue={dataBasic[proceso_id - 1][0].title}
                      ></input>
                    </div>
                    {dataBasic[proceso_id - 1][0].type === "Link" && (
                      <div className="container_inptut2">
                        <input
                          id={proceso_id}
                          placeholder="Descripcion de la url"
                          name={`descripcion${proceso_id}`}
                          onChange={(e) => handleDescripcion(e, proceso_id)}
                          defaultValue={dataBasic[proceso_id - 1][0].info}
                        ></input>
                      </div>
                    )}
                    {dataBasic[proceso_id - 1][0].type === "Texto" && (
                      <div className="container_inptut2"></div>
                    )}
                    {dataBasic[proceso_id - 1][0].type === "Fecha" && (
                      <div className="container_inptut2"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pasar propiedades para el componentes de la tarjetas */}
          <div className="animate__animated animate__slideInUp">
            <DocumentCard
              lista={lista}
              option={option}
              ultime={ultime}
              setLista={setLista}
              setOption={setOption}
              arrayCard={arrayCard}
              setUltime={setUltime}
              res={documentMaster.res}
              listaUltime={listaUltime}
              setArrayCard={setArrayCard}
              setListaUltime={setListaUltime}
              tableColumnsTypeValue={tableColumnsTypeValue}
              handletableColumnsTypeValueChange={
                handletableColumnsTypeValueChange
              }
            />
          </div>
          <button className="save" type="submit">
            {documentMaster.res === "success_view" ? "Actualizar" : "Guardar"}
          </button>
        </form>
        <BtnFloat onClick={handlePreview} />
      </div>
    </div>
  </div>
  )
}
