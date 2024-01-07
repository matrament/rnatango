"use client";
import { Button, Input, message, Upload, Space } from "antd";
import type { UploadProps } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import styles from "./first-scenario.module.css";
import { useState } from "react";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const FirstScenarioUpload = () => {
  const [pdbId, setPdbId] = useState("");
  return (
    <div className={styles.scenario}>
      <p>From example collection:</p>
      <Space.Compact>
        <Button onClick={() => setPdbId("1FFK")}>1FFK</Button>
        <Button onClick={() => setPdbId("6RS3")}>6RS3</Button>
        <Button onClick={() => setPdbId("1JJP")}>1JJP</Button>
      </Space.Compact>

      <div className={styles.upload}>
        <div className={styles.column}>
          <p>From local drive:</p>
          <Dragger {...props} className={styles.inbox}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">*.cif, *.pdb</p>
          </Dragger>
        </div>
        <div className={styles.column}>or</div>
        <div className={styles.column}>
          <p>From Protein Data Bank:</p>
          <Input
            placeholder="PDB ID eg. ID59"
            onChange={(e) => setPdbId(e.target.value)}
            value={pdbId}
            maxLength={4}
          />
        </div>
      </div>
      <Button size="large" type="primary" shape="round">
        Load
      </Button>
    </div>
  );
};

export default FirstScenarioUpload;
