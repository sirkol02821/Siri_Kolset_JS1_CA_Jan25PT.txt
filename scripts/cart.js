document.addEventListener ("click", (event) => {
    if (event.target.closest(".icon-cart")){
        document.body.classList.add("showCart");
    }
    if (event.target.closest(".close")){
        document.body.classList.remove("showCart");
    }
    if (event.target.closest(".cart-overlay")) {
        document.body.classList.remove("showCart");
    }
    
    /* adding functionality to + and - "buttons" in the cart */

    const minusButton = event.target.closest(".minus");
    if (minusButton) {
        decreaseQuantity(minusButton.dataset.index);
    }

    const plusButton = event.target.closest(".plus");
    if (plusButton) {
        increaseQuantity(plusButton.dataset.index);
    }
});

/* Blur background when cart is open */



/* This is the product part of the cart, the static HTML features are in header-footer.js*/
export function renderCart(){
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const listCart = document.querySelector(".listCart");

    if (!listCart) {
        return;
    }
        /* If cart is empty display: */
    if(cart.length === 0) {
        listCart.innerHTML =`
        <div class="empty-cart">
            <p>Oh no! Your cart is empty.</p>
            <a href="../../index.html" class="secondary-button">To webshop</a>
        </div>
        `;
        return;
    }

    listCart.innerHTML = "";
    
    cart.forEach((data, index) => {
        listCart.innerHTML += `
            <div class="item">
                <img src="${data.image.url}" alt="${data.image.alt}" loading="lazy">
                <h3>${data.title}</h3>
                <p>${data.price}NOK</p>
                <div class="quantity">
                    <span class="minus" data-index="${index}">-</span>
                    <span>${data.quantity || 1}</span>
                    <span class="plus" data-index="${index}">+</span>
                </div>
            </div>
            `;
    });
}





export function increaseQuantity(index) {
    
    const cart = JSON.parse(localStorage.getItem ("cart")) || [];
    
    cart[index].quantity = (cart[index].quantity || 1) + 1;
        
    localStorage.setItem (
        "cart", 
        JSON.stringify(cart) 
    );
    
    renderCart();
    updateCartCount()
}

export function decreaseQuantity(index) {

    const cart = JSON.parse(localStorage.getItem ("cart")) || [];

    index = Number(index);

    if(!cart[index]) {
        console.error("Invalid cart index:", index);
        return;
    }

    if(cart[index].quantity > 1) {
        cart[index].quantity--;
    } else{
        cart.splice(index, 1);
    }
    
    localStorage.setItem (
        "cart", 
        JSON.stringify(cart) 
    );
    
    renderCart();
    updateCartCount();
}



/* Updating the cart counter overlay to reflect the number of items in the cart */

export function updateCartCount (){
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalItems = cart.reduce((total, item) => {
        return total + (item.quantity || 1);
    }, 0);

    const counter = document.getElementById("cart-count");

    if (counter) {
        counter.textContent = totalItems;
    }
}
export function addToCart(data) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(
        item => item.id === data.id
    );
    
    if(existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
        cart.push({
            ...data,
            quantity: 1
        });
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();
    renderCart();
}

