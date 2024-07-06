let password="";
let checkCount=0;


const inputSlider=document.querySelector(".slider");

let passwordLength=6;
const lengthDisplay=document.querySelector("[data-lenghtNumber]");

handleslider();

function handleslider(){
  inputSlider.value=passwordLength;
  
  
  lengthDisplay.innerText=passwordLength;
}

const indicator=document.querySelector("[data-indicator]");
setIndicator("#ccc");
function setIndicator(color){
  indicator.style.backgroundColor=color;
}

function getRndInteger(min,max){
  return Math.floor(Math.random()*(max-min))+min;
  
}
function generateRandomNumber(){
  return getRndInteger(0,9);
}
function generateRandomLowercase(){
  return String.fromCharCode(getRndInteger(97,123));
}
function generateRandomUppercase(){
  return String.fromCharCode(getRndInteger(65,91));
}
 const Symbolsnum="@%!#$";
function generateRandomSymbol(){
  
 

  return Symbolsnum.charAt(getRndInteger(0,Symbolsnum.length));
}
const upperCase=document.querySelector("#uppercase");
const lowerCase=document.querySelector("#lowercase");
const numerical=document.querySelector("#numerical");
const symbol=document.querySelector("#symbols");


function calcstrength(){
  let hasUpper=false;
  let hasLower=false;
  let hasNumerical=false;
  let hasSymbol=false;

  if(upperCase.checked){
    hasUpper=true;
  }
  if(lowerCase.checked){
    hasLower=true;
  }
  if(numerical.checked){
    hasNumerical=true;
  }
  if(symbol.checked){
    hasSymbol=true;
  }
  if(hasUpper && hasLower &&(hasNumerical || hasSymbol) && passwordLength>=7){
    setIndicator("#0f0");
  }
  else if((hasLower|| hasUpper) && (hasNumerical || hasSymbol) && passwordLength>=5){
    setIndicator("#ff0");
  }
  else{
    setIndicator("#f00");
  }
}


const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyMsg=document.querySelector("[data-copymssg]");

async function copyContent(){
  try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText="copied";
  }
  catch(e){
    copyMsg.innerText="failed";
    
  }
  copyMsg.classList.add("active");
  setTimeout(()=>{
    copyMsg.classList.remove("active");
    
    
  },2000);
}
const inSlider=document.querySelector("[data-lengthSlider]");
const copyBtn=document.querySelector("[copy-button]");
inSlider.addEventListener("input",(e)=>{
  passwordLength=e.target.value;
  handleslider();
});

copyBtn.addEventListener('click',()=>{
  if(passwordDisplay.value){
    copyContent();
  }
  
});

const allCheckBox=document.querySelectorAll("input[type='checkbox']");

allCheckBox.forEach((checkbox)=>{
  checkbox.addEventListener("change",handleCheckBoxChange);
  
  
});
function handleCheckBoxChange(){
  checkCount=0;
  allCheckBox.forEach((checkbox)=>{
    if(checkbox.checked){
      checkCount++;
    }
  });

  if(passwordLength<checkCount){
    passwordLength=checkCount;
    handleslider();
  }
}


const generateBtn=document.querySelector(".generatepassword");

generateBtn.addEventListener('click',()=>{
  if(checkCount<=0){
    alert("select atleast one checkbox");
    return;
  }
  if(passwordLength<checkCount){
    passwordLength=checkCount;
    handleslider();
  }

  password="";
  let funArr=[];
  if(upperCase.checked){
    funArr.push(generateRandomUppercase);
  }
  if(lowerCase.checked){
    funArr.push(generateRandomLowercase);
  }
  if(symbol.checked){
    funArr.push(generateRandomSymbol);
  }
  if(numerical.checked){
    funArr.push(generateRandomNumber);
  }
  


  for(let i=0;i<funArr.length;i++){
    password+=funArr[i]();
  }
  for(let i=0;i<passwordLength-funArr.length;i++){
    let randomIndex=getRndInteger(0,funArr.length);
    password+=funArr[randomIndex]();
    
  }
  password=shufflePassword(Array.from(password));
  passwordDisplay.value=password;
  calcstrength();
  

  
});
function shufflePassword(a){
  for(let i=a.length-1;i>=0;i--){
    let randomIndex=Math.floor(Math.random()*(i+1));
    let temp=a[i];
    a[i]=a[randomIndex];
    a[randomIndex]=temp;
    
  }
  let str="";
  for(let i=0;i<a.length;i++){
    str+=a[i];
  }
  return str;
}




