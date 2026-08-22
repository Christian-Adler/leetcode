/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (nums, target) {
  for (let i = 0; i < nums.length - 1; i++) {
    let valI = nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      let valJ = nums[j];
      if (valI + valJ === target)
        return [i, j]
    }
  }
  return [0, 0];
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


let res = twoSum([2, 7, 11, 15], 9);
assertTrue(res.length === 2 && res[0] === 0 && res[1] === 1);
