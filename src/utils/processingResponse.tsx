"use client";
import { message } from "antd";
import lang from "../components/first-scenario/lang.json";

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

  let socket = new WebSocket(`wss://rnatango.cs.put.poznan.pl/ws/single`);
  let timer: any = null;
  const request = { hashId: taskId };
  socket.onopen = () => {
    socket.send(JSON.stringify(request));
    timer = setInterval(() => {
      socket.send(JSON.stringify(request));
    }, 5000);
  };
  socket.onmessage = (event) => {
    let a = JSON.parse(event.data);
    if (
      a.status === "SUCCESS" ||
      a.status === "WAITING" ||
      a.status === "PROCESSING"
    ) {
      clearInterval(timer);
      fetch(
        "https://rnatango.cs.put.poznan.pl/single/" + taskId + "/result",
        requestOptions
      )
        .then((response: any) => response.json())
        .then((response: any) => {
          setGetResultFile(response);
          console.log(a);
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
      console.log(a);
      if (a.status === "FAILED") {
        //setLoading(false);
      }
    }
  };
  socket.onclose = socket.onerror = () => {
    clearInterval(timer);
  };
}
