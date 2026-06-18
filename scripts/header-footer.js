import { updateCartCount } from "./cart.js";
import { renderCart } from "./cart.js";

const header = document.getElementById ("header");

window.addEventListener("load", function (){
    header.innerHTML = `
    <nav class="navbar">
        <div class="logo-cart">
            <a href="/index.html"><img src="/assets/images/logo-light.png" alt="logo of Rainy Days" class="logo"></a>
            <div class="icon-cart">
                <i class="fa fa-shopping-cart"></i>
                <span id="cart-count">0</span>
            </div>
            <div class="cartTab">
                <h1>Shopping cart</h1>
                <div class="listCart">  
                </div>
                <div class="btn">
                    <a href="/checkout/index.html" class="checkOut">Checkout</a>
                    <button class="close">Close</button>                
                </div>
            </div>
        </div>
        <ul class="navbar_menu" id="navMenu">
            <li><a href="/index.html">Our products</a></li>
            <li><a href="/additionalPages/about.html">About us</a></li>
            <li><a href="/additionalPages/community.html">Community</a></li>
            <li><a href="/additionalPages/contact.html">Contact us</a></li>
        </ul>
    </nav>`
    updateCartCount();
    renderCart();
    highlightActive();
})


/* Adding class="active" if the currentPath ends with the href from navbar_menu */
export function highlightActive(){
    const currentPath = window.location.pathname;

    const navLinks = document.querySelectorAll(".navbar_menu a")
    
    navLinks.forEach(link => {
        // Resolve the link's pathname to avoid mismatch between relative and absolute hrefs
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath) {
            link.classList.add("active");
        }
    });
}

const footer = document.getElementById ("footer");

window.addEventListener ("load", function (){
    footer.innerHTML = `
    <footer>
        <section>
            <ul>
                <li><h3>About us</h3></li>
                <li><h4><a href="about.html">About Rainy Days</a></h4></li>
                <li><h4><a href="about.html">Our values and beliefs</a></h4></li>
                <li><h4><a href="about.html">Certifications</a></h4></li>
                <li><h4><a href="about.html">Product FAQ's</a></h4></li>
                <li><h4><a href="about.html">Return policy</a></h4></li>
            </ul>
        </section>
        <section>
            <ul>
                <li><h3>Contact us</h3></li>
                <li><h4><a href="contact.html">Customer service</a></h4></li>
                <li><h4><a href="community.html">Our community</a></h4></li>
                <li><h2><a href="#"><i class="fa-brands fa-facebook"></i> <i class="fa-brands fa-instagram"></i> <i class="fa-brands fa-youtube"></i></a></li></h2>
                <li>Follow us on social media and share your adventures!</li>
            </ul>
        </section>
        <section>
            <ul>
                <li><img src="/assets/images/logo-light.png" alt="logo of Rainy Days" class="logo"></li>
                <li>Rainy days</li>
                <li>Sunshine Alley 12,</li>
                <li>1111 Rainbowville</li>
                <li>contact@rainydays.com></li>
                <li>815 493 00</li>
            </ul>
        </section>
    </footer>`
})


