const counteryInput = document.getElementById("counteryInput");
const search = document.getElementById("search");
const search_result = document.getElementById("search_result");
const flag = document.getElementById("flag");
const name1 = document.getElementById("name");
const capital = document.getElementById("capital");
const continent = document.getElementById("continent");
const population = document.getElementById("population");
const currency = document.getElementById("currency");
const currencyShort = document.getElementById("currencyShort");
const language = document.getElementById("language");

function fetchData() {
    let countryName = counteryInput.value;
    if (countryName == ""){
        alert("Enter a country name...")
    } else {
        let finalURL = `https://restcountries.com/v3.1/name/${countryName.toLowerCase()}?fullText=true`;  
    fetch(finalURL)
    .then((response) => response.json())
    .then((data) =>{
        const search_result = document.getElementById("search_result");
        search_result.style.display = 'block';
        countryData  = data[0];
        flag.src = countryData.flags.svg;
        name1.innerHTML = countryData.name.official;
        capital.innerHTML = countryData.capital;
        continent.innerHTML = countryData.continents;
        population.innerHTML = countryData.population;
        currency.innerHTML = countryData.currencies[Object.keys(countryData.currencies)].name;
        currencyShort.innerHTML = countryData.currencies[Object.keys(countryData.currencies)].symbol;
        language.innerHTML = Object.values(countryData.languages).toString().split(',').join(',');
    })
    .catch(() => {
        alert('Invalid country name...');
        location.reload();
    })
    }
}

search.addEventListener('click', fetchData)
