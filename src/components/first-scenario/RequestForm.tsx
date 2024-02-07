"use client";
import { useEffect, useState } from "react";
import styles from "./first-scenario.module.css";
import { Button, Form, Input, Space } from "antd";
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
  const [modelQuery, setModelQuery] = useState(false);
  const [pdbId, setPdbId] = useState(rcsbPdbId);
  const [isUpload, setIsUpload] = useState(false);
  const [uploadStructure, setUploadStructure] = useState<
    UploadFile[] | undefined
  >(undefined);

  const submit = () => {
    // if (
    //   (!uploadStructure || uploadStructure.length == 0) &&
    //   pdbId.name.length < 4
    // ) {
    //   message.error(lang.lack_of_source);
    //   return null;
    // }
    setLoading(true);
    setModelQuery(true);
    if (pdbId.name.length != 0) {
      processingRequest(pdbId, setLoading, setGetStructure);
    }
  };
  useEffect(() => {
    if (pdbId.name.length === 4) {
      checkRcsbMaxModel(setPdbError, pdbId.name, setModelQuery);
    } else {
      setPdbError(false);
    }
  }, [pdbId.name]);

  return (
    <div style={{ marginBottom: "10px", width: "100%" }}>
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
              <Button
                onClick={() => {
                  setUploadStructure([]);
                  setPdbId({
                    name: "1FFK",
                  });
                }}
              >
                1FFK
              </Button>
              <Button
                onClick={() => {
                  setUploadStructure([]);
                  setPdbId({
                    name: "6RS3",
                  });
                }}
              >
                6RS3
              </Button>
              <Button
                onClick={() => {
                  setUploadStructure([]);
                  setPdbId({
                    name: "1JJP",
                  });
                }}
              >
                1JJP
              </Button>
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
                        setUploadStructure={setUploadStructure}
                        setGetStructure={setGetStructure}
                        setIsUpload={setIsUpload}
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
                          placeholder={"PDB ID eg. 1D59 "}
                          maxLength={4}
                        />
                      </Form.Item>
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
                        (!isUpload && pdbId.name.length < 4) ||
                        pdbError ||
                        modelQuery
                      }
                      loading={loading || isUpload}
                      onClick={submit}
                      style={{ marginBottom: "25px" }}
                    >
                      Load
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <div>
        {getStructure.fileHashId != "" ? (
          <FirstScenarioProperties getStructure={getStructure} />
        ) : null}
      </div>
    </div>
  );
}
