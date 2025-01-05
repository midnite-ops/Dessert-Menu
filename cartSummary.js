import { cart, saveToCart, cartSummaryCheckout, cartTotal } from "./cart.js";
import { formatCurrency } from "./utilities/money.js";
import { totalCart } from "./desserts.js";

export function emptyCart(){
    const orderSummary = document.querySelector('.cart-summary-section');
    if(cart.length === 0){
        localStorage.clear()
        orderSummary.classList.add('hide-summary')
        console.log(orderSummary)
        document.querySelector('.js-checkout').innerHTML = 
        `
            <div class= 'empty-cart'>
                <img src="assets/food-images//illustration-empty-cart.svg" alt="empty cart">
                <p>Your added items will appear here</p>
            </div>
        `
    }
    else{
        orderSummary.classList.remove('hide-summary')
    }
}
export function renderCart(){
    let checkoutHTML = '';
    emptyCart();
    cart.forEach((foodItem) => {
        checkoutHTML += `
            <div class="checkout-details js-container-${foodItem.id}">
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
                <div class="close js-close js-delete-cart-${foodItem.id}" data-remove-cart = '${foodItem.id}'>
                    <p>x</p>
                </div>
            </div>
        `
    })
    document.querySelector('.js-checkout').innerHTML = checkoutHTML;
    document.querySelectorAll('.js-close').forEach((button)  => {
        button.addEventListener('click', () => {
            const closeBtnId = button.dataset.removeCart;
            const foodContainer = document.querySelector(`.js-container-${closeBtnId}`);
            cart.forEach((foodItem, index) => {
                if(foodItem.id === closeBtnId){
                    cart.splice(index, 1)
                    foodContainer.remove()
                    saveToCart()
                    emptyCart()
                    cartTotal(totalCart);
                    document.querySelector('.js-cart-summary').innerHTML = `$${formatCurrency(cartSummaryCheckout())}`;
                    console.log(cart)
                }
            })
        })
    })
}
export function  cartSummary(){
    let cartSummary;
    const cartTotal = cartSummaryCheckout()
    cartSummary = `
        <section class= 'cart-summary-section'>
            <div class= "summary-div-1">
                <p>Order Total</p>
                <h1 class= 'js-cart-summary'>$${formatCurrency(cartTotal)}</h1>
            </div>
            <div class = "summary-div-2">
                <img src = "../assets/food-images/icon-carbon-neutral.svg">
                <p>This is a carbon-neutral delivery</p>
            </div>
            <button>Confirm Order</button>
        </section>
    `
    document.querySelector('.checkout-div').innerHTML += cartSummary;
}