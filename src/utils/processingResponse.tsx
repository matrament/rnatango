import { message } from "antd";

export function processingResponse(
  taskId: string | null,
  setResultFile: any,
  setStatus: any,
  setError: any,
  scenario: "single" | "one-many" | "many-many",
  setProgress: any
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
      `${process.env.NEXT_PUBLIC_SERVER_WEB_SOCKET_URL}/${scenario
        .split("-")
        .join("")}`
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

      scenario != "single" ? setProgress(a.progress) : null;

      if (a.status === "SUCCESS" || a.status === "FAILED") {
        clearInterval(timer);
        if (a.status === "SUCCESS") {
          fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/${scenario}/${taskId}/result`,
            requestOptions
          )
            .then((response: any) => response.json())
            .then((response: any) => {
              setProgress(1);
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
      // setError(true);
    };
  };

  const getResult = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/${scenario}/${taskId}/result`,
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          setError(true);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((response) => {
        setResultFile(response);
        setProgress(1);
        setStatus("SUCCESS");
      })
      .catch((error) => {
        // console.error("Error fetching initial data:", error);
        setError(true);
      });
  };

  fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/${scenario}/${taskId}`,
    requestOptions
  )
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
