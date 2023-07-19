let unsortedArr = [];
let sortedArr = [];
let stepsArr = [];
// let workArr = [];
let visualLen = 10;
let chosen = 'Selection';
let mergeBottomUp = true;

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
    if (sort === 'Merge') {
      if (mergeBottomUp) {
        document.getElementById('sortedArr').innerHTML = '<p>Sorted Using ' + sort + ' (Bottom Up) Sort: </p>' + randArr;
      } else {
        document.getElementById('sortedArr').innerHTML = '<p>Sorted Using ' + sort + ' (Top Down) Sort: </p>' + randArr;
      }
    } else {
      document.getElementById('sortedArr').innerHTML = '<p>Sorted Using ' + sort + ' Sort: </p>' + randArr;
    }
  }
}

// updating the webpage

function toggleMerge() {
  mergeBottomUp = !mergeBottomUp;
  const button = document.getElementById('mergeType');
  if (mergeBottomUp) {
    button.innerHTML = 'Bottom Up';
  } else {
    button.innerHTML = 'Top Down';
  }
  activeSort(chosen);
}

// active sort css changer with help from: https://www.w3schools.com/w3css/w3css_tabulators.asp
function activeSort(type) {
  chosen = type;
  const nav = document.getElementsByClassName('selectedType');
  console.log(nav);
  for (let i = 0; i < nav.length; i++) {
    // replace doesn't affect the original string
    nav[i].className = nav[i].className.replace('selectedType', 'sortType');
  }
  const selected = document.getElementById(type);
  selected.className = 'selectedType';

  const mergeTypeButton = document.getElementById('mergeType');
  mergeTypeButton.style.display = 'none';

  const sort = document.getElementById('sort');
  const method = document.getElementById('method');
  const tc = document.getElementById('tc');
  const sc = document.getElementById('sc');
  if (chosen === 'Selection') {
    sort.innerHTML = 'Selection Sort';
    tc.innerHTML = 'O(n<sup>2</sup>)';
    sc.innerHTML = 'O(n)';
    method.innerHTML = `
        <p>
          Selection sort is an improved version of bubble sort.
          Iterate through the array, record the smallest value, and move the smallest value to the front.
        </p>
        <p>
          For each step of the iteration, consider <span class="code">i</span> to be the current element of an array of
          length <span class="code">n</span>.
        <ol>
          <li>Linearly search through the elements between <span class="code">i</span> and <span class="code">n</span>
            and record the index <span class="code">k</span> of the next smallest element.</li>
          <li>Swap the <span class="code">i</span>th element and <span class="code">k</span>th elements.</li>
          <li>Increment <span class="code">i</span> and repeat for each index of the array.</li>
          <ul>
            <li>The last element <span class="code">n-1</span> doesn't have to be searched for, as it would be properly
              placed by the previous swap.</li>
            <ul>
        </ol>
      </p>
    `
  }
  else if (chosen === 'Insertion') {
    sort.innerHTML = 'Insertion Sort';
    tc.innerHTML = 'O(n<sup>2</sup>)';
    sc.innerHTML = 'O(n)';
    method.innerHTML = `
    <p>
      Insertion sort is on average faster than selection sort, but is slower when inserting an element at the front. <br>
      Take the next unsorted element, iterate through the already sorted elements, insert it in the correct place, and shift the elements accordingly.
    </p>
    <p>
      For the following, consider <span class="code">i</span> to be the current element of an array of
      length <span class="code">n</span>.
    <ol>
      <li>
        Record the value of the <span class="code">i</span>th element.
      </li>
      <li>
        Iterate <span class="code">j</span> from the <span class="code">i</span>th index to the element at index <span class="code">1</span>.
      </li>
      <ul>
        <li>
          While iterating, swap the <span class="code">j</span>th element with the <span class="code">j-1</span>th element
          if the <span class="code">j</span>th element is less than the <span class="code">j-1</span> element
        </li>
        <li>This shifts the greater elements into place, while locating the correct location of the current element.</li>
      </ul>
      <li>Increment <span class="code">i</span> and repeat until <span class="code">i==n</span></li>
    </ol>
    </p>
    `

  }
  else if (chosen === 'Quick') {
    sort.innerHTML = 'Quick Sort';
    tc.innerHTML = 'O(nlog(n))';
    sc.innerHTML = 'O(n)';
    method.innerHTML = `
    <p>
      Quick sort sorts recursively and using a pivot as a reference.
      Select any element as a pivot, place elements less than the pivot on the left and greater than the pivot on the right, 
      place the pivot in its correct spot, then recursively do the same for the left and right of the pivot.
      <ul>
        <li>Although any element can be used a pivot, it is more consistent to pick either the first or last element.</li>
      </ul>
    </p>
    <p>
      For this quicksort function, the passed parameters are the array we are sorting <span class="code">arr</span>, 
      the left bounding index <span class="code">left</span>, and the right bounding index <span class="code">right</span>.
    <ol>
      <li>Call the helper function <span class="code">partition</span> to partition the elements and obtain <span class="code">pivotInd</span> the index of the sorted pivot.</li>
        <ol>
          <li>Because the last element of the array is the pivot, iterate from the <span class="code">left</span> bounding index to the <span class="code">right-1</span> bounding index.</li>
          <ul>
            <li>
              Elements greater than <span class="code">pivot</span> remain in place. 
              Elements less than <span class="code">pivot</span> are swapped to the left, kept track of using <span class="code">j</span>, which increments by 1 every time we swap an element.
            </li>
            <li>This swaps elements less than <span class="code">pivot</span>to the left of <span class="code">j</span>.</li>
          </ul>
          <li>Swap the elements at <span class="code">j</span> and <span class="code">right</span>. This puts the pivot value at its correct index.</li>
            <ul><li>We can swap these elements because it is guaranteed that the element at <span class="code">j</span> is greater than <span class="code">pivot</span></li></ul>
          <li>Return <span class="code">j</span>, the index of the pivot. It is <span class="code">pivotInd</span></li>
        </ol>
      <li>
        Call quicksort on the left unsorted subarray, passing the <span class="code">arr</span>, <span class="code">left</span>, and <span class="code">pivotInd-1</span> 
        as the <span class="code">arr</span>, <span class="code">left</span>, and <span class="code">right</span> parameters respectively.
      </li>
      <li>
        Call quicksort on the right unsorted subarray, passing the <span class="code">arr</span>, <span class="code">pivotInd+1</span>, and <span class="code">right</span> 
        as the <span class="code">arr</span>, <span class="code">left</span>, and <span class="code">right</span> parameters respectively.
      </li>
      <ul>
        <li><span class="code">pivot</span> has been sorted into its correct index so it is not an inclusive bounding index.</li>
      </ul>
    </ol>
  </p>
`

  }
  else if (chosen === 'Merge') {
    mergeTypeButton.style.display = 'inline';
    sort.innerHTML = 'Merge Sort';
    tc.innerHTML = 'O(nlog(n))';
    sc.innerHTML = 'O(n)';
    const mergeIntro = `
    <p>
    Merge sort splits the original array into subarrays, sorts the subarrays, and then merges the sorted subarrays to sort them. 
    There are two approaches to implementing a merge sort: bottom up (not recursive) and top down (recursive).
    </p>
    <p>
    Both methods use the helper function <span class="code">mergeSublists</span>, which takes an array <span class="code">arr</span>, 
    a left starting index <span class="code">left</span>, a right starting index <span class="code">right</span>, 
    the rightmost bound of the subarray <span class="code">end</span>, and a work array <span class="code">work</span>
      <ol>
        <li>
          To merge the sublists, iterate through <span class="code">work</span> and add the smaller of the elements
          at index <span class="code">left</span> or <span class="code">right</span> from <span class="code">arr</span>.
        </li>
        <li>
          Use another variable <span class="code">j</span> to keep track of the right subarray. Once <span class="code">left==right</span>
          or <span class="code">right==end</span>, you can just copy over the rest of the other subarray which hadn't been fully added to the work array.
        </li>
        <li>Copy the contents of <span class="code">work</span> into <span class="code">arr</span></li>
      </ol>
    </p>
    `
    if (mergeBottomUp) {
      method.innerHTML = mergeIntro + `
      <h2> Bottom Up </h2>
      <p>
        Loop <span class="code">width</span> from 1 to array length <span class="code">n</span>, doubling the width for each loop.
        <ul>
          <li>Loop <span class="code">i</span> from 0 to <span class="code">n</span>, 
          incrementing <span class="code">i</span> by <span class="code">width*2</span> each loop.</li>
          <ul>
            <li>The left subarray begins at index <span class="code">i</span>.</li>
            <li>The right subarray begins at index <span class="code">i+width</span>.</li>
            <li>The end of the right subarray is at index <span class="code">i+(2*width).</span></li> 
            <li>Pass these values into <span class="code">mergeSublists</span>.</li>
          </ul>
        </ul>
      </p>
      `
    } else {
      method.innerHTML = mergeIntro + `
      <h2>Top Down</h2>
      <p>
        Let the following function be called <span class="code">mergeTopDown</span> that takes an array <span class="code">arr</span>,
        a left bounding index <span class="code">start</span>, a right bounding index <span class="code">end</span>, and a work array <span class="code">work</span>.
        <ol>
          <li>
            If the subarray bounded by <span class="code">start</span> and <span class="code">end</span> has a length of 2 or more,
            let <span class="code">mid</span> be equal to <span class="code">end - start - 1</span>.
          </li>
          <li>
            Recursively call <span class="code">mergeTopDown</span>, passing in <span class="code">arr</span>, <span class="code">start</span>, 
            <span class="code">mid</span>, and <span class="code">work</span>, to sort the left subarray.
          </li>
            <ul><li>After this call, copy the contents of <span class="code">work</span></li> into <span class="code">arr</span></ul>
          <li>
            Recursively call <span class="code">mergeTopDown</span>, passing in <span class="code">arr</span>, <span class="code">mid</span>, 
            <span class="code">end</span>, and <span class="code">work</span>, to sort the right subarray.
          </li>
            <ul><li>After this call, copy the contents of <span class="code">work</span></li> into <span class="code">arr</span></ul>
          <li>
            Call <span class="code">mergeSublists</span> to merge the subarrays, passing <span class="code">arr</span>, <span class="code">start</span>,
            <span class="code">mid</span>, <span class="code">end</span>, and <span class="code">work</span> as parameters.
          </li>
        </ol>
      </p>
      `
    }
  }
  else if (chosen === 'Heap') {
    sort.innerHTML = 'Heap Sort';
    tc.innerHTML = 'O(nlog(n))';
    sc.innerHTML = 'O(n)';
    method.innerHTML = `
    <p>
      Heap sort utilizes recursion and the heap data structure to sort elements. <br>
      A heap is a complete binary tree where the children of a node are both greater (min-heap) or less (max-heap) than the node's value. 
      For this explanation, consider the max-heap.<br> <br  >
      Heapify the array, remove the greatest element (the root element) from the heap from the heap, heapify the reduced array, and repeat until the heap is empty.
    </p>
    <p>
      For the following, consider an array of length <span class="code">n</span>.
    <ol>
      <li>
        Build the heap by iterating <span class="code">i</span> backwards from <span class="code">(n/2) + 1</span> until 0.
        Call the helper function <span class="code">heapify</span> each iteration, passing the array, array length, and <span class="code">i</span>
        as the parameters <span class="code">arr</span>, the heap size <span class="code">n</span>, and the root index <span class="code">i</span> respectively.
      </li>
        <ul>
          <li>
            The index of the root node of the heap is <span class="code">i</span>.
            The index of the left node of the root is <span class="code">2*i+1</span>.
            The index of the right node of the root is <span class="code">2*i+2</span>.
          </li>
          <li>
            If the root node value is less than either its left or right node, then swap their values and heapify the swapped child,
            passing the swapped child's index as <span class="code">i</span>. 
          </li>
        </ul>
      <li>
        Iterate <span class="code">i</span> from the <span class="code">n</span>-1 to 0. For each iteration, 
        swap the values at index <span class="code">0</span> and <span class="code">i</span> 
        and then heapify the array with heap size <span class="code">i</span>.
      </li>
        <ul><li>After heapifying, the greatest value in the heap will always be at index <span class="code">0</span></li></ul>
    </ol>
  </p>
    `
  }
}

function doSort() {
  // console.log(chosen);
  sortedArr = copyArray(unsortedArr);
  if (chosen === 'Selection') {
    selectionSort(sortedArr);
  }
  else if (chosen === 'Insertion') {
    insertionSort(sortedArr);
  }
  else if (chosen === 'Quick') {
    quickSort(sortedArr, 0, visualLen - 1);
  }
  else if (chosen === 'Merge') {
    if (mergeBottomUp) {
      sortedArr = mergeSortBottomUp(sortedArr);
    } else {
      sortedArr = mergeSortTopDown(sortedArr);
    }
    // document.getElementById('sortedArr').innerHTML = "Merge Sort not implemented yet";

  }
  else if (chosen === 'Heap') {
    heapSort(sortedArr);
    // document.getElementById('sortedArr').innerHTML = "Heap Sort not implemented yet";
  }
  updateSortedArray(chosen);
  // console.log(unsortedArr);
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
function insertionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let curr = arr[i];
    let index = i;

    //  swap until you find the right index
    for (let j = i - 1; j >= 0; j--) {
      if (curr <= arr[j]) {
        arr[index] = arr[j]
        arr[j] = curr;
        index--;
      }
    }
  }
  // console.log(unsortedArr);
  // console.log(sortedArr);
  // updateSortedArray('Insertion');
}

// the pivot ultimately doesn't matter since it will be inserted at the right place anyway
// everything will be a pivot at some level regardless
// coded with help from geeksforgeeks https://www.geeksforgeeks.org/quick-sort/#
function quickSort(arr, left, right) {
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
function mergeSortBottomUp(arr) {

  let work = copyArray(arr);
  const arrLen = arr.length;

  for (let width = 1; width < arrLen; width = width * 2) {

    for (let i = 0; i < arrLen; i = i + (2 * width)) {
      const leftSubEnd = Math.min(i + width, arrLen);
      const rightSubEnd = Math.min(i + (2 * width), arrLen);

      mergeSublists(arr, i, leftSubEnd, rightSubEnd, work);
    }

    // console.log("arr: " + arr);
    // console.log("work: " + work);
    arr = copyArray(work);
  }

  return arr;
}

// uses recursion hence top down; uses the 
function mergeSortTopDown(arr) {
  let work = copyArray(arr);
  topDownSplitMerge(arr, 0, arr.length, work);
  arr = copyArray(work);
  // console.log(work);
  return arr;
}

function topDownSplitMerge(arr, begin, end, work) {
  if (end - begin > 1) {
    const middle = Math.floor((begin + end) / 2);

    topDownSplitMerge(arr, begin, middle, work);
    arr = copyArray(work);
    topDownSplitMerge(arr, middle, end, work);
    arr = copyArray(work);

    mergeSublists(arr, begin, middle, end, work);
  }

  arr = copyArray(work);
}

// merge sort helper function
function mergeSublists(arr, left, right, end, work) {
  let i = left;
  let j = right;

  for (let k = left; k < end; k++) {
    // copy next element from left sublist into work array
    if ((i < right) && ((j >= end) || (arr[i] <= arr[j]))) {
      work[k] = arr[i];
      i++;
    }
    // copy next element from right sublist into work array
    else {
      work[k] = arr[j];
      j++;
    }
  }

  // console.log("arr: " + arr);
  // console.log("work: " + work);
}

// with guidance from https://www.geeksforgeeks.org/heap-sort/#
function heapSort(arr) {
  const n = arr.length;

  // build the heap
  for (let i = Math.floor(n / 2 + 1); i >= 0; i--) {
    heapify(arr, n, i);
  }

  // extract the root, which is always the largest
  // iterate backwards b/c we are building the heap starting from the back of the array
  for (let i = n - 1; i >= 0; i--) {
    swap(arr, 0, i);
    // calls heap on the reduced heap
    heapify(arr, i, 0)
  }
}
// helper function is recursive
function heapify(arr, n, i) {
  let root = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  // if left child > root
  if (right < n && arr[left] > arr[root]) {
    root = left;
  }

  // if left child > root
  if (right < n && arr[right] > arr[root]) {
    root = right;
  }

  // swap and make the root the largest if it isn't
  if (root != i) {
    swap(arr, i, root);

    // recursively make the subheaps of the altered heap
    heapify(arr, n, root);
  }

}






// show the steps
let swap1 = -1;
let swap2 = -1;

function stepSort() {
  let stepsDiv = document.getElementById('stepsArr');
  stepsDiv.innerHTML = '';

  // console.log(chosen);
  if (chosen === 'Selection') {
    selectionSortSteps();
    // document.getElementById('sortedArr').innerHTML = "Selection Sort Steps not implemented yet";
  }
  else if (chosen === 'Insertion') {
    insertionSortSteps();
    // stepsDiv.innerHTML = "Insertion Sort Steps not implemented yet";
  }
  else if (chosen === 'Quick') {
    stepsArr = copyArray(unsortedArr);
    const vis = document.getElementById('stepsArr');
    vis.innerHTML = '';
    const sortStep = document.createElement('h3');
    sortStep.innerHTML = 'Quick Sort Steps';
    vis.appendChild(sortStep);

    quickSteps = 0.5;

    quickSortSteps(stepsArr, 0, visualLen - 1);
    // stepsDiv.innerHTML = "Quick Sort Steps not implemented yet";
  }
  else if (chosen === 'Merge') {
    mergeSteps = 1;
    stepsArr = copyArray(unsortedArr);
    if (mergeBottomUp) {
      stepsArr = mergeSortBottomUpSteps(stepsArr);
    } else {
      // sortedArr = mergeSortTopDown(sortedArr);
      stepsDiv.innerHTML = "Merge Sort (Top Down) Steps not implemented yet";
    }
    // stepsDiv.innerHTML = "Merge Sort Steps not implemented yet";
  }
  else if (chosen === 'Heap') {
    heapSortSteps();
    // stepsDiv.innerHTML = "Heap Sort Steps not implemented yet";
  }
  // updateSortedArray(chosen);
  // console.log(sortedArr);
}

function selectionSortSteps() {
  // stepsArr = unsortedArr.copyWithin();
  // console.log(unsortedArr);
  // console.log(sortedArr);
  stepsArr = copyArray(unsortedArr);

  const vis = document.getElementById('stepsArr');
  vis.innerHTML = '';
  const sortStep = document.createElement('h3');
  sortStep.innerHTML = 'Selection Sort Steps';
  vis.appendChild(sortStep);

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

    // visualizations
    const arr = document.createElement('div');
    arr.className = 'array';

    for (let j = 0; j < stepsArr.length; j++) {
      const item = document.createElement('div');
      item.className = 'item';
      item.setAttribute('id', j);
      item.innerHTML = stepsArr[j];
      if (j < i) {
        item.style.backgroundColor = '#ddd';
      }
      if (j == i) {
        item.style.backgroundColor = '#ffff44';
      }
      arr.appendChild(item);
    }
    const label = document.createElement('p');
    label.innerHTML = 'Step ' + Number(i + 1) + ': ';
    vis.appendChild(label);
    vis.appendChild(arr);
  }
}

function insertionSortSteps() {
  let arr = copyArray(unsortedArr);

  const vis = document.getElementById('stepsArr');
  vis.innerHTML = '';
  const sortStep = document.createElement('h3');
  sortStep.innerHTML = 'Insertion Sort Steps';
  vis.appendChild(sortStep);

  for (let i = 0; i < arr.length; i++) {
    let curr = arr[i];
    let index = i;
    let element = i;

    //  swap until you find the right index
    for (let j = i - 1; j >= 0; j--) {
      if (curr <= arr[j]) {
        arr[index] = arr[j]
        arr[j] = curr;
        index--;
      } else {
        element = j;
        j = -1;
      }
    }

    // visualization
    const arrDiv = document.createElement('div');
    arrDiv.className = 'array';

    for (let j = 0; j < arr.length; j++) {
      const item = document.createElement('div');
      item.className = 'item';
      item.setAttribute('id', j);
      item.innerHTML = arr[j];
      if (j <= i) {
        item.style.backgroundColor = '#ddd';
      }
      if (j == element) {
        item.style.backgroundColor = '#ffff44';
      }
      arrDiv.appendChild(item);
    }
    const label = document.createElement('p');
    label.innerHTML = 'Step ' + Number(i + 1) + ': ';
    vis.appendChild(label);
    vis.appendChild(arrDiv);
  }
}

let quickSteps = 0.5;
function quickSortSteps(arr, left, right) {
  const vis = document.getElementById('stepsArr');

  if (left < right) {
    const piv = partition(arr, left, right);

    // the pivot is already in the right place
    quickSortSteps(arr, left, piv - 1);

    const arrDiv = document.createElement('div');
    arrDiv.className = 'array';

    for (let j = 0; j < arr.length; j++) {
      const item = document.createElement('div');
      item.className = 'item';
      item.setAttribute('id', j);
      item.innerHTML = arr[j];
      if (j == piv) {
        item.style.backgroundColor = '#ffff44';
      }
      if (j < piv && j >= left) {
        item.style.backgroundColor = '#ffdddd';
      }
      if (j <= right && j >= left) {
        item.style.fontWeight = 'bold';
      }
      arrDiv.appendChild(item);
    }
    const label = document.createElement('p');
    label.innerHTML = 'Step ' + Number(quickSteps) + ': ';
    vis.appendChild(label);
    vis.appendChild(arrDiv);

    quickSteps += 0.5;

    quickSortSteps(arr, piv + 1, right)

    const arrDiv2 = document.createElement('div');
    arrDiv2.className = 'array';

    for (let j = 0; j < arr.length; j++) {
      const item = document.createElement('div');
      item.className = 'item';
      item.setAttribute('id', j);
      item.innerHTML = arr[j];
      if (j == piv) {
        item.style.backgroundColor = '#ffff44';
      }
      if (j > piv && j <= right) {
        item.style.backgroundColor = '#ddddff';
      }
      if (j >= left && j <= right) {
        item.style.fontWeight = 'bold';
      }
      arrDiv2.appendChild(item);
    }
    const label2 = document.createElement('p');
    label2.innerHTML = 'Step ' + Number(quickSteps) + ': ';
    vis.appendChild(label2);
    vis.appendChild(arrDiv2);

    quickSteps += 0.5;
  }
}

let mergeSteps = 1;
function mergeSortBottomUpSteps(arr) {
  const vis = document.getElementById('stepsArr')
  vis.innerHTML = '';
  const sortStep = document.createElement('h3');
  sortStep.innerHTML = 'Merge Sort (Bottom Up) Steps';
  vis.appendChild(sortStep);


  let work = copyArray(arr);
  const arrLen = arr.length;

  for (let width = 1; width < arrLen; width = width * 2) {

    for (let i = 0; i < arrLen; i = i + (2 * width)) {
      const leftSubEnd = Math.min(i + width, arrLen);
      const rightSubEnd = Math.min(i + (2 * width), arrLen);

      mergeSublists(arr, i, leftSubEnd, rightSubEnd, work);
      
      arr = copyArray(work);

      const arrDiv = document.createElement('div');
      arrDiv.className = 'array';

      for (let j = 0; j < arr.length; j++) {
        const item = document.createElement('div');
        item.className = 'item';
        item.setAttribute('id', j);
        item.innerHTML = arr[j];
        if (j >= i && j < rightSubEnd) {
          item.style.backgroundColor = '#ddd';
        }
        if (j == leftSubEnd-1) {
          item.style.backgroundColor = '#ffdddd';
        }
        if (j == rightSubEnd-1) {
          item.style.backgroundColor = '#ddddff';
        }
        arrDiv.appendChild(item);
      }
      const label = document.createElement('p');
      label.innerHTML = 'Step ' + Number(mergeSteps) + ': ';
      vis.appendChild(label);
      vis.appendChild(arrDiv);
      mergeSteps++;
    }
    // arr = copyArray(work);
  }

  return arr;
}




function heapSortSteps() {
  const arr = copyArray(unsortedArr);
  const n = arr.length;

  const vis = document.getElementById('stepsArr');
  vis.innerHTML = '';
  const sortStep = document.createElement('h3');
  sortStep.innerHTML = 'Heap Sort Steps';
  vis.appendChild(sortStep);

  const s1 = document.createElement('p');
  s1.innerHTML = 'Step 1: Build the heap.'
  vis.appendChild(s1);

  // build the heap
  for (let i = Math.floor(n / 2 + 1); i >= 0; i--) {
    heapify(arr, n, i);
  }

  const arrDiv = document.createElement('div');
  arrDiv.className = 'array';

  for (let j = 0; j < arr.length; j++) {
    const item = document.createElement('div');
    item.className = 'item';
    item.setAttribute('id', j);
    item.innerHTML = arr[j]
    arrDiv.appendChild(item);
  }
  vis.appendChild(arrDiv);

  // extract the root, which is always the largest
  // iterate backwards b/c we are building the heap starting from the back of the array
  let k = 2;
  for (let i = n - 1; i >= 0; i--) {
    swap(arr, 0, i);
    // calls heap on the reduced heap
    heapify(arr, i, 0)

    const arrDiv = document.createElement('div');
    arrDiv.className = 'array';

    for (let j = 0; j < arr.length; j++) {
      const item = document.createElement('div');
      item.className = 'item';
      item.setAttribute('id', j);
      item.innerHTML = arr[j];
      if (j == 0) {
        item.style.fontWeight = 'bold';
      }
      if (j > i) {
        item.style.backgroundColor = '#ddd';
      }
      if (j == i) {
        item.style.backgroundColor = '#ffff44';
      }
      arrDiv.appendChild(item);
    }
    const label = document.createElement('p');
    label.innerHTML = 'Step ' + Number(k) + ': heap size ' + i;
    vis.appendChild(label);
    vis.appendChild(arrDiv);

    k++;
  }
}


// small helper functions
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