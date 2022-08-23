///DOM
let emailSuscripcion = document.getElementById("email");
emailSuscripcion.value = prompt("Ingrese su email");

localStorage.setItem("email-suscripcion",JSON.stringify(emailSuscripcion.value));

let seccionSuscripcion = document.getElementById("suscripcion");
let parrafo = document.createElement("p");
parrafo.innerHTML = "Gracias por suscribirte!";
seccionSuscripcion.append(parrafo);



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
            <img src=${producto.imagen} width="250" height="350">
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