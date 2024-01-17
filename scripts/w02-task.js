/* W02-Task - Profile Home Page */

/* Step 1 - Setup type tasks - no code required */

/* Step 2 - Variables */
const fullName = "Cassien Habyarimana";
let currentYear = "2024";
let profilePicture = "images/cassien.jpg";


/* Step 3 - Element Variables */
const nameElement = document.getElementById("name");
const foodElement = document.getElementById("food");
const yearElement = document.querySelector("#year");
const imageElement = document.createElement("image");
//const imageElement = document.querySelector("image");


/* Step 4 - Adding Content */
nameElement.innerHTML = `<strong>${fullName}</strong>`;
//yearElement.innerHTML = `<strong>${currentYear}</strong>`;
yearElement.textContent = currentYear;
imageElement.setAttribute('src', profilePicture);
imageElement.setAttribute('alt', `Profile image of ${fullName}`);


/* Step 5 - Array */
const myFavoriteFoods = ["Meat","Beans","Cassava","Avocado", "Rice"];
foodElement.innerHTML = myFavoriteFoods;
//foodElement.innerHTML += `<br> ${myFavoriteFoods}`;
//foodElement.innerHTML += myFavoriteFoods.join('<br>');
const another_food = "Ugali";
myFavoriteFoods.push(another_food);
foodElement.innerHTML += `<br>${myFavoriteFoods}`;
myFavoriteFoods.shift();
foodElement.innerHTML += `<br>${myFavoriteFoods}`;
myFavoriteFoods.pop();
foodElement.innerHTML += `<br>${myFavoriteFoods}`; 




