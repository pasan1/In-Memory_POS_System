
$('#nav-order').click(function () {
    loadTodayDate();
    loadCustomersToCmb();
    loadItemsToCmb();
});

function loadTodayDate() {
    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;

    $('#orderDate').val(today);
}

function loadCustomersToCmb() {
    var cusIDs = new Array(); // Possible Values

    for (var i in customerTable) {
        cusIDs.push(customerTable[i].getCustomerID());
    }

    var sel = document.getElementById('OrderCustomerID') // find the drop down
    for (var i in cusIDs) { // loop through all elements
        var opt = document.createElement("option"); // Create the new element
        opt.value = cusIDs[i]; // set the value
        opt.text = cusIDs[i]; // set the text

        sel.appendChild(opt); // add it to the select
    }
}

function loadItemsToCmb() {
    var itemCodes = new Array(); // Possible Values

    for (var i in itemTable) {
        itemCodes.push(itemTable[i].getItemCode());
    }

    var sel = document.getElementById('OrderItemCode') // find the drop down
    for (var i in itemCodes) { // loop through all elements
        var opt = document.createElement("option"); // Create the new element
        opt.value = itemCodes[i]; // set the value
        opt.text = itemCodes[i]; // set the text

        sel.appendChild(opt); // add it to the select
    }
}

$("#OrderCustomerID").change(function () {
    let customer = searchCustomer(this.value);
    $('#OrderCustomerName').val(customer.getCustomerName());
    $('#OrderCustomerAddress').val(customer.getCustomerAddress());
    $('#OrderCustomerSalary').val(customer.getCustomerSalary());
    $('#OrderItemCode').focus();
});

$("#OrderItemCode").change(function () {
    let item = searchItem(this.value);
    $('#OrderItemName').val(item.getItemDescription());
    $('#OrderItemQtyOnHand').val(item.getItemQty());
    $('#OrderItemPrice').val(item.getItemPrice());
    $('#OrderOrderQty').focus();
});

function searchCustomer(id) {
    for (var i in customerTable) {
        if (customerTable[i].getCustomerID() == id) return customerTable[i];
    }
    return null;
}

function searchItem(code) {
    for (var i in itemTable) {
        if (itemTable[i].getItemCode() == code) return itemTable[i];
    }
    return null;
}

$('#order-html').on('keyup', function (event) {
    if (event.key == "Escape") {
        $('#Discount').focus();
    }
});

$('#Discount').on('keyup', function (event) {
    if (event.key == "Enter") {
        $('#btnOrderPay').focus();
    }
});

