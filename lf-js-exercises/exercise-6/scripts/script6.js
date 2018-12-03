var input = [[1, 2, [3, 9]], [2, 4, 5], 6];
flat = [];
function flatten(arr) {
    if (Array.isArray(arr)) {
        arr.reduce(function (acc, val, ind, src) {
            return flatten(val);
        }, []);
    } else if (!flat.includes(arr)) {
        flat.push(arr);
    }
    return flat;
}
console.log('Input: ', input);
console.log('Output: ', flatten(input));
