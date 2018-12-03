var people = [{
  id: 1,
  name: "Aegon Targaryen",
  children: [{
    id: 2,
    name: "Jaehaerys Targaryen",
    children: [{
      id: 4,
      name: "Daenerys Targaryen"
    }, {
      id: 5,
      name: "Rhaegar Targaryen",
      children: [{
        id: 6,
        name: "Aegon Targaryen"
      }]
    }]
  }, {
    id: 3,
    name: "Rhaelle Targaryen"
  }],
}];


function find(obj, output) {
  if (!obj.children) {
    return output;
  }
  for (var i = 0; i < obj.children.length; i++) {
    var node = {
      id: obj.children[i].id,
      name: obj.children[i].name,
      children: []
    };
    output[obj.children[i].id] = node;
    output[obj.id].children.push(obj.children[i].id);
    find(obj.children[i], output);
  }
  return output;
}

function normalize(arr) {
  var output = {};
  for (var i = 0; i < arr.length; i++) {
    var obj = {
      id: arr[i].id,
      name: arr[i].name,
      children: []
    };
    output[arr[i].id] = obj;
    output = find(arr[i], output);
  }
  return output;
}

console.log(normalize(people));
