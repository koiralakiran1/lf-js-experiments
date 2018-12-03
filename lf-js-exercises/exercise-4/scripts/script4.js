var numbers = [1,2,3,4];
var result = [];
function transform(collection, transFunc) {
  collection.forEach(function(element) {
    result.push(transFunc(element));
  });
}
var output = transform(numbers,function(num) {
  return num * 2;
});
console.log('Input: ', numbers);
console.log('Output: ', result);
