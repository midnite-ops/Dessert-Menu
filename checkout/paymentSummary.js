import { cart, cartSummaryCheckout, clearCart } from "../cart.js";
import { formatCurrency } from "../utilities/money.js";
import { checkoutSummaryCart } from "./checkoutSummary.js";
export function paymentSummary(){
    let paymentSummaryHTML = ''
    cart.forEach((item) => {
        paymentSummaryHTML += `
            <div class="order-package">
                <div>
                    <img src= '${item.image}'/>
                </div>
                <div class="order-details">
                    <div class="order-content">
                        <h1>${item.name}</h1>
                        <div class="order-price">
                            <p style="color: brown;">${item.quantity}x</p>
                            <p>$${formatCurrency(item.titlePrice)}</p>
                        </div>
                    </div>
                    <div style=" font-size: 0.9rem;">
                        $${formatCurrency(item.price)}
                    </div>
                </div>
            </div>
        `;
    })
    paymentSummaryHTML += `
        <div class="order-total">
            <p>Order Total:</p>
            <h2>$${formatCurrency(cartSummaryCheckout())}</h2>
        </div>
    `
    document.querySelector('.js-new-order').innerHTML = paymentSummaryHTML;
    document.querySelector('.js-overlay').classList.add('show-overlay');
    return paymentSummaryHTML;
}
function closeSummary(){
    const closeBTN = document.querySelector('.js-close-summary');
    closeBTN.addEventListener('click', () => {
        clearCart()
        checkoutSummaryCart()
        document.querySelector('.js-overlay').classList.remove('show-overlay');
        const body = document.body;
        body.style.overflow = '';
    })
}
closeSummary();
