// Private:
function getMax(array) {
  var result = array[0];
  for(var i = 1; i < array.length; i++) {
    if(result < array[i]) {
      result = array[i];
    }
  }

  return result;
}

function getMin(array) {
  var result = array[0];
  for(var i = 1; i < array.length; i++) {
    if(result > array[i]) {
      result = array[i];
    }
  }

  return result;
}

function getPrecentage(val1, val2) {
  return val1/val2 * 100;
}
