function OrderDTO(id, date, customerId, discount) {
    var __id = id;
    var __date = date;
    var __customerId = customerId;
    var __discount = discount;

    this.getId = function () {
        return __id;
    }
    this.getDate = function () {
        return __date;
    }
    this.getCustomerId = function () {
        return __customerId;
    }
    this.getDiscount = function () {
        return __discount;
    }

    this.setId = function (newId) {
        __id = newId;
    }
    this.setDate = function (newDate) {
        __date = newDate;
    }
    this.setCustomerId = function (newCustomerId) {
        __customerId = newCustomerId;
    }
    this.setDiscount = function (newDiscount) {
        __discount = newDiscount;
    }
}
