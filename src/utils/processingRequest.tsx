"use client";
import { message } from "antd";
import config from "../config.json";
import lang from "../components/first-scenario/lang.json";

type pdbId = {
  name: string;
};

export function processingRequest(data: pdbId, setLoading: any) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", //localhost zabazpieczenie
    },
  };
  requestOptions.headers["Access-Control-Allow-Origin"] = "*";
  fetch("http://rnatango.cs.put.poznan.pl/pdb", requestOptions)
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
        // window.open(config.FRONTEND_URL + "/result/" + response, "_self");
        setLoading(false);
        console.log(response);
      }
    })
    .catch((error: any) => message.error("Something went wrong, try again"));
}
