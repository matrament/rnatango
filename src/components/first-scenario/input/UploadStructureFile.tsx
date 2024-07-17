import { message, UploadFile, UploadProps, Upload } from "antd";
import { pdb_id } from "../../../types/modelsType";
import config from "../../../config.json";
import lang from "../../../utils/lang.json";
import { InboxOutlined } from "@ant-design/icons";
import { structure } from "../../../types/modelsType";
import { useState } from "react";

const { Dragger } = Upload;

let firstStructure: structure = {
  fileHashId: "",
  models: [
    {
      name: "",
      chains: [
        {
          name: "",
          sequence: "",
          residuesWithoutAtoms: [],
        },
      ],
    },
  ],
};

interface UploadFileArguments {
  pdbId: pdb_id;
  setPdbId: any;
  uploadStructure: UploadFile[] | undefined;
  setUploadStructure: any;
  setStructure: any;
  setIsUpload: any;
  setLoading: any;
  setShowResult: any;
  setFileName: any;
}

const UploadStructureFile = (props: UploadFileArguments) => {
  const [fileHashId, setFileHashId] = useState("");
  let uploader_props: UploadProps = {
    name: "file",
    multiple: false,
    action: config.SERVER_URL + "/upload",
    maxCount: 1,
    beforeUpload: (file: File) => {
      let fileName = file.name.split(".");
      let fileNameLength = file.name.split(".").length;
      props.setIsUpload(false);
      props.setUploadStructure(undefined);
      props.setShowResult(false);
      props.setPdbId({
        name: "",
      });
      const isCifOrPdb =
        file.type === "chemical/x-cif" ||
        file.type === "chemical/x-pdb" ||
        fileName[fileNameLength - 1].toLowerCase() === "cif" ||
        fileName[fileNameLength - 1].toLowerCase() === "pdb";
      if (!isCifOrPdb) {
        message.error(lang.file_not_pdb_cif + `${file.name}`);
        props.setPdbId({ name: "" });
        props.setUploadStructure([] as UploadFile<File>[]);
        return false;
      } else {
        message.info(lang.uploading_file + `${file.name}`);
        props.setFileName(file.name);
      }
      return isCifOrPdb;
    },
    onRemove(info: any) {
      removeFile(fileHashId);
      props.setPdbId({ name: "" });
      props.setUploadStructure([] as UploadFile<File>[]);
      props.setIsUpload(false);
      props.setStructure(firstStructure);
    },
    onChange(event) {
      const { status } = event.file;
      if (status === "done") {
        message.success(lang.file_upload_success + `${event.file.name}`);
        props.setPdbId({
          name: "",
        });
        props.setStructure(event.file.response);
        setFileHashId(event.file.response.fileHashId);
        props.setIsUpload(true);
        props.setLoading(false);
        props.setUploadStructure([event.file]);
      } else if (status === "error") {
        message.error(lang.error_uploading + `${event.file.name}`);
        props.setPdbId({ name: "" });
        props.setLoading(false);
        props.setUploadStructure(undefined);
      }
    },
    onDrop(e: any) {
      props.setUploadStructure(undefined);
      props.setPdbId({ name: "" });
    },
  };
  return (
    <Dragger
      fileList={props.uploadStructure ? props.uploadStructure : undefined}
      {...uploader_props}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <h3 className="ant-upload-text">
        Click or drag file to this area to upload
      </h3>
      <h3 className="ant-upload-hint">*.cif, *.pdb</h3>
    </Dragger>
  );
};

export default UploadStructureFile;

export function removeFile(fileId: string) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", //localhost zabazpieczenie
    },
  };
  requestOptions.headers["Access-Control-Allow-Origin"] = "*";
  fetch(config.SERVER_URL + "/upload/remove/" + fileId, requestOptions)
    .then((response: any) => {
      if (response.status == 200) {
      }
    })
    .then((response: any) => {
      if (response != "") {
      }
    })
    .catch((error: any) => message.error("Something went wrong, try again"));
}
