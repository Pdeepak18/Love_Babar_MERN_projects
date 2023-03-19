const val=document.querySelector("#value");



const increment = () =>{
let count=parseInt(val.innerText);
count=count+1;
val.innerText=count;
}
const decrement = () =>{
    let count=parseInt(val.innerText);
count=count-1;
val.innerText=count;
}