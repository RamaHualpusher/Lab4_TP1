/*Al ejecuta el botón Ingresar se deberá llamar a una función Java Script que emita una llamada a la
siguiente URL:
http://168.194.207.98:8081/tp/login.php
pasando como parámetros el usuario y clave ingresados en el formulario*/
function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let url = "http://168.194.207.98:8081/tp/login.php";
  let params = "username=" + username + "&password=" + password;
  //Peticion get con fetch que recibe un JSON como respuesta
  /*En caso de retornar ERROR muestre el mje por pantalla al usuario
En caso de retornar OK redireccione la aplicación a una nueva página HTML “lista.html”*/
  fetch(url + "?" + params)
    .then((response) => response.json())
    .then((data) => {
        if (data.respuesta == "ERROR") {
            alert(data.message);
        } else {
            window.location.href = "lista.html";
        }
        }
    );
}
