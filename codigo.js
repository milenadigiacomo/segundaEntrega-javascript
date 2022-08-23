///DOM
let nombreSuscripcion = document.getElementById("nombre");
let apellidoSuscripcion = document.getElementById("apellido");
let emailSuscripcion = document.getElementById("email");
let comentariosSuscripcion = document.getElementById("comentarios");
nombreSuscripcion.value = prompt("Ingrese su nombre");
apellidoSuscripcion.value = prompt("ingrese su apellido");
emailSuscripcion.value = prompt("Ingrese su email");

let seccionSuscripcion = document.getElementById("suscripcion");
let parrafo = document.createElement("p");
parrafo.innerHTML = "Gracias por suscribirte!";
seccionSuscripcion.append(parrafo);

localStorage.setItem("nombre-suscripcion",JSON.stringify(nombreSuscripcion.value));
localStorage.setItem("apellido-suscripcion",JSON.stringify(apellidoSuscripcion.value));
localStorage.setItem("email-suscripcion",JSON.stringify(emailSuscripcion.value));

//EVENTOS STORAGE Y JSON

let carrito=[];
if(localStorage.getItem("carrito")){
    carrito=JSON.parse(localStorage.getItem("carrito"));
}
let lista=document.getElementById("milista");
    
//llamada a renderizar
renderizarProductos();

function renderizarProductos() {
    for (const producto of productos) {
        lista.innerHTML+=`<li class="col-sm-3 list-group-item">
            <h3> ID: ${producto.id} </h3>
            <img src=${producto.foto} width="250" height="250">
            <p>${producto.modelo} ${producto.nombre}</p>
            <p><strong> $ ${producto.precio} </strong></p>
            <button class='btn btn-danger' id='btn${producto.id}'>Comprar</button>
        </li>`;
    }
    //eventos boton
    productos.forEach(producto =>{
        //evento individual para cada boton
        document.getElementById(`btn${producto.id}`).addEventListener("click",function(){
            agregarAlCarrito(producto);
        });
    })
}

function agregarAlCarrito(producto){
    carrito.push(producto);
    console.log(carrito);
    alert(producto.modelo+" "+producto.nombre+" agregada al carrito :) ");
    localStorage.setItem("carrito",JSON.stringify(carrito));
}