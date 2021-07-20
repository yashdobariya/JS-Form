let getformData;
let isEdit = false;

const onSubmit = (event) => {
    event.preventDefault();
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
    const formData = {};
    formData["firstname"] = document.getElementById("fname").value;
    formData["lastname"] = document.getElementById("lname").value;
    formData["gender"] = document.querySelector('input[type="radio"]:checked').value;
    let hoby = document.getElementsByClassName('check');
    var hobbies = []
    for (let i = 0; i < hoby.length; i++){
        if (document.getElementById(hoby[i].id).checked) {
            hobbies.push(document.getElementById(hoby[i].id).value)
        }
    }
    formData["hobbie"] = hobbies.toString();
    formData["address"] = document.getElementById("address").value;
    return formData;
}

let insertNewRecord = (data) => {
    let table = document.getElementById("basic-form-list").getElementsByTagName("tbody")[0]
    let newRow = table.insertRow(table.length);
    firstnamecell = newRow.insertCell(0);
    firstnamecell.innerHTML = data.firstname;
    lastnamecell = newRow.insertCell(1);
    lastnamecell.innerHTML = data.lastname;
    gendercell = newRow.insertCell(2);
    gendercell.innerHTML = data.gender;
    hobbiecell = newRow.insertCell(3);
    hobbiecell.innerHTML = data.hobbie;
    addresscell = newRow.insertCell(4);
    addresscell.innerHTML = data.address;
    updatecell = newRow.insertCell(5);
    updatecell.innerHTML = `<button onClick="onEdit(this)" class="btn" href="">Edit</button><button onClick="onDelete(this)"class="btn1" href="">Delete</button>`;
}

let onEdit = (td) => {
    isEdit = true;
    selectedRow = td.parentElement.parentElement;
    console.log(getformData, "fomdata");
    document.getElementById("fname").value = selectedRow.cells[0].innerHTML;
    document.getElementById("lname").value = selectedRow.cells[1].innerHTML;
    let gender_item = (selectedRow.cells[2].innerHTML)
    document.getElementById(gender_item).checked = true
    let hoby_item =(selectedRow.cells[3].innerHTML.split(','))
    for (i = 0; i < hoby_item.length; i++){
            document.getElementById(hoby_item[i]).checked = true;
                    }
    document.getElementById("address").value = selectedRow.cells[4].innerHTML;
}

let editRecords = (getformdata) => {
    selectedRow.cells[0].innerHTML = getformdata.firstname;
    selectedRow.cells[1].innerHTML = getformdata.lastname;
    selectedRow.cells[2].innerHTML = getformdata.gender;
    selectedRow.cells[3].innerHTML = getformdata.hobbie;
    selectedRow.cells[4].innerHTML = getformdata.address;
    isEdit = false;
}

let onDelete = (td) =>{
    row = td.parentElement.parentElement;
    document.getElementById("basic-form-list").deleteRow(row.rowIndex);
}

const validateData = (event) => {
    event.preventDefault();
    if (document.getElementById("fname").value == "") {
        document.getElementById("firstname").innerHTML = "Please fill the field";
    }
    if (document.getElementById("lname").value == "") {
        document.getElementById("lastname").innerHTML = "Please fill the field";
    }
    if (document.querySelector('input[type="radio"]:checked') == null) {
        document.getElementById("gender").innerHTML = "Please fill the field";
    }
    if ((!document.getElementById("cricket").checked) && (!document.getElementById("music").checked) && (!document.getElementById("gyming").checked)) {
        document.getElementById("hobbie").innerHTML = "Please fill the field";
    }
    if (document.getElementById("address").value == "") {
        document.getElementById("message").innerHTML = "Please fill the field";
    }
}

const changeInput = (event) => {
    let inputElement = event.target;

    if (inputElement.name === 'fname') {
        if (inputElement.value != "") {
            document.getElementById("firstname").innerHTML = "";
        }
    }
    if (inputElement.name === 'lname') {
        if (inputElement.value != "") {
            document.getElementById("lastname").innerHTML = "";
        }
    }
    if (inputElement.name === 'gender') {
        if (inputElement.value != "") {
            document.getElementById("gender").innerHTML = "";
        }
    }
    if (inputElement.name === 'hoby') {
        if (inputElement.value != "") {
            document.getElementById("hobbie").innerHTML = "";
        }
    }
    if (inputElement.name === 'address') {
        if (inputElement.value != "") {
            document.getElementById("message").innerHTML = "";
        }
    }
}
