// Events
// ========================================================================================
$('#btnAddItem').click(function () {
    let itemCode = $("#ItemCode").val();
    let itemDescription = $("#ItemDescription").val();
    let itemQty = $("#ItemQty").val();
    let itemPrice = $("#ItemPrice").val();

    let res = saveItem(itemCode, itemDescription, itemQty, itemPrice);
    if(res)clearAllItemText();
});

$('#btnClearItemFrom').click(function () {
    clearAllItemText();
});

//load all items
$("#btnGetAllItem").click(function () {
    loadAllItemToTheTable();
});


$("#btnDeleteItem").click(function () {
    let code = $("#ItemCode").val();
    let option=confirm(`Do you want to delete Code: ${code}`);
    if (option){
        let res=deleteCustomer(code);
        if (res){
            alert("Item Deleted");
        } else{
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

    let option=confirm(`Do you want to Update Item Code:${code}`);
    if (option){
        let res= updateItem(code, description, qty, price);
        if (res){
            alert("Item Updated");
        }else{
            alert("Update Failed");
        }
    }
    loadAllItemToTheTable();
    clearAllItemText();

});

$("#ItemCode").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let item = searchItem($(this).val());
        if (item != null) {
            $("#ItemCode").val(item.getCustomerID());
            $("#ItemDescription").val(item.getCustomerName());
            $("#ItemQty").val(item.getCustomerAddress());
            $("#ItemPrice").val(item.getCustomerSalary());
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
        item.setCustomerName(description)
        item.setCustomerAddress(qty)
        item.setCustomerSalary(price);
        return true;
    } else {
        return false;
    }
}

// ==============================================================================

//Other function
function loadAllItemToTheTable() {
    let allItems = getAllItems();
    $('#tblItem').empty(); // clear all the table before adding for avoid duplicate
    for (var i in allItems) {
        let code = allItems[i].getItemCode();
        let description = allItems[i].getItemDescription();
        let qty = allItems[i].getItemQty();
        let price = allItems[i].getItemPrice();

        var row = `<tr><td>${code}</td><td>${description}</td><td>${price}</td><td>${qty}</td></tr>`;
        $('#tblItem').append(row);
    }
}

function clearAllItemText() {
    $("#ItemCode").val("");
    $("#ItemDescription").val("");
    $("#ItemQty").val("");
    $("#ItemPrice").val("");
}