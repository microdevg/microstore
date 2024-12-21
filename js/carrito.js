// carrito.js
const carritoModule = (() => {
    const STORAGE_KEY = "carrito";

    // Guardar un array en localStorage
    const saveCart = (cart) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    };

    // Cargar el carrito desde localStorage
    const loadCart = () => {
        const storedCart = localStorage.getItem(STORAGE_KEY);
        return storedCart ? JSON.parse(storedCart) : [];
    };

    // Agregar un elemento al carrito
    const addItem = (item) => {
        const cart = loadCart();
        cart.push(item);
        saveCart(cart);
    };

    // Verificar si un elemento está en el carrito
    const hasItem = (item) => {
        const cart = loadCart();
        return cart.includes(item);
    };

    // Eliminar un elemento por valor
    const removeItem = (item) => {
        const cart = loadCart();
        const index = cart.indexOf(item);
        if (index !== -1) {
            cart.splice(index, 1);
            saveCart(cart);
        }
    };

    // Vaciar completamente el carrito
    const clearCart = () => {
        localStorage.removeItem(STORAGE_KEY);
    };

    // Exportar las funciones
    return {
        saveCart,
        addItem,
        hasItem,
        removeItem,
        clearCart,
    };
})();

// Exportar el módulo para uso en otros scripts (opcional para entornos modernos)
export default carritoModule;
