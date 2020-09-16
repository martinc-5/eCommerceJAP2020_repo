var comentarios = [];

// función auxiliar para agregar 0 a hora y fecha, igualar formato de JSON
function agregarCero(n) {
  if (n <= 9) {
    return "0" + n;
  }
  return n;
}

// función para agregar comentarios
function guardar() {
  var comentario = {};
  var nombreusuario = document.getElementById("usercoment").value;
  var descripcion = document.getElementById("descripcioncoment").value;
  var puntuacion = document.getElementById("puntuacion").value;

  // declaraciones para agregar la fecha de forma correcta
  let fechaHora = new Date();
  let fechaHora_formateado =
    fechaHora.getFullYear() +
    "-" +
    agregarCero(fechaHora.getMonth() + 1) +
    "-" +
    agregarCero(fechaHora.getDate()) +
    " " +
    agregarCero(fechaHora.getHours()) +
    ":" +
    agregarCero(fechaHora.getMinutes()) +
    ":" +
    agregarCero(fechaHora.getSeconds());

  comentario.score = puntuacion;
  comentario.description = descripcion;
  comentario.user = nombreusuario;
  comentario.dateTime = fechaHora_formateado;

  comentarios.push(comentario);
  // promedioScore(comentarios);
  mostrar(comentarios);

  //luego de envíar y mostrar el comentario, se limpia el formulario del modal con lo siguiente
  $("#commentModal").on("hidden.bs.modal", function () {
    $(this).find("#commentForm")[0].reset();
  });
}

//función para mostrar los comentarios ibtenidos del json, se transforma lo obtenido en score a estrellas
function mostrar(array) {
  var commentlist = `<dl>`;

  for (i = 0; i < array.length; i++) {
    let comentario = array[i];
    var estrellitas = "";

    for (n = 0; n < comentario.score; n++) {
      estrellitas += `<i class="fas fa-star fa-sm checked" ></i>`;
    }
    var sinEstrellas = Math.abs(comentario.score - 5);

    for (n = 0; n < sinEstrellas; n++) {
      estrellitas += `<i class="far fa-star fa-sm"></i>`;
    }

    commentlist += `<dt> Valoración: ${estrellitas}${comentario.score}</dt>
    <dd>${comentario.description}</dd>
    <dd class="text-muted"><i class="far fa-user"></i> ${comentario.user}  <i class="fas fa-calendar-day"></i> ${comentario.dateTime}</dd> <hr>`;
  }

  commentlist += `</dl>`;

  document.getElementById("listadecomentarios").innerHTML = commentlist;
}

function showRelatedProducts(array) {

	let productosRelHTML = "";

	for (let value of array) {

		let productosRelacionados = products[value];

		productosRelHTML += `
			<div class="card mr-3" style="width: 20rem;">
  					<img src="${productosRelacionados.imgSrc}" class="card-img-top">
  				<div class="card-body">
    				<h5><strong>${productosRelacionados.name}</strong></h5>
    				<p><em>${productosRelacionados.description}</em></p>
  				</div>
  				<div class="card-body">
    				<a href="#" class="card-link">Dale un vistazo!</a>
  				</div>
			</div>
		`;
	};

	document.getElementById("prodRel").innerHTML = productosRelHTML;
}

//función promedio de puntuación

// function promedioScore(array){ //   falta arreglar los promedios al agregar mas comentarios!!!!!!!!!

//       var suma = array.reduce((total, next) => total + next.score, 0)
//       var promedio = suma / array.length;
//       console.log(suma);
//      console.log(promedio);
//      console.log(array.length);
//      console.log(array.reduce);

//      document.getElementById("promedio").innerHTML = promedio + " / 5";

// 

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productInfo = resultObj.data;
      console.log(resultObj.data);
      productRel = productInfo.relatedProducts;
      console.log(productRel);

      /* name, description, cost, currency, soldCount, category, images, relatedProducts*/

      document.getElementById("productos-name").innerHTML = productInfo.name;
      document.getElementById("productos-description").innerHTML =
        productInfo.description;
      document.getElementById("productos-cost").innerHTML =
        productInfo.currency + productInfo.cost;
      document.getElementById("imagen0").innerHTML =
        `<img src="` + productInfo.images[0] + `" >`;
      document.getElementById("imagen1").innerHTML =
        `<img src="` + productInfo.images[1] + `" >`;
      document.getElementById("imagen2").innerHTML =
        `<img src="` + productInfo.images[2] + `" >`;
      document.getElementById("imagen3").innerHTML =
        `<img src="` + productInfo.images[3] + `" >`;
      document.getElementById("imagen4").innerHTML =
        `<img src="` + productInfo.images[4] + `" >`;
      // document.getElementById("productos-soldCount").innerHTML =
      //   "Vendidos: " + productInfo.soldCount;
      // document.getElementById("productos-category").innerHTML =
      //   "Categoría: " + productInfo.category;
      //
    }
  });

  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      comentarios = resultObj.data;
      mostrar(comentarios);
      // promedioScore(comentarios);
    }
  });

  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      products = resultObj.data;
      showRelatedProducts(productRel);
    }
    
  });
});

