const product_URL = "https://fakestoreapi.com";
fetchProducts();

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

function randerProducts(products) {
  currentProducts = products;

  const newProducts = products
    .map(({ title, price, image, category, id }) => {
      return `<div class="product-card">
        <img src="${image}" alt="${title}" class="product-image">
        <div class="product-info">
          <h3>${title}</h3>
          <p class="product-price">$${price.toFixed(2)}</p>
          <p class="product-category">${category}</p>
          <button class="add-to-cart-btn" data-id="${id}">
            Add to Cart
          </button>
        </div>
      </div>`;
    })
    .join("");
//   console.log(newProducts);

  productGrid.innerHTML = newProducts;

  productGrid.querySelectorAll(".add-to-cart-btn").forEach((button)=>{
    button.addEventListener("click",()=>{
        const { id } = button.dataset;
        let product = currentProducts.find((products)=>product.id == id);
        addToCart(product)
    })
  })

}


