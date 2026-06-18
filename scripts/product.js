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


      
/* Selecting which data should be visible on the Product details page. */     
function displayProductDetails(data) {
    const detailsContainer = document.getElementById("details-container");

    detailsContainer.innerHTML = `
        <img src="${data.image.url}" alt="${data.image.alt}">
        <h1>${data.title}</h1> 
        <p class="gender">${data.gender}</p>
        <p class="price">${data.price} NOK</p>
        <button id="add-to-cart" class="accent-button">Add to cart</button>
        <p>${data.description}</p>
        <a href="/index.html" class="secondary-button">Back to products</a>
    `;
    const addButton =
        document.getElementById ("add-to-cart");
    addButton.addEventListener("click",()=>{
        addToCart(data);
    })
};

loadProductDetails();
displayProductDetails();
