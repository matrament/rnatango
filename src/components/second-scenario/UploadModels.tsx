import { UploadOutlined } from "@ant-design/icons";
import { message, Upload, UploadProps, UploadFile } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import styles from "../first-scenario/first-scenario.module.css";
import { useState } from "react";
import lang from "../../utils/lang.json";

const { Dragger } = Upload;

// let firstStructure: structure = {
//   fileHashId: "",
//   models: [
//     {
//       name: "",
//       chains: [
//         {
//           name: "",
//           sequence: "",
//           residuesWithoutAtoms: [],
//         },
//       ],
//     },
//   ],
// };

interface UploadFileArguments {
  uploadStructure: UploadFile[] | undefined;
  setUploadStructure: any;
  setStructure: any;
  setIsUpload: any;
  setLoading: any;
  setShowResult: any;
}

const UploadModels = (props: UploadFileArguments) => {
  const [fileHashId, setFileHashId] = useState("");
  let uploader_props: UploadProps = {
    name: "file",
    multiple: false,
    action: "https://run.mocky.io/v3/55fdbec8-dab5-4154-8fc5-2f7843c3c302",
    maxCount: 5,
    beforeUpload: (file: File) => {
      let fileName = file.name.split(".");
      let fileNameLength = file.name.split(".").length;
      props.setIsUpload(false);
      props.setUploadStructure(undefined);
      props.setShowResult(false);

      const isCifOrPdb =
        file.type === "chemical/x-cif" ||
        file.type === "chemical/x-pdb" ||
        fileName[fileNameLength - 1].toLowerCase() === "cif" ||
        fileName[fileNameLength - 1].toLowerCase() === "pdb";
      if (!isCifOrPdb) {
        message.error(lang.file_not_pdb_cif + `${file.name}`);

        props.setUploadStructure([] as UploadFile<File>[]);
        return false;
      } else {
        message.info(lang.uploading_file + `${file.name}`);
      }
      return isCifOrPdb;
    },
    onRemove(info: any) {
      // removeFile(fileHashId);

      props.setUploadStructure([] as UploadFile<File>[]);
      props.setIsUpload(false);
      // props.setStructure(firstStructure);
    },
    onChange(event) {
      const { status } = event.file;
      if (status === "done") {
        message.success(lang.file_upload_success + `${event.file.name}`);

        props.setStructure(event.file.response);
        setFileHashId(event.file.response.fileHashId);
        props.setIsUpload(true);
        props.setLoading(false);
        props.setUploadStructure([event.file]);
      } else if (status === "error") {
        message.error(lang.error_uploading + `${event.file.name}`);

        props.setLoading(false);
        props.setUploadStructure(undefined);
      }
    },
    onDrop(e: any) {
      props.setUploadStructure(undefined);
    },
  };

  return (
    <div>
      <Dragger {...uploader_props} className={styles.parent}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <h3 className="ant-upload-text">
          Click or drag file to this area to upload
        </h3>
        <h3 className="ant-upload-hint">*.cif, *.pdb (max 5 files)</h3>
      </Dragger>
    </div>
  );
};

export default UploadModels;
