import { message } from "antd";
import lang from "./lang.json";
import config from "../config.json";
import { single_result_angle } from "../types/modelsType";

export function processingResponce(
  taskId: string,
  getResultFile: single_result_angle,
  setGetResultFile: any,
  setGetStatus: any,
  getStatus: any
) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", //localhost zabazpieczenie
    },
  };
  requestOptions.headers["Access-Control-Allow-Origin"] = "*";

  let socket = new WebSocket(config.SERVER_WEB_SOCKET_URL + `/single`);
  let timer: any = null;

  const request = { hashId: taskId };
  socket.onopen = () => {
    socket.send(JSON.stringify(request));
    timer = setInterval(() => {
      socket.send(JSON.stringify(request));
    }, 2000);
  };
  socket.onmessage = (event) => {
    let a = JSON.parse(event.data);
    setGetStatus(a.status);

    if (
      (a.status === "SUCCESS" || a.status === "FAILED") &&
      getResultFile.structureName == ""
    ) {
      clearInterval(timer);
      if (a.status === "SUCCESS") {
        fetch(
          config.SERVER_URL + "/single/" + taskId + "/result",
          requestOptions
        )
          .then((response: any) => response.json())
          .then((response: any) => {
            setGetResultFile(response);

            // clearInterval(timer);
          })
          .catch((error: any) => {
            message.error("Processing error");
            // clearInterval(timer);
          });
        socket.close();
      }
    }
  };
  socket.onclose = socket.onerror = () => {
    clearInterval(timer);
  };
}
