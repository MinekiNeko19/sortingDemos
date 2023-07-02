const unsortedArr = []
let sortedArr = [];

function randomizeArray(len,min=-500,max=500) {
  // will only fill array with ints from [-min,max]
  if (max < min) {
    const temp = max;
    max = min;
    min = temp;
  }

  unsortedArr.splice();
  for (let i = 0; i < len; i++) {
    const n = Math.floor(Math.random()*(max-min+1)) + min;
    unsortedArr.push(n);
  }
  
  console.log(unsortedArr);
  document.getElementById('originalArr').innerHTML = 'Generated Random Array: [' + unsortedArr.toString() + ']';
}

function selectionSort() {
  sortedArr = unsortedArr.copyWithin();

  document.getElementById('sortedArr').innerHTML = 'Sorted Using Selection Sort: [' + sortedArr.toString() + ']';

}
