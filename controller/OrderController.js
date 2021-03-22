let __orderTM = new Array();
let __orderId = 1;
let __total = 0;

$('#nav-order').click(function () {
    clearItemData();
    $('#orderID').val("O-"+__orderId);
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

    let total = $('#FullTotal').val();
    let discount = $('#Discount').val() / 100;

    let amountPay = total - (total * discount);

    $('#AmountToPaid').val(amountPay);

});

$('#OrderOrderQty').on('keyup', function (event) {
    if (event.key == "Enter") {
        $('#btnAddOrderOrderQty').focus();
    }
});

function addDataToTable() {
    $('#tblOrderItems>tr').off('dblclick');

    let code = $('#OrderItemCode').val();
    let desc = $('#OrderItemName').val();
    let unitPrice = $('#OrderItemPrice').val();
    let qty = $('#OrderOrderQty').val();
    let tot = unitPrice * qty;

    calTotal(tot);

    var row = `<tr><td>${code}</td><td>${desc}</td><td>${unitPrice}</td><td>${qty}</td><td>${tot}</td></tr>`;
    $('#tblOrderItems').append(row);

    $("#tblOrderItems>tr").on('dblclick',function (){
        let option = confirm(`Do you want to remove ID: ${code}`);
        if (option) {
            $(this).remove();
        }
    })
}

$('#btnAddOrderOrderQty').click(function () {
    addDataToTable();
    clearItemData();
    $('#OrderItemCode').focus();
});

function clearItemData() {
    $('#OrderItemName').val("");
    $('#OrderItemQtyOnHand').val("");
    $('#OrderItemPrice').val("");
    $('#OrderOrderQty').val("");
}
function clearCustomerData() {
    $('#OrderCustomerName').val("");
    $('#OrderCustomerAddress').val("");
    $('#OrderCustomerSalary').val("");
}

function calTotal(amount) {
    __total = __total + amount;
    $('#FullTotal').val(__total);
}

$('#btnOrderPay').click(function () {
    clearCustomerData();
    __orderId++;
    $('#FullTotal').val("");
    $('#Discount').val("");
    $('#AmountToPaid').val("");
    $('#tblOrderItems').empty();
    $('#nav-order').click();
});