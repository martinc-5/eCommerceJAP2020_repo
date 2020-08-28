const ORDER_ASC_BY_PRICE = "PRECIO+";
const ORDER_BY_PROD_COUNT = "Vend.";
const ORDER_DES_BY_PRICE = "PRECIO-" 
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minPrice = undefined;
var maxPrice = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DES_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cos ){ return 1; }
            return 0;
        });
    }
    else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))){

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small class="text-muted">` + product.soldCount + ` vendidos</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                        <br>
                        <h4 class="mb-1">`+ product.currency + ` `+product.cost +`</h4>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

// función de barra de filtrado
const formulario = document.querySelector('#formulario')
const resultado = document.querySelector('#prod-list-container')

var productos = []

getJSONData(PRODUCTS_URL).then(function(result){ 
    if (result.status === "ok") {
        console.log(result)
        productos = result.data;
    }   
}); 

const filtrar = ()=>{
    // console.log(formulario.value);
    resultado.innerHTML = '';
    const texto = formulario.value.toLowerCase();
    for(let producto of productos){
        let nombre = producto.name.toLowerCase();
        let descripcion = producto.description.toLowerCase();

        if((nombre.indexOf(texto) !== -1) | (descripcion.indexOf(texto) !== -1)){
            resultado.innerHTML += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ producto.name +`</h4>
                        <small class="text-muted">` + producto.soldCount + ` vendidos</small>
                    </div>
                    <p class="mb-1">` + producto.description + `</p>
                    <br>
                    <h4 class="mb-1">`+ producto.currency + ` `+producto.cost +`</h4>
                </div>
            </div>
        </a>
            `
        }
    }

    if(resultado.innerHTML === ''){
        resultado.innerHTML += `
        
            <div class="row">
                <div class="col">
                    <p class="my-3 mx-3">No existe el producto buscado... 	&#128546 </p>
                </div>
                
            </div>
        
        `
    }

}


formulario.addEventListener('keyup', filtrar)



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_BY_PROD_COUNT, resultObj.data);
        }
    });

    document.getElementById("sortDes").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DES_BY_PRICE);
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minPrice = document.getElementById("rangeFilterCountMin").value;
        maxPrice = document.getElementById("rangeFilterCountMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
            minPrice = parseInt(minPrice);
        }
        else{
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
            maxPrice = parseInt(maxPrice);
        }
        else{
            maxPrice = undefined;
        }

        showProductsList();
    });
});