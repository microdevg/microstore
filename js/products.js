

let MyBox =[]




                      

const products = [
    {
        id: 1,
        name: "Esp32 WROOM32",
        shortDescription:"Esta placa de desarrollo tiene WiFi y Bluetooth 4.2 gracias al procesador doble núcleo Tensilica Xtensa LX6.",
        moreDescription:"Ademas ofrece WiFi, Bluetooth y BLE, Ethernet, SPI de alta velocidad, UART y I2S e I2C.",
        price:100
    },
    {
        id: 1,
        name: "Esp32 WROOM32",
        shortDescription:"Esta placa de desarrollo tiene WiFi y Bluetooth 4.2 gracias al procesador doble núcleo Tensilica Xtensa LX6.",
        moreDescription:"Ademas ofrece WiFi, Bluetooth y BLE, Ethernet, SPI de alta velocidad, UART y I2S e I2C.",
        price:100
    },
    {
        id: 1,
        name: "Esp32 WROOM32",
        shortDescription:"Esta placa de desarrollo tiene WiFi y Bluetooth 4.2 gracias al procesador doble núcleo Tensilica Xtensa LX6.",
        moreDescription:"Ademas ofrece WiFi, Bluetooth y BLE, Ethernet, SPI de alta velocidad, UART y I2S e I2C.",
        price:100
    },
    {
        id: 1,
        name: "Esp32 WROOM32",
        shortDescription:"Esta placa de desarrollo tiene WiFi y Bluetooth 4.2 gracias al procesador doble núcleo Tensilica Xtensa LX6.",
        moreDescription:"Ademas ofrece WiFi, Bluetooth y BLE, Ethernet, SPI de alta velocidad, UART y I2S e I2C.",
        price:100
    },
    {
        id: 1,
        name: "Esp32 WROOM32",
        shortDescription:"Esta placa de desarrollo tiene WiFi y Bluetooth 4.2 gracias al procesador doble núcleo Tensilica Xtensa LX6.",
        moreDescription:"Ademas ofrece WiFi, Bluetooth y BLE, Ethernet, SPI de alta velocidad, UART y I2S e I2C.",
        price:100
    }
]



const cardElement= ({name,shortDescription,moreDescription,price})=>`    
                            <div class="row g-0">
                                <div class="col-md-4 h-10 d-flex justify-content-center align-items-center">
                                    <img src="./img/products/wroom32.png" class="img-fluid mt-4  p-2 h-10  " alt="Producto 1">
                                </div>
                                <div class="col-md-8 g-3">
                                     <!-- Tarjeta -->
                                     <div class="card-body">
                                        <h5 class="card-title">${name}</h5>
                                        <p class="card-text">${shortDescription}   
                                            <span class="d-none d-md-block">
                                            ${moreDescription}
                                            </span>
                                        </p>
                                        <p class="text-primary fw-bold">${price}</p>
                                    </div>
                                </div>
                            </div> 
                    `



const cleanBox = ()=>{


}


const CreateElement = ({name,shortDescription,moreDescription,price})=>{
    console.log("Creando un nuevo elemento\n");
    let element = document.createElement('div');
    element.className = 'card mb-4';
    element.innerHTML = cardElement({name,shortDescription,moreDescription,price});
    return element;

}

const main = ()=>{

    const myShoopingBox = document.getElementById('myBox');

    
    products.forEach(element => {
        console.log("new element")
            let newElement = CreateElement(element);
            myShoopingBox.appendChild(newElement);
    });

    
}

main();
console.log("What's happen?")


