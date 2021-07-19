let selectedRow = null;


const OnSubmit = (event) => {
    event.preventDefault();
    let formData1;
    // console.log(hobbies.length);
    // debugger
    if (document.getElementById("fname").value === "" || document.getElementById("lname").value === "" || document.querySelector('input[type="radio"]:checked') === null || document.getElementById("address").value === '' ||
         ((!document.getElementById("cricket").checked) && (!document.getElementById("music").checked) && (!document.getElementById("gyming").checked)))
        
    {
        console.log(document.getElementById("lname").value === '');
        validateData();
    } else {
        formData1 = readFormData();
        if (selectedRow == null) {
            insertNewRecord(formData1);
        } else {
            updateRecords(formData1);
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
    // console.log(hobbies, "h")

    for (let i = 0; i < hoby.length; i++){
        if (document.getElementById(hoby[i].id).checked) {

            hobbies.push(document.getElementById(hoby[i].id).value)
        }
    }

    // formData["hobbie"] = JSON.parse(hobbies);
    // formData["hobbie"] = JSON.stringify(hobbies);
        formData["hobbie"] = hobbies.toString();
    formData["address"] = document.getElementById("address").value;
    console.log(formData);
    return formData;
}

let insertNewRecord = (data) => {
    console.log(data);
    let table = document.getElementById("basic-form-list").getElementsByTagName("tbody")[0]
    let newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.firstname;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.lastname;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.gender;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.hobbie;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.address;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<button onClick="onEdit(this)" class="btn" href="">Edit</button><button onClick="onDelete(this)"class="btn1" href="">Delete</button>`;
}


let onEdit = (td) => {
    selectedRow = td.parentElement.parentElement;
    // console.log(JSON.parse(selectedRow.cells[3].innerHTML));
    // console.log(selectedRow);
    document.getElementById("fname").value = selectedRow.cells[0].innerHTML;
    document.getElementById("lname").value = selectedRow.cells[1].innerHTML;

    let gender_item = (selectedRow.cells[2].innerHTML)
    // console.log(gender_item);
    document.getElementById(gender_item).checked = true

    let hoby_item =(selectedRow.cells[3].innerHTML.split(','))
    // console.log(selectedRow.cells[3].innerHTML.split(','), "hoby_item")
    // console.log(JSON.stringify(JSON.parse("[" + selectedRow.cells[3].innerHTML + "]")), "hoby_item")
    
    for (i = 0; i < hoby_item.length; i++){
                        console.log(hoby_item[i]);
                            document.getElementById(hoby_item[i]).checked = true;
                    }

    document.getElementById("address").value = selectedRow.cells[4].innerHTML;
}


let updateRecords = (formData1) => {
    selectedRow.cells[0].innerHTML = formData1.firstname;
    selectedRow.cells[1].innerHTML = formData1.lastname;
    selectedRow.cells[2].innerHTML = formData1.gender;
    selectedRow.cells[3].innerHTML = formData1.hobbie;
    selectedRow.cells[4].innerHTML = formData1.address;
}


let onDelete = (td) =>{
    row = td.parentElement.parentElement;
    document.getElementById("basic-form-list").deleteRow(row.rowIndex);
}

const validateData = () => {
    event.preventDefault();
    var firstname = document.getElementById("fname").value;
    if (firstname == "") {
        
        document.getElementById("firstname").innerHTML = "Please fill the field";
    }
    
    var lastname = document.getElementById("lname").value;
    if (lastname == "") {
        document.getElementById("lastname").innerHTML = "Please fill the field";
        
    }
    var gend = document.querySelector('input[type="radio"]:checked');
    if (gend == null) {
        document.getElementById("gender").innerHTML = "Please fill the field";
        
    }
    // console.log(hobbies.length);
    if ((!document.getElementById("cricket").checked) && (!document.getElementById("music").checked) && (!document.getElementById("gyming").checked)) {
        // console.log(hobbies, "hoby")
        document.getElementById("hobbie").innerHTML = "Please fill the field";
 
        
    }
    var Addr = document.getElementById("address").value;
    if (Addr == "") {
        document.getElementById("message").innerHTML = "Please fill the field";
        
    }

}