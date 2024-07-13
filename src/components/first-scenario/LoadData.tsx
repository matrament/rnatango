"use client";
import { useEffect, useState } from "react";
import styles from "./first-scenario.module.css";
import {
  Button,
  Col,
  Collapse,
  CollapseProps,
  Form,
  Input,
  Space,
  Tooltip,
} from "antd";
import { useSearchParams } from "next/navigation";
import { UploadFile } from "antd/lib/upload/interface";
import { pdb_id, structure, scenario } from "../../types/modelsType";
import { checkRcsbMaxModel } from "../../utils/checkRcsbMaxModel";
import { processingRequest } from "../../utils/processingRequest";
import UploadStructureFile from "./input/UploadStructureFile";
import RequestForm from "./RequestForm";
import DefineTarget from "../second-scenario/DefineTarget";
import scenarios from "../../json/scenarios.json";

export default function LoadData() {
  const searchParams = useSearchParams();
  const selectedScenario = searchParams.get("scenario") || "1";

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

  const [structure, setStructure] = useState<structure>(firstStructure);
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
      processingRequest(pdbId, setLoading, setStructure, setOpen);

      setModelQuery(true);
      setShowResult(true);
    }
    if (isUpload && structure.fileHashId != "") {
      setLoading(false);
      setOpen([]);
      setModelQuery(true);
      setShowResult(true);
    }
  };
  useEffect(() => {
    setIsUpload(false);
    setStructure(firstStructure);
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

  const [open, setOpen] = useState<string | string[]>(["1"]);
  const onChange = (key: string | string[]) => {
    setOpen(key);
  };

  return (
    <div style={{ marginBottom: "10px", width: "100%" }}>
      <Collapse
        size="large"
        // style={{ textAlign: "center" }}
        activeKey={open}
        onChange={onChange}
        items={[
          {
            key: "1",
            label: (
              <b>
                {selectedScenario === "1" || selectedScenario === "2"
                  ? scenarios[selectedScenario].title
                  : ""}
              </b>
            ),
            children: (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Col>
                  {selectedScenario === "1" || selectedScenario === "2" ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <p style={{ margin: 0 }}>From example collection:</p>
                      <Space.Compact>
                        {scenarios[selectedScenario].example.map(
                          (
                            pdb: { ID: string; description: string },
                            index: number
                          ) => (
                            <Tooltip key={index} title={pdb.description}>
                              <Button
                                key={index}
                                onClick={() => {
                                  setStructure(firstStructure);
                                  setUploadStructure([]);
                                  setPdbId({
                                    name: pdb.ID,
                                  });
                                }}
                              >
                                {pdb.ID}
                              </Button>
                            </Tooltip>
                          )
                        )}
                      </Space.Compact>
                    </div>
                  ) : null}
                  <Form labelCol={{ span: 16 }} wrapperCol={{ span: 30 }}>
                    <div className={styles.requestCard}>
                      <div>
                        <div style={{ minWidth: "350px" }}>
                          <p
                            style={{
                              marginBottom: "5px",
                              fontSize: "16px",
                            }}
                          >
                            From local drive:
                          </p>
                          <UploadStructureFile
                            pdbId={pdbId}
                            setPdbId={setPdbId}
                            uploadStructure={uploadStructure}
                            setShowResult={setShowResult}
                            setUploadStructure={setUploadStructure}
                            setStructure={setStructure}
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
                        >
                          Upload
                        </Button>
                      </Form.Item>
                    </div>
                  </Form>
                </Col>
              </div>
            ),
          },
        ]}
      />

      <div>
        {structure.fileHashId !== "" &&
          !loading &&
          showResult &&
          (selectedScenario === "1" ? (
            <RequestForm structure={structure} fileName={fileName} />
          ) : selectedScenario === "2" ? (
            <DefineTarget structure={structure} fileName={fileName} />
          ) : null)}
      </div>
    </div>
  );
}
