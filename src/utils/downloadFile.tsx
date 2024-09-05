import config from "../config.json";

export function downloadFile(type: any, path: string) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
  requestOptions.headers["Access-Control-Allow-Origin"] = "*";

  fetch(`${config.SERVER_URL}${path}`, requestOptions)
    .then((res) => res.blob())
    .then((blob) => {
      let url = URL.createObjectURL(blob);
      let pom = document.createElement("a");
      pom.setAttribute("href", url);
      pom.setAttribute("download", type);
      pom.click();
    });
}
