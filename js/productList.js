import products from './db.js';

import checkTotal from './products.js'


const ArduinoProducts = products.filter(product =>product.category === 'ARDUINO');
const ST32Products = products.filter(product =>product.category === 'ST32');
const ESP32Products = products.filter(product =>product.category === 'ESP32');











const GITHUB_PAGE_PATH = '/microstore'
const STORAGE_KEY = "carrito";

const loadCart = () => {
    const storedCart = localStorage.getItem(STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
};

const saveCart = (cart) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
};

let compras = loadCart();














const  updateShoppingCartNavbar = ()=> {
    const shoppingCartContainer = document.getElementById('shoppingCartContainer');
    const totalAmountElement = document.getElementById('totalAmount');
    const totalItemsElement = document.getElementById('totalItems');

    let myCart = loadCart();

    // GENERAS LA LISTA DE PRODUCTOS SELECCIONADOS
    let cart = products.filter(element => myCart.includes(element.id))
    let total =  cart.reduce((sum, product) => sum + product.price, 0);;

    if (compras.length > 0) {
        totalAmountElement.textContent = `Total: $${total}`;
        totalItemsElement.textContent =  `Items: ${cart.length}`;
        shoppingCartContainer.classList.remove('d-none'); // Remueve la clase
    }
    else {
        shoppingCartContainer.classList.add('d-none');

    }



}

let botonPagar = document.getElementById("goCart");

botonPagar.addEventListener('click', ()=> {
    // Lógica para redirigir al proceso de pago
    console.log("vamos a pagar la compra pibe");
    window.location.href = "./shopcase.html";
}
)


// Actualizar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', updateShoppingCartNavbar);


updateShoppingCartNavbar();





const CreateElement = ({ id, name, short_description, more_description, price, img = "" }) => {
    console.log("Creando un nuevo elemento\n");
    let element = document.createElement('div');
    element.className = 'card mb-4';
    element.innerHTML = `
        <div class="card m-2 p-0">
            <div class="row g-0">
                <div class="col-md-5 h-10 d-flex justify-content-center align-items-center">
                    <img src=${img} class="img-fluid mt-4 h-10 m" alt="Producto 1">
                </div>
                <div class="col-md-6 g-2">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text"> ${short_description}
                            <span class="d-none d-md-block">${more_description} </span>
                        </p>
                        <div class="row">
                            <h3 class="text-primary fw-bold w-50 col-lg-8 pt-3 pb-2">$${price}</h3>
                            <button data-product-id="${parseInt(id)}" class="btn ${(compras.includes(parseInt(id)))?'btn-info':'btn-primary'} col-lg-4 mt-2 mb-2 p-1 w-50"> ${(compras.includes(parseInt(id)))?'Seleccionado':'Comprar'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Agregar evento click al botón "Comprar"
    const button = element.querySelector('button[data-product-id]');
    button.addEventListener('click', () => {
        goToCheckout(button,button.dataset.productId);
    });

    return element;
};

// Función para manejar el checkout
function goToCheckout(button,productId) {
   
    productId = parseInt(productId)
    if(compras.includes(productId)){
        const index = compras.indexOf(productId);

        compras.splice(index, 1);
        console.log(`producto removido:${productId}, cesta:${compras}`);
        button.classList.remove('btn-info'); // Remueve la clase
        button.classList.add('btn-primary'); // Alterna la clase
        button.textContent = "Comprar";
    }
    else{

        compras.push(productId);
        console.log(`producto agregado:${productId}, cesta:${compras}`);
        button.classList.remove('btn-primary'); // Remueve la clase
        button.classList.add('btn-info'); // Alterna la clase
        button.textContent = "Seleccionado";
    }
    saveCart(compras);

    updateShoppingCartNavbar();
    

   
}
    
    const showBox = (elements,nameBox) => {
    
        const myShoopingBox = document.getElementById(nameBox);
        console.log(`Box: ${myShoopingBox}`)

        
        elements.forEach(element => {
            console.log(`element ${element}`)
            let newElement = CreateElement(element);
            myShoopingBox.appendChild(newElement);
        });
        
     
        const total = elements.reduce((sum, product) => sum + product.price, 0);
        console.log(total)
    
    }

let path = window.location.pathname;


const ARDUINO_PATH = 'arduino'
const ESP32_PATH = 'esp32'
const STM32_PATH = 'stm32'
console.log(path);

if(path.includes(ARDUINO_PATH)){
    console.log("Dibujando los productos arduino\n");
    showBox(ArduinoProducts,'cards-content')
} 

if(path.includes(ESP32_PATH)){
    console.log("Dibujando los productos arduino\n");
    showBox(ESP32Products,'cards-content')
} 

if(path.includes(STM32_PATH)){
    console.log("Dibujando los productos arduino\n");
    showBox(ST32Products,'cards-content')
} 



export default updateShoppingCartNavbar;