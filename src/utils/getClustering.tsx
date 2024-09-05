import { message } from "antd";

export function getClustering(taskId: string | null, setData: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  requestOptions.headers["Access-Control-Allow-Origin"] = "*";

  fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + "/many-many/" + taskId + "/clustering",
    requestOptions
  )
    .then((response: any) => {
      if (response.status == 404) {
        // message.error(lang.error_deleting);
      } else {
        return response.json();
      }
    })
    .then((response: any) => {
      if (response != "" || response != undefined) {
        setData(response);
      }
    })
    .catch((error: any) => message.error("Something went wrong, try again"));
}
