function ItemDTO(code, description, qty, price) {
    var __code = code;
    var __description = description;
    var __qty = qty;
    var __price = price;

    this.getItemCode = function () {
        return __code;
    }
    this.getItemDescription = function () {
        return __description;
    }
    this.getItemQty = function () {
        return __qty;
    }
    this.getItemPrice = function () {
        return __price;
    }
    this.setItemCode = function (newCode) {
        __code = newCode;
    }
    this.setItemDescription = function (newDescription) {
        __description = newDescription;
    }
    this.setItemQty = function (newQty) {
        __qty = newQty;
    }
    this.setItemPrice = function (newPrice) {
        __price = newPrice;
    }
}
