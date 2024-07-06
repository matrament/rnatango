import { Button, message, Image, Divider } from "antd";
import lang from "../../../utils/lang.json";
import config from "../../../config.json";
import { DownloadOutlined } from "@ant-design/icons";

function downloadFile(type: any, modelId: string) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
  requestOptions.headers["Access-Control-Allow-Origin"] = "*";

  fetch(
    config.SERVER_URL + "/one-many/secondary/structure/" + modelId,
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
    <>
      <h2 style={{ textAlign: "center", marginTop: "0" }}>
        Secondary stucture
      </h2>
      <Image
        alt={"secondary_structure"}
        // className="two-d-image"
        src={`${config.SERVER_URL}/one-many/secondary/structure/${props.modelHashId}`}
      />
      <Button
        type="text"
        size="large"
        style={{ marginTop: "15px" }}
        icon={<DownloadOutlined />}
        onClick={() => {
          downloadFile("secondary_structure.svg", props.modelHashId);
        }}
      />
      <Divider />
    </>
  );
};

export default MCQstructure;
