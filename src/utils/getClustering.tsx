import { message } from "antd";
import lang from "./lang.json";
import config from "../config.json";

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
    config.SERVER_URL + "/many-many/" + taskId + "/clustering",
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
