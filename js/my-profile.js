
// Obtengo datos del formulario, se construye el div a mostrar, se guarda en localStorage y se muestra
function guardarDatos() {
  var perfil = "";
  var nombre = document.getElementById("inputNombre").value;
  var apellidos = document.getElementById("inputApellidos").value;
  var edad = document.getElementById("inputEdad").value;
  var email = document.getElementById("inputEmail").value;
  var telefono = document.getElementById("inputTelefono").value;

  perfil += `
  <div class="card">
  <h4 class="card-header bg-dark text-center text-white">Mi perfil</h4>
  <div class="card-body">
    <div class="row">
      <div class="col align-self-center text-center">
        <div>
          <img src="img/homero.jpg" class="img-circle" />
        </div>
        <h3><strong>${nombre + " " + apellidos}</strong></h3>
      </div>

      <div class="col align-self-center">
        <dl class="dlist-align">
          <dt><u>Email:</u></dt>
          <dd>${email}</dd>
        </dl>
        <dl class="dlist-align">
          <dt><u>Teléfono:</u></dt>
          <dd>${telefono}</dd>
        </dl>
        <dl class="dlist-align">
          <dt><u>Edad:</u></dt>
          <dd>${edad} años</dd>
        </dl>
      </div>
    </div>
  </div>
</div>
`;

  localStorage["guardarPerfil"] = JSON.stringify(perfil);
  document.getElementById("mostrarPerfil").innerHTML = perfil;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    // Si hay información del perfil guardada en el localStorage se muestra esa información, con esto mantengo la info si recargo
  if (localStorage["guardarPerfil"] != null) {
    document.getElementById("mostrarPerfil").innerHTML = JSON.parse(
      localStorage["guardarPerfil"]
    );
    
    // Sino se muestra un cartel de que no hay datos guardados
  } else {
    document.getElementById("mostrarPerfil").innerHTML = `
    <div class="card border-0">
      <img class="card-img-top" src="img/login.png.png" />
      <div class="card-body">
        <h5 class="card-title">No hay perfil guardado</h5>
        <p>Por favor completa tus datos de contacto!</p>
      </div>
    </div>
  </div>
 `;
  }
});
