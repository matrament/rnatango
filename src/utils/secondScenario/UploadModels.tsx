import { message, Upload, UploadProps, UploadFile, Divider } from "antd";

import { InboxOutlined } from "@ant-design/icons";

import lang from "../lang.json";

const { Dragger } = Upload;

interface UploadFileArguments {
  uploadStructure: UploadFile[] | undefined;
  setUploadStructure: any;
  setModelsTarget: any;
  setLoading: any;
  taskID: string | null;
  error: boolean;
  scenario: "2" | "3";
  router: any;
}

const getActionUrl = (scenario: string, taskID: string | null) => {
  if (scenario === "2") {
    return `${process.env.NEXT_PUBLIC_SERVER_URL}/one-many/form/add/model/${taskID}`;
  } else {
    if (taskID != null && taskID !== "") {
      return `${process.env.NEXT_PUBLIC_SERVER_URL}/many-many/form/add/model/${taskID}`;
    } else {
      return `${process.env.NEXT_PUBLIC_SERVER_URL}/many-many/set`;
    }
  }
};

const UploadModels = (props: UploadFileArguments) => {
  let uploader_props: UploadProps = {
    name: "file",
    multiple: false,
    action: getActionUrl(props.scenario, props.taskID),
    maxCount: 1,
    beforeUpload: (file: File) => {
      let fileName = file.name.split(".");
      let fileNameLength = file.name.split(".").length;

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
      props.setUploadStructure([] as UploadFile<File>[]);
    },
    onChange(event) {
      const { status } = event.file;
      if (status === "done") {
        message.success(lang.file_upload_success + `${event.file.name}`);

        props.setModelsTarget(event.file.response);
        props.setLoading(false);
        props.setUploadStructure([event.file]);
        if (
          (props.taskID === null || props.taskID == "") &&
          props.scenario == "3"
        ) {
          props.router.push(
            `/?scenario=3&id=${event.file.response.taskHashId}`
          );
        }
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
    <>
      <Divider orientation="left">{`Upload ${
        props.scenario == "2" ? "1" : "3"
      } - 10 models to analyse`}</Divider>
      <div
        style={{
          display: "flex",
          rowGap: "20 px",
          flexDirection: "column",
          marginBottom: "20px",
          width: "80%",
          maxWidth: "500px",
          justifyContent: "center",
        }}
      >
        <Dragger
          fileList={props.uploadStructure ? props.uploadStructure : undefined}
          {...uploader_props}
          disabled={props.error}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <h3 className="ant-upload-text">
            Click or drag file to this area to upload
          </h3>
          <h3 className="ant-upload-hint">*.cif, *.pdb</h3>
        </Dragger>
      </div>
    </>
  );
};

export default UploadModels;
