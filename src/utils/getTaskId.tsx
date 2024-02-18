"use client";
import { message } from "antd";
import lang from "./lang.json";
import { single_scenario_request } from "@/types/modelsType";
import config from "../config.json";

export function GetTaskId(resultModel: single_scenario_request, router: any) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(resultModel),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", //localhost zabazpieczenie
    },
  };
  requestOptions.headers["Access-Control-Allow-Origin"] = "*";
  fetch(config.SERVER_URL + "/single", requestOptions)
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
        router.push(`/result?id=${response.taskId}`);
      }
    })
    .catch((error: any) => message.error("Something went wrong, try again"));
}
