  // Import the functions you need from the SDKs you need
  
  
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";


  import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyALyc9VEZVIro5aj7t32MT7kegEmequjlc",
    authDomain: "inventario-productos-8c161.firebaseapp.com",
    projectId: "inventario-productos-8c161",
    storageBucket: "inventario-productos-8c161.firebasestorage.app",
    messagingSenderId: "474520447708",
    appId: "1:474520447708:web:e0bc143531b180c0b92219"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)

// Arreglo para almacenar los productos

// let productos = JSON.parse(localStorage.getItem('productos'))|| []

// let idnext = productos.length > 0 ? Math.max(...productos.map(p => p.id ))+1 : 1;

// function guardarStorage() {
// localStorage.setItem("productos", JSON.stringify(productos))

// }
let productos = []; 

async function cargarproductos() {

 productos = []; 

    const snapshot = await getDocs(collection (db, 'productos'))

    snapshot.forEach((docSnap)=>{

        productos.push({
            id: docSnap.id,
            ...docSnap.data()
        })
    })

    renderizar()
}


async function agregar() {

   
// Procesar la opción seleccionada por el usuari
    // Solicitar los datos del producto al usuario
let nombre = prompt("Ingrese su nombre del producto:");
let precio = parseFloat(prompt("Ingrese el precio del producto:"));
let cantidad = parseInt(prompt("Ingrese la cantidad del producto:"));

// let total = precio * cantidad; // Calcular el total del producto
// Crear un objeto producto con los datos ingresados
const producto ={
    nombre,
    precio,
    cantidad,
    total: precio * cantidad
}
await addDoc(collection(db, 'productos'), producto)
await cargarproductos()

alert("Producto agregado al carrito");
//guardarStorage() // llamo pesrsitencia


}


async function actualizar() {

// Solicitar el ID del producto a modificar
const id = prompt('Digite el ID del producto que desea modificar o 0 para salir:');

/**
 * Buscar el producto en el arreglo por su ID
 * y modificar sus propiedades con los nuevos valores ingresados por el usuario
 */
const producto = productos.find(p => p.id === id);
// alert(`Producto encontrado: ${cambiar.nombre} ${cambiar.precio} x ${cambiar.cantidad}`);
const nuevonombre = prompt("Ingrese el nuevo nombre del producto:", producto.nombre);
const nuevoprecio = parseFloat(prompt("Ingrese el nuevo precio del producto:", producto.precio));
const nuevacantidad = parseInt(prompt("Ingrese la nueva cantidad del producto:", producto.cantidad));

await updateDoc(doc(db, 'productos', id),{
    nombre: nuevonombre,
    precio: nuevoprecio,
    cantidad: nuevacantidad,
    total: nuevoprecio * nuevacantidad
})

await cargarproductos()
alert("Producto modificado correctamente");
console.table(productos);
//guardarStorage()//llamo persistencia
//renderizar(); // Llamar a la función para renderizar la tabla en el DOM

}

async function eliminar() {

// Opción para eliminar un producto

const id = prompt('Digite el ID del producto que desea eliminar o 0 para salir:');

// alert(`Producto encontrado: ${productoEliminar.nombre} ${productoEliminar.precio} x ${productoEliminar.cantidad}`);
await deleteDoc(doc(db, 'productos', id))
await cargarproductos()
// const confirmacion = prompt("¿Está seguro que desea eliminar este producto?");
    alert("Producto eliminado correctamente");
}
function ver() {

// Opción para ver los productos en el carrito

productos.forEach((mostrar) => { 
    console.log(`${mostrar.id} | ${mostrar.nombre} | ${mostrar.precio} | ${mostrar.cantidad}`);
});
console.table(productos);
}


function salir() {
condition = false; // Cambiar la variable de control para salir del bucle
alert("Gracias por usar el carrito de compras");

}


/**
 * Generar una tabla HTML para mostrar los productos en la página web
 * utilizando el DOM 
 * 
 */
//function renderizar() {
    
function simbolo(valor) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(valor);
}

function renderizar() {

const tabla = document.querySelector("#tabla");

tabla.textContent = ""; // Limpiar el contenido previo de la tabla
/** 
 * Recorrer el arreglo de productos y crear filas y celdas en la tabla
 * para cada producto, luego agregar las filas a la tabla en el DOM
 */
productos.forEach((produc) => {

    const tr = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.textContent = produc.id;

    const tdNombre = document.createElement('td');
    tdNombre.textContent = produc.nombre;

    const tdPrecio = document.createElement('td');
    tdPrecio.textContent=simbolo(produc.precio);

    const tdCantidad = document.createElement('td');
    tdCantidad.textContent = produc.cantidad;

    const tdtotal = document.createElement('td');
    tdtotal.textContent = simbolo(produc.total);
    tr.append(tdId, tdNombre, tdPrecio, tdCantidad, tdtotal); // Agregar las celdas a la fila

    tabla.appendChild(tr); // Agregar la fila a la tabla en el DOM
});
}

//}
const btn = document.querySelector("#btn");
const btna = document.querySelector("#btna");
const btnad = document.querySelector("#btnd");

btn.addEventListener("click", ()=>{
    agregar();
});
btna.addEventListener("click", ()=>{
    actualizar();
});

btnad.addEventListener("click", ()=>{
    eliminar();
});


document.addEventListener('DOMContentLoaded',()=>{
cargarproductos()   

})


