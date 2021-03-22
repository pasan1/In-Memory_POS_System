// Events
// ========================================================================================
$('#btnAddItem').click(function () {
    let itemCode = $("#ItemCode").val();
    let itemDescription = $("#ItemDescription").val();
    let itemQty = $("#ItemQty").val();
    let itemPrice = $("#ItemPrice").val();

    let res = saveItem(itemCode, itemDescription, itemQty, itemPrice);
    if (res) clearAllItemText();
});

$('#btnClearItemFrom').click(function () {
    clearAllItemText();
});

//load all items
$("#btnGetAllItem").click(function () {
    loadAllItemToTheTable();
});

$("#btnClearItemSearch").click(function () {
    $("#ItemSearch").val("");
});


$("#btnDeleteItem").click(function () {
    let code = $("#ItemCode").val();
    let option = confirm(`Do you want to delete Code: ${code}`);
    if (option) {
        let res = deleteCustomer(code);
        if (res) {
            alert("Item Deleted");
        } else {
            alert("Delete Failed")
        }

    }
    loadAllItemToTheTable();
    clearAllItemText();
});


$("#btnUpdateCustomer").click(function () {
    let code = $("#ItemCode").val();
    let description = $("#ItemDescription").val();
    let qty = $("#ItemQty").val();
    let price = $("#ItemPrice").val();

    let option = confirm(`Do you want to Update Item Code:${code}`);
    if (option) {
        let res = updateItem(code, description, qty, price);
        if (res) {
            alert("Item Updated");
        } else {
            alert("Update Failed");
        }
    }
    loadAllItemToTheTable();
    clearAllItemText();

});

$("#ItemSearch").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let item = searchItem($(this).val());
        if (item != null) {
            $("#ItemCode").val(item.getItemCode());
            $("#ItemDescription").val(item.getItemDescription());
            $("#ItemQty").val(item.getItemQty());
            $("#ItemPrice").val(item.getItemPrice());
            $("#ItemSearch").val("");
        } else {
            clearAllItemText();
        }
    }
});
// ==================================================================================

//Functions - CRUD operations
// save item
function saveItem(code, description, qty, price) {
    let item = new ItemDTO(code, description, qty, price);
    console.log(item.toString());
    itemTable.push(item);// item added

    // load the table
    loadAllItemToTheTable();
    return true;
}

//get all items
function getAllItems() {
    return itemTable;
}

//delete item
function deleteCustomer(code) {
    let item = searchItem(code);
    if (item != null) {
        let indexNumber = itemTable.indexOf(item);
        itemTable.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}

// search item
function searchItem(code) {
    for (var i in itemTable) {
        if (itemTable[i].getItemCode() == code) return itemTable[i];
    }
    return null;
}


function updateItem(code, description, qty, price) {
    let item = searchItem(code);
    if (item != null) {
        item.setItemDescription(description)
        item.setItemQty(qty)
        item.setItemPrice(price);
        return true;
    } else {
        return false;
    }
}

// ==============================================================================

//Other function
function loadAllItemToTheTable() {
    $('#tblItem>tr').off('click');

    let allItems = getAllItems();
    $('#tblItem').empty(); // clear all the table before adding for avoid duplicate
    for (var i in allItems) {
        let code = allItems[i].getItemCode();
        let description = allItems[i].getItemDescription();
        let qty = allItems[i].getItemQty();
        let price = allItems[i].getItemPrice();

        var row = `<tr><td>${code}</td><td>${description}</td><td>${price}</td><td>${qty}</td></tr>`;
        $('#tblItem').append(row);

        $('#tblItem>tr').click(function () {
            let id = $(this).children('td:eq(0)').text();
            let name = $(this).children('td:eq(1)').text();
            let address = $(this).children('td:eq(2)').text();
            let salary = $(this).children('td:eq(3)').text();

            $('#ItemCode').val(id);
            $('#ItemDescription').val(name);
            $('#ItemQty').val(address);
            $('#ItemPrice').val(salary);
        });
    }
}

function clearAllItemText() {
    $("#ItemCode").val("");
    $("#ItemDescription").val("");
    $("#ItemQty").val("");
    $("#ItemPrice").val("");
    $("#ItemSearch").val("");
}

//----------------------------
$('#ItemCode,#ItemDescription,#ItemQty,#ItemPrice').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

let itemIdRegEx = /^(I000-)[0-9]{1,3}$/;
let itemDescriptionRegEx = /^[A-z ]{5,20}$/;
let itemQtyRegEx = /^[0-9]+$/;
let itemPriceRegEx = /^[0-9.]{2,}$/;

$('#ItemCode').on('keyup', function (event) {
    if (event.key == "Enter") {
        $('#ItemDescription').focus();
    }
    let inputID = $('#ItemCode').val();
    if (itemIdRegEx.test(inputID)) {
        $('#ItemCode').css('border', '2px solid green');
        $('#lblErrorItemCode').text("");
    } else {
        $('#ItemCode').css('border', '2px solid red');
        $('#lblErrorItemCode').text('Item Code is a required field : Pattern I000-000');
    }
});

$('#ItemDescription').on('keyup', function (event) {
    if (event.key == "Enter") {
        $('#ItemQty').focus();
    }
    let inputID = $('#ItemDescription').val();
    if (itemDescriptionRegEx.test(inputID)) {
        $('#ItemDescription').css('border', '2px solid green');
        $('#lblErrorItemDescription').text("");
    } else {
        $('#ItemDescription').css('border', '2px solid red');
        $('#lblErrorItemDescription').text('Item Description is a required field : Minimum 5, Maximum 20 Space Allowed');
    }
});

$('#ItemQty').on('keyup', function (event) {
    if (event.key == "Enter") {
        $('#ItemPrice').focus();
    }
    let inputID = $('#ItemQty').val();
    if (itemQtyRegEx.test(inputID)) {
        $('#ItemQty').css('border', '2px solid green');
        $('#lblErrorItemQty').text("");
    } else {
        $('#ItemQty').css('border', '2px solid red');
        $('#lblErrorItemQty').text('Item Qty is a required field : Only number');
    }
});

$('#ItemPrice').on('keyup', function (event) {
    if (event.key == "Enter") {
        $('#btnAddItem').focus();
    }
    let inputID = $('#ItemPrice').val();
    if (itemPriceRegEx.test(inputID)) {
        $('#ItemPrice').css('border', '2px solid green');
        $('#lblErrorItemPrice').text("");
    } else {
        $('#ItemPrice').css('border', '2px solid red');
        $('#lblErrorItemPrice').text('Item Price is a required field : Pattern : 100.00 or 100');
    }
});

