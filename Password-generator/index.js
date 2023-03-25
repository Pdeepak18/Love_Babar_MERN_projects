const inputSlider =document.querySelector("[data-lengthSlider]")
const lengthDisplay =document.querySelector("[data-LengthNo]")
const passwordDisplay = document.querySelector("[data-passwordDisplay]")
const lengthnoDisplay = document.querySelector("[data-LengthNo]")
const copyMssg =document.querySelector("[data-copyMssg]")
const copyBtn =document.querySelector("[data-copy]")
const indicator =document.querySelector("[data-indicator]")
const generateBtn = document.querySelector(".generatePassword")
const allcheckBox = document.querySelectorAll("input[type=checkbox]")
const uppercaseCheck = document.querySelector("#uppercase")
const lowercaseCheck = document.querySelector("#lowercase")
const numbersCheck = document.querySelector("#number")
const symbolsCheck = document.querySelector("#symbol")
const symbols = "`~!@#$%^&*()_+-=[]{}:';,<.>/?|";

let password=""
let passwordLength = 10
let checkCount=1
// set strength circle color to gray
 setIndicator("#ccc")

// function list
// copyContent()
// handleSliders()
// generatePassword()
// setIndicator() =>circle ka colour change karta hai  (red,green,yellow ,default gray)
// getRandomInteger(min,max)
// getRandomUpperCase()
// getRandomLowerCase()
// getRandomSymbol()
// getRandomNumber()
// calcStrength()
handleSliders()

// handle Slider to set Ui accoding to password Length
function handleSliders(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
    const min =inputSlider.min;
    const max =inputSlider.max;
    inputSlider.style.backgroundSize=((passwordLength -min)*100/(max-min)) + "% 100%"

}

// input ke hisab se indicator dena
function setIndicator(color){
    indicator.style.background = color;
    console.log(color);
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

// 0 2
function getRandomInteger(min,max){
    return Math.floor(Math.random()*[max-min]) + min
}

function getRandomNumber(){
    return getRandomInteger(0,9)
}

//a->97 and z->123
function getRandomLowerCase(){
    return String.fromCharCode(getRandomInteger(97,122))
}
// A->65 and Z->91
function getRandomUpperCase(){
    return String.fromCharCode(getRandomInteger(65,90))
}

function getRandomSymbol(){
    let randNo=getRandomInteger(0,symbols.length)
    return symbols.charAt(randNo)
}

function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNumber=false;
    let hasSymbols=false;
    if(uppercaseCheck.checked) hasUpper=true
    if(lowercaseCheck.checked) hasLower=true
    if(numbersCheck.checked) hasNumber=true
    if(symbolsCheck.checked) hasSymbols=true

    if(hasUpper && hasLower && (hasNumber || hasSymbols) && passwordLength>=8){
        setIndicator("#0f0")
    }else if((hasLower || hasUpper) && (hasNumber || hasSymbols) && passwordLength >=6){
        setIndicator("#ff0")
    }else{
        setIndicator("#f00")
    }
        
}


async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        console.log(passwordDisplay.value); 
        copyMssg.innerText="Copied"

    }catch(e){
        copyMssg.innerText="Failed"
    }
//    copy vala css add karna active naam se
    copyMssg.classList.add("active")
    setTimeout(() => {
        copyMssg.classList.remove("active")
    },2000)

}

inputSlider.addEventListener('input',(e) => {
    passwordLength = e.target.value
    handleSliders()
})

copyBtn.addEventListener("click",() => {
    if(passwordDisplay.value){
        copyContent();
    }
})


function handleCheckboxChange(){
    checkCount=0;
    allcheckBox.forEach((checkbox) => {
        if(checkbox.checked){
            checkCount++;
        }
    })

    // special condition
    if(passwordLength < checkCount){
        passwordLength = checkCount
        handleSliders();
    }
}

allcheckBox.forEach( (checkbox) => {
    // console.log("hii");
    checkbox.addEventListener("change" ,handleCheckboxChange)
})

function shufflePassword(arr){
    // Fisher–Yates shuffle in Javascript
    for (let i = (arr.length - 1); i > 0; i -= 1) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
      }
      let str =""
      arr.forEach((el) => (str +=el))
      return str;
}

generateBtn.addEventListener("click", () => {
    // none of the checkbox is checked
    if(checkCount ==0){alert("please check any checkbox"); return}

    if(passwordLength <checkCount){
        passwordLength = checkCount
        handleSliders();
    }
console.log("startt");
    // remove old password
    password=""

    // lets put the stuff mention by checkboxes

    let func_array =[]
    if(uppercaseCheck.checked){
        func_array.push(getRandomUpperCase)
    }
    if(lowercaseCheck.checked){
        func_array.push(getRandomLowerCase)
    }
    if(numbersCheck.checked){
        func_array.push(getRandomNumber)
    }
    if(symbolsCheck.checked){
        func_array.push(getRandomSymbol)
    }

    // compulory 
    for(let i=0;i<func_array.length;i++){
        password+=func_array[i]()
    }
    console.log("compulory done");

    // remaining addition
    for(let i=0;i<passwordLength-func_array.length;i++){
        let randomIndex=getRandomInteger(0,func_array.length)
        password+=func_array[randomIndex]()
    }
    console.log("remianing done");

    // shuffling
    password = shufflePassword(Array.from(password))
    console.log("suffling done");

    // display the password
    passwordDisplay.value=password
    console.log("display done");

    // calculate the strengh
    calcStrength();
    console.log("calculate strength done");




})

// modal
const modal=document.querySelector(".modal")
const overlay=document.querySelector(".overlay")

// Modal open
const openModal = () =>{
    console.log("Modal is Open");
    modal.classList.add("active_modal")
    overlay.classList.add("overlayactive")
}

// Modal close
const closeModal = () =>{
    modal.classList.remove("active_modal")
    overlay.classList.remove("overlayactive")
}

