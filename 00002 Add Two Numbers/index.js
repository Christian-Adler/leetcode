/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = function (l1, l2) {

  let firstNode = null;
  let actNode = null;

  let it1 = l1;
  let it2 = l2;
  let val1 = typeof it1.val === "number" ? it1.val : null;
  let val2 = typeof it2.val === "number" ? it2.val : null;
  let overtake = 0;
  while (val1 != null || val2 != null) {
    let sum = 0;
    sum += overtake;
    if (val1 != null) sum += val1;
    if (val2 != null) sum += val2;

    if (sum > 9) {
      overtake = 1;
      sum -= 10;
    } else
      overtake = 0;

    const node = new ListNode(sum, undefined);
    if (firstNode == null) {
      firstNode = node;
      actNode = node;
    } else {
      actNode.next = node;
      actNode = node;
    }

    if (it1.next) {
      it1 = it1.next;
      val1 = it1.val;
    } else
      val1 = null;
    if (it2.next) {
      it2 = it2.next;
      val2 = it2.val;
    } else
      val2 = null;
  }

  if (overtake > 0) {
    actNode.next = new ListNode(overtake, undefined);
  }

  return firstNode;
};


// ==============================================================
//   Tests
// ==============================================================
class ListNode {
  constructor(val, next) {
    this.val = val;
    this.next = next;
  }
}

const assertTrue = (val) => {
  if (!val) throw new Error(`Expected true - got: ${val}`);
};
const assertFalse = (val) => {
  if (val) throw new Error(`Expected false - got: ${val}`);
};


function createNodes(numbers) {
  let firstNode = null;
  let actNode = null;
  let tmpNode = null;

  for (const n of numbers) {
    tmpNode = new ListNode(n);
    if (firstNode == null)
      firstNode = tmpNode;

    if (actNode != null)
      actNode.next = tmpNode;

    actNode = tmpNode;
  }

  return firstNode;
}


let res = addTwoNumbers(createNodes([2, 4, 3]), createNodes([5, 6, 4]));
console.log(res);
assertTrue(res.val === 7 && res.next.val === 0 && res.next.next.val === 8);
assertFalse(res.next === null);
