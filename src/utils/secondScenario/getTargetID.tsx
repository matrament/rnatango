import { message } from "antd";
import lang from "../lang.json";
import { second_scenario_target } from "../../types/modelsType";
import config from "../../config.json";

export function GetTargetId(target: second_scenario_target, router: any) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(target),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", //localhost zabazpieczenie
    },
  };
  requestOptions.headers["Access-Control-Allow-Origin"] = "*";
  fetch(config.SERVER_URL + "/one-many/set", requestOptions)
    .then((response: any) => {
      if (response.status == 404) {
        message.error(lang.rcsb_error);
        // setLoading(false);
        return "";
      } else {
        return response.json();
      }
    })
    .then((response: any) => {
      if (response != "") {
        router.push(`/target-model?id=${response.taskId}`);
      }
    })
    .catch((error: any) => message.error("Something went wrong, try again"));
}
