// Events
// ========================================================================================
$('#btnAddCustomer').click(function () {
    let cusID = $("#CustomerID").val();
    let cusName = $("#CustomerName").val();
    let cusAddress = $("#CustomerAddress").val();
    let cusSalary = $("#CustomerSalary").val();

    let res = saveCustomer(cusID, cusName, cusAddress, cusSalary);
    if (res) clearAllCustomerText();
});

$('#btnClearCustomerFrom').click(function () {
    clearAllCustomerText();
});

//load all customers
$("#btnGetAllCustomer").click(function () {
    loadAllCustomerToTheTable();
});

$("#btnClearCustomerSearch").click(function () {
    $("#SearchCustomer").val("");
});


$("#btnDeleteCustomer").click(function () {
    let cusID = $("#CustomerID").val();
    let option = confirm(`Do you want to delete ID:${cusID}`);
    if (option) {
        let res = deleteCustomer(cusID);
        if (res) {
            alert("Customer Deleted");
        } else {
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

    let option = confirm(`Do you want to Update Customer ID:${cusID}`);
    if (option) {
        let res = updateCustomer(cusID, cusName, cusAddress, cusSalary);
        if (res) {
            alert("Customer Updated");
        } else {
            alert("Update Failed");
        }
    }
    loadAllCustomerToTheTable();
    clearAllCustomerText();

});

$("#SearchCustomer").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let customer = searchCustomer($(this).val());
        if (customer != null) {
            $("#CustomerID").val(customer.getCustomerID());
            $("#CustomerName").val(customer.getCustomerName());
            $("#CustomerAddress").val(customer.getCustomerAddress());
            $("#CustomerSalary").val(customer.getCustomerSalary());
            $("#SearchCustomer").val("");
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
    $('#tblCustomer>tr').off('click');

    let allCustomers = getAllCustomers();
    $('#tblCustomer').empty(); // clear all the table before adding for avoid duplicate
    for (var i in allCustomers) {
        let id = allCustomers[i].getCustomerID();
        let name = allCustomers[i].getCustomerName();
        let address = allCustomers[i].getCustomerAddress();
        let salary = allCustomers[i].getCustomerSalary();

        var row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${salary}</td></tr>`;
        $('#tblCustomer').append(row);

        $('#tblCustomer>tr').click(function () {
            let id = $(this).children('td:eq(0)').text();
            let name = $(this).children('td:eq(1)').text();
            let address = $(this).children('td:eq(2)').text();
            let salary = $(this).children('td:eq(3)').text();

            $('#CustomerID').val(id);
            $('#CustomerName').val(name);
            $('#CustomerAddress').val(address);
            $('#CustomerSalary').val(salary);
        });
    }
}

function clearAllCustomerText() {
    $("#CustomerID").val("");
    $("#CustomerName").val("");
    $("#CustomerAddress").val("");
    $("#CustomerSalary").val("");
    $("#SearchCustomer").val("");
}

//----------------------------
$('#CustomerID,#CustomerName,#CustomerAddress,#CustomerSalary').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

let cusIdRegEx = /^(C000-)[0-9]{1,3}$/;
let cusNameRegEx = /^[A-z ]{5,20}$/;
let cusAddressRegEx = /^[A-z0-9,.\/\\ ]{7,}$/;
let cusSalaryRegEx = /^[0-9.]{2,}$/;

$('#CustomerID').on('keypress', function (event) {
    if (event.key == "Enter") {
        $('#CustomerName').focus();
    }
    let inputID = $('#CustomerID').val();
    if (cusIdRegEx.test(inputID)) {
        $('#CustomerID').css('border', '2px solid green');
        $('#lblErrorCustomerId').text("");
    } else {
        $('#CustomerID').css('border', '2px solid red');
        $('#lblErrorCustomerId').text('Customer ID is a required field : Pattern C000-000');
    }
});

$('#CustomerName').on('keypress', function (event) {
    if (event.key == "Enter") {
        $('#CustomerAddress').focus();
    }
    let inputID = $('#CustomerName').val();
    if (cusNameRegEx.test(inputID)) {
        $('#CustomerName').css('border', '2px solid green');
        $('#lblErrorCustomerName').text("");
    } else {
        $('#CustomerName').css('border', '2px solid red');
        $('#lblErrorCustomerName').text('Customer Name is a required field : Minimum 5, Maximum 20 Space Allowed');
    }
});

$('#CustomerAddress').on('keypress', function (event) {
    if (event.key == "Enter") {
        $('#CustomerSalary').focus();
    }
    let inputID = $('#CustomerAddress').val();
    if (cusAddressRegEx.test(inputID)) {
        $('#CustomerAddress').css('border', '2px solid green');
        $('#lblErrorCustomerAddress').text("");
    } else {
        $('#CustomerAddress').css('border', '2px solid red');
        $('#lblErrorCustomerAddress').text('Customer Address is a required field : Minimum 7');
    }
});

$('#CustomerSalary').on('keypress', function (event) {
    if (event.key == "Enter") {
        $('#btnAddCustomer').focus();
    }
    let inputID = $('#CustomerSalary').val();
    if (cusSalaryRegEx.test(inputID)) {
        $('#CustomerSalary').css('border', '2px solid green');
        $('#lblErrorCustomerSalary').text("");
    } else {
        $('#CustomerSalary').css('border', '2px solid red');
        $('#lblErrorCustomerSalary').text('Customer Salary is a required field : Pattern : 100.00 or 100');
    }
});

