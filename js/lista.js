//Traer los datos de la API para llenar la tabla
//Traer los datos en formato json (http://168.194.207.98:8081/tp/lista.php?action=BUSCAR)
//Llenar la tabla con los datos

var isVerificado = false;

function verificarSession() {
  if (sessionStorage.getItem("user") == null) {
    window.location.href = "login.html";
  }
}

function getAll() {
  if(!isVerificado){
    verificarSession();
    isVerificado = true;
  }
  getUser();
  let url = "http://168.194.207.98:8081/tp/lista.php?action=BUSCAR";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      llenarTabla(data);
    });
}

function getUser() {
  const subtitle = document.getElementById("sub-title").value;
  const user = sessionStorage.getItem("user").toUpperCase();
  console.log(user);
  document.getElementById("sub-title").innerHTML = `Bienvenido ${user}`;
}

function bloquear(id) {
  let url =
    "http://168.194.207.98:8081/tp/lista.php?action=BLOQUEAR&idUser=" +
    id +
    "&estado=Y";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      getAll();
    });
}

function desbloquear(id) {
  let url =
    "http://168.194.207.98:8081/tp/lista.php?action=BLOQUEAR&idUser=" +
    id +
    "&estado=N";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      getAll();
    });
}

function buscar() {
  const busqueda = document.getElementById("buscarUser").value;
  let url =
    "http://168.194.207.98:8081/tp/lista.php?action=BUSCAR&usuario=" + busqueda;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      llenarTabla(data);
    });
}

function llenarTabla(data) {
  let tabla = document.getElementById("content-table");
  tabla.innerHTML = "";
  if (data.length == 0) {
    tabla.innerHTML = `<div class="row-red">
    <div class="mje-error">No se encontraron resultados</div>
    </div>`;
  } else {
    //Sólo pinto hasta los primeros 30 registros por rendimiento.
    //Voy a seguir investigando cómo paginar los resultados para que no se vea tan feo.
    for (let i = 0; i < data.length && i < 30; i++) {
      if (data[i].bloqueado == "N") {
        tabla.innerHTML += `
        <div class="row row-green" id="row-item-${data[i].id}">
            <div class="col-item-center">${data[i].id}</div>
            <div class="col-item">${data[i].usuario}</div>
            <div class="col-item-center">${data[i].bloqueado}</div>
            <div class="col-item">${data[i].apellido}</div>
            <div class="col-item">${data[i].nombre}</div>
            <div class="col-item-center"> <button class="btn btn-danger" onclick="bloquear(${data[i].id})"><i class="fa-solid fa-lock"></i></button> </div>
            <div class="col-item-center"> <button class="btn btn-success" onclick="desbloquear(${data[i].id})"><i class="fa-solid fa-lock-open"></i></button> </div>
        </div>    
        `;
      } else {
        tabla.innerHTML += `
        <div class="row row-red" id="row-item-${data[i].id}">
            <div class="col-item-center">${data[i].id}</div>
            <div class="col-item">${data[i].usuario}</div>
            <div class="col-item-center">${data[i].bloqueado}</div>
            <div class="col-item">${data[i].apellido}</div>
            <div class="col-item">${data[i].nombre}</div>
            <div class="col-item-center-btn"> <button class="btn btn-danger" onclick="bloquear(${data[i].id})"><i class="fa-solid fa-lock"></i></button> </div>
            <div class="col-item-center-btn"> <button class="btn btn-success" onclick="desbloquear(${data[i].id})"><i class="fa-solid fa-lock-open"></i></button> </div>
        </div>    
        `;
      }
    }
  }
}
