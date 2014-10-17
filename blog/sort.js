/** Creates an array of numerical data. */

// global variables
var i;

// creates a dataset containing random integers
var dataset = new Array(16);
for (i = 0; i < dataset.length; i++) {
	dataset[i] = Math.floor(Math.random() * 100);
}

/**
  * Returns a segment of a given array.
	* This function is *non-destructive* (the original input is not changed).
	* `subArray(array, 0, array.length-1);` should return the original array
	* @param start : the index of the first element in the sub-array
	* @param end   : the index of the last element in the sub-array. notice this index is *inclusive*
	* @return      : a sub-array of `array` from `start` to `end`
	*/
function subarray(array, start, end) {
	if (start < 0 || end > array.length - 1 || end - start < 0) return [];
	var subarray = new Array(end - start + 1);
	for (var i = 0; i < subarray.length; i++) {
		subarray[i] = array[start + i];
	}
	return subarray;
}

/**
  * Swaps two elements in an array and returns the array.
	* This method is *destructive*, which means the input is changed.
	*/
function swap(array, index1, index2) {
	var temp = array[index1];
	array[index1] = array[index2];
	array[index2] = temp;
	return array;
}
/**
  * Copies an array and swaps two elements in that array, then returns the copy.
	* This method is *non-destructive*, which means the input is not changed.
	*/
function swapCopy(array, index1, index2) {
	var newarray = new Array(array.length);
	for (var i = 0; i < newarray.length; i++) {
		newarray[i] = array[i];
	}
	return swap(newarray, index1, index2);
}


/**
  * Finds the index of the minimum number in a given array.
	*/
function indexOfMin(array) {
	// HOW TO DO DEFAULT ARGUMENTS !!!!!
	// start = start || 0; // if `start` exists, `start = start`; if not, `start = 0`;
	// end = end || array.length - 1; // if `end` exists, `end = end`; if not, `end = array.length-1`;
	// if (start === null) {start = 0;}
	// if (end   === null) {end   = array.length-1;}
	var index = 0;
	var min = array[index];
	for (var i = 0; i < array.length; i++) {
	  if (array[i] <= min) {
			index = i;
			min = array[index];
		}
	}
	return index;
}

function selectSort(array) {
	if (array.length <= 1) return array;
	var minindex = indexOfMin(array);
	var min = array[minindex];
	swap(array, 0, minindex);
	sortedsubarray = selectSort(subarray(array, 1, array.length-1));
	for (i = 1; i < array.length; i++) {
		array[i] = sortedsubarray[i-1];
	}
  return array;
}

$(document).ready(function () {
	console.log(dataset);
	selectSort(dataset);
	console.log(dataset);
	// var array = dataset;
	// console.log(array);
	// var minindex = indexOfMin(array);
	// var min = array[minindex];
	// console.log(minindex + ' ' + min);
	// swap(dataset, 0, minindex);
	//
	// array = subarray(dataset, 1, dataset.length-1);
	// console.log(array);
	// minindex = indexOfMin(array);
	// min = array[minindex];
	// console.log(minindex + ' ' + min);
	// swap(dataset, 1, minindex + 1);
	// // console.log(array);
	// console.log(dataset);
	// // var array1 =
	// minindex = indexO
	// console.log(newarray);
	// console.log(indexOfMin(dataset) + ' ' + dataset[indexOfMin(dataset)]);
	// swap(dataset, 1, indexOfMin(subarray(dataset, 1, dataset.length-1)));
	// console.log(dataset);
	// console.log(indexOfMin(dataset) + ' ' + dataset[indexOfMin(dataset)]);
});
