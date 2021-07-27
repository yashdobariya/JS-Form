let isEdit = false;
let id0FEditRow;
let currentTableData;
let insertRecordsIntoLocalStorage = []


let onLoad = () => {
    
    let getDataFromLocalStorage = JSON.parse(localStorage.getItem("detail"));
    let table = document.getElementById("basic-form-list")
    let header = table.createTHead();
    let tableHeadingRow = header.insertRow();
    let idHeadingCell = tableHeadingRow.insertCell(0);
    idHeadingCell.innerHTML = "ID"
    let fnHeadingCell = tableHeadingRow.insertCell(1);
    fnHeadingCell.innerHTML = "First Name"
    let lnHeadingCell = tableHeadingRow.insertCell(2);
    lnHeadingCell.innerHTML = "Last Name"
    let genHeadingCell = tableHeadingRow.insertCell(3);
    genHeadingCell.innerHTML = "Gender"
    let hobyHeadingCell = tableHeadingRow.insertCell(4);
    hobyHeadingCell.innerHTML = "Hobbie"
    let addressHeadingCell = tableHeadingRow.insertCell(5);
    addressHeadingCell.innerHTML = "Address"
    hobyHeadingCell.innerHTML = "Hobbie"
    let updateHeadingCell = tableHeadingRow.insertCell(6);
    updateHeadingCell.innerHTML = "Update"
    
    if (!getDataFromLocalStorage == "" ) {
        for (let i = 0; i < getDataFromLocalStorage.length; i++) {
            displayDataintoTable(getDataFromLocalStorage[i])
            insertRecordsIntoLocalStorage.push(getDataFromLocalStorage[i])
        }
    }
}


const onSubmit = (event) => {

    event.preventDefault();
    const getformData = readFormData();
    console.log(getformData);
    const isValidated = validateData(getformData)
    if (isValidated) {
        if (!isEdit) {
            insertData(getformData);
            console.log("inserfun call");
        } else {
            console.log(getformData,"getformData 1");
            editRecords(getformData);
            console.log("edite fun call");
        }
        event.target.reset();
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
    const formData1 = {
        firstname: document.getElementById("fname").value,
        lastname: document.getElementById("lname").value,
        gender: (document.querySelector('input[name="gender"]:checked') || {}).value,
        hobbie: hobbies.toString(),
        address: document.getElementById("address").value,
    };    
    return formData1;
}


let insertData = (getformData) => {

    let ids = JSON.parse(localStorage.getItem("detail"));
    if (ids == null) {
        ids = 0;
    } else {
        ids = JSON.parse(localStorage.getItem("detail")).length
    }
    ids += 1;
    getformData["id"] = ids;
    insertRecordsIntoLocalStorage.push(getformData);
    localStorage.setItem("detail", JSON.stringify(insertRecordsIntoLocalStorage))
    displayDataintoTable(getformData);
}


let displayDataintoTable = (fromDataOfLocalStorage) => {

    let table = document.getElementById("basic-form-list").getElementsByTagName("tbody")[0]
    console.log(fromDataOfLocalStorage," come data");
    let newRow = table.insertRow();
    let idcell = newRow.insertCell(0);
    idcell.innerHTML = fromDataOfLocalStorage.id
    let firstnamecell = newRow.insertCell(1);
    firstnamecell.innerHTML = fromDataOfLocalStorage.firstname
    let lastnamecell = newRow.insertCell(2);
    lastnamecell.innerHTML = fromDataOfLocalStorage.lastname
    let gendercell = newRow.insertCell(3);
    gendercell.innerHTML = fromDataOfLocalStorage.gender
    let hobbiecell = newRow.insertCell(4);
    hobbiecell.innerHTML = fromDataOfLocalStorage.hobbie
    let addresscell = newRow.insertCell(5);
    addresscell.innerHTML = fromDataOfLocalStorage.address
    let updatecell = newRow.insertCell(6);
    updatecell.innerHTML = `<button onClick="onEdit(this,${fromDataOfLocalStorage.id})" class="btn" href="">Edit</button><button onClick="onDelete(this,${fromDataOfLocalStorage.id})"class="btn1" href="">Delete</button>`;
}


let onEdit = (td, id) => {
    isEdit = true;
    id0FEditRow = id;
    currentTableData = td;
    console.log(id0FEditRow, "id of cell");
    let selectedRow = td.parentElement.parentElement;
    let cell = selectedRow.cells
    document.getElementById("fname").value = cell[1].innerHTML;
    if (!cell[1].innerHTML == "") {
        errorRemove("firstname")
    } 
    document.getElementById("lname").value = cell[2].innerHTML;
    if (!cell[2].innerHTML == "") {
        errorRemove("lastname")
    } 
    let gender_item = (cell[3].innerHTML)
    document.getElementById(gender_item).checked = true
    if (!cell[3].innerHTML == "") {
        errorRemove("gendervalidate")
    } 
    let hoby_item =(cell[4].innerHTML.split(','))
    for (i = 0; i < hoby_item.length; i++){
        document.getElementById(hoby_item[i]).checked = true;
    }
    if (!cell[4].innerHTML == "") {
        errorRemove("hobbie")
    } 
    document.getElementById("address").value = selectedRow.cells[5].innerHTML;
    if (!cell[5].innerHTML == "") {
        errorRemove("message")
    } 
}


const errorRemove = (id) => {
    document.getElementById(id).classList.remove("showError")
}


let editRecords = (formData) => {

    let getDataOfLocalStorage = JSON.parse(localStorage.getItem("detail"));
    let index = getDataOfLocalStorage.findIndex(matchId => matchId.id == id0FEditRow);
    const currentId = getDataOfLocalStorage[index].id;
    getDataOfLocalStorage[index] = formData;
    getDataOfLocalStorage[index]['id'] = currentId;
    console.log(insertRecordsIntoLocalStorage,"edite global data");
    localStorage.setItem("detail", JSON.stringify(getDataOfLocalStorage))
    let updateRow = currentTableData.parentNode.parentNode;
    updateRow.cells[1].innerHTML = formData.firstname;
    updateRow.cells[2].innerHTML = formData.lastname;
    updateRow.cells[3].innerHTML = formData.gender;
    updateRow.cells[4].innerHTML = formData.hobbie;
    updateRow.cells[5].innerHTML = formData.address;
    isEdit = false;
}


let onDelete = (td,id) =>{
    let dataOfLocalStorage = JSON.parse(localStorage.getItem("detail"));
    let getid = dataOfLocalStorage.findIndex(matchId => matchId.id == id);
    dataOfLocalStorage.splice(getid, 1);
    localStorage.setItem("detail", JSON.stringify(dataOfLocalStorage));
    let row = td.parentNode.parentNode;
        row.parentNode.removeChild(row);
}


const validateData = (getformData) => {
    let isValidate = true
    if (getformData.firstname === "") {
        isValidate = false
        document.getElementById("firstname").classList.add("showError");
    }
    if (getformData.lastname === "") {
        isValidate = false
        document.getElementById("lastname").classList.add("showError");
    }
    if (getformData.gender == null) {
        isValidate = false
        document.getElementById("gendervalidate").classList.add("showError");
    }
    if (getformData.hobbie === "") {
        isValidate = false
        document.getElementById("hobbie").classList.add("showError");
    }
    if (getformData.address === "") {
        isValidate = false
        document.getElementById("message").classList.add("showError");
    }
    return isValidate
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
        id = "gendervalidate"
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

