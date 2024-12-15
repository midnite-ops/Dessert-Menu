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
                <div class="order-btn js-order-btn-${food.id}" data-food-id = "${food.id}">
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
        const { foodId } = button.dataset; // Get the food ID from the button

        const foodItem = document.querySelector(`.js-order-btn-${foodId}`);
        foodItem.innerHTML = `
            <div class="js-decrement-${foodId} operation-div">-</div>
            <div class="js-food-quantity-${foodId}">1</div>
            <div class="js-increment-${foodId} operation-div">+</div>
        `;
        foodItem.classList.add('active-order-btn');

        // Now, after updating the HTML, add the event listener
        const incrementButton = document.querySelector(`.js-increment-${foodId}`);
        if (incrementButton) {
            incrementButton.addEventListener('click', () => {
                console.log(`Increment button clicked for food ID: ${foodId}`);
                const quantityElement = document.querySelector(`.js-food-quantity-${foodId}`);
                if (quantityElement) {
                    let quantity = Number(quantityElement.innerHTML);
                    quantity++; // Increment the quantity
                    quantityElement.innerHTML = quantity; // Update the quantity
                    console.log(`Updated quantity to: ${quantity}`);
                }
            });
        } else {
            console.error(`Increment button not found for food ID: ${foodId}`);
        }

        // Same for the decrement button
        const decrementButton = document.querySelector(`.js-decrement-${foodId}`);
        if (decrementButton) {
            decrementButton.addEventListener('click', () => {
                console.log(`Decrement button clicked for food ID: ${foodId}`);
                const quantityElement = document.querySelector(`.js-food-quantity-${foodId}`);
                if (quantityElement) {
                    let quantity = Number(quantityElement.innerHTML);
                    if (quantity > 1) {
                        quantity--; // Decrement only if greater than 1
                        quantityElement.innerHTML = quantity;
                        console.log(`Updated quantity to: ${quantity}`);
                    }
                }
            });
        } else {
            console.error(`Decrement button not found for food ID: ${foodId}`);
        }
    });
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
