"use client";
import Papa from "papaparse";
import { torsion_angles_residue } from "../types/modelsType";

type angleObject = { [key: string]: number | string | null };

export function exportDataToCSV(
  csvData: torsion_angles_residue[],
  angleColumn: [any]
) {
  let filterAngle = angleColumn.map((el) => {
    return el.dataIndex;
  });

  let y: angleObject[] = csvData.map((residue: angleObject) =>
    Object.keys(residue)
      .filter((objKey) => filterAngle.includes(objKey))
      .reduce((newObj: angleObject, key) => {
        newObj[key] = residue[key];
        return newObj;
      }, {})
  );
  // const tranformFunction = (value, column) => {
  //   if (value === null) {
  //     return "NA";
  //   } else {
  //     return value;
  //   }
  // };
  const csv = Papa.unparse(y);

  // Create a Blob containing the CSV data
  const csvBlob = new Blob([csv], { type: "text/csv" });

  // Create a URL for the Blob
  const csvUrl = URL.createObjectURL(csvBlob);

  // Create an invisible link element to trigger the download
  const link = document.createElement("a");
  link.href = csvUrl;
  link.download = "angle_torsion_data.csv";

  link.click();

  // Clean up by revoking the URL to release resources
  URL.revokeObjectURL(csvUrl);
}
