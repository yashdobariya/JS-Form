let getFormDetails = JSON.parse(localStorage.getItem("detail"));
let isEdit = false;

let ids = 0;


// let onLoad = () => {
//     insertNewRecord();
// }


let insertRecordsIntoLocalStorage = []
let showLocalStorageData = []
let editLocalStorageData = []
let updateLocalStorageData = []




// console.log(getFormDetails[5].id,"nn");
// var lookup = [];
// for (var i = 0, len = getFormDetails.length; i < len; i++) {
//     lookup[getformData.id] == getFormDetails[i].id;
//     lookup.push(getformData[id])
// }

const onSubmit = (event) => {
    event.preventDefault();
    const getformData = readFormData();
    console.log(getformData, "data");
    const isValidated = validateData(getformData)
    if (isValidated) {
        if (!isEdit) {
            // displayLocalStorageData(getformData);
            insertRecord()
        } else {
            editRecords(getformData);
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
    const formData = {
        // id : id + 1,
        firstname: document.getElementById("fname").value,
        lastname: document.getElementById("lname").value,
        gender: (document.querySelector('input[name="gender"]:checked') || {}).value,
        hobbie: hobbies.toString(),
        address: document.getElementById("address").value,
    };
    // console.log(formData,"check valuse");

    return formData;
}


const displayLocalStorageData = (formData) => {
    let formdetails = [];
        // console.log(formData,"log");
        let storage = JSON.parse(localStorage.getItem("detail"));
        // console.log('test', storage);
        if (formData == null) {
            console.log("please fill data");
        } else {
            if (storage === null) {
                formdetails.push(formData)
                // console.log(formdetails);
                localStorage.setItem("detail", JSON.stringify(formdetails))
                
            } else {
                // console.log(formdetails, storage,"formdetails");
                formdetails = storage;
                formdetails.push(formData)
                // console.log(formdetails,"got");
                localStorage.setItem("detail", JSON.stringify(formdetails))
            }
            // insertNewRecord()
            // window.location.reload(true);
        }
}


let insertRecord = () => {

    let getFillupFormData = readFormData();
    ids += 1;
    getFillupFormData["id"] = ids;
    console.log(getFillupFormData,"getFillupFormData");
    insertRecordsIntoLocalStorage.push(getFillupFormData)
}
    console.log(insertRecordsIntoLocalStorage,"insertRecordsIntoLocalStorage");
// let newdata = insertRecord();
// console.log(newdata,"how");


// let insertNewRecord = () => {
    
    // if (getFormDetails == null) {
    //     console.log("please insert record");
    // } else {
    //     console.log(getFormDetails, "hshjg");
        
        // for (let i = 0; i < getFormDetails.length; i++) {
        //     let table = document.getElementById("basic-form-list").getElementsByTagName("tbody")[0]
        //     let newRow = table.insertRow(table.length);
        //     ids += 1;
        //     let idscell = newRow.insertCell(0);
        //     idscell.innerHTML = getFormDetails[i].ids
        //     let firstnamecell = newRow.insertCell(1);
        //     firstnamecell.innerHTML = getFormDetails[i].firstname
        //     let lastnamecell = newRow.insertCell(2);
        //     lastnamecell.innerHTML = getFormDetails[i].lastname
        //     let gendercell = newRow.insertCell(3);
        //     // console.log(getFormDetails[5].gender,"show");
        //     gendercell.innerHTML = getFormDetails[i].gender
        //     let hobbiecell = newRow.insertCell(4);
        //     hobbiecell.innerHTML = getFormDetails[i].hobbie
        //     let addresscell = newRow.insertCell(5);
        //     addresscell.innerHTML = getFormDetails[i].address
        //     let updatecell = newRow.insertCell(6);
        //     updatecell.innerHTML = `<button onClick="onEdit(this)" class="btn" href="">Edit</button><button onClick="onDelete(this)"class="btn1" href="">Delete</button>`;
        // }
    // }

// }



let onEdit = (td) => {
    // index = i;
    // console.log(index,"index");
    isEdit = true;
    selectedRow = td.parentElement.parentElement;
    let cell = selectedRow.cells
    document.getElementById("fname").value = cell[0].innerHTML;
    if (!cell[0].innerHTML == "") {
        errorRemove("firstname")
    } 
    document.getElementById("lname").value = cell[1].innerHTML;
    if (!cell[1].innerHTML == "") {
        errorRemove("lastname")
    } 
    let gender_item = (cell[2].innerHTML)
    // console.log(gender_item);
    document.getElementById(gender_item).checked = true
    if (!cell[2].innerHTML == "") {
        errorRemove("gendervalidate")
    } 
    let hoby_item =(cell[3].innerHTML.split(','))
    for (i = 0; i < hoby_item.length; i++){
        document.getElementById(hoby_item[i]).checked = true;
    }
    if (!cell[3].innerHTML == "") {
        errorRemove("hobbie")
    } 
    document.getElementById("address").value = selectedRow.cells[4].innerHTML;
    if (!cell[4].innerHTML == "") {
        errorRemove("message")
    } 
}


const errorRemove = (id) => {
    document.getElementById(id).classList.remove("showError")
}


let editRecords = (formData) => {
    console.log(formData,"newone");
    getFormDetails[index] = formData;
    // getFormDetails[index].firstname = formData.firstname;
    localStorage.setItem('detail', JSON.stringify(formData))
    // console.log(getFormDetails);
    // const cells= selectedRow.cells
    // cells[0].innerHTML = getFormDetails[indexValue].firstname;
    // // console.log(getformdata.firstname,"zoom");
    // cells[1].innerHTML = getFormDetails[indexValue].lastname;
    // cells[2].innerHTML = getFormDetails[indexValue].gender;
    // cells[3].innerHTML = getFormDetails[indexValue].hobbie;
    // cells[4].innerHTML = getFormDetails[indexValue].address;
    isEdit = false;
    
}


let onDelete = (td) =>{
    row = td.parentElement.parentElement;
    document.getElementById("basic-form-list").deleteRow(row.rowIndex);
    localStorage.clear()
}


const validateData = (getformData) => {
    // console.log(getformData.gender,"jshaj");
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
