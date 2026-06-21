import { updateCartCount } from "./cart.js";
import {addToCart} from "./cart.js"

const dataId = new URLSearchParams(window.location.search).get("id");

/* Retrieve single product from API endpoint */
const productUrl = `https://v2.api.noroff.dev/rainy-days/${dataId}`;

async function loadProductDetails (){
    try {
        const response = await fetch(productUrl);

        if (!response.ok) {
            throw new Error('Product not found');
        }
        const result = await response.json();
        const product = result.data;
        displayProductDetails(product);

    }
    catch (error){
        console.error(error);
        document.getElementById("details-container").innerHTML =
          "<p>Product not found.</p>";
    }
}


/* Showing alert when products are added to cart */
function showCartToast (){
    const toast = document.getElementById("cart-toast");
    if(!toast) return;

    toast.classList.add("show");

    setTimeout (() => {
        toast.classList.remove("show");
    }, 2000);
}


/* Selecting which data should be visible on the Product details page. */     
function displayProductDetails(data) {
    const detailsContainer = document.getElementById("details-container");

    detailsContainer.innerHTML = `
        <div class="product-image">
            <img src="${data.image.url}" alt="${data.image.alt}" loading="lazy">
        </div>
        <div class="product-info">
            <span class="gender-badge">${data.gender}</span>
            <h1>${data.title}</h1> 
            <p class="price">${data.price} NOK</p>
            <button id="add-to-cart" class="accent-button">Add to cart</button>
            <div id="cart-toast">Added to cart</div>
            <div>
                <h2>Description</h2>
                <p class="description">${data.description}</p>
            </div>
            <a href="/index.html" class="secondary-button">Back to products</a>
        </div>
    `;
    const addButton = document.getElementById ("add-to-cart");
        addButton.addEventListener("click",()=>{
        addToCart(data);
        showCartToast();
    })
};

loadProductDetails();