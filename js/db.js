console.log("Js datos")

let products = await fetch('./../products/db.json')
    .then(response => {
        if (!response.ok) throw new Error('Error al cargar el archivo JSON');
        return response.json();
    })
    .then(products => {
        // El contenido del JSON ya está convertido en un array de JavaScript
        console.log('Array de productos:', products);
        return products;
    })
    .catch(error => {
        console.error('Error al cargar o parsear el JSON:', error);
    });





// Función para filtrar por categoría
function filterByCategory(categoria) {
    return productos.filter(producto => producto.categoria === categoria);
}

// Función para filtrar por precio (rango)
function filterByPrice(min, max) {
    return productos.filter(producto => producto.precio >= min && producto.precio <= max);
}



export default   products;
