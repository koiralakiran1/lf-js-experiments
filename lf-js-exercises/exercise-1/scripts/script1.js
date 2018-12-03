;(function render(number) {
    firstString = '';
    for(i=number;i>0;i--) {
        firstString += '*';
    }

    for(i=number;i>0;i--) {
        console.log(firstString);
        firstString = firstString.substring(0, i-1);
    }
})(5);
