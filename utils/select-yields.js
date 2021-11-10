export const selectYields = (fcWithYield) => {
  let facilityIds = Object.keys(fcWithYield);
  return facilityIds.map((facId, i) => {
    return {
      facility_id: facId,
      expected_yield: Math.round(fcWithYield[facId].expected_yield),
    };
  });
};
