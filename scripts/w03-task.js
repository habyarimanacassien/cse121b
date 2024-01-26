/* LESSON 3 - Programming Tasks */

/* FUNCTIONS */
/* Function Definition - Add Numbers */
function add(number1, number2){
    // function body
    return number1 + number2;
}

function addNumbers(){
    let addNumber1 = Number(document.getElementById('add1').value);
    let addNumber2 = Number(document.querySelector('#add2').value);     
    return document.getElementById('sum').value = add(addNumber1, addNumber2);
}

document.getElementById('addNumbers').addEventListener('click', addNumbers);


/* Function Expression - Subtract Numbers */
const subtract = function (number1, number2) {
    // function body
    return number1 - number2;
}


const subtractNumbers = function (){
    let sNumber1 = Number(document.querySelector('#subtract1').value);
    let sNumber2 = Number(document.querySelector('#subtract2').value);
    document.querySelector('#difference').value = subtract(sNumber1, sNumber2);
}

document.querySelector('#subtractNumbers').addEventListener('click', subtractNumbers);

/* Arrow Function - Multiply Numbers */
const multiply = (number1, number2) => number1 * number2;
 
const multiplyNumbers = () => {
    let mNumber1 = Number(document.querySelector('#factor1').value);  
    let mNumber2 = Number(document.querySelector('#factor2').value);
  return document.querySelector('#product').value = multiply(mNumber1, mNumber2);
}

document.querySelector('#multiplyNumbers').addEventListener('click',multiplyNumbers);

/* Open Function Use - Divide Numbers */
const divide = (number1, number2) => number1 / number2;

const divideNumbers = () => {
    let dNumber1 = Number(document.querySelector('#dividend').value);
    let dNumber2 = Number(document.querySelector('#divisor').value);
    return document.querySelector('#quotient').value = divide(dNumber1, dNumber2);
}

document.querySelector('#divideNumbers').addEventListener('click',divideNumbers);

/* Decision Structure */

let memberCheck = document.getElementById('member');//.addEventListener('change',newTotal);
 function newTotal(){
    let subtotal = Number(document.getElementById('subtotal').value);
    if (memberCheck.checked){
        total = (subtotal * 0.8).toFixed(2)
        document.getElementById('total').innerHTML = `$${total}`;
    }else{
        total = subtotal.toFixed(2)
        document.getElementById('total').innerHTML = `$${total}`;
    }
}

//memberCheck.addEventListener('change',newTotal);

document.getElementById('getTotal').addEventListener('click', newTotal);




//let subtotal = addNumber1


/* ARRAY METHODS - Functional Programming */
/* Output Source Array */
const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
document.getElementById('array').innerHTML = numbersArray;
/* Output Odds Only Array */
const oddNumbers = numbersArray.filter(number => number % 2 == 1);
document.getElementById('odds').innerHTML = oddNumbers;
/* Output Evens Only Array */
const evenNumbers = numbersArray.filter(number => number % 2 == 0);
document.getElementById('evens').innerHTML = evenNumbers;
/* Output Sum of Org. Array */
const sumNumbers = numbersArray.reduce((accValue, currValue) => accValue + currValue,0,);
document.getElementById('sumOfArray').innerHTML = sumNumbers;
/* Output Multiplied by 2 Array */
const multiplyBy2 = numbersArray.map(number => number * 2);
document.getElementById('multiplied').innerHTML = multiplyBy2;
/* Output Sum of Multiplied by 2 Array */
const sumOfMultiplied = multiplyBy2.reduce((sum, number) => sum + number);
document.getElementById('sumOfMultiplied').innerHTML = sumOfMultiplied;