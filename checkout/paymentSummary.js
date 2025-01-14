import { cart } from "../cart";
export function paymentSummary(){
    let paymentSummaryHTML = `
        <div class="order-package">
            <div>
                <img src= "assets/food-images/image-cake-desktop.jpg"/>
            </div>
            <div class="order-details">
                <div class="order-content">
                    <h1>Classic Tiramisu</h1>
                    <div class="order-price">
                        <p style="color: brown;">1x</p>
                        <p>$344.0</p>
                    </div>
                </div>
                <div style=" font-size: 0.9rem;">
                    $5.50
                </div>
            </div>
        </div>
        <div class="order-total">
            <p>Order Total:</p>
            <h2>$60.00</h2>
        </div>
    `;
    document.querySelector('.js-new-order').innerHTML = paymentSummaryHTML;
    document.querySelector('.js-overlay').classList.add('show-overlay');
    return paymentSummaryHTML;
}
function closeSummary(){
    const closeBTN = document.querySelector('.js-close-summary');
    closeBTN.addEventListener('click', () => {
        document.querySelector('.js-overlay').classList.remove('show-overlay');
    })
}
closeSummary();
