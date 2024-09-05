import { message } from "antd";
import lang from "../lang.json";

export function deleteModel(
  taskId: string | null,
  modelId: any,
  setModelsTarget: any,
  scenario: "one-many" | "many-many"
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
    `${process.env.NEXT_PUBLIC_SERVER_URL}/${scenario}/form/remove/model/${taskId}/${modelId}`,
    requestOptions
  )
    .then((response: any) => {
      if (response.status == 404) {
        message.error(lang.error_deleting);
      } else {
        return response.json();
      }
    })
    .then((response: any) => {
      if (response != "") {
        message.success(lang.delete_model_success);
        setModelsTarget(response);
      }
    })
    .catch((error: any) => message.error("Something went wrong, try again"));
}
