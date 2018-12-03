var fruits = [{
    id: 1,
    name: 'Banana',
    color: 'Yellow'
  },
  {
    id: 2,
    name: 'Apple',
    color: 'Red'
  },
  {
    id: 3,
    name: 'Orange',
    color: 'Orange'
  },

];

function searchByName(arr, searchName) {
  var result;
  arr.forEach(function (val) {
    if (val.name == searchName) {
      result = val;
    }
  });
  return result;
}

function searchByKey(arr, searchKey, searchItem) {
  var result;
  arr.forEach(function (val) {
    if (val[searchKey] == searchItem) {
      result = val;
    }
  });
  return result;
}

console.log('Searched by Name: ', searchByName(fruits, 'Apple'));

console.log('Searched by Key: ', searchByKey(fruits, 'color', 'Orange'));
