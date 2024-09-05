import { Button, message, Image, Divider, Row, Col } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import styles from "../../first-scenario/first-scenario.module.css";

function downloadFile(type: any, modelId: string) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
  requestOptions.headers["Access-Control-Allow-Origin"] = "*";

  fetch(
    process.env.NEXT_PUBLIC_SERVER_URL +
      "/one-many/secondary/structure/" +
      modelId,
    requestOptions
  )
    .then((res) => res.blob())
    .then((blob) => {
      let url = URL.createObjectURL(blob);
      let pom = document.createElement("a");
      pom.setAttribute("href", url);
      pom.setAttribute("download", type);
      pom.click();
    });
}

const MCQstructure = (props: { modelHashId: string }) => {
  return (
    <div style={{ width: "100%" }}>
      <h2 style={{ textAlign: "center", marginTop: "0" }}>
        Secondary structure colored acc residue-wise MCQ values
      </h2>
      <Row>
        <Col flex="auto" style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ marginLeft: "75px", width: "70%", maxWidth: "400px" }}>
            <Image
              alt={"secondary_structure"}
              style={{
                width: "100%",
                objectFit: "contain",
                objectPosition: "50% 50%",
              }}
              width={"100%"}
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/one-many/secondary/structure/${props.modelHashId}`}
            />
          </div>
        </Col>
        <Col flex="75px">
          <Button
            type="primary"
            // size="medium"
            style={{ marginTop: "15px", width: "32px" }}
            icon={<DownloadOutlined />}
            onClick={() => {
              downloadFile("secondary_structure.svg", props.modelHashId);
            }}
          />
        </Col>
      </Row>
      <Row
        style={{
          padding: "15px",
          margin: "20px 100px 20px 100px",
          border: "1px #dcdcdc solid",
          borderRadius: "30px",
        }}
        justify={"center"}
      >
        <Col span={5}>
          <Row>
            <span
              style={{ textAlign: "center", width: "100%" }}
            >{`0\u00B0 - 15\u00B0`}</span>
          </Row>
          <div
            style={{
              backgroundColor: "#ffffb0",
              height: "10px",

              borderRadius: "5px",
            }}
          ></div>
        </Col>
        <Col span={5} offset={1}>
          <Row>
            <span
              style={{ textAlign: "center", width: "100%" }}
            >{`15\u00B0 - 30\u00B0`}</span>
          </Row>
          <div
            style={{
              backgroundColor: "#fccc5c",
              height: "10px",
              width: "100%",

              borderRadius: "5px",
            }}
          ></div>
        </Col>
        <Col span={5} offset={1}>
          <Row>
            <span
              style={{ textAlign: "center", width: "100%" }}
            >{`30\u00B0 - 60\u00B0`}</span>
          </Row>
          <div
            style={{
              backgroundColor: "#fd8c3a",
              height: "10px",
              width: "100%",

              borderRadius: "5px",
            }}
          ></div>
        </Col>
        <Col span={5} offset={1}>
          <Row>
            <span
              style={{ textAlign: "center", width: "100%" }}
            >{`> 60\u00B0`}</span>
          </Row>
          <div
            style={{
              backgroundColor: "#e31919",
              height: "10px",
              width: "100%",

              borderRadius: "5px",
            }}
          ></div>
        </Col>
      </Row>
      <Divider />
    </div>
  );
};

export default MCQstructure;
