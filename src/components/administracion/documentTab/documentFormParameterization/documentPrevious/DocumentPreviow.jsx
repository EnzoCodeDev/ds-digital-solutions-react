import React from "react";
// import { Print } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { DocumentPreviousIndex } from "./DocumentPreviousIndex";
export const DocumentPrevious = ({
  codigo,
  option,
  formato,
  preview,
  arrayCard,
  dataBasic,
  dataBasicCount,
}) => {
  const { created_at, version } = useSelector(
    (state) => state.documentMaster.documentMaster.DocumentMasterHead
  );
  const { img_header } = useSelector((state) => state.auth);
  return (
    <DocumentPreviousIndex
      option={option}
      codigo={codigo}
      preview={preview}
      version={version}
      formato={formato}
      dataBasic={dataBasic}
      arrayCard={arrayCard}
      created_at={created_at}
      img_header={img_header}
      dataBasicCount={dataBasicCount}
    />
  );
};
