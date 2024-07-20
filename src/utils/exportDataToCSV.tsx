"use client";
import Papa from "papaparse";
import { torsion_angles_residue } from "../types/modelsType";

type angleObject = { [key: string]: number | string | null };

export function exportDataToCSV(
  csvData: angleObject[],
  angleColumn: [any],
  fileName: string,
  chain: string
) {
  let filterAngle = angleColumn.map((el) => {
    return el.dataIndex;
  });

  let y: angleObject[] = csvData.map((residue: angleObject) =>
    filterAngle
      .filter((objKey) => Object.keys(residue).includes(objKey))
      .reduce((newObj: angleObject, key) => {
        newObj[key] = residue[key];
        return newObj;
      }, {})
  );

  const csv = Papa.unparse(y);
  // console.log(y);
  // console.log(angleColumn);
  // Create a Blob containing the CSV data
  const csvBlob = new Blob([csv], { type: "text/csv" });

  // Create a URL for the Blob
  const csvUrl = URL.createObjectURL(csvBlob);

  // Create an invisible link element to trigger the download
  const link = document.createElement("a");
  link.href = csvUrl;
  link.download = `${fileName.toLowerCase()}_${chain.toLowerCase()}.csv`;

  link.click();

  // Clean up by revoking the URL to release resources
  URL.revokeObjectURL(csvUrl);
}
