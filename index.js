import { getFacilities, getCovenants, getLoans } from "./utils/parse-csv.js";
import { allocateLoans } from "./utils/allocate-loans.js";
import { selectYields } from "./utils/select-yields.js";
import { selectAssignments } from "./utils/select-assignments.js";
import { writeToCSVFile } from "./utils/write-to-csv.js";
import { joinFC } from "./utils/join-facilities-covenants.js";
import {
  yieldsFilename,
  assignmentsFilename,
  csvYieldsHeader,
  csvAssignmentsHeader,
} from "./constants.js";

(async () => {
  //parse csv files
  let facilities = await getFacilities();
  let covenants = await getCovenants();
  let loans = await getLoans();

  // join facilities and covenants data by facility_id
  let fc = joinFC(facilities, covenants);

  // allocate loans & calculate expected_yield
  let fcWithYields = allocateLoans(fc, loans);

  let yields = selectYields(fcWithYields);

  let assignments = selectAssignments(loans);

  // write to CSV file for yields
  writeToCSVFile(yields, yieldsFilename, csvYieldsHeader);

  // write to CSV file for assignments
  writeToCSVFile(assignments, assignmentsFilename, csvAssignmentsHeader);
})();
