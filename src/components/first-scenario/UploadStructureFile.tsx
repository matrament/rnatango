import { message, UploadFile, UploadProps, Upload } from "antd";
import { pdb_id } from "../../types/modelsType";
import config from "../../config.json";
import lang from "../../utils/lang.json";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

interface UploadFileArguments {
  pdbId: pdb_id;
  setPdbId: any;
  uploadStructure: UploadFile[] | undefined;
  setUploadStructure: any;
  setGetStructure: any;
  setIsUpload: any;
  setLoading: any;
}

const UploadStructureFile = (props: UploadFileArguments) => {
  let uploader_props: UploadProps = {
    name: "file",
    multiple: false,
    action: "http://rnatango.cs.put.poznan.pl/upload",
    maxCount: 1,
    beforeUpload: (file: File) => {
      let fileName = file.name.split(".");
      let fileNameLength = file.name.split(".").length;
      props.setUploadStructure(undefined);
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
      }
      return isCifOrPdb;
    },
    onRemove(info: any) {
      props.setPdbId({ name: "" });
      props.setUploadStructure([] as UploadFile<File>[]);
      props.setIsUpload(false);
    },
    onChange(event) {
      const { status } = event.file;
      console.log(event.file.status);
      if (status === "done") {
        // if (event.file.response.error.length > 0) {
        //   message.error(lang.file_not_pdb_cif + `${event.file.name}`);
        //   props.setUploadStructure([] as UploadFile<File>[]);
        //   props.setPdbId({ name: "" });
        //   return;
        // }
        message.success(lang.file_upload_success + `${event.file.name}`);
        props.setPdbId({
          name: "",
        });
        props.setGetStructure(event.file.response);

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
