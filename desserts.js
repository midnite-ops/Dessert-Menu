import { product } from "./data/products.js";
import { formatCurrency } from "./utilities/money.js";
import { addToCart, cartTotal, decrementCartItem, cart} from "./cart.js";
import { checkoutSummaryCart } from "./checkout/checkoutSummary.js";

//This function renders the checkout summary
checkoutSummaryCart()

let foodHTML = '';

//Creates and renders the products items in the page
product.forEach((food) => {
    foodHTML += `
        <div class="food-div">
            <div class="food-img js-food-item-${food.id}">
                <img class='food-image' src="${food.image}" alt="${food.title}">
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

//This function is triggered when the add to cart button is clicked
document.querySelectorAll('.order-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const { foodId } = button.dataset;

        const foodItem = document.querySelector(`.js-order-btn-${foodId}`);
        const foodImg = document.querySelector(`.js-food-item-${foodId}`);
        let quantityNum = ''
        cart.forEach((item) => {
            if(item.id === foodId){
                quantityNum = item.quantity;
            }
        })
        if(quantityNum === ''){
            quantityNum = 1;
        }
        if (!foodItem.classList.contains('active-order-btn')) {
            foodItem.innerHTML = `
                <div class="operation-div js-decrement" data-food-id="${foodId}">-</div>
                <div id="js-food-quantity-${foodId}" class="quantity-display">${quantityNum}</div>
                <div class="operation-div js-increment" data-food-id="${foodId}">+</div>
            `;
            const product = productId(foodId);
            const quantity = Number(document.getElementById(`js-food-quantity-${foodId}`).innerHTML);
            addToCart(product, quantity);
            checkoutSummaryCart()
            console.log(cart)
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
        checkoutSummaryCart()
        console.log(cart)

        quantityElement.textContent = quantity; // Update only the quantity text
    }

    // Decrement functionality
    if (target.classList.contains('js-decrement')) {
        const quantityElement = document.getElementById(`js-food-quantity-${foodId}`);
        
        let quantity = decrementCartItem(productItem);
        let quantityNum = Number(quantityElement.textContent);
        quantityNum--;
        if(quantityNum <= 1){
            console.log('yes')
            quantityNum = 1;
        }
        checkoutSummaryCart()
        console.log(cart)
        quantityElement.textContent = quantityNum; 
    }
})
//This fucntion returns an obeject on the condition that the parameter id matches the product id
function productId(itemId){
    let productItem;
    product.forEach((item) => {
        if(item.id === itemId){
            productItem =  item
        }
    })
    return productItem;
}