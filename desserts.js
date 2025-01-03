import { product } from "./data/products.js";
import { formatCurrency } from "./utilities/money.js";
import { addToCart, cart, cartTotal, decrementCartItem} from "./cart.js";

let foodHTML = '';

const totalCart = document.querySelector('.js-cart-total');
renderCart()
cartTotal(totalCart);
product.forEach((food) => {
    foodHTML += `
        <div class="food-div">
            <div class="food-img js-food-item-${food.id}">
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
        const foodImg = document.querySelector(`.js-food-item-${foodId}`);

        if (!foodItem.classList.contains('active-order-btn')) {
            foodItem.innerHTML = `
                <div class="operation-div js-decrement" data-food-id="${foodId}">-</div>
                <div id="js-food-quantity-${foodId}" class="quantity-display">1</div>
                <div class="operation-div js-increment" data-food-id="${foodId}">+</div>
            `;
            const product = productId(foodId);
            const quantity = Number(document.getElementById(`js-food-quantity-${foodId}`).innerHTML);
            addToCart(product, quantity);
            renderCart()
            cartTotal(totalCart);
            foodImg.classList.add('show-border');
            foodItem.classList.add('active-order-btn');
        }
    });
});

document.addEventListener('click', (event) => {
    const target = event.target; // this points to the specific element that was clicked i.e either the + or the - button
    const foodId = target.dataset.foodId;
    let productItem = productId(foodId)
    // Increment functionality
    if (target.classList.contains('js-increment')) {
        const quantityElement = document.getElementById(`js-food-quantity-${foodId}`);

        let quantity = Number(quantityElement.textContent);
        quantity++;
        addToCart(productItem, quantity)
        renderCart()
        cartTotal(totalCart);

        quantityElement.textContent = quantity; // Update only the quantity text
    }

    // Decrement functionality
    if (target.classList.contains('js-decrement')) {
        const quantityElement = document.getElementById(`js-food-quantity-${foodId}`);
        const product = productId(foodId);

        let quantity = decrementCartItem(product);
        renderCart()
        cartTotal(totalCart);
        quantityElement.textContent = quantity; 
    }
})

function renderCart(){
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
                    cartTotal(totalCart)
                    console.log(cart)
                }
            })
        })
    })
}
function productId(itemId){
    let productItem;
    product.forEach((item) => {
        if(item.id === itemId){
            productItem =  item
        }
    })
    return productItem;
}
