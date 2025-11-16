function checkLength(string, maxLength){
return string.length <= length;
}

function checkPalindrom(string){
let newString=string.replaceAll(' ','').toLowerCase();
let stringPalinndrom='';
for(let i=newString.length-1;i>=0;i--){
stringPalinndrom+=newString.at(i);
}
if (stringPalinndrom===newString){

    return true;
}
return false;
}

function getNumber(string){
let newString='';
for(let i=0;i<string.length;i++){
let  numbers=parseInt(string[i],10)
if(!Number.isNaN(numbers)&&numbers>=0&&numbers<=9){
newString+=numbers;
}

}
if(newString===''){

    return NaN;
}
return parseInt(newString, 10);
}