const idInput = document.getElementById("idInput");
const search = document.getElementById("search");
const search_result = document.getElementById("search_result");
const id_nbr = document.getElementById("id_nbr");
const names = document.getElementById("names");
const startup = document.getElementById("startup");
const nov2022 = document.getElementById("nov2022");
const dec2022 = document.getElementById("dec2022");
const jan2023 = document.getElementById("jan2023");
const feb2023 = document.getElementById("feb2023");
const mar2023 = document.getElementById("mar2023");
const apr2023 = document.getElementById("apr2023");
const may2023 = document.getElementById("may2023");
const jun2023 = document.getElementById("jun2023");
const jul2023 = document.getElementById("jul2023");
const aug2023 = document.getElementById("aug2023");
const sep2023 = document.getElementById("sep2023");
const oct2023 = document.getElementById("oct2023");
const total = document.getElementById("total");
const withdraw = document.getElementById("withdraw");
const balance = document.getElementById("balance");
const interest = document.getElementById("interest");


function fetchData() {
    let idNumber = Number(idInput.value);
    if (idNumber == ""){
        alert("Enter a member id number...")
    } else {
        let dataSource = `json/Interest_2023.json`;  
    fetch(dataSource)
    .then((response) => response.json())
    .then((data) =>{
        const search_result = document.getElementById("search_result");
            search_result.style.display = 'block';
            var hasid = existin => existin.id === idNumber;
            personalData  = data.find(hasid);
            id_nbr.innerHTML = personalData.id;
            names.innerHTML = personalData.names;
            startup.innerHTML = personalData.tatol_saving_begin_nov_2022;
            nov2022.innerHTML = personalData.saving_nov_2022;
            dec2022.innerHTML = personalData.saving_dec_2022;
            jan2023.innerHTML = personalData.saving_jan_2023;
            feb2023.innerHTML = personalData.saving_feb_2023;
            mar2023.innerHTML = personalData.saving_mar_2023;
            apr2023.innerHTML = personalData.saving_apr_2023;
            may2023.innerHTML = personalData.saving_may_2023;
            jun2023.innerHTML = personalData.saving_jun_2023;
            jul2023.innerHTML = personalData.saving_jul_2023;
            aug2023.innerHTML = personalData.saving_aug_2023;
            sep2023.innerHTML = personalData.saving_sep_2023;
            oct2023.innerHTML = personalData.saving_oct_2023;
            total.innerHTML = personalData.total;
            withdraw.innerHTML = personalData.withdrawn;
            balance.innerHTML = personalData.balance_end_oct_2023;
            interest.innerHTML = personalData.interest_end_year;
        
    })
    .catch(() => {
        alert('Invalid member id number...');
        location.reload();
    })
    }
}

search.addEventListener('click', fetchData)
