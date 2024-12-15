export function formatCurrency(price){
    const money = (price / 100).toFixed(2);
    return money
}