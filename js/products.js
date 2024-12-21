import products from './db.js';


import updateShoppingCartNavbar from './productList.js'
const STORAGE_KEY = "carrito";

const loadCart = () => {
    const storedCart = localStorage.getItem(STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
};
const saveCart = (cart) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
};


// CARGAS LOS IDS
let myCart = loadCart();

// GENERAS LA LISTA DE PRODUCTOS SELECCIONADOS
let cart = products.filter(element => myCart.includes(element.id))






let ShopBox = localStorage.getItem('ShopBox');

console.log(products)



const totalPrice = document.getElementById('total-price');

const checkTotal = ()=>{
    // CARGAS LOS IDS
    let myCart = loadCart();

    // GENERAS LA LISTA DE PRODUCTOS SELECCIONADOS
    let cart = products.filter(element => myCart.includes(element.id))
    return cart.reduce((sum, product) => sum + product.price, 0);;
}


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
                        <h3 class="text-primary fw-bold w-50 col-lg-10 pt-3 pb-2">$${price}</h3>
                        <button data-product-id="${parseInt(id)}" class="btn btn-danger col-lg-2 mt-2 mb-2 p-1 w-50"> Remover</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

    // Agregar evento click al botón "Comprar"
    const button = element.querySelector('button[data-product-id]');
    button.addEventListener('click', () => {
        console.log("Q onda")
        goToCheckout(button, button.dataset.productId);
    });

    return element;

}

function goToCheckout(button, productId) {

    productId = parseInt(productId)

    if (myCart.includes(productId)) {
        const index = myCart.indexOf(productId);

        myCart.splice(index, 1);
        console.log(`producto removido:${productId}, cesta:${myCart}`);
        button.classList.remove('btn-danger'); // Remueve la clase
        button.classList.add('btn-secondary'); // Alterna la clase
        button.textContent = "Agregar nuevamente";
    }
    else {

        myCart.push(productId);
        console.log(`producto agregado:${productId}, cesta:${myCart}`);
        button.classList.remove('btn-secondary'); // Remueve la clase
        button.classList.add('btn-danger'); // Alterna la clase
        button.textContent = "Remover";
    }
    saveCart(myCart);
    cart = products.filter(element => myCart.includes(element.id))
    const totalPrice = document.getElementById('total-price');

    totalPrice.innerHTML = `$${checkTotal()}`;
    updateShoppingCartNavbar();




}



const showBox = (nameBox) => {

    const myShoopingBox = document.getElementById(nameBox);
    console.log(`Box: ${myShoopingBox}`)
    if(checkTotal()>0){

        cart.forEach(element => {
            let newElement = CreateElement(element);
            myShoopingBox.appendChild(newElement);
        });
    
        const totalPrice = document.getElementById('total-price');    
        totalPrice.innerHTML = `$${checkTotal()}`;
        let showMeCart = document.getElementById('cart-no-empty');
        showMeCart.classList.remove('d-none')

    }
    else{
        let emptyElements = document.getElementsByClassName("empty-cart");
        emptyElements.forEach(element=>element.classList.remove('d-none')); // Remueve la clase
    }

}



console.log(`Creando la canasta de productos: ${myCart}`);


if(window.location.pathname == '/shopcase.html'){
    showBox('myBox');

// Envio de factura

// Recuperar los datos del sessionStorage
const productos = cart;
const total = checkTotal();

// Mostrar el resumen de la compra
const resumen = document.getElementById("detalle");
let resumenTexto = "";






resumenTexto += `
    <table class="table mb-4">


        <thead>
    
            <tr>
                <th>Resumen de producto</th>
                <th>Precio</th>
            </tr>
        </thead>
        <tbody>
`;

for (let i = 0; i < productos.length; i++) {
    const producto = productos[i];
    resumenTexto += `
        <tr>
            <td>${producto.name}</td>
            <td>$${producto.price}</td>
        </tr>
    `;
}


resumenTexto += `
    </tbody>
    </table>
`;





resumen.innerHTML = resumenTexto;




// Función envío del Formulario
const  enviarFormulario = (event)=> {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    // Obtiene datos de contacto
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('contactoEmail').value.trim();
    const telefono = document.getElementById('telefono').value.trim();

    if (!nombre  || !email || !telefono) {
        alert("Por favor, completa todos los campos de contacto.");
        return; // detiene la ejecucuión de la función hasta que pase el if
    }

    // Agrega al valor total el signo de pesos $
    const totalConPesos = `${checkTotal()}`;

    // Asigna los datos a los campos ocultos del formulario
   document.getElementById('carritoData').value = resumenTexto;
  document.getElementById('totalCarrito').value = totalConPesos;

    // Envía el formulario a Formspree
    document.getElementById('formulario').submit();
}

// Asociamos el evento al botón de enviar
document.getElementById('botonEnviar').addEventListener('click', enviarFormulario);

}

















export default  checkTotal;