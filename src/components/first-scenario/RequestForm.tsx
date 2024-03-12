"use client";
import { useEffect, useState } from "react";
import styles from "./first-scenario.module.css";
import { Button, Form, Input, Space, Tooltip, Alert } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import { UploadFile } from "antd/lib/upload/interface";
import { pdb_id, structure } from "../../types/modelsType";
import { checkRcsbMaxModel } from "../../utils/checkRcsbMaxModel";
import { processingRequest } from "../../utils/processingRequest";
import UploadStructureFile from "./UploadStructureFile";
import FirstScenarioProperties from "./FirstScenarioProperties";

export default function RequestForm() {
  let rcsbPdbId: pdb_id = {
    name: "",
  };
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

  const [getStructure, setGetStructure] = useState<structure>(firstStructure);
  const [loading, setLoading] = useState(false);
  const [pdbError, setPdbError] = useState(false);
  const [modelQuery, setModelQuery] = useState(true);
  const [pdbId, setPdbId] = useState(rcsbPdbId);
  const [isUpload, setIsUpload] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [fileName, setFileName] = useState("");
  const [uploadStructure, setUploadStructure] = useState<
    UploadFile[] | undefined
  >(undefined);

  const submit = () => {
    setLoading(true);
    if (pdbId.name.length === 4) {
      processingRequest(pdbId, setLoading, setGetStructure);
      setModelQuery(true);
      setShowResult(true);
    }
    if (isUpload && getStructure.fileHashId != "") {
      setLoading(false);
      setModelQuery(true);
      setShowResult(true);
    }
  };
  useEffect(() => {
    setIsUpload(false);
    setGetStructure(firstStructure);
    if (pdbId.name.length === 4) {
      checkRcsbMaxModel(setPdbError, pdbId.name, setModelQuery);
    } else {
      setPdbError(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdbId.name]);

  useEffect(() => {
    if (isUpload === true) {
      setModelQuery(false);
    }
  }, [isUpload]);

  return (
    <div style={{ marginBottom: "10px", width: "100%" }}>
      <div style={{ textAlign: "center" }}>
        Select file with 3D RNA structure (PDB/CIF){" "}
      </div>
      <div className={styles.scenario}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            paddingTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <p>From example collection:</p>
            <Space.Compact>
              <Tooltip title="A-RNA">
                <Button
                  onClick={() => {
                    setGetStructure(firstStructure);
                    setUploadStructure([]);
                    setPdbId({
                      name: "1PBM",
                    });
                  }}
                >
                  1PBM
                </Button>
              </Tooltip>
              <Tooltip title="B-DNA">
                <Button
                  onClick={() => {
                    setGetStructure(firstStructure);

                    setUploadStructure([]);
                    setPdbId({
                      name: "1ZEW",
                    });
                  }}
                >
                  1ZEW
                </Button>
              </Tooltip>
              <Tooltip title="Z-RNA">
                <Button
                  onClick={() => {
                    setGetStructure(firstStructure);
                    setUploadStructure([]);
                    setPdbId({
                      name: "1T4X",
                    });
                  }}
                >
                  1T4X
                </Button>
              </Tooltip>
            </Space.Compact>
          </div>
          <div className={styles.upload}>
            <div className={styles.column}>
              <Form labelCol={{ span: 16 }} wrapperCol={{ span: 32 }}>
                <div className={styles.requestCard}>
                  <div>
                    <div style={{ minWidth: "350px" }}>
                      <p style={{ marginBottom: "5px", fontSize: "16px" }}>
                        From local drive:
                      </p>
                      <UploadStructureFile
                        pdbId={pdbId}
                        setPdbId={setPdbId}
                        uploadStructure={uploadStructure}
                        setShowResult={setShowResult}
                        setUploadStructure={setUploadStructure}
                        setGetStructure={setGetStructure}
                        setIsUpload={setIsUpload}
                        setLoading={setLoading}
                        setFileName={setFileName}
                      />
                    </div>
                  </div>
                  <div className={styles.split_layout_divider}>
                    <div className={styles.split_layout_rule}></div>
                    <div className={styles.split_layout_label}>or</div>
                    <div className={styles.split_layout_rule}></div>
                  </div>
                  <div>
                    <div style={{ minWidth: "350px" }}>
                      <p style={{ fontSize: "16px" }}>
                        From Protein Data Bank:
                      </p>
                      <Form.Item>
                        <Input
                          size="large"
                          name="rcsbPdbId"
                          data-testid="rcsb-pdb-id-input"
                          value={pdbId.name}
                          status={pdbError ? "error" : ""}
                          onChange={(e) =>
                            setPdbId({
                              name: e.target.value.toUpperCase(),
                            })
                          }
                          disabled={isUpload}
                          style={{
                            width: "200px",
                            paddingTop: "2px",
                            paddingBottom: "2px",
                          }}
                          placeholder={"PDB ID eg. 1FFK"}
                          maxLength={4}
                        />
                      </Form.Item>
                      {/* {pdbError ? (
                        <div style={{ paddingLeft: "15px" }}>
                          <CloseCircleFilled style={{ color: "red" }} /> Wrong
                          PDBid
                        </div>
                      ) : null} */}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <Form.Item noStyle>
                    <Button
                      data-testid="send-request-button"
                      htmlType="submit"
                      size="large"
                      type="primary"
                      shape="round"
                      disabled={
                        (pdbId.name.length < 4 && !isUpload) ||
                        pdbError ||
                        modelQuery
                      }
                      loading={loading}
                      onClick={submit}
                      style={{ marginBottom: "25px" }}
                    >
                      Upload
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <div>
        {getStructure.fileHashId != "" && !loading && showResult ? (
          <FirstScenarioProperties
            getStructure={getStructure}
            fileName={fileName}
          />
        ) : null}
      </div>
    </div>
  );
}
