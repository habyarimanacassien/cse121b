/* LESSON 3 - Programming Tasks */

/* Profile Object  */
let myProfile = {
    name : "Cassien Habyarimana",
    photo: "images/cassien.jpg",
    favoriteFoods: [
        "Meat",
        "Beans",
        "Cassava",
        "Avocado",
        "Rice"
    ],
    hobbies: [
        "Joging",
        "Swimming",
        "Telling stories",
        "Traveling"
    ],
    placesLived: [],
};


/* Populate Profile Object with placesLive objects */
myProfile.placesLived.push(
    {
        place: "Huye, Rwanda",
        length: "22 years"
    }
)
myProfile.placesLived.push(
    {
        place: "Ngoma, Rwanda",
        length: "5 years"
    }
)
myProfile.placesLived.push(
    {
        place: "Nairobi, Kenya",
        length: "3 years"
    }
)
myProfile.placesLived.push(
    {
        place: "Ruhango, Rwanda",
        length: "5 years"
    }
)


/* DOM Manipulation - Output */

/* Name */
document.getElementById('name').innerHTML = myProfile.name;

/* Photo with attributes */
let myPhoto = document.getElementById('photo');
myPhoto.setAttribute('src', myProfile.photo);
myPhoto.setAttribute('alt', myProfile.name);

/* Favorite Foods List*/
myProfile.favoriteFoods.forEach(food => {
    let li = document.createElement('li');
    li.textContent = food;
    document.querySelector('#favorite-foods').appendChild(li);
});

/* Hobbies List */
myProfile.hobbies.forEach(hobby => {
    let li = document.createElement('li');
    li.textContent = hobby;
    document.querySelector('#hobbies').appendChild(li);
});

/* Places Lived DataList */
myProfile.placesLived.forEach(placeLived => {
    let dt = document.createElement('dt');
    let dd = document.createElement('dd');
    dt.textContent = placeLived.place;
    dd.textContent = placeLived.length;
    document.querySelector('#places-lived').appendChild(dt);
    document.querySelector('#places-lived').appendChild(dd);
});


