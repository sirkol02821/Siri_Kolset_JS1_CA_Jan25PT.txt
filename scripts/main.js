import loader from "./loader.js";
import {highlightActive} from "./header-footer.js";


/* Making product cards with data fetched from API in productContainer in index.html */ 
let products= [];

function renderProducts(productsToRender) {

  const productContainer = document.getElementById("product-list") ;

    if (productContainer) {
      productContainer.innerHTML = "";

      productsToRender.forEach ((data) => {
          const card = document.createElement("article");
          card.classList.add("product-card");

          /* Setting the innerHTML of each productcard */
        card.innerHTML = `
          <img src="${data.image.url}" alt="${data.image.alt}">
          <h3>${data.title}</h3>    
          <p class="gender">${data.gender}</p>
          <p class="price">${data.price} NOK</p>
          <a href="product/index.html?id=${data.id}" class="details-button">View Details</a>
          `;

          productContainer.appendChild(card);
      });
    } 
}

async function loadProducts() {
  try {
    const response = await fetch("https://v2.api.noroff.dev/rainy-days");

    if(!response.ok){
      throw new Error("Failed to fetch products");
    }
    const result = await response.json();

    products = result.data;

    renderProducts(products);
  } catch (error) {
    console.error(error);
    const productContainer = document.getElementById("product-list");

    if (productContainer) {
      productContainer.innerHTML = `
      <p class="error">Could not load products.</p>`;
    }
  }
  
}

/* Show loader while fetching products */
async function loading () {
  loader.show();
  await loadProducts();
  loader.hide();
}

loading();


/* Filtering which product cards render based on gender */

document.addEventListener("click", (event) => {
  const filter = event.target.closest("[data-gender]");

  if (!filter) return;

  const gender =
    filter.dataset.gender;
  
  if(gender === "all") {
    renderProducts(products);
    return;
  }

  const filteredProducts= products.filter(product =>
    product.gender === gender
  );

  renderProducts(filteredProducts);
});

/* Later add pagination for product list https://mollify.noroff.dev/content/feu1/javascript-1/module-7/pagination?nav=course */