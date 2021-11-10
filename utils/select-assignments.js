export const selectAssignments = (loans) => {
  return loans.map((loan, i) => {
    return {
      loan_id: loan.id,
      facility_id: loan.facility_id,
    };
  });
};
