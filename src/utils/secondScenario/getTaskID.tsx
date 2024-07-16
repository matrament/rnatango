import { message } from "antd";
import lang from "../lang.json";
import { second_scenario_submit } from "../../types/modelsType";
import config from "../../config.json";

export function getTaskID(
  submit: second_scenario_submit,
  router: any,
  setLoading: any
) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(submit),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", //localhost zabazpieczenie
    },
  };
  requestOptions.headers["Access-Control-Allow-Origin"] = "*";
  fetch(config.SERVER_URL + "one-many/submit", requestOptions)
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
      if (response != "" && response != undefined) {
        router.push(`/result-second?id=${response.taskId}`);
      }
    })
    .catch((error: any) => message.error("Something went wrong, try again"));
}
