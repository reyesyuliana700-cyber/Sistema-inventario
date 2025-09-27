// ===== LOGIN =====
const usuarioValido = "Yuliana";
const claveValida = "1234";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const usuario = document.getElementById("usuario").value;
      const clave = document.getElementById("clave").value;
      const mensaje = document.getElementById("mensaje");

      if (usuario === usuarioValido && clave === claveValida) {
        localStorage.setItem("logueado", "true");
        window.location.href = "inventario.html";
      } else {
        mensaje.textContent = "Usuario o contraseña incorrectos";
      }
    });
  }

  // ===== PROTECCIÓN DE INVENTARIO =====
  if (window.location.pathname.includes("inventario.html")) {
    if (localStorage.getItem("logueado") !== "true") {
      window.location.href = "index.html";
    } else {
      iniciarInventario();
    }
  }
});

// ===== CERRAR SESIÓN =====
function cerrarSesion() {
  localStorage.removeItem("logueado");
  window.location.href = "index.html";
}

// ===== INVENTARIO =====
let productos = JSON.parse(localStorage.getItem("productos")) || [];

function iniciarInventario() {
  const form = document.getElementById("formProducto");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    agregarProducto();
  });
  renderTabla();
}

function agregarProducto() {
  const nombre = document.getElementById("nombre").value.trim();
  const cantidad = parseInt(document.getElementById("cantidad").value);

  if (nombre && cantidad > 0) {
    productos.push({ nombre, cantidad });
    localStorage.setItem("productos", JSON.stringify(productos));
    document.getElementById("formProducto").reset();
    renderTabla();
  }
}

function eliminarProducto(index) {
  productos.splice(index, 1);
  localStorage.setItem("productos", JSON.stringify(productos));
  renderTabla();
}

function renderTabla() {
  const tbody = document.querySelector("#tablaProductos tbody");
  tbody.innerHTML = "";

  productos.forEach((prod, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${prod.nombre}</td>
      <td>${prod.cantidad}</td>
      <td><button class="accion-btn" onclick="eliminarProducto-(${index})">Eliminar-</button></td>
    `;
    tbody.appendChild(fila);
  });
}
