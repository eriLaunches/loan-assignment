import fs from "fs";
import csv from "csv-parser";

export const getBanks = (size = "large") => {
  return new Promise((resolve, reject) => {
    let banks = [];
    fs.createReadStream(`./data/${size}/banks.csv`)
      .pipe(csv())
      .on("data", (row) => banks.push(row))
      .on("end", () => resolve(banks))
      .on("error", (error) => reject(error));
  });
};

export const getCovenants = (size = "large") => {
  return new Promise((resolve, reject) => {
    let covenants = [];
    fs.createReadStream(`./data/${size}/covenants.csv`)
      .pipe(csv())
      .on("data", (row) => covenants.push(row))
      .on("end", () => resolve(covenants))
      .on("error", (error) => reject(error));
  });
};

export const getFacilities = (size = "large") => {
  return new Promise((resolve, reject) => {
    let facilities = [];
    fs.createReadStream(`./data/${size}/facilities.csv`)
      .pipe(csv())
      .on("data", (row) => facilities.push(row))
      .on("end", () => resolve(facilities))
      .on("error", (error) => reject(error));
  });
};

export const getLoans = (size = "large") => {
  return new Promise((resolve, reject) => {
    let loans = [];
    fs.createReadStream(`./data/${size}/loans.csv`)
      .pipe(csv())
      .on("data", (row) => loans.push(row))
      .on("end", () => resolve(loans))
      .on("error", (error) => reject(error));
  });
};
