// Obtén el elemento contenedor de los productos
const productosContainer = document.getElementById('productos');

// Array de productos
const productos = [
    {id:"elixir-01", nombre: 'Elixir de Mana', precio: 2000, img:"./images/elixirmana.jpg"},
    {id:"elixir-02", nombre: 'Elixir de Poder', precio: 2000, img:"./images/elixirpoder.jpg"},
    {id:"elixir-03", nombre: 'Elixir de Curacion', precio: 2000, img:"./images/elixircuracion.jpg"},
    {id:"elixir-04", nombre: 'Elixir de Invisibilidad', precio: 2000, img:"./images/elixirinvisible.jpg"},
    {id:"elixir-05", nombre: 'Elixir Completo', precio: 2000, img:"./images/elixircompleto.jpg"},
    {id:"Varita-01", nombre: 'Varita Dragon', precio: 2000, img:"./images/varitadragon.jpg"},
    {id:"Varita-02", nombre: 'Varita Unicornio', precio: 2000, img:"./images/varitaunicornio.jpg"},
    {id:"Varita-03", nombre: 'Varita Fenix', precio: 2000, img:"./images/varitafenix.jpg"},
    {id:"Varita-04", nombre: 'Varita Estrella', precio: 2000, img:"./images/varitaestrella.jpg"},
    {id:"Varita-05", nombre: `Varita Prohibida`, precio: 2000, img:"./images/varitaprohibida.jpg"},
]


let botonesAgregar = document.querySelectorAll(".producto-agregar")
const numeroCarrito = document.querySelector("#numero-carrito")


function cargarProductos() {
    const contenedorProductos = document.querySelector("#contenedor-productos");
    productos.forEach(producto => {
        let div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.img}" alt="">
        <div class="producto-info">
          <h3 class="producto-nombre">${producto.nombre}</h3>
          <p class="producto-precio">${producto.precio}</p>
          <button class="producto-agregar" id="${producto.id}">Agregar</button>
        </div>`;
        contenedorProductos.append(div); 
    });
    actualizarProductosAgregar();
    console.log(botonesAgregar)
}

cargarProductos(productos);

function actualizarProductosAgregar () {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })

}

const productosEnCarrito = [];

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id; 
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    
    }
    actualizarNumeroCarrito()
    console.log(productosEnCarrito)

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}

function actualizarNumeroCarrito(){
    let nuevoNumeroCarrito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeroCarrito.innerText = nuevoNumeroCarrito; 
}













// // Función para generar los elementos de producto
// function generarProductos() {
//     productos.forEach(producto => {
//         const divProducto = document.createElement('div');
//         divProducto.className = 'producto';
//         divProducto.id = `producto-${producto.id}`;

//         const imagen = document.createElement('img');
//         imagen.src = producto.img; // Asigna la ruta de la imagen
//         imagen.alt = producto.nombre; // Agrega un atributo 'alt' para accesibilidad

//         const h3 = document.createElement('h3');
//         h3.textContent = `${producto.nombre} - $${producto.precio}`;

//         const boton = document.createElement('button');
//         boton.textContent = 'Agregar al Carrito';
//         boton.onclick = () => agregarAlCarrito(producto.id);

//         divProducto.appendChild(imagen); // Agrega la imagen al div del producto
//         divProducto.appendChild(h3);
//         divProducto.appendChild(boton);

//         productosContainer.appendChild(divProducto);
//     });
// }

// // Llama a la función para generar los productos
// generarProductos();
