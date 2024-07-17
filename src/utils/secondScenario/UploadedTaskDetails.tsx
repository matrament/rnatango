import { message } from "antd";
import lang from "../lang.json";
import config from "../../config.json";
import initTarget from "../../json/initTarget.json";

export function UploadedTaskDetails(
  taskId: string | null,
  setModels: any,
  setError: any,
  scenario: string
) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  requestOptions.headers["Access-Control-Allow-Origin"] = "*";

  fetch(
    config.SERVER_URL +
      `${(scenario = "2" ? "/one-many/form/" : "/many-many/form/")}` +
      taskId,
    requestOptions
  )
    .then((response: any) => {
      if (response.status == 404) {
        // setModels(initTarget);
        setError(true);
        message.error(lang.rcsb_error);
      } else {
        return response.json();
      }
    })
    .then((response: any) => {
      if (response != "" && response != undefined) {
        setModels(response);
      } else {
        // setModels(initTarget);
        setError(true);
      }
    })
    .catch((error: any) => message.error("Something went wrong, try again"));
}
