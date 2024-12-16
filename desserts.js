import { product } from "./data/products.js";
import { formatCurrency } from "./utilities/money.js";
import { addToCart, cart,  cartTotal} from "./cart.js";

let foodHTML = '';

const totalCart = document.querySelector('.js-cart-total');
renderCart()
cartTotal(totalCart);
product.forEach((food) => {
    foodHTML += `
        <div class="food-div js-food-item-${food.id}">
            <div class="food-img">
                <img src="${food.image}" alt="${food.title}">
                <div id="${food.id}" class="order-btn js-order-btn-${food.id}" data-food-id="${food.id}">
                    <img src="assets/food-images/icon-add-to-cart.svg" alt="cart image">
                    <p>Add to Cart</p>
                </div>
            </div>
            <h3>${food.title}</h3>
            <h1>${food.name}</h1>
            <p>$${formatCurrency(food.price)}</p>
        </div>
    `
    document.querySelector('.js-food-div').innerHTML = foodHTML;
})

document.querySelectorAll('.order-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const { foodId } = button.dataset;

        const foodItem = document.querySelector(`.js-order-btn-${foodId}`);

        if (!foodItem.classList.contains('active-order-btn')) {
            foodItem.innerHTML = `
                <div class="operation-div js-decrement" data-food-id="${foodId}">-</div>
                <div id="js-food-quantity-${foodId}" class="quantity-display">1</div>
                <div class="operation-div js-increment" data-food-id="${foodId}">+</div>
            `;

            foodItem.classList.add('active-order-btn');
        }
    });
});

document.addEventListener('click', (event) => {
    const target = event.target; // this points to the specific element that was clicked i.e either the + or the - button

    // Increment functionality
    if (target.classList.contains('js-increment')) {
        const foodId = target.dataset.foodId;
        const quantityElement = document.getElementById(`js-food-quantity-${foodId}`);

        let quantity = Number(quantityElement.textContent);
        quantity++;

        quantityElement.textContent = quantity; // Update only the quantity text
    }

    // Decrement functionality
    if (target.classList.contains('js-decrement')) {
        const foodId = target.dataset.foodId;
        const quantityElement = document.getElementById(`js-food-quantity-${foodId}`);

        let quantity = Number(quantityElement.textContent);

        if (quantity > 1) {
            quantity--;
            quantityElement.textContent = quantity; // Update only the quantity text
        }
    }
});

function renderCart(){
    let checkoutHTML = '';
    cart.forEach((foodItem) => {
        checkoutHTML += `
            <div class="checkout-details">
                <div class="checkout-content">
                    <h5>${foodItem.name}</h5>
                    <div class="content-details">
                        <div class="quantity">
                            <p>${foodItem.quantity}x</p>
                        </div>
                        <div class="price">
                            <p style="color: rgb(144, 69, 69);">@$${formatCurrency(foodItem.titlePrice)}</p>
                            <p>$${formatCurrency(foodItem.price)}</p>
                        </div>
                    </div>
                </div>
                <div class="close">
                    <p>x</p>
                </div>
            </div>
        `
    })
    document.querySelector('.js-checkout').innerHTML = checkoutHTML;
}
