import Commerce from '@chec/commerce.js';

// Create a Commerce instance
export  const commerce = new Commerce('pk_49359d72c0efa6efa17b994a64c0a03d2e54367b22fd3');

// Header fetch
export async function getFilteredProduct(input){
    try {
        const products= await commerce.products.list({
            query: `${input}`
        });
        return products
    } catch (error) {
        console.log(error.message);
    }
}

// NavProducts fetch
export async function getAllProducts(){
    try {
        const products= await commerce.products.list();
        return products
    } catch (error) {
        console.log(error.message);
    }
}
export async function getAllProductsByCategory(category, sort, page){
    try {
        const products= await commerce.products.list({
            category_slug : `${category}`,
            sortBy:  `${sort}`,
            page: `${page}`,
            limit: 6
        });
        return products 
    } catch (error) {
        console.log(error.message);
    }
}
export async function getAllProductsByQuery( filter, sort, page, category){
    try {
        const products= await commerce.products.list({
            query: filter, 
            sortBy:  `${sort}`,
            page: `${page}`,
            category_slug : `${category}`,
            limit: 6,
        });
        return products 
    } catch (error) {
        console.log(error.message);
    }
}
export async function getAllCategories(){
    try {
        const categories= await commerce.categories.list()
        return categories
    } catch (error) {
        console.log(error.message);
    }
}

// Product-details fetch
export async function getProduct(phoneId){
    try {
        const product= await  commerce.products.retrieve(`${phoneId}`)
        return product
    } catch (error) {
        console.log(error.message);
    }
}

export async function createCart(){
    try {
        const product= await  commerce.cart.retrieve()
        // console.log(product.id);
        return product
        if (product?.id) {
            localStorage.setItem("cart_id", product?.id)
        }
    } catch (error) {
        console.log(error.message);
    }
}

// Basket fetch
export async function addProductToCart(phoneId, count){
    try {
        const product= await  commerce.cart.add(`${phoneId}`, count)
        return product
    } catch (error) {
        console.log(error.message);
    }
}

export async function getProductFromBasket(){
    try {
        const product= await  commerce.cart.retrieve()
        return product
    } catch (error) {
        console.log(error.message);
    }
}

export async function updateCart(phoneId, count){
    try {
        const product= await  commerce.cart.update(`${phoneId}`, { quantity: `${count}` })
        return product
    } catch (error) {
        console.log(error.message);
    }
}

export async function removeFromCart(id){
    try {
        const product= await  commerce.cart.remove(`${id}`)
        return product
    } catch (error) {
        console.log(error.message);
    }
}








