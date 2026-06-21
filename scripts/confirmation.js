/* showing an order summary on the order confirmation page */

function renderOrderConfirmation (){
    const order = JSON.parse(localStorage.getItem("lastOrder")) || [];

    const summary = document.getElementById("order-summary");

    if(!summary) return;

    let total = 0;
    let shipping = 99;

    order.forEach(data => {

        const quantity = data.quantity || 1;

        const lineTotal = data.price * quantity;
        total += lineTotal + shipping;

        summary.innerHTML +=`
            <div class="order-item">
                <img src="${data.image.url}" alt="${data.image.alt}">
                <div>
                    <h3>${data.title}</h3>
                    <p>Quantity: ${data.quantity} × ${data.price} NOK </p>
                    <p>${lineTotal.toFixed(2)} NOK </p>
                </div>
            </div>
        `;
    });
    summary.innerHTML += `
        <p>Shipping ${shipping.toFixed(2)} NOK</p>
        <hr>
        <h2>Total: ${total.toFixed(2)} NOK</h2>
    `;
}
renderOrderConfirmation();