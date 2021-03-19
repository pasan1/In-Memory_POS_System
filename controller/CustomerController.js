// Events
// ========================================================================================
$('#btnAddCustomer').click(function () {
    let cusID = $("#CustomerID").val();
    let cusName = $("#CustomerName").val();
    let cusAddress = $("#CustomerAddress").val();
    let cusSalary = $("#CustomerSalary").val();

    let res = saveCustomer(cusID, cusName, cusAddress, cusSalary);
    if(res)clearAllCustomerText();
});

$('#btnClearCustomerFrom').click(function () {
    clearAllCustomerText();
});

//load all customers
$("#btnGetAllCustomer").click(function () {
    loadAllCustomerToTheTable();
});


$("#btnDeleteCustomer").click(function () {
    let cusID = $("#CustomerID").val();
    let option=confirm(`Do you want to delete ID:${cusID}`);
    if (option){
        let res=deleteCustomer(cusID);
        if (res){
            alert("Customer Deleted");
        } else{
            alert("Delete Failed")
        }

    }
    loadAllCustomerToTheTable();
    clearAllCustomerText();
});


$("#btnUpdateCustomer").click(function () {
    let cusID = $("#CustomerID").val();
    let cusName = $("#CustomerName").val();
    let cusAddress = $("#CustomerAddress").val();
    let cusSalary = $("#CustomerSalary").val();

    let option=confirm(`Do you want to Update Customer ID:${cusID}`);
    if (option){
        let res= updateCustomer(cusID, cusName, cusAddress, cusSalary);
        if (res){
            alert("Customer Updated");
        }else{
            alert("Update Failed");
        }
    }
    loadAllCustomerToTheTable();
    clearAllCustomerText();

});

$("#CustomerID").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let customer = searchCustomer($(this).val());
        if (customer != null) {
            $("#CustomerID").val(customer.getCustomerID());
            $("#CustomerName").val(customer.getCustomerName());
            $("#CustomerAddress").val(customer.getCustomerAddress());
            $("#CustomerSalary").val(customer.getCustomerSalary());
        } else {
            clearAllCustomerText();
        }
    }
});
// ==================================================================================

//Functions - CRUD operations
// save customer
function saveCustomer(id, name, address, salary) {
    let customer = new CustomerDTO(id, name, address, salary);
    console.log(customer.toString());
    customerTable.push(customer);// customer added

    // load the table
    loadAllCustomerToTheTable();
    return true;
}

//get all customers
function getAllCustomers() {
    return customerTable;
}

//delete customer
function deleteCustomer(id) {
    let customer = searchCustomer(id);
    if (customer != null) {
        let indexNumber = customerTable.indexOf(customer);
        customerTable.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}
// search customer
function searchCustomer(id) {
    for (var i in customerTable) {
        if (customerTable[i].getCustomerID() == id) return customerTable[i];
    }
    return null;
}


function updateCustomer(id, name, address, salary) {
    let customer = searchCustomer(id);
    if (customer != null) {
        customer.setCustomerName(name)
        customer.setCustomerAddress(address)
        customer.setCustomerSalary(salary);
        return true;
    } else {
        return false;
    }
}

// ==============================================================================

//Other function
function loadAllCustomerToTheTable() {
    let allCustomers = getAllCustomers();
    $('#tblCustomer').empty(); // clear all the table before adding for avoid duplicate
    for (var i in allCustomers) {
        let id = allCustomers[i].getCustomerID();
        let name = allCustomers[i].getCustomerName();
        let address = allCustomers[i].getCustomerAddress();
        let salary = allCustomers[i].getCustomerSalary();

        var row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${salary}</td></tr>`;
        $('#tblCustomer').append(row);
    }
}

function clearAllCustomerText() {
    $("#CustomerID").val("");
    $("#CustomerName").val("");
    $("#CustomerAddress").val("");
    $("#CustomerSalary").val("");
}