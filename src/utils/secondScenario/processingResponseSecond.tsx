import { message } from "antd";
import lang from "../lang.json";
import config from "../../config.json";
import initResult from "../../json/initResultSecond.json";

export function processingResponseSecond(
  taskId: string | null,
  setResult: any,
  setLoading: any
) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  requestOptions.headers["Access-Control-Allow-Origin"] = "*";

  fetch(config.SERVER_URL + "/one-many/" + taskId + "/result", requestOptions)
    .then((response: any) => {
      if (response.status == 404) {
        setResult(initResult);
        setLoading(false);
        message.error(lang.rcsb_error);
      } else {
        return response.json();
      }
    })
    .then((response: any) => {
      if (response != "" && response != undefined) {
        setResult(response);
      } else {
        setResult(initResult);
      }
      setLoading(false);
    })
    .catch((error: any) => message.error("Something went wrong, try again"));
}
