// Productos

const productos = [
    //Juguetes
    {
        id: "juguete-01",
        titulo: "Juguete 01",
        imagen: "./assets/img/juguete1.jpg",
        categoria: {
            nombre: "Juguetes",
            id: "juguetes"
        },
        precio: 20000
    },
    {
        id: "juguete-02",
        titulo: "Juguete 02",
        imagen: "./assets/img/juguete2.jpg",
        categoria: {
            nombre: "Juguetes",
            id: "juguetes"
        },
        precio: 20000
    },
    {
        id: "juguete-03",
        titulo: "Juguete 03",
        imagen: "./assets/img/juguete3.jpg",
        categoria: {
            nombre: "Juguetes",
            id: "juguetes"
        },
        precio: 20000
    },
    {
        id: "juguete-04",
        titulo: "Juguete 04",
        imagen: "./assets/img/juguete4.jpg",
        categoria: {
            nombre: "Juguetes",
            id: "juguetes"
        },
        precio: 20000
    },
    {
        id: "juguete-05",
        titulo: "Juguete 05",
        imagen: "./assets/img/juguete5.jpg",
        categoria: {
            nombre: "Juguetes",
            id: "juguetes"
        },
        precio: 20000
    },
    // Correas
    {
        id: "correa-01",
        titulo: "Correa 01",
        imagen: "./assets/img/correa1.jpg",
        categoria: {
            nombre: "Traillas y Correas",
            id: "correas"
        },
        precio: 20000
    },
    {
        id: "correa-02",
        titulo: "Correa 02",
        imagen: "./assets/img/correa2.jpg",
        categoria: {
            nombre: "Traillas y Correas",
            id: "correas"
        },
        precio: 20000
    },
    {
        id: "correa-03",
        titulo: "Correa 03",
        imagen: "./assets/img/correa3.jpg",
        categoria: {
            nombre: "Traillas y Correas",
            id: "correas"
        },
        precio: 20000
    },
    {
        id: "correa-04",
        titulo: "Correa 04",
        imagen: "./assets/img/correa4.jpg",
        categoria: {
            nombre: "Traillas y Correas",
            id: "correas"
        },
        precio: 20000
    },
    {
        id: "correa-05",
        titulo: "Correa 05",
        imagen: "./assets/img/correa5.jpg",
        categoria: {
            nombre: "Traillas y Correas",
            id: "correas"
        },
        precio: 20000
    },
    // Camas y guacales
    {
        id: "cama-01",
        titulo: "Cama 01",
        imagen: "./assets/img/cama1.jpg",
        categoria: {
            nombre: "Camas y Guacales",
            id: "camas"
        },
        precio: 20000
    },
    {
        id: "cama-02",
        titulo: "Cama 02",
        imagen: "./assets/img/cama2.jpg",
        categoria: {
            nombre: "Camas y Guacales",
            id: "camas"
        },
        precio: 20000
    },
    {
        id: "cama-03",
        titulo: "Cama 03",
        imagen: "./assets/img/cama3.jpg",
        categoria: {
            nombre: "Camas y Guacales",
            id: "camas"
        },
        precio: 20000
    },
    {
        id: "cama-04",
        titulo: "Cama 04",
        imagen: "./assets/img/cama4.jpg",
        categoria: {
            nombre: "Camas y Guacales",
            id: "camas"
        },
        precio: 20000
    },
    {
        id: "cama-05",
        titulo: "Guacal 05",
        imagen: "./assets/img/cama5.jpg",
        categoria: {
            nombre: "Camas y Guacales",
            id: "camas"
        },
        precio: 20000
    },
    {
        id: "cama-06",
        titulo: "Guacal 06",
        imagen: "./assets/img/cama6.jpg",
        categoria: {
            nombre: "Camas y Guacales",
            id: "camas"
        },
        precio: 20000
    },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach (producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
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

    actualizarNumerito();

    localStorage.setItem ("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}