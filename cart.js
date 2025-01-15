export let cart = JSON.parse(localStorage.getItem('cart'));

if(cart.length === 0 || !cart){
    cart = [
        {
            name: 'Waffle with Berries',
            price: 650,
            titlePrice: 650,
            quantity: 1,
            id: 'ac4a6449-efc1-4a6e-9171-862decdba187',
            image: './assets/food-images/image-waffle-desktop.jpg'
        }
    ]
}

export function saveToCart(){
    localStorage.setItem('cart', JSON.stringify(cart))
}
export function clearCart(){
    cart = [];
    saveToCart()
}
export function cartSummaryCheckout(){
    let cartTotal = 0;
    cart.forEach((item) => {
        cartTotal += item.price;
    })
    return cartTotal;
}

export function addToCart(product, newQuantity){
    let matchingFood;
    cart.forEach((food) => {
        if(food.id === product.id){
            matchingFood = food
        }
    })
    if(matchingFood){
        matchingFood.quantity = newQuantity;
        matchingFood.price = (newQuantity * matchingFood.titlePrice)
        saveToCart()
    }else{
        cart.push({
            image: product.image,
            name: product.name,
            price: product.price,
            titlePrice: product.price,
            quantity: newQuantity,
            id: product.id
        })
        saveToCart()
    }
}

 export function decrementCartItem(product){
    let matchingFood;
    cart.forEach((food) => {
        if(food.id === product.id){
            matchingFood = food
        }
    })
    if(matchingFood){
        if(matchingFood.quantity <= 1){
            matchingFood.quantity = 1;
            saveToCart()
        }else{
            matchingFood.quantity--
            saveToCart()
        }
        const quantity = matchingFood.quantity;
        matchingFood.price = quantity * matchingFood.titlePrice;
        console.log(cart)
        saveToCart()
        return  quantity
    }
 }

export function cartTotal(value){
    let total = 0
    cart.forEach((item) => {
        total += item.quantity
    })
    value.innerHTML = total
}
// sass --watch styles/main.scss:css/main.css
// // sass --watch styles/checkout.scss:css/checkout.css
// sass --watch styles/main.scss:css/main.css styles/checkout.scss:css/checkout.css styles/order-confirmed.scss:css/order-confirmed.css
