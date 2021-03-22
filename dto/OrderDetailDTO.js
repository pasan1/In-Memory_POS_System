function OrderDetailDTO(orderId, itemCode, qty, unitPrice) {
    var __orderId = orderId;
    var __itemCode = itemCode;
    var __qty = qty;
    var __unitPrice = unitPrice;

    this.getOrderID = function () {
        return __orderId;
    }
    this.getItemCode = function () {
        return __itemCode;
    }
    this.getQty = function () {
        return __qty;
    }
    this.getUnitPrice = function () {
        return __unitPrice;
    }

    this.setOrderID = function (newOrderId) {
        __orderId = newOrderId;
    }
    this.setItemCode = function (newItemCode) {
        __itemCode = newItemCode;
    }
    this.setQty = function (newQty) {
        __qty = newQty;
    }
    this.setUnitPrice = function (newUnitPrice) {
        __unitPrice = newUnitPrice;
    }

}
