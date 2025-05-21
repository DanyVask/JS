const productos = [
  { id: 1, nombre: "Celular", precio: 500 },
  { id: 2, nombre: "Televisor", precio: 1000 },
  { id: 3, nombre: "Computador", precio: 1500 },
  { id: 4, nombre: "Tablet", precio: 300 },
  { id: 5, nombre: "Nintendo Switch", precio: 400 }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarProductos() {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";
  productos.forEach(producto => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  guardarCarrito();
  mostrarCarrito();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  mostrarCarrito();
}

function mostrarCarrito() {
  const lista = document.getElementById("carrito");
  const total = document.getElementById("total");
  lista.innerHTML = "";

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - $${item.precio}
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    lista.appendChild(li);
  });

  const suma = carrito.reduce((acc, item) => acc + item.precio, 0);
  total.textContent = suma;
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

document.getElementById("vaciarCarrito").addEventListener("click", () => {
  carrito = [];
  guardarCarrito();
  mostrarCarrito();
});

mostrarProductos();
mostrarCarrito();
