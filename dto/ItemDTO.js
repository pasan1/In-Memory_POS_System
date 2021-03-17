function ItemDTO(code, description, price) {
    var __code = code;
    var __description = description;
    var __price = price;

    this.getItemCode = function () {
        return __code;
    }
    this.getItemDescription = function () {
        return __description;
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
    this.setItemPrice = function (newPrice) {
        __price = newPrice;
    }
}
