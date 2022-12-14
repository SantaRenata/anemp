
const addButton = document.querySelector("#addButton");
const empTable = document.querySelector("#empTable");
const empName = document.querySelector("#name");
var tbody = document.createElement("tbody");
empTable.appendChild(tbody);

const host = 'http://localhost:3000';

//blokk
(() => {
    console.log("Kívül");
    getEmployees();
})();


function getEmployees(){
    let endpoint = 'employees';
    let url = host + '/' + endpoint;
    fetch(url)
    .then( response => response.json())
    .then( result => {
        console.log(result[0].name);
        renderTable(result);
    })
    .catch(error => {
        console.log('Hiba! A lekérdezés sikertelen!');
        console.log(error);
    });    
}


//Renderelés
function renderTable(employees) {
    tbody.innerHTML = '';
    employees.forEach( employee => {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdName = document.createElement('td');
        let tdDel = document.createElement('td');
        let delBtn = makeDelButton(employee.id);
        

        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdDel);
        tdDel.appendChild(delBtn);
        tbody.appendChild(tr);
    
        tdId.textContent = employee.id;
        tdName.textContent = employee.name;        
    });
}


//Törlés
function makeDelButton(id){
    let delBtn = document.createElement('button');
    delBtn.classList.add("btn"); 
    delBtn.classList.add("btn-danger");
    delBtn.textContent = 'Törlés';
    delBtn.addEventListener('click', ()=> {
        let answer = confirm("Biztosan törlöd?");
        if (answer){
            deleteEmployee(id);
            let actualTr = delBtn.parentElement.parentElement;
            //saját maga törlése
            actualTr.parentNode.removeChild(actualTr);
        }
    });
    return delBtn;
}

function deleteEmployee(id) {
    console.log(id);
    let endpoint = 'employees';
    let url = host + '/' + endpoint + '/' + id;
    fetch(url, {
        method: 'delete'
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
    });
}


//Hozzáadás
addButton.addEventListener('click', () => {
    addEmployee();
});

function addEmployee(){
    let endpoint = 'employees';
    let url = host + '/' + endpoint;    
    let employee = {
        name: empName.value
    };
    fetch(url, {
        method: 'post',
        body: JSON.stringify(employee),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        empName.value = '';
        addEmployeeToTable(result);
    });
}

function addEmployeeToTable(employee){
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    let tdName = document.createElement('td');
    let tdButton = document.createElement('td');

    tdId.textContent = employee.id;
    tdName.textContent = employee.name;

    tr.appendChild(tdId);
    tr.appendChild(tdName);
    tr.appendChild(tdButton);
    
    let delButton = makeDelButton(employee.id);
    tdButton.appendChild(delButton);
    empTable.appendChild(tr);
}