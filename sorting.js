let unsortedArr = [];
let sortedArr = [];
let stepsArr = [];
let workArr = [];
let visualLen = 10;
let chosen = 'Selection';

function randomizeArray(len = visualLen, min = -500, max = 500) {
  // will only fill array with ints from [-min,max]
  if (max < min) {
    const temp = max;
    max = min;
    min = temp;
  }

  // clear the old arrays
  unsortedArr = [];
  sortedArr = [];
  stepsArr = [];
  updateSortedArray();

  for (let i = 0; i < len; i++) {
    const n = Math.floor(Math.random() * (max - min + 1)) + min;
    unsortedArr.push(n);
  }
  // console.log(unsortedArr);
  updateRandomArray();

  document.getElementById('sortedArr').innerHTML = '';
  document.getElementById('stepsArr').innerHTML = '';
}

function updateRandomArray() {
  let randArr = '<div class="array">';
  unsortedArr.forEach((item) => randArr += ('<div class="item">' + item + '</div>'));
  // document.getElementById('originalArr').innerHTML = 'Generated Random Array: [' + unsortedArr.toString() + ']';

  document.getElementById('originalArr').innerHTML = '<p>Generated Random Array: </p>' + randArr;
}

function updateSortedArray(sort) {
  if (sort === undefined) {
    document.getElementById('sortedArr').innerHTML = '';
  } else {
    let randArr = '<div class="array">';
    sortedArr.forEach((item) => randArr += ('<div class="item">' + item + '</div>'));

    // document.getElementById('sortedArr').innerHTML = 'Sorted Using ' + sort + ' Sort: [' + sortedArr.toString() + ']';
    document.getElementById('sortedArr').innerHTML = '<p>Sorted Using ' + sort + ' Sort: </p>' + randArr;
  }
}

// updating the webpage

// active sort css changer with help from: https://www.w3schools.com/w3css/w3css_tabulators.asp
function activeSort(type) {
  chosen = type;
  const nav = document.getElementsByClassName('selectedType');
  console.log(nav);
  for (let i = 0; i < nav.length; i++) {
    // replace doesn't affect the original string
    nav[i].className = nav[i].className.replace('selectedType','sortType');
  }
  const selected = document.getElementById(type);
  selected.className = 'selectedType';
}

function doSort() {
  console.log(chosen);
  if (chosen === 'Selection') {
    sortedArr = copyArray(unsortedArr);
    selectionSort(sortedArr);
  }
  else if (chosen === 'Insertion') {
    insertionSort();
  }
  else if (chosen === 'Quick') {
    sortedArr = unsortedArr.copyWithin();
    quickSort(sortedArr, 0, visualLen - 1);
  }
  else if (chosen === 'Merge') {
    document.getElementById('sortedArr').innerHTML = "Merge Sort not implemented yet";

  }
  else if (chosen === 'Heap') {
    document.getElementById('sortedArr').innerHTML = "Heap Sort not implemented yet";
  }
  updateSortedArray(chosen);
  // console.log(sortedArr);
}

// // sorting algorithms

// Best Case TC: O(n)
// Worst Case TC: O(n^2)
// different from bubble sort b/c bubble sort swaps automatically whereas selection sort will store the min and then swap
// could be recoded to use the swap function
function selectionSort(arr) {
  for (let i = 0; i < visualLen - 1; i++) {
    let min = Number.MAX_VALUE;
    let index = -1;
    let temp = arr[i];

    // find the smallest number in the unsorted frame
    for (let j = i; j < visualLen; j++) {
      if (min > arr[j]) {
        min = arr[j];
        index = j;
        // console.log(min);
      }
    }

    // swap i and j index values
    // console.log('swapping: ' + sortedArr[i] + ' and ' + sortedArr[index]);
    if (arr[index] !== undefined) {
      arr[i] = min;
      arr[index] = temp;
    }
  }
  // updateSortedArray('Selection');
  // console.log(unsortedArr);
  // console.log(sortedArr);
}


// Best Case TC: O(n)
// Worst Case TC: O(n^2)
// could be recoded to use the helper swap function
function insertionSort() {
  console.log(unsortedArr);
  console.log(sortedArr);
  for (let i = 0; i < visualLen; i++) {
    sortedArr = unsortedArr.copyWithin();
    let curr = sortedArr[i];
    let index = i;

    //  swap until you find the right index
    for (let j = i - 1; j >= 0; j--) {
      if (curr <= sortedArr[j]) {
        sortedArr[index] = sortedArr[j]
        sortedArr[j] = curr;
        index--;
      }
    }
  }
  console.log(unsortedArr);
  console.log(sortedArr);
  // updateSortedArray('Insertion');
}

// the pivot ultimately doesn't matter since it will be inserted at the right place anyway
// everything will be a pivot at some level regardless
// coded with help from geeksforgeeks https://www.geeksforgeeks.org/quick-sort/#
function quickSort(arr = sortedArr, left, right) {
  if (left < right) {
    const piv = partition(arr, left, right);

    // the pivot is already in the right place
    quickSort(arr, left, piv - 1);
    quickSort(arr, piv + 1, right)
  }
}
// helper function that splits the array based on the pivot
// pivot is the last element of the array
function partition(arr = sortedArr, left, right) {
  const pivot = arr[right];
  let i = left;

  for (let j = left; j < right; j++) {
    // puts all elements less than pivot to the left
    if (arr[j] < pivot) {
      swap(arr, i, j) // if i == j, nothing happens
      i++;
    }
  }

  // i is currently at an index whose value >= pivot
  swap(arr, i, right); // puts the pivot in the correct index
  return i; // returns index of the pivot sorted
}

// no recursion
function mergeSortBottomUp() {}


// uses recursion hence top down; uses the 
function mergeSortTopDown() {
  
}

// merge sort helper function
function mergeSublists(arr, left, right, end, work) {
  let i = left;
  let j = right;

  for (let k = left; k < end; k++) {
    // copy next element from left sublist into work array
    if ( ((i < right) && (j >= end)) || (arr[i] <= arr[j]) ) {
      work[k] = arr[i];
    }
    // copy next element from right sublist into work array
    else {
      work[k] = arr[j];
      j++;
    }
  }
}








// show the steps
let swap1 = -1;
let swap2 = -1;

function stepSort() {
  let stepsDiv = document.getElementById('stepsArr');
  stepsDiv.innerHTML = '';

  console.log(chosen);
  if (chosen === 'Selection') {
    selectionSortStep();
    // document.getElementById('sortedArr').innerHTML = "Selection Sort Steps not implemented yet";
  }
  else if (chosen === 'Insertion') {
    // insertionSort();
    stepsDiv.innerHTML = "Insertion Sort Steps not implemented yet";
  }
  else if (chosen === 'Quick') {
    // sortedArr = unsortedArr.copyWithin();
    // quickSort(sortedArr, 0, visualLen-1);
    stepsDiv.innerHTML = "Quick Sort Steps not implemented yet";
  }
  else if (chosen === 'Merge') {
    stepsDiv.innerHTML = "Merge Sort Steps not implemented yet";
  }
  else if (chosen === 'Heap') {
    stepsDiv.innerHTML = "Heap Sort Steps not implemented yet";
  }
  // updateSortedArray(chosen);
  // console.log(sortedArr);
}

function selectionSortStep() {
  // stepsArr = unsortedArr.copyWithin();
  // console.log(unsortedArr);
  // console.log(sortedArr);
  stepsArr = copyArray(unsortedArr);
  
  const vis = document.getElementById('stepsArr');
  vis.innerHTML = '';

  for (let i = 0; i < visualLen - 1; i++) {
    let min = Number.MAX_VALUE;
    let index = -1;
    let temp = stepsArr[i];

    // find the smallest number in the unsorted frame
    for (let j = i; j < visualLen; j++) {
      if (min >= stepsArr[j]) {
        min = stepsArr[j];
        index = j;
      }
    }
    if (stepsArr[index] !== undefined) {
      stepsArr[i] = min;
      stepsArr[index] = temp;
    }

    // the interactive part // removing b/c the vision has changed
    const arr = document.createElement('div');
    arr.className = 'array';

    for (let j = 0; j < stepsArr.length; j++) {
      const item = document.createElement('div');
      item.className = 'item';
      item.setAttribute('id', j);
      item.innerHTML = stepsArr[j];
      if (j <= i) {
        item.style.backgroundColor = '#ddd';
      }
      arr.appendChild(item);
    }
    const label = document.createElement('p');
    label.innerHTML = 'Step ' + Number(i + 1) + ': ';
    vis.appendChild(label);
    vis.appendChild(arr);
  }
}

function insertionSort() {
  for (let i = 0; i < visualLen; i++) {
    sortedArr = unsortedArr.copyWithin();
    let curr = sortedArr[i];
    let index = i;

    //  swap until you find the right index
    for (let j = i - 1; j >= 0; j--) {
      if (curr <= sortedArr[j]) {
        sortedArr[index] = sortedArr[j]
        sortedArr[j] = curr;
        index--;
      }
    }
  }
  // updateSortedArray('Insertion');
}


// small helper functions
function equals(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

function copyArray(array) {
  let copy = [];
  array.forEach((item) => copy.push(item));
  return copy;
}

function swap(arr = sortedArr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}