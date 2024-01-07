"use client";
import { Button, Form, Input, message, Space } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { useEffect, useState } from "react";
import lang from "./lang.json";
import { pdb_id, structure } from "../../types/modelsType";
import { checkRcsbMaxModel } from "../../utils/checkRcsbMaxModel";
import { processingRequest } from "../../utils/processingRequest";
import UploadStructureFile from "./UploadStructureFile";
import styles from "./first-scenario.module.css";
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
  const [pdbError, setPDBError] = useState(false);
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
    if (pdbId.name.length != 0) {
      processingRequest(pdbId, setLoading, setGetStructure);
    }
    setLoading(true);
    setModelQuery(true);
  };
  useEffect(() => {
    if (pdbId.name.length === 4) {
      checkRcsbMaxModel(setPDBError, pdbId.name, setModelQuery);
    } else {
      setPDBError(false);
    }
  }, [pdbId.name]);

  return (
    <div style={{ marginBottom: "15px", width: "100%" }}>
      <div className={styles.scenario}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            paddingTop: "20px",
            paddingLeft: "40px",
            paddingRight: "40px",
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <div style={{ width: "400px", height: "200px" }}>
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
                  <div
                    className="split-layout__divider"
                    style={{ width: "90px" }}
                  >
                    <div className="split-layout__rule"></div>
                    <div className="split-layout__label">or</div>
                    <div className="split-layout__rule"></div>
                  </div>
                  <div>
                    <div>
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
                    marginTop: "25px",
                  }}
                >
                  <Form.Item>
                    <Button
                      data-testid="send-request-button"
                      htmlType="submit"
                      size="large"
                      type="primary"
                      shape="round"
                      // disabled={
                      //   (!isUpload && pdbId.name.length < 4) ||
                      //   pdbError ||
                      //   modelQuery
                      // }
                      // loading={loading || modelQuery || isUpload}
                      onClick={submit}
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
        {modelQuery ? (
          <FirstScenarioProperties getStructure={getStructure} />
        ) : null}
      </div>
    </div>
  );
}
