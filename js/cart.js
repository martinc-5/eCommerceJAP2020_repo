// Cargar carrito desde el JSON inicial
function mostrarCarrito(array) {
  var listadoCarrito = "";

  for (let i = 0; i < array.length; i++) {
    let itemCarrito = array[i];
    

    if (itemCarrito.currency == "UYU") {
      itemCarrito.unitCost = (itemCarrito.unitCost / 40).toFixed(2);
      itemCarrito.currency = "USD";
    }

    listadoCarrito += ` 
	<table class="table table-borderless table-shopping-cart">
              <thead class="text-muted">
                <tr class="small text-uppercase">
                  <th scope="col">Producto</th>
                  <th scope="col" width="120">Cantidad</th>
                  <th scope="col" width="120">Precio</th>
                  <th scope="col" class="text-right" width="200"></th>
                </tr>
              </thead>
              <tbody>
					<tr>
						<td>
					<figure class="itemside">
						<div class="aside">
						<img src=${itemCarrito.src} class="img-sm" width="150" />
						</div>
						<figcaption class="info">
						<a href="#" class="title text-dark"
							>${itemCarrito.name}</a
						>
						</figcaption>
					</figure>
					</td>
					<td>
						<input id="cantidad${i}" type="number" value=${
      itemCarrito.count
    } min="0" max="1000" step="1" onchange="actualizar(${i});"/>
					</td>
					<td>
					<div class="price-wrap">
						<var class="price">${itemCarrito.currency} <var class="priceItem" id="price${i}">${
      itemCarrito.count * itemCarrito.unitCost
    }</var></var><br>
						<small class="text-muted" >${
              itemCarrito.currency
            } <var class="text-muted" id="precioUnitario${i}"> ${
      itemCarrito.unitCost
    } </var> c/u</small>
					</div>
					
					</td>
					<td class="text-right">
					<a
						data-original-title="Save to Wishlist"
						title=""
						href="#"
						class="btn btn-light"
						data-toggle="tooltip"
					>
						<i class="fa fa-heart"></i
					></a>
					<a href="#" class="btn btn-light"> Remove</a>
					</td>
				</tr>
  </tbody>
  </table>
  `;
  }

  document.getElementById("itemsCarrito").innerHTML = listadoCarrito;
}

// Función que se ejecuta al cambiar la cantidad de un producto, calcula el precio total del item
function actualizar(indice) {
  cantidad = document.getElementById(`cantidad${indice}`).value;
  precioUnit = JSON.parse(
    document.getElementById(`precioUnitario${indice}`).innerHTML
  );

  totalItem = cantidad * precioUnit;

  document.getElementById(`price${indice}`).innerHTML = totalItem;
  calcularST();


}

// Función que realiza la suma del subtotal, se ejecuta al actualizar cantidades
function calcularST() {
	sumatoria = document.querySelectorAll('.priceItem');

	var st = 0;
  for (let i = 0; i < sumatoria.length; i++) {
    const sumat = sumatoria[i].innerHTML;
    st += parseFloat(sumat);
  }
document.getElementById("subTotal").innerHTML = "USD"+" "+st;

}
	


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      itemsCarrito = resultObj.data.articles;
      console.log(itemsCarrito);
	  mostrarCarrito(itemsCarrito);
	  calcularST();
    }
  });
});
