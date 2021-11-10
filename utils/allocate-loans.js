import { calculateYield } from "./calculate-yield.js";

// For each loan, loop through fc (joined facilities and covenants data) to check restrictions and calculate yield
export const allocateLoans = (fc, loans) => {
  const facilityIds = Object.keys(fc);
  loans.forEach((loan, i) => {
    loan.amount = parseFloat(loan.amount);
    loan.interest_rate = parseFloat(loan.interest_rate);
    loan.default_likelihood = parseFloat(loan.default_likelihood);

    for (const facId of facilityIds) {
      let facility = fc[facId];
      let isNotBannedState = !facility.banned_state.includes(loan.state);
      let isPDAllowable =
        loan.default_likelihood <= facility.max_default_likelihood;
      let isAvailable = loan.amount <= facility.available_amt;
      if (isNotBannedState && isPDAllowable && isAvailable) {
        facility.available_amt -= loan.amount;
        loan.facility_id = facId;
        facility.expected_yield += calculateYield(
          loan.default_likelihood,
          loan.interest_rate,
          loan.amount,
          facility.interest_rate
        );
        break; // break out of inner loop if loan is allocated
      }
    }
  });
  return fc;
};
