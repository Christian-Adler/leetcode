const toTest = function (val) {
  return val;
};

// ==============================================================
//   Tests
// ==============================================================

const assertTrue = (val) => {
  if (!val) throw new Error(`Expected true - got: ${val}`);
};
const assertFalse = (val) => {
  if (val) throw new Error(`Expected false - got: ${val}`);
};


assertTrue(toTest(true));
assertFalse(toTest(false));
