function validacion() {

    username = document.getElementById("username").value;
    password = document.getElementById("password").value;


if( username == null || username.length == 0 || /^\s+$/.test(username) ) {
      // Si no se cumple la condicion...
      alert('[ERROR] El campo de nombre de usuario no puede estar vacío');
      return false;
    }
    else if (password == null || password.length == 0 || /^\s+$/.test(password) ) {
        // Si no se cumple la condicion...
        alert('[ERROR] El campo de contraseña no puede estar vacío');
        return false;
      }
    
  
    // Si el script ha llegado a este punto, todas las condiciones
    // se han cumplido, por lo que se devuelve el valor true
    return true;

  }

  

  