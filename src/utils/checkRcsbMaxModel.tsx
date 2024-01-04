import { message } from "antd";
import lang from "../components/first-scenario/lang.json";
export function checkRcsbMaxModel(
  setMaxModel: any,
  setPDBError: any,
  pdbId: string,
  setMaxModelQuery: any
) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("https://data.rcsb.org/rest/v1/core/entry/" + pdbId, requestOptions)
    .then((response: any) => response.json())
    .then((response: any) => {
      if (response.rcsb_entry_container_identifiers) {
        setMaxModel(response.rcsb_entry_container_identifiers.model_ids.length);
      } else {
        setPDBError(true);
        message.error(lang.rcsb_error_with_name + "'" + pdbId + "'");
      }
      setMaxModelQuery(false);
      console.log(response.rcsb_entry_container_identifiers);
    });
}
