import { createObjectCsvWriter as createCsvWriter } from "csv-writer";

export const writeToCSVFile = (data, filename, header) => {
  let path = `./output/${filename}`;
  const csvWriter = createCsvWriter({
    path,
    header,
  });

  csvWriter
    .writeRecords(data)
    .then(() => {
      console.log(`🥳  The CSV file was written successfully to '${path}'`);
    })
    .catch((err) => {
      console.log(`🚨  Error writing to csv file to '${path}'`, err);
    });
};
