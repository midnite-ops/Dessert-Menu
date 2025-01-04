export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
    cart = [
        {
            name: 'Waffle with Berries',
            price: 650,
            titlePrice: 650,
            quantity: 1,
            id: 'ac4a6449-efc1-4a6e-9171-862decdba187'
        }
    ]
}

export function saveToCart(){
    localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(product, newQuantity){
    let matchingFood;
    cart.forEach((food) => {
        if(food.id === product.id){
            matchingFood = food
        }
    })
    if(matchingFood){
        matchingFood.quantity = newQuantity
        matchingFood.price = (newQuantity * matchingFood.titlePrice)
    }else{
        cart.push({
            name: product.name,
            price: product.price,
            titlePrice: product.price,
            quantity: newQuantity,
            id: product.id
        })
    }
    saveToCart()
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
        }else{
            matchingFood.quantity--
        }
        const quantity = matchingFood.quantity;
        matchingFood.price = quantity * matchingFood.titlePrice;
        console.log(cart)
        return  quantity
    }
    saveToCart()
 }

export function cartTotal(value){
    let total = 0
    cart.forEach((item) => {
        total += item.quantity
    })
    value.innerHTML = total
}

export function removeCartItem(productId){
    let matchingFood;
    cart.forEach((food) => {
        if(food.id === product.id){
            matchingFood = food
        }
    })
}
// sass --watch styles/main.scss:css/main.css