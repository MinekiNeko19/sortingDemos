let unsortedArr = []
let sortedArr = [];
let visualLen = 5;

function randomizeArray(len=visualLen,min=-500,max=500) {
  // will only fill array with ints from [-min,max]
  if (max < min) {
    const temp = max;
    max = min;
    min = temp;
  }

  // clear the old arrays
  unsortedArr = [];
  sortedArr = [];
  updateSortedArray();

  for (let i = 0; i < len; i++) {
    const n = Math.floor(Math.random()*(max-min+1)) + min;
    unsortedArr.push(n);
  }
  // console.log(unsortedArr);
  updateRandomArray();
}

function selectionSort() {
  sortedArr = unsortedArr.copyWithin();

  for (let i = 0; i < visualLen-1; i++) {
    let min = Number.MIN_VALUE;
    let index = -1;
    let temp = sortedArr[i];

    // find the smallest number in the unsorted frame
    for (let j = i; j < visualLen; j++) {
      if (min >= sortedArr[j]) {
        min = sortedArr[j];
        index = j;
      }
    }

    // swap i and j index values
    // console.log('swapping: ' + sortedArr[i] + ' and ' + sortedArr[index]);
    if (sortedArr[index] !== undefined) {
      sortedArr[i] = min;
      sortedArr[index] = temp;
    }
  }
  updateSortedArray();
}

function updateRandomArray() {
  document.getElementById('originalArr').innerHTML = 'Generated Random Array: [' + unsortedArr.toString() + ']';
}

function updateSortedArray() {
  document.getElementById('sortedArr').innerHTML = 'Sorted Using Selection Sort: [' + sortedArr.toString() + ']';
}