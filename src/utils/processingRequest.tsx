"use client";
import { message } from "antd";
import lang from "./lang.json";
import config from "../config.json";

type pdbId = {
  name: string;
};

export function processingRequest(
  data: pdbId,
  setLoading: any,
  setGetStructure: any
) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", //localhost zabazpieczenie
    },
  };
  requestOptions.headers["Access-Control-Allow-Origin"] = "*";
  fetch(config.SERVER_URL + "/pdb", requestOptions)
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
        setLoading(false);
        setGetStructure(response);
      }
    })
    .catch((error: any) => message.error("Something went wrong, try again"));
}
