/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  const len1 = nums1.length;
  const len2 = nums2.length;
  const lenSum = len1 + len2;

  if (lenSum === 1) {
    if (len1 === 1)
      return nums1[0];
    return nums2[0];
  }

  const isEven = lenSum % 2 === 0;
  const medianIdx = isEven ? lenSum / 2 - 1 : (lenSum + 1) / 2 - 1;

  let actIdx = 0;
  let pointer1 = 0;
  let pointer2 = 0;
  let val1 = len1 > pointer1 ? nums1[pointer1] : null;
  let val2 = len2 > pointer2 ? nums2[pointer2] : null;

  let actNo = null;
  if (val1 == null)
    actNo = val2;
  else if (val2 == null)
    actNo = val1;
  else {
    actNo = val1 > val2 ? val2 : val1;
  }

  let medianIdxNo = null;
  let medianIdxPlus1No = null;

  while (actIdx < medianIdx) {
    if (val1 == null) {
      pointer2++;
      val2 = nums2[pointer2];
    } else if (val2 == null) {
      pointer1++;
      val1 = nums1[pointer1];
    } else {
      if (val1 >= val2) {
        pointer2++;
        val2 = len2 > pointer2 ? nums2[pointer2] : null;
      } else if (val2 > val1) {
        pointer1++;
        val1 = len1 > pointer1 ? nums1[pointer1] : null;
      }
    }

    if (val1 == null)
      actNo = val2;
    else if (val2 == null)
      actNo = val1;
    else {
      actNo = val1 > val2 ? val2 : val1;
    }

    actIdx++;
  }

  if (actIdx === medianIdx) {
    medianIdxNo = actNo;
    if (!isEven)
      return medianIdxNo;

    const median4 = [];
    if (val1 != null) median4.push(val1);
    if (val2 != null) median4.push(val2);
    pointer1++;
    val1 = len1 > pointer1 ? nums1[pointer1] : null;
    if (val1 != null) median4.push(val1);
    pointer2++;
    val2 = len2 > pointer2 ? nums2[pointer2] : null;
    if (val2 != null) median4.push(val2);
    median4.sort((a, b) => a - b);
    if (median4.length > 1) {
      medianIdxNo = median4[0];
      medianIdxPlus1No = median4[1];
      return (medianIdxNo + medianIdxPlus1No) / 2;
    }
  }

  return -1;
};

// const nums1 = [1, 2];
// const nums2 = [3, 4];
const nums1 = [];
const nums2 = [2, 3];

console.log(findMedianSortedArrays(nums1, nums2));