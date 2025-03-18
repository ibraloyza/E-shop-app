const product_URL = "https://fakestoreapi.com";
fetchProducts();
fetchCategories();

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

// let categoryFilter = document.querySelector("#categoryFilter");
// let currentCategory = [];

function fetchCategories(){
    fetch(`${product_URL}/products/categories`)
    .then((response) => (response.json()))
    .then((data) => renderCategories(data))
    .catch((error) => console.log(error))
}


function renderCategories(categories){
    categoryFilter.innerHTML += categories.map(
        (category) =>
          `<option value="${category}">${
            category[0].toUpperCase() + category.slice(1)
          }</option>`
      );
}

let cartBtn = document.querySelector("#cartBtn")
let cartModel  = document.querySelector("#cartModel")
let cartItems = document.querySelector("#cartItems");
let closeCartModel = document.querySelector("#closeCartModel")


cartBtn.addEventListener("click", ()=>{
    cartModel.classList.add("active");
    randerCart();
});

closeCartModel.addEventListener("click", ()=>{
    cartModel.classList.remove("active");
});

function randerCart(){
    let cart = JSON.parse(localStorage.getItem("cart"));
    cartItems.innerHTML = cart
    .map((item) =>
    `
    <div class="cart-item">
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-details">
            <h4>${item.title}</h4>
            <p>${item.price.toFixed(2)}× ${item.quantity}</p>
        </div>
        <div class="cart-item-actions">
            <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
            <span>${item.quantity}</span
            <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
        </div>
    </div>
    
    `
    )
    .join("");

    cartItems.querySelector(".quantity-btn").forEach((quantityBtn) =>{
        quantityBtn.addEventListener("click", () =>{
            const { id, action } = quantityBtn.dataset;

            let cartItem = cart.find((cart) => cart.id = id);

            if(action == increase){
                cartItem.quantity +=1;
                localStorage.setItem("cart", JSON.stringify(cart));
            }
            else if(action == decrease){
                cartItem.quantity -=1;
                if(cartItem.quantity == 0){
                    cart = cart.filter((cart) => cart.id !=id);
                }
                localStorage.setItem("cart", JSON.stringify(cart));
            }
            countItemInTheCart();
            randerCart();
        });
    });
}

function addToCart(item){
    let carts = JSON.parse(localStorage.getItem("cart")) || [];

    let existItem = carts.find((cart) => cart.id == item.id);

    if (existItem) {
        existItem.quantity +=1;;
    }
    else{
        carts.push({...item, quantity:1});
    }
    localStorage.setItem("cart", JSON.stringify(carts));
    countItemInTheCart();
}


