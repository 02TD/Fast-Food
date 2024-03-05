// const food =[
//     {
//         id: 1,
//         img: "/image/Rectangle 32.png",
//         title: "Тауық Паелла",
//         desc: "Біз жай ғана тамақ жасамаймыз және сатпаймыз.Жақсы тамақ жылынады.",
//         price: 3000 ,
//         quantity: 1
//     },
//     {
//         id: 2,
//         img: "/image/Rectangle 33.png",
//         title: "Тако-Дель-Мар",
//         desc: "Taco Del Mar мексикалық тағамдардың ең жақсысын балғындықпен ұсынады.",
//         price: 4300 ,
//         quantity: 1
//     },
//     {
//         id: 3,
//         img: "/image/Rectangle 34.png",
//         title: "Нанға Жақсы",
//         desc: "BonAu Pain-салауатты фаст-фуд сахнасының пионері.",
//         price: 2400 ,
//         quantity: 1
//     },
//     {
//         id: 4,
//         img: "/image/Rectangle 35.png",
//         title: "Пицца Үйі",
//         desc: "Pizza Hut Мәзірінің Бағасы жылдар бойы төмендегенімен.",
//         price: 3500 ,
//         quantity: 1
//     },
// ]

// console.log(JSON.stringify(food))


function createFoodCard(product) {
    const {id, img, title, desc, price, quantity} = product;
    // Create a div element
    var foodCardDiv = document.createElement('div');
    foodCardDiv.className = 'food-list__card';

    // Create an img element
    var imgElement = document.createElement('img');
    imgElement.className = 'food-list__img';
    imgElement.src = img;
    imgElement.alt = '';

    // Create a div element for text content
    var textWrapperDiv = document.createElement('div');
    textWrapperDiv.className = 'food-list__text-wrapper';

    // Create an h4 element for the title
    var titleElement = document.createElement('h4');
    titleElement.className = 'food-list__title';
    titleElement.textContent = title;

    // Create a p element for the description
    var descElement = document.createElement('p');
    descElement.className = 'food-list__desc';
    descElement.textContent = desc;

    // Create a span element for the price
    var priceElement = document.createElement('span');
    priceElement.className = 'product__price';
    priceElement.textContent = price + '₸';

    // Create a button element
    var orderButton = document.createElement('button');
    orderButton.className = 'btn btn--small';
    orderButton.textContent = 'ТАПСЫРЫС';
    if (isAddedToCart(product)){
        orderButton.textContent = 'ҚАБЫЛДАНДЫ';
        orderButton.enabled = false;        
    }else{
        orderButton.textContent = 'ТАПСЫРЫС';
        orderButton.addEventListener("click", () =>{
            addToCart(product);
        });
    }

    // Append elements to the DOM
    textWrapperDiv.appendChild(titleElement);
    textWrapperDiv.appendChild(descElement);
    textWrapperDiv.appendChild(priceElement);
    textWrapperDiv.appendChild(orderButton);

    foodCardDiv.appendChild(imgElement);
    foodCardDiv.appendChild(textWrapperDiv);

    // Return the created food card
    return foodCardDiv;
}


const container = document.querySelector(".food-list .container"); // container

// for (const rest of food) {
//     const card = createFoodCard(rest);
//     container.appendChild(card);
// }

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


  function addToCart(product) {
    const cart = localStorage.getItem("cart");
    const cartItems = JSON.parse(cart) || [];
    if (isAddedToCart(product)) {
      return;
    }
    cartItems.push({...product, quantity: 1});
    localStorage.setItem("cart", JSON.stringify(cartItems));
    window.location.reload();
  }
  
  function isAddedToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.find((p) => p.id == product.id) != null;
  }