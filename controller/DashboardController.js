function openHome() {
    document.getElementById('index-html').style.display="block";
    document.getElementById('order-html').style.display="none";
    document.getElementById('item-html').style.display="none";
    document.getElementById('customer-html').style.display="none";
}
function openOrder() {
    document.getElementById('index-html').style.display="none";
    document.getElementById('order-html').style.display="block";
    document.getElementById('item-html').style.display="none";
    document.getElementById('customer-html').style.display="none";
}
function openItem() {
    document.getElementById('index-html').style.display="none";
    document.getElementById('order-html').style.display="none";
    document.getElementById('item-html').style.display="block";
    document.getElementById('customer-html').style.display="none";
}
function openCustomer() {
    document.getElementById('index-html').style.display="none";
    document.getElementById('order-html').style.display="none";
    document.getElementById('item-html').style.display="none";
    document.getElementById('customer-html').style.display="block";
}