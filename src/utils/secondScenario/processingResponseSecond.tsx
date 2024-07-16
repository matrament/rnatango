import { message } from "antd";
import lang from "../lang.json";
import config from "../../config.json";
import initResult from "../../json/initResultSecond.json";

export function processingResponseSecond(
  taskId: string | null,
  setResult: any,
  setStatus: any,
  status: any
) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  requestOptions.headers["Access-Control-Allow-Origin"] = "*";

  let socket = new WebSocket(config.SERVER_WEB_SOCKET_URL + "onemany");
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
    setStatus(a.status);

    if (
      a.status === "SUCCESS" ||
      a.status === "FAILED"
      // resultFile.structureName == ""
    ) {
      clearInterval(timer);
      if (a.status === "SUCCESS") {
        fetch(
          config.SERVER_URL + "one-many/" + taskId + "/result",
          requestOptions
        )
          .then((response: any) => response.json())
          .then((response: any) => {
            setResult(response);
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
