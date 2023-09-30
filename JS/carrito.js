let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
const totalCarrito = document.querySelector("#total-carrito");
const totalPrecio = document.querySelector("#total-precio");
const botonFinalizarCompra = document.querySelector("#finalizar-compra");

// Función para calcular el total del carrito
function calcularTotalCarrito() {
    let total = 0;
    productosEnCarrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
    });
    return total;
}

// Función para actualizar el contenido del carrito
function actualizarCarrito() {
    const contenedorCarrito = document.querySelector("#carrito-productos");
    contenedorCarrito.innerHTML = ""; // Vaciar el contenido actual del carrito

    productosEnCarrito.forEach(producto => {
        const divProducto = document.createElement("div");
        divProducto.classList.add("producto-carrito");
        divProducto.innerHTML = `
            <img src="${producto.img}" alt="${producto.nombre}">
            <div class="producto-info-carrito">
                <h4>${producto.nombre}</h4>
                <p>Precio: $${producto.precio}</p>
                <p>Cantidad: ${producto.cantidad}</p>
            </div>
        `;
        contenedorCarrito.appendChild(divProducto);
    });

    // Actualiza el total del carrito
    totalPrecio.textContent = calcularTotalCarrito();
    
    // Muestra u oculta el botón "Finalizar Compra" según si el carrito está vacío o no
    if (productosEnCarrito.length > 0) {
        botonFinalizarCompra.style.display = "block";
    } else {
        botonFinalizarCompra.style.display = "none";
    }
}

// Si hay productos en el carrito, mostrar el carrito
if (productosEnCarrito.length > 0) {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");
    
    // También actualiza el contenido y el total del carrito
    actualizarCarrito();
    totalPrecio.textContent = calcularTotalCarrito();
}

// Cuando se agrega un producto al carrito
function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    
    actualizarNumeroCarrito();
    console.log(productosEnCarrito);

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    // Después de agregar el producto, actualiza el carrito y el total
    actualizarCarrito();
    totalPrecio.textContent = calcularTotalCarrito();
}

function actualizarNumeroCarrito() {
    let nuevoNumeroCarrito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeroCarrito.innerText = nuevoNumeroCarrito;
}
