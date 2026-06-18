/* Only load on this scriptfile on checkout/index.html */

export function renderOrderSummary(){

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const summary = document.getElementById("checkout-items");
    
    if(!summary) return;

    if(cart.length === 0) {
        summary.innerHTML =`
        <p>Your cart is empty.</p
        `;
        return;
    }

    summary.innerHTML ="";
    cart.forEach(data => {
        summary.innerHTML +=`
            <div class="order-item">
                <img src="${data.image.url}" alt="${data.image.alt}">
                <div>
                    <h3>${data.title}</h3>
                    <p>${data.quantity} × ${data.price} NOK </p>
                </div>
            </div>
        `;
    });
}

export function updateTotals() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const subtotal = cart.reduce(
        (sum, data) =>
            sum + (data.price * data.quantity),
        0
    );

    const shipping = 99;

    const total = subtotal + shipping;

    document.getElementById("subtotal")
        .textContent = `${subtotal.toFixed(2)} NOK`;

    document.getElementById("shipping")
        .textContent = `${shipping.toFixed(2)} NOK`;

    document.getElementById("total")
    .textContent = `${total.toFixed(2)} NOK`;
}

renderOrderSummary();
updateTotals();

/* Remove items from cart once submit aka "place order" button is pressed */
document
    .getElementById("checkout-form")
    .addEventListener ("submit", (event) =>{
        event.preventDefault();

        localStorage.removeItem("cart");

        window.location.href = "/checkout/confirmation/index.html";
    });