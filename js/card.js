// const obj =  {
//             id: 1,
//             imgUrl: "/image/Rectangle 32.png",
//             title: "Тауық Паелла",
//             desc: "Біз жай ғана тамақ жасамаймыз және сатпаймыз.Жақсы тамақ жылынады.",
//             price: 3000 ,
//             quantity: 1
//         }
// const cartsContainer = document.querySelector(".cart-items");
// cartsContainer.appendChild(createCartItem(obj));



function createCartItem(cartItemData) {
    const { img, title, desc, price, quantity } = cartItemData;
  
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    
    const cartItemLeft = document.createElement("div");
    cartItemLeft.classList.add("cart-item-left");
  
    const imgg = document.createElement("img");
    imgg.src = "../" + img;
    imgg.alt = "";
  
    const cartItemLeftActions = document.createElement("div");
    cartItemLeftActions.classList.add("cart-item-left-actions");
  
    const itemNameLink = document.createElement("a");
    itemNameLink.href = "#";
    itemNameLink.textContent = title + " - " + desc;
  
    const cartItemAmount = document.createElement("div");
    cartItemAmount.classList.add("cart-item-amount");
  
    const trashButton = document.createElement("button");
    trashButton.innerHTML =
      cartItemData.quantity > 1
        ? '<ion-icon name="remove"></ion-icon>'
        : '<ion-icon name="trash-outline"></ion-icon>';
    trashButton.addEventListener("click" , () => decreaseQuantity(cartItemData))
  
    const amountText = document.createElement("p");
    amountText.textContent = quantity;
  
    const addButton = document.createElement("button");
    addButton.innerHTML = '<ion-icon name="add-outline"></ion-icon>';
    addButton.addEventListener("click" , () => increaseQuantity(cartItemData))
  
    cartItemAmount.appendChild(trashButton);
    cartItemAmount.appendChild(amountText);
    cartItemAmount.appendChild(addButton);
  
    cartItemLeftActions.appendChild(itemNameLink);
    cartItemLeftActions.appendChild(cartItemAmount);
  
    cartItemLeft.appendChild(imgg);
    cartItemLeft.appendChild(cartItemLeftActions);
  
    const cartItemRight = document.createElement("div");
    cartItemRight.classList.add("cart-item-right");
  
    const closeButton = document.createElement("button");
    closeButton.innerHTML = '<ion-icon name="close-outline"></ion-icon>';
    closeButton.addEventListener("click", () => removeProduct(cartItemData));
  
    const priceText = document.createElement("p");
    priceText.textContent = getPrice(price*quantity) + " ₸";
  
    cartItemRight.appendChild(closeButton);
    cartItemRight.appendChild(priceText);
  
    cartItem.appendChild(cartItemLeft);
    cartItem.appendChild(cartItemRight);
  
    return cartItem;
  }

  const url = "https://65d6de2ef6967ba8e3bec5fd.mockapi.io/product-food";
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((product) => {
        container.appendChild(createFoodCard(product));
    })
  })

  .catch((error => {
    container.innerHTML = `<p>Error occured. Error: ${error}<p>`;
  }))

  function getPrice(price) {
    let priceStr = String(price);
    if (priceStr.length > 4) {
      const priceSlices = [];
      for (let i = priceStr.length - 3; i >= 0; i -= 3) {
        priceSlices.unshift(priceStr.slice(i > 0 ? i : 0, i + 3));
        priceStr = priceStr.slice(0, i);
      }
      priceSlices.unshift(priceStr);
      priceStr = priceSlices.join(" ");
    }
    return priceStr;
  }


  const cart = localStorage.getItem("cart");
const cartItems = JSON.parse(cart) || [];
for (const item of cartItems) {
  const card = createCartItem(item);
  document.querySelector(".cart-items").appendChild(card);
}

function removeProduct(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((p) => p.id != product.id);
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}

function getCartSize() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.length;
}


function increaseQuantity(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.map((p) =>
    p.id == product.id ? { ...p, quantity: p.quantity + 1 } : p
  );
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}

function decreaseQuantity(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (product.quantity > 1) {
    cart = cart.map((p) =>
      p.id == product.id ? { ...p, quantity: p.quantity - 1 } : p
    );
  } else {
    cart = cart.filter((p) => p.id !== product.id);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}

const clearcard = document.querySelector("#clear-cart");
clearcard.addEventListener("click", () => {
  localStorage.removeItem("cart");
  window.location.reload();
})

function getPrices() {
   const cart = JSON.parse(localStorage.getItem("cart")) || [];
   if (cart.length == 0){
    return{
      productsPrice: 0,
      deliveryPrice: 0,
      totalPrice: 0
    }
   }
   let productsPrice = 0;
   cart.forEach(cartItem => productsPrice += cartItem.price *cartItem.quantity);
   const deliveryPrice = productsPrice > 5000 ? 0 : 1100;
   const totalPrice = productsPrice + deliveryPrice;
   return {
    productsPrice,
    deliveryPrice,
    totalPrice
   }
}

const prdPriceText = document.querySelector("#products-price");
const delPriceText = document.querySelector("#delivery-price");
const totalPriceText = document.querySelector("#total-price");
const {productsPrice, deliveryPrice, totalPrice} = getPrices();
prdPriceText.textContent = getPrice(productsPrice) + "₸";
delPriceText.textContent = getPrice(deliveryPrice) + "₸";
totalPriceText.textContent = getPrice(totalPrice) + "₸";

const cartSize = document.querySelector("#cart-size");
cartSize.textContent = getCartSize();

const displayCartBtn = document.querySelector("#display-cart button");
displayCartBtn.addEventListener("click", () => {
  const cartItems = document.querySelector(".cart-items");
  cartItems.classList.toggle("hidden");
  if (cartItems.classList.contains("hidden")){
    displayCartBtn.innerHTML = '<ion-icon name="chevron-down-outline"></ion-icon>';
    }else{
      displayCartBtn.innerHTML = '<ion-icon name="chevron-up-outline"></ion-icon>';
    }
})