"use client";
import { message } from "antd";
import lang from "../components/first-scenario/lang.json";
import { single_scenario_request } from "@/types/modelsType";

let selected_example: any = {
  fileId: "1FFK",
  selections: [
    {
      modelName: "1",
      chains: [
        {
          name: "0",
          nucleotideRange: {
            fromInclusive: 1,
            toInclusive: 50,
          },
        },
      ],
    },
  ],
};

export function getTaskId(resultModel: single_scenario_request) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(resultModel),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", //localhost zabazpieczenie
    },
  };
  requestOptions.headers["Access-Control-Allow-Origin"] = "*";
  fetch("http://rnatango.cs.put.poznan.pl/single", requestOptions)
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
        // window.open(config.FRONTEND_URL + "/result/" + response, "_self");
        // setLoading(false);
        console.log(response);
      }
    })
    .catch((error: any) => message.error("Something went wrong, try again"));
}
