//EVENTOS STORAGE Y JSON
let carrito=[];

if(localStorage.getItem("carrito_compras")){
      carrito = JSON.parse(localStorage.getItem("carrito_compras") || "[]");
      document.getElementById("cart_amount").innerHTML = carrito.length;

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
function update_cart(){
    // actualizando el contenido del carrito.

    document.getElementById("cart_amount").innerHTML = carrito.length;
}

function persist_cart(){
    // guardando el contenido del carrito.
    localStorage.setItem("carrito_compras", JSON.stringify(carrito));
}



function checkout_alert(){

    var table_rows = ``
    var total_price = 0
    for (let i = 0; i<carrito.length;i++){
        
        product_price = productos[carrito[i].id].precio
        
        cart_price = parseInt(carrito[i].quantity)*parseInt(product_price)
        total_price += cart_price
        
        product_id = carrito[i].id
        table_rows+=
         
         `<tr>
         <td>`+productos[carrito[i].id].modelo+`</td>
         <td>`+productos[carrito[i].id].nombre+`</td>
         <td><input value="`+carrito[i].quantity+`" type="number" id="quantity" name="quantity" min="1" max="9" onchange="onChangeFunction(this.value,`+product_price+`,`+product_id+`)""></td>
         <td id=price_`+product_id+`>`+cart_price+`</td>
          </tr>
         `
       }


    Swal.fire({
        title: '<h4 style="text-align: left">Carrito</u></h4>',
         html: `
                <table class="table">

                <tbody>
                `+table_rows+`  
                </tbody>
            </table>
            <hr>
            <p style="text-align: right">Total: <span id="total_price"> `+total_price+`</span> </p>
            <hr>
            <form>
            <div class="row">
                <div class="col">
                <input type="text" class="form-control" placeholder="Nombre" Required>
                </div>
                <div class="col">
                <input type="text" class="form-control" placeholder="Apellido" Required>
                </div>
            </div><br>
            <input type="email" class="form-control" placeholder="Email" Required>
            </form>
            
            `,

        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:'<span class="fas fa-lock"></span> Comprar ahora!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:'<span class="fa-remove" > Cancelar</span>',
        cancelButtonAriaLabel: 'Thumbs down'
      }).then((result) => {
        
        if (result.isConfirmed && total_price!==0){
            Swal.fire(
                'Hecho!',
                'Realizaste la compra con éxito :))))',
                'success'
              )
          }else{
            Swal.fire(
                'ERROR!',
                'Debes añadir un artículo al carrito para finalizar la compra',
                'error'
              )
          }
         carrito=[]
        update_cart()
        persist_cart()
      })
}



function onChangeFunction(quantity,price,i){
    
     // actualizar el precio total del carrito. id=precio_total
     previous_total = document.getElementById("total_price").innerHTML
     document.getElementById("total_price").innerHTML = (previous_total - ((quantity-1)*price)) + (quantity*price)

    
    // actualizar el precio del artículo del carrito
     document.getElementById("price_"+i).innerHTML = quantity*price;
   

    objIndex = carrito.findIndex((obj => obj.id == i));
    
    carrito[objIndex].quantity = quantity;
    
    // persistir carrito
    persist_cart()
    // actualizar carrito tamb
}

function agregarAlCarrito(producto){
    let order = {id:producto.id,
                quantity:1}
    
    // comprobar si el producto está en el carrito
    
    objIndex = carrito.findIndex((obj => obj.id == producto.id));
    
    if(objIndex == -1){
        carrito.push(order)
    }else{
        carrito[objIndex].quantity =parseInt(carrito[objIndex].quantity)+parseInt(1);
    }

    
    Swal.fire(
        'Hecho!',
        'Agregaste'+ ' '+producto.modelo+' '+producto.nombre+' '+'al carrito',
        'success'
      )
    update_cart()
    persist_cart()
}