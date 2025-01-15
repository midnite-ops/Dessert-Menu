import {cart, saveToCart, cartTotal, cartSummaryCheckout} from "../cart.js";
import { formatCurrency } from "../utilities/money.js";
import { paymentSummary } from "./paymentSummary.js";

export function checkoutSummaryCart(){
    const totalCart = document.querySelector('.js-cart-total');
    cartTotal(totalCart);
    if(cart.length === 0){
        document.querySelector('.js-checkout').innerHTML = 
        `
            <div class= 'empty-cart'>
                <img src="assets/food-images//illustration-empty-cart.svg" alt="empty cart">
                <p>Your added items will appear here</p>
            </div>
        `
        document.querySelector('.js-checkout-summary').innerHTML = '';
    }
    else{
        let checkoutHTML = '';
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
                                <p style="color: gray;">@$${formatCurrency(foodItem.titlePrice)}</p>
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
                    checkoutSummaryCart()
                }
            })
        })
    })
    let cartSummary;
    const cartTotalValue = cartSummaryCheckout()
    cartSummary = `
        <section class= 'cart-summary-section'>
            <div class= "summary-div-1">
                <p>Order Total</p>
                <h1 class= 'js-cart-summary'>$${formatCurrency(cartTotalValue)}</h1>
            </div>
            <div class = "summary-div-2">
                <img src = "../assets/food-images/icon-carbon-neutral.svg">
                <p>This is a carbon-neutral delivery</p>
            </div>
            <button class= "js-confirm-order">Confirm Order</button>
        </section>
    `
    document.querySelector('.js-checkout-summary').innerHTML = cartSummary;
    document.querySelector('.js-confirm-order').addEventListener('click', () => {
        const body = document.body;
        body.style.overflow = 'hidden';
        console.log(paymentSummary());
    })
    }
}