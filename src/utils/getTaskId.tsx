import { message } from "antd";
import lang from "./lang.json";
import config from "../config.json";

export function getTaskId(
  result: any,
  router: any,
  setLoading: any,
  scenario: "single" | "one-many/submit" | "one-many/set" | "many-many/submit",
  path: "result" | "result-second" | "target-model" | "result-third"
) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(result),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", //localhost zabazpieczenie
    },
  };
  requestOptions.headers["Access-Control-Allow-Origin"] = "*";
  fetch(`${config.SERVER_URL}/${scenario}`, requestOptions)
    .then((response: any) => {
      if (response.status == 404) {
        message.error(lang.rcsb_error);
        setLoading(false);
        return "";
      } else {
        return response.json();
      }
    })
    .then((response: any) => {
      if (response != "") {
        router.push(`/${path}?id=${response.taskId}`);
      }
    })
    .catch((error: any) => message.error("Something went wrong, try again"));
}
