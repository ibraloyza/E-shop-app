const product_URL = "https://fakestoreapi.com";
fetchProducts()

let productGrid = document.querySelector("#productGrid");
let currentProducts = [];

async function fetchProducts() {
    try {
        const response = await fetch(`${product_URL}/products`);
        let data = await response.json();
        randerProducts(data);        
    } catch (error) {
        console.log(error);
    }
}
