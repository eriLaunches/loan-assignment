export const calculateYield = (PD, loanIntRate, loanAmt, facIntRate) => {
  let calculation =
    (1 - PD) * loanIntRate * loanAmt - PD * loanAmt - facIntRate * loanAmt;
  return calculation;
};
