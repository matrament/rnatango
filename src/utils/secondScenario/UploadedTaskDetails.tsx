import { message } from "antd";
import lang from "../lang.json";
import config from "../../config.json";
import initTarget from "../../json/initTarget.json";

export function UploadedTaskDetails(
  taskId: string | null,
  setModelsTarget: any,
  setError: any
) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  requestOptions.headers["Access-Control-Allow-Origin"] = "*";

  fetch(config.SERVER_URL + "one-many/form/" + taskId, requestOptions)
    .then((response: any) => {
      if (response.status == 404) {
        setModelsTarget(initTarget);
        setError(true);
        message.error(lang.rcsb_error);
      } else {
        return response.json();
      }
    })
    .then((response: any) => {
      if (response != "" && response != undefined) {
        setModelsTarget(response);
      } else {
        setModelsTarget(initTarget);
        setError(true);
      }
    })
    .catch((error: any) => message.error("Something went wrong, try again"));
}
