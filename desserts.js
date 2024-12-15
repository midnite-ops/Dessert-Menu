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
        const { foodId } = button.dataset;
        let foodItem = document.querySelector(`.js-order-btn-${foodId}`)
        foodItem.innerHTML = 
        `
            <div class= 'js-decrement-${foodId} operation-div' data-operation = '${foodId}' onclick = ${opBtns()}>
                -
            </div>
            <div class= 'js-food-quantity-${foodId}'>1</div>
            <div class= 'js-increment-${foodId} operation-div' data-operation = ${foodId}>
                +
            </div>
        `;
        foodItem.classList.add('active-order-btn');
        function opBtns(operation){
            const quantity = document.querySelector(`.js-food-quantity-${foodId}`);
            if(operation === '+'){
                quantity.innerHTML = 'meat'
                console.log('yes')
            }
        }
    })
})
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
