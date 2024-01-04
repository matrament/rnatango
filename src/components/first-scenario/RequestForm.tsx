"use client";
import { Button, Form, Input, message, Space } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { useEffect, useState } from "react";
import lang from "./lang.json";
import { pdb_id } from "../../types/modelsType";
import { checkRcsbMaxModel } from "../../utils/checkRcsbMaxModel";
import { processingRequest } from "../../utils/processingRequest";
import UploadStructureFile from "./UploadStructureFile";
import styles from "./first-scenario.module.css";

export default function RequestForm() {
  let rcsbPdbId: pdb_id = {
    name: "",
  };

  const [loading, setLoading] = useState(false);
  const [maxModel, setMaxModel] = useState(1);
  const [pdbError, setPDBError] = useState(false);
  const [maxModelQuery, setMaxModelQuery] = useState(false);
  const [pdbId, setPdbId] = useState(rcsbPdbId);
  const [uploadStructure, setUploadStructure] = useState<
    UploadFile[] | undefined
  >(undefined);
  const submit = () => {
    if (
      (!uploadStructure || uploadStructure.length == 0) &&
      pdbId.name.length < 4
    ) {
      message.error(lang.lack_of_source);
      return null;
    }
    setLoading(true);
    processingRequest(pdbId, setLoading);
  };
  useEffect(() => {
    if (pdbId.name === "") setMaxModel(0);

    if (pdbId.name.length === 4) {
      setMaxModelQuery(true);
      checkRcsbMaxModel(setMaxModel, setPDBError, pdbId.name, setMaxModelQuery);
      // setFormValues({
      //   ...formValues,
      //   settings: { ...formValues.settings, model: 1 },
      // });
    } else {
      setPDBError(false);
    }
  }, [pdbId.name]);
  return (
    <div
      className={styles.scenario}
      style={{
        paddingLeft: "30px",
        paddingRight: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
          paddingLeft: "30px",
        }}
      >
        <p>From example collection:</p>
        <Space.Compact>
          <Button
            onClick={() => {
              setUploadStructure([]);
              setPdbId({
                name: "2HY9",
              });
            }}
          >
            2HY9
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
                  <p style={{ marginBottom: "5px" }}>From local drive:</p>
                  {/* <UploadStructureFile
                    maxModel={maxModel}
                    setMaxModel={setMaxModel}
                    pdbId={pdbId}
                    setPdbId={setPdbId}
                    uploadStructure={uploadStructure}
                    setUploadStructure={setUploadStructure}
                  /> */}
                </div>
              </div>
              <div className="split-layout__divider" style={{ width: "90px" }}>
                <div className="split-layout__rule"></div>
                <div className="split-layout__label">or</div>
                <div className="split-layout__rule"></div>
              </div>
              <div>
                <div>
                  <p>From Protein Data Bank:</p>
                  <Form.Item>
                    <Input
                      name="rcsbPdbId"
                      data-testid="rcsb-pdb-id-input"
                      value={pdbId.name}
                      status={pdbError ? "error" : ""}
                      onChange={(e) =>
                        setPdbId({
                          name: e.target.value.toUpperCase(),
                        })
                      }
                      // disabled={formValues.fileId != ""}
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
                  disabled={
                    ((!uploadStructure || uploadStructure.length == 0) &&
                      pdbId.name.length < 4) ||
                    pdbError ||
                    maxModelQuery
                  }
                  loading={loading || maxModelQuery}
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
  );
}
