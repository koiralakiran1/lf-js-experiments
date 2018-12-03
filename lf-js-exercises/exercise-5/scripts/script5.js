var arr = ['john', 'mary', 'john', 'sam', 'sam', 'sam', 'john'];

var answer = arr.reduce(function(obj, val, index, src){

  if(!obj[val]){ //!(Object.values(obj).includes(val)) won't work. Why??
    //console.log('not in obj');
    obj[val] = 1;
  } else {
    //console.log('in obj');
    obj[val]++;
  }
  console.log(obj);
  return obj;
},{});
console.log('Input: ', arr);
console.log('Output: ', answer);
