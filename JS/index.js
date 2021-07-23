let getformData;
let isEdit = false;

const onSubmit = (event) => {
    event.preventDefault();
    console.log(getformData,"grt")
    if (document.getElementById("fname").value === "" || document.getElementById("lname").value === "" || document.querySelector('input[type="radio"]:checked') === null || document.getElementById("address").value === '' ||
    ((!document.getElementById("cricket").checked) && (!document.getElementById("music").checked) && (!document.getElementById("gyming").checked)))
    {
        validateData(event);
    } else {
        getformData = readFormData();
        if (!isEdit) {
            insertNewRecord(getformData);
        } else {
            editRecords(getformData);
        }
        event.target.reset()
    }
}

const resetForm = () => {
    document.getElementById("basic-form").reset();
}

const readFormData = () => {
    let hoby = document.getElementsByClassName('check');
    var hobbies = []
    for (let i = 0; i < hoby.length; i++){
        if (document.getElementById(hoby[i].id).checked) {
            hobbies.push(document.getElementById(hoby[i].id).value)
        }
    }
    const formData = {
        firstname: document.getElementById("fname").value,
        lastname: document.getElementById("lname").value,
        gender: document.querySelector('input[type="radio"]:checked').value,
        hobbie: hobbies.toString(),
        address: document.getElementById("address").value,
    };
    return formData;
}

let insertNewRecord = (data) => {
    let table = document.getElementById("basic-form-list").getElementsByTagName("tbody")[0]
    let newRow = table.insertRow(table.length);
    let firstnamecell = newRow.insertCell(0);
        firstnamecell.innerHTML = data.firstname;
    let lastnamecell = newRow.insertCell(1);
        lastnamecell.innerHTML = data.lastname;
    let gendercell = newRow.insertCell(2);
        gendercell.innerHTML = data.gender;
    let hobbiecell = newRow.insertCell(3);
        hobbiecell.innerHTML = data.hobbie;
    let addresscell = newRow.insertCell(4);
        addresscell.innerHTML = data.address;
    let updatecell = newRow.insertCell(5);
        updatecell.innerHTML = `<button onClick="onEdit(this)" class="btn" href="">Edit</button><button onClick="onDelete(this)"class="btn1" href="">Delete</button>`;
}

let onEdit = (td) => {
    isEdit = true;
    selectedRow = td.parentElement.parentElement;
    let cell = selectedRow.cells
    document.getElementById("fname").value = cell[0].innerHTML;
    document.getElementById("lname").value = cell[1].innerHTML;
    let gender_item = (cell[2].innerHTML)
    document.getElementById(gender_item).checked = true
    let hoby_item =(cell[3].innerHTML.split(','))
    for (i = 0; i < hoby_item.length; i++){
        document.getElementById(hoby_item[i]).checked = true;
    }
    document.getElementById("address").value = selectedRow.cells[4].innerHTML;
}

let editRecords = (getformdata) => {
    const cells= selectedRow.cells
    cells[0].innerHTML = getformdata.firstname;
    cells[1].innerHTML = getformdata.lastname;
    cells[2].innerHTML = getformdata.gender;
    cells[3].innerHTML = getformdata.hobbie;
    cells[4].innerHTML = getformdata.address;
    isEdit = false;
}

let onDelete = (td) =>{
    row = td.parentElement.parentElement;
    document.getElementById("basic-form-list").deleteRow(row.rowIndex);
}


const validateData = (event) => {
    event.preventDefault();
    if (document.getElementById("fname").value == "") {
        document.getElementById("firstname").classList.add("showError");
    }
    if (document.getElementById("lname").value == "") {
        document.getElementById("lastname").classList.add("showError");
    }
    if (document.querySelector('input[type="radio"]:checked') == null) {
        document.getElementById("gender").classList.add("showError");
    }
    if ((!document.getElementById("cricket").checked) && (!document.getElementById("music").checked) && (!document.getElementById("gyming").checked)) {
        document.getElementById("hobbie").classList.add("showError");
    }
    if (document.getElementById("address").value == "") {
        document.getElementById("message").classList.add("showError");
    }
}

const changeInput = (event) => {
    let inputElement = event.target;
    let id= ''
    if (inputElement.name === 'fname') {
        id = 'firstname'
    }
    else if (inputElement.name === 'lname') {
        id= 'lastname'
    }
    else if (inputElement.name === 'gender') {
        id = "gender"
    }
    else if (inputElement.name === 'hoby') {
        id= 'hobbie'
    }
    else  if (inputElement.name === 'address') {
    id = "message"
    }
    if (inputElement.value != "") {
        document.getElementById(id).classList.remove("showError");
    }
}
