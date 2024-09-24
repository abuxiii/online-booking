
let orderList = [];
let totalPrice = 0;

function order(item, price) {

    orderList.push({ item: item, price: price });


    displayOrder();
}

function displayOrder() {
    const orderListElement = document.getElementById("order-list");
    const totalPriceElement = document.getElementById("total-price");
    const qrCodeElement = document.getElementById("qrcode");

    orderListElement.innerHTML = '';
    qrCodeElement.innerHTML = '';

    orderList.forEach((orderItem) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${orderItem.item} - ${orderItem.price} UZS`;
        orderListElement.appendChild(listItem);
    });

  
    totalPrice = orderList.reduce((total, orderItem) => total + orderItem.price, 0);

    totalPriceElement.textContent = `Total: ${totalPrice} UZS`;

    
    let orderSummary = "Your Order:\n";
    orderList.forEach(orderItem => {
        orderSummary += `${orderItem.item}: ${orderItem.price} UZS\n`;
    });
    orderSummary += `Total: ${totalPrice} UZS`;

    new QRCode(qrCodeElement, {
        text: orderSummary,
        width: 256,
        height: 256,
        colorDark: "white",  
        colorLight: "transparent",  
        correctLevel: QRCode.CorrectLevel.H
    });
}

function generatePDF() {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();


    doc.text("By Abubakr Inogomov", 10, 10);

  
    let yPosition = 20; 
    orderList.forEach(orderItem => {
        doc.text(`${orderItem.item}: ${orderItem.price} UZS`, 10, yPosition);
        yPosition += 10; 
    });

    doc.text(`Total: ${totalPrice} UZS  `, 10, yPosition + 10);



    doc.save("booking-receipt.pdf");
}
