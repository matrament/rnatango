import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const RenderLoader = () => {
  return (
    <div style={{ height: "100%", margin: "20px" }} className={"center"}>
      <br />
      <Spin size="large" />
    </div>
  );
};
export const RenderPageLoader = () => {
  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: "#f4f5f6",
      }}
      className={"center"}
    >
      <div
        className={"horizontal-center"}
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "64px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            float: "left",
            padding:'30px'
          }}
        >
        </div>
        <Spin
          size="large"
          indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />}
        />
      </div>
    </div>
  );
};
