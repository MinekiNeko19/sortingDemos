let unsortedArr = [];
let sortedArr = [];
let interactiveArr = [];
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
  updateSortedArray();

  for (let i = 0; i < len; i++) {
    const n = Math.floor(Math.random() * (max - min + 1)) + min;
    unsortedArr.push(n);
  }
  // console.log(unsortedArr);
  updateRandomArray();
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
    unsortedArr.forEach((item) => randArr += ('<div class="item">' + item + '</div>'));

    // document.getElementById('sortedArr').innerHTML = 'Sorted Using ' + sort + ' Sort: [' + sortedArr.toString() + ']';
    document.getElementById('sortedArr').innerHTML = '<p>Sorted Using ' + sort + ' Sort: </p>' + randArr;
  }
}

function doSort() {
  console.log(chosen);
  if (chosen === 'Selection') {
    selectionSort();
  }
  else if (chosen === 'Insertion') {
    insertionSort();
  }
  else if (chosen === 'Quick') {
    sortedArr = unsortedArr.copyWithin();
    quickSort(sortedArr, 0, visualLen-1);
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
function swap(arr = sortedArr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// Best Case TC: O(n)
// Worst Case TC: O(n^2)
// different from bubble sort b/c bubble sort swaps automatically whereas selection sort will store the min and then swap
// could be recoded to use the swap function
function selectionSort() {
  sortedArr = unsortedArr.copyWithin();

  for (let i = 0; i < visualLen - 1; i++) {
    let min = Number.MAX_VALUE;
    let index = -1;
    let temp = sortedArr[i];

    // find the smallest number in the unsorted frame
    for (let j = i; j < visualLen; j++) {
      if (min > sortedArr[j]) {
        min = sortedArr[j];
        index = j;
        // console.log(min);
      }
    }

    // swap i and j index values
    // console.log('swapping: ' + sortedArr[i] + ' and ' + sortedArr[index]);
    if (sortedArr[index] !== undefined) {
      sortedArr[i] = min;
      sortedArr[index] = temp;
    }
  }
  // updateSortedArray('Selection');
}


// Best Case TC: O(n)
// Worst Case TC: O(n^2)
// could be recoded to use the helper swap function
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

function mergeSortTopDown() { }
function mergeSortBottomUp() { }

// step by step sorting
let swap1 = -1;
let swap2 = -1;

function stepSort() {
  console.log(chosen);
  if (chosen === 'Selection') {
    selectionSortStep();
  }
  else if (chosen === 'Insertion') {
    // insertionSort();    
    document.getElementById('sortedArr').innerHTML = "Insertion Sort not implemented yet";
  }
  else if (chosen === 'Quick') {
    // sortedArr = unsortedArr.copyWithin();
    // quickSort(sortedArr, 0, visualLen-1);
    document.getElementById('sortedArr').innerHTML = "Quick Sort Steps not implemented yet";
  }
  else if (chosen === 'Merge') {
    document.getElementById('sortedArr').innerHTML = "Merge Sort Steps not implemented yet";
  }
  else if (chosen === 'Heap') {
    document.getElementById('sortedArr').innerHTML = "Heap Sort Steps not implemented yet";
  }
  // updateSortedArray(chosen);
  // console.log(sortedArr);
}

function selectionSortStep() {
  sortedArr = unsortedArr.copyWithin();
  interactiveArr = sortedArr.copyWithin();

  for (let i = 0; i < visualLen - 1; i++) {
    let min = Number.MAX_VALUE;
    let index = -1;
    let temp = sortedArr[i];

    // find the smallest number in the unsorted frame
    for (let j = i; j < visualLen; j++) {
      if (min >= sortedArr[j]) {
        min = sortedArr[j];
        index = j;
      }
    }
    if (sortedArr[index] !== undefined) {
      sortedArr[i] = min;
      sortedArr[index] = temp;
    }
    
    // the interactive part
    const vis = document.getElementById('sortedArr')
    const arr = document.createElement('div');
    arr.className = 'array';

    for (let j = 0; j < interactiveArr.length; j++) {
      const item = document.createElement('div');
      item.className = 'item';
      item.setAttribute('id', j);
      item.innerHTML = interactiveArr[j];
      if (j <= i) {
        item.style.backgroundColor = '#ddd';
      } else {
        item.addEventListener('click', () =>  {
          console.log('index ' + j + ' clicked');
        });
      }
      arr.appendChild(item);
    }
    const label = document.createElement('p');
    label.innerHTML = 'Step ' + Number(i+1) + ': ';
    vis.appendChild(label);
    vis.appendChild(arr);

    // while (!equals(sortedArr,interactiveArr)) {

    //   setTimeout(100);
    // }
  } 
}

function equals(arr1,arr2) {
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}