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
        alert("Type your member id number...")
    } else {
        //let dataSource = `json/Interest_2023.json`;  
        let dataSource = `https://run.mocky.io/v3/1c2dcabc-0552-4e86-b01e-948b8083bb06`;
    fetch(dataSource)
    .then((response) => response.json())
    .then((data) =>{
        const search_result = document.getElementById("search_result");
            search_result.style.display = 'block';
            var hasid = existin => existin.id === idNumber;
            personalData  = data.find(hasid);
            id_nbr.innerHTML = personalData.id;
            names.innerHTML = personalData.names;

            document.getElementById("startuplab").innerHTML = "StartUp Saving:";
            document.getElementById('startupval').value = personalData.tatol_saving_begin_nov_2022;
            document.getElementById("nov2022").innerHTML = "Saving Nov-2022:";
            document.getElementById('nov2022val').value = personalData.saving_nov_2022;

            document.getElementById('dec2022').innerHTML = "Saving Dec-2022:";
            document.getElementById('dec2022val').value = personalData.saving_dec_2022;
            document.getElementById('jan2023').innerHTML = "Saving Jan-2023:";
            document.getElementById('jan2023val').value = personalData.saving_jan_2023;
            document.getElementById('feb2023').innerHTML = "Saving Feb-2023:";
            document.getElementById('feb2023val').value = personalData.saving_feb_2023;
            document.getElementById('mar2023').innerHTML = "Saving Mar-2023:";
            document.getElementById('mar2023val').value = personalData.saving_mar_2023;
            document.getElementById('apr2023').innerHTML = "Saving Apr-2023:";
            document.getElementById('apr2023val').value = personalData.saving_apr_2023;
            document.getElementById('may2023').innerHTML = "Saving May-2023:";
            document.getElementById('may2023val').value = personalData.saving_may_2023;
            document.getElementById('jun2023').innerHTML = "Saving Jun-2023:";
            document.getElementById('jun2023val').value = personalData.saving_jun_2023;
            document.getElementById('jul2023').innerHTML = "Saving Jul-2023:";
            document.getElementById('jul2023val').value = personalData.saving_jul_2023;
            document.getElementById('aug2023').innerHTML = "Saving Aug-2023:";
            document.getElementById('aug2023val').value = personalData.saving_aug_2023;
            document.getElementById('sep2023').innerHTML = "Saving Sep-2023:";
            document.getElementById('sep2023val').value = personalData.saving_sep_2023;
            document.getElementById('oct2023').innerHTML = "Saving Oct-2023:";
            document.getElementById('oct2023val').value = personalData.saving_oct_2023;
            document.getElementById('total').innerHTML = "Total saving:";
            document.getElementById('totalval').value = personalData.total;
            document.getElementById('withdraw').innerHTML = "Withdrawn amount:";
            document.getElementById('withdrawval').value = personalData.withdrawn;
            document.getElementById('balance').innerHTML = "Balance:";
            document.getElementById('balanceval').value = personalData.balance_end_oct_2023;
            document.getElementById('interest').innerHTML = "Interest received:";
            document.getElementById('interestval').value = personalData.interest_end_year;
        
    })
    .catch(() => {
        alert(`The "${idNumber}" is invalid! Please type a valid 10-digit member id number...`);
        location.reload();
    })
    }
}

search.addEventListener('click', fetchData)
