/*
* Join facilities and covenants by facility_id
  {
    1: {
      amount:,
      available_amt: set to equal amount at the onset,
      interest_rate:,
      expected_yield: placeholder set to 0,
      max_default_likelihood:,
      banned_state:[],
    },
    2: {...}
  }
*/
export const joinFC = (facilities, covenants) => {
  let fc = {};
  facilities.forEach((facility, i) => {
    let facilityId = facility.id;
    fc[facilityId] = {
      amount: parseFloat(facility.amount),
      available_amt: parseFloat(facility.amount),
      interest_rate: parseFloat(facility.interest_rate),
      expected_yield: 0,
      max_default_likelihood: null,
      banned_state: [],
    };
  });

  covenants.forEach((covenant, i) => {
    let facilityId = covenant.facility_id;
    // assumes a facility has at most ONE max_default_likelihood
    if (covenant.max_default_likelihood) {
      fc[facilityId].max_default_likelihood = parseFloat(
        covenant.max_default_likelihood
      );
    }
    // assumes a facility has at least ONE banned statate
    if (covenant.banned_state) {
      let facBannedState = fc[facilityId].banned_state;
      facBannedState = facBannedState.push(covenant.banned_state);
    }
  });
  return fc;
};
