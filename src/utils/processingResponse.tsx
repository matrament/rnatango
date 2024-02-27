"use client";
import { message } from "antd";
import lang from "./lang.json";
import config from "../config.json";

export function processingResponce(
  taskId: string,
  setGetResultFile: any,
  setGetStatus: any
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
    }, 200);
  };
  socket.onmessage = (event) => {
    let a = JSON.parse(event.data);
    if (
      a.status === "SUCCESS" ||
      a.status === "FAILED"
      // a.status === "WAITING" ||
      // a.status === "PROCESSING"
    ) {
      clearInterval(timer);
      fetch(config.SERVER_URL + "/single/" + taskId + "/result", requestOptions)
        .then((response: any) => response.json())
        .then((response: any) => {
          setGetResultFile(response);
          setGetStatus(a.status);
          socket.close();
        })
        .catch((error: any) => {
          message.error("Processing error");
          clearInterval(timer);
          socket.close();
        });
    } else {
      setGetStatus(a.status);
    }
  };
  socket.onclose = socket.onerror = () => {
    clearInterval(timer);
  };
}
