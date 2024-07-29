import { message } from "antd";
import config from "../config.json";

export function processingResponse(
  taskId: string | null,
  setResultFile: any,
  setStatus: any,
  setError: any,
  scenario: "single" | "one-many" | "many-many"
) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", //localhost zabezpieczenie
    },
  };
  requestOptions.headers["Access-Control-Allow-Origin"] = "*";

  const openWebSocket = () => {
    let socket = new WebSocket(
      `${config.SERVER_WEB_SOCKET_URL}/${scenario.split("-").join("")}`
    );
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

      if (a.status === "SUCCESS" || a.status === "FAILED") {
        clearInterval(timer);
        if (a.status === "SUCCESS") {
          fetch(
            `${config.SERVER_URL}/${scenario}/${taskId}/result`,
            requestOptions
          )
            .then((response: any) => response.json())
            .then((response: any) => {
              setResultFile(response);
            })
            .catch((error: any) => {
              message.error("Processing error");
            });
          socket.close();
        }
      }
    };
    socket.onclose = socket.onerror = () => {
      clearInterval(timer);
      setError(true);
    };
  };

  const getResult = () => {
    fetch(`${config.SERVER_URL}/${scenario}/${taskId}/result`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          setError(true);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((response) => {
        setResultFile(response);
        setStatus("SUCCESS");
      })
      .catch((error) => {
        // console.error("Error fetching initial data:", error);
        setError(true);
      });
  };

  fetch(`${config.SERVER_URL}/${scenario}/${taskId}`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        setError(true);
      }
      return response.json();
    })
    .then((response) => {
      if (response.status == "SUCCESS") {
        getResult();
      }
      if (response.status == "PROCESSING" || response.status == "WAITING") {
        setStatus(response.status);
        openWebSocket();
      }
    })
    .catch((error) => {
      // console.error("Error fetching initial data:", error);
      setError(true);
    });
}
