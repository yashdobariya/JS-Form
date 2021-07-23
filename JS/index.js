// let getFormDetails = JSON.parse(localStorage.getItem("detail"));
let isEdit = false;

// let ids = 0;
let insertRecordsIntoLocalStorage = []



// let displayLocalStorageData = () => {
  
//     console.log(getDataFromLocalStorage, "fromDataOfLocalStorage d")
//     return getDataFromLocalStorage;
// }

let onLoad = () => {
    let getDataFromLocalStorage = JSON.parse(localStorage.getItem("detail"));
    if (!getDataFromLocalStorage == "") {
        console.log(getDataFromLocalStorage, "new data");
        for (let i = 0; i < getDataFromLocalStorage.length; i++) {
            displayDataintoTable(getDataFromLocalStorage[i])
            console.log(getDataFromLocalStorage, "thired");
            insertRecordsIntoLocalStorage.push(getDataFromLocalStorage[i])
        }
    }
}


// let showLocalStorageData = []
// let editLocalStorageData = []
// let updateLocalStorageData = []


// console.log(getFormDetails[5].id,"nn");
// var lookup = [];
// for (var i = 0, len = getFormDetails.length; i < len; i++) {
//     lookup[getformData.id] == getFormDetails[i].id;
//     lookup.push(getformData[id])
// }

// debugger;

const onSubmit = (event) => {
    event.preventDefault();
    const getformData = readFormData();
    console.log(getformData);
    const isValidated = validateData(getformData)
    if (isValidated) {
        if (!isEdit) {
            insertData(getformData);
        } else {
            console.log(getformData,"getformData 1");
            editRecords(getformData);
        }
        event.target.reset();
        window.location.reload(true);
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
    // consolelog(formData1)
    // console.log(formData,"check valuse");
    
    return formData1;
}



let insertData = (getformData) => {
    // let getFillupFormData = readFormData();
    console.log(getformData, "old fromdata")
    // updateGetFillupFormData = getFillupFormData
    let ids = JSON.parse(localStorage.getItem("detail"));
    if (ids == null) {
        ids = 0;
    } else {
        ids = JSON.parse(localStorage.getItem("detail")).length
    }
    // console.log(localID,"local_id");
    ids += 1;
    getformData["id"] = ids;
    console.log(insertRecordsIntoLocalStorage,'first');
    insertRecordsIntoLocalStorage.push(getformData);
    console.log(insertRecordsIntoLocalStorage,'secoond');
    localStorage.setItem("detail", JSON.stringify(insertRecordsIntoLocalStorage))
    // storeRecordsIntoLocalStorage();
}

// console.log(insertRecordsIntoLocalStorage, "insertRecordsIntoLocalStorage");


let displayDataintoTable = (fromDataOfLocalStorage) => {
    // console.log(fromDataOfLocalStorage[0],"wow i get data");
        let table = document.getElementById("basic-form-list").getElementsByTagName("tbody")[0]
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


let id0FEditRow;

let onEdit = (td, id) => {
    isEdit = true;
    id0FEditRow = id;
    console.log(id0FEditRow, "id of cell");
    selectedRow = td.parentElement.parentElement;
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
    localStorage.setItem("detail", JSON.stringify(getDataOfLocalStorage))
    isEdit = false;
    
}


let onDelete = (td,id) =>{
    row = td.parentElement.parentElement;
    document.getElementById("basic-form-list").deleteRow(row.rowIndex);
    let dataOfLocal = JSON.parse(localStorage.getItem("detail"));
    let newid = id - 1;
    dataOfLocal.splice(newid,  1);
    // delete dataOfLocal[newid]; 
    localStorage.setItem("detail", JSON.stringify(dataOfLocal))

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

















// let  insertRecordIntoTable = () => {

// }



// const displayLocalStorageData = (formData) => {
//     let formdetails = [];
//         // console.log(formData,"log");
//         let storage = JSON.parse(localStorage.getItem("detail"));
//         // console.log('test', storage);
//         if (formData == null) {
//             console.log("please fill data");
//         } else {
//             if (storage === null) {
//                 formdetails.push(formData)
//                 // console.log(formdetails);
//                 localStorage.setItem("detail", JSON.stringify(formdetails))
//             } else {
//                 // console.log(formdetails, storage,"formdetails");
//                 formdetails = storage;
//                 formdetails.push(formData)
//                 // console.log(formdetails,"got");
//                 localStorage.setItem("detail", JSON.stringify(formdetails))
//             }
//             // insertNewRecord()
//             // window.location.reload(true);
//         }
// }




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



// let onEdit = (td) => {
//     // index = i;
//     // console.log(index,"index");
//     isEdit = true;
//     selectedRow = td.parentElement.parentElement;
//     let cell = selectedRow.cells
//     document.getElementById("fname").value = cell[0].innerHTML;
//     if (!cell[0].innerHTML == "") {
//         errorRemove("firstname")
//     } 
//     document.getElementById("lname").value = cell[1].innerHTML;
//     if (!cell[1].innerHTML == "") {
//         errorRemove("lastname")
//     } 
//     let gender_item = (cell[2].innerHTML)
//     // console.log(gender_item);
//     document.getElementById(gender_item).checked = true
//     if (!cell[2].innerHTML == "") {
//         errorRemove("gendervalidate")
//     } 
//     let hoby_item =(cell[3].innerHTML.split(','))
//     for (i = 0; i < hoby_item.length; i++){
//         document.getElementById(hoby_item[i]).checked = true;
//     }
//     if (!cell[3].innerHTML == "") {
//         errorRemove("hobbie")
//     } 
//     document.getElementById("address").value = selectedRow.cells[4].innerHTML;
//     if (!cell[4].innerHTML == "") {
//         errorRemove("message")
//     } 
// }


