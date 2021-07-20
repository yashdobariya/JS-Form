let selectedRow = null;
let getformData;



const onSubmit = (event) => {
    // console.log(event);
    event.preventDefault();
    // console.log(hobbies.length);
    // debugger
    if (document.getElementById("fname").value === "" || document.getElementById("lname").value === "" || document.querySelector('input[type="radio"]:checked') === null || document.getElementById("address").value === '' ||
    ((!document.getElementById("cricket").checked) && (!document.getElementById("music").checked) && (!document.getElementById("gyming").checked)))
    
    {
        // console.log(document.getElementById("lname").value === '');
        validateData(event);
    } else {
        getformData = readFormData();
        if (selectedRow == null) {
            insertNewRecord(getformData);
        } else {
            updateRecords(getformData);
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
    // formData["hobbie"] = JSON.parse(hobbies);
    // formData["hobbie"] = JSON.stringify(hobbies);
    formData["hobbie"] = hobbies.toString();
    formData["address"] = document.getElementById("address").value;
    // console.log(formData);
    return formData;
}

let insertNewRecord = (data) => {
    // console.log(data);
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
    selectedRow = td.parentElement.parentElement;
    // console.log(JSON.parse(selectedRow.cells[3].innerHTML));
    // console.log(selectedRow);
    console.log(getformData, "fomdata");
    document.getElementById("fname").value = selectedRow.cells[0].innerHTML;
    document.getElementById("lname").value = selectedRow.cells[1].innerHTML;

    let gender_item = (selectedRow.cells[2].innerHTML)
    // console.log(gender_item);
    document.getElementById(gender_item).checked = true

    let hoby_item =(selectedRow.cells[3].innerHTML.split(','))
    // console.log(selectedRow.cells[3].innerHTML.split(','), "hoby_item")
    // console.log(JSON.stringify(JSON.parse("[" + selectedRow.cells[3].innerHTML + "]")), "hoby_item")
    
    for (i = 0; i < hoby_item.length; i++){
                        // console.log(hoby_item[i]);
                            document.getElementById(hoby_item[i]).checked = true;
                    }

    document.getElementById("address").value = selectedRow.cells[4].innerHTML;
}


let updateRecords = (getformdata) => {
    selectedRow.cells[0].innerHTML = getformdata.firstname;
    selectedRow.cells[1].innerHTML = getformdata.lastname;
    selectedRow.cells[2].innerHTML = getformdata.gender;
    selectedRow.cells[3].innerHTML = getformdata.hobbie;
    selectedRow.cells[4].innerHTML = getformdata.address;
}


let onDelete = (td) =>{
    row = td.parentElement.parentElement;
    document.getElementById("basic-form-list").deleteRow(row.rowIndex);
}

const validateData = (event) => {
    event.preventDefault();
    let validateInput = event.target;
    // console.log(validateInput.name, "vlai");
    // console.log(validateInput.lname.id == "name", "vlai");
    console.log(validateInput.address.id, " hdjslai");

    if (validateInput.fname.id  === 'fname') {
        if (validateInput.fname.value == "") {
            document.getElementById("firstname").innerHTML = "Please fill the field";
        }
    }
    if (validateInput.lname.id === 'lname') {
        if (validateInput.lname.value == "") {
            document.getElementById("lastname").innerHTML = "Please fill the field";
        }
    }
    if (document.querySelector('input[type="radio"]:checked') == null) {
        document.getElementById("gender").innerHTML = "Please fill the field";
        
    }
    if ((!document.getElementById("cricket").checked) && (!document.getElementById("music").checked) && (!document.getElementById("gyming").checked)) {
        // console.log(hobbies, "hoby")
        document.getElementById("hobbie").innerHTML = "Please fill the field";
    }
    if (validateInput.address.id === 'address') {
        if (validateInput.address.value == "") {
            document.getElementById("message").innerHTML = "Please fill the field";
        }
    }





    //     console.log(getformData, "fomdata  validate");
    // if (document.getElementById("fname").value == "") {
    //     document.getElementById("firstname").innerHTML = "Please fill the field";
    // }
    
    // if (document.getElementById("lname").value == "") {
    //     document.getElementById("lastname").innerHTML = "Please fill the field";
        
    // }
    // if (document.querySelector('input[type="radio"]:checked') == null) {
    //     document.getElementById("gender").innerHTML = "Please fill the field";
        
    // }
    // // console.log(hobbies.length);
    // if ((!document.getElementById("cricket").checked) && (!document.getElementById("music").checked) && (!document.getElementById("gyming").checked)) {
    //     // console.log(hobbies, "hoby")
    //     document.getElementById("hobbie").innerHTML = "Please fill the field";
    // }

    // if (document.getElementById("address").value == "") {
    //     document.getElementById("message").innerHTML = "Please fill the field";
    // }

}

const changeInput = (event) => {
    // console.log(event.target);
    let inputElement = event.target;
    // console.log(inputElement.value);
    // console.log(event.target.name);
        // console.log(getformData, "fomdata ");
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
    // if (document.getElementById("lname").value != "") {
    //     document.getElementById("lastname").innerHTML = "";
    // }
    // if (document.getElementById('male').checked || document.getElementById('female').checked ){
    //     document.getElementById("gender").innerHTML = "";
    // }
    // if ((document.getElementById("cricket").checked) || (document.getElementById("music").checked) || (document.getElementById("gyming").checked)) {
    //     document.getElementById("hobbie").innerHTML = "";
    // }
    // if (document.getElementById("fname").value != "") {
    //     document.getElementById("message").innerHTML = "";
    // }
}
