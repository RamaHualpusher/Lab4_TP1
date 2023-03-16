//Traer los datos de la API para llenar la tabla
//Traer los datos en formato json (http://168.194.207.98:8081/tp/lista.php?action=BUSCAR)
//Llenar la tabla con los datos

var isVerificado = false;

var arrayData = [];
var numeroPagina = 1;
var cantidadPorPagina = 15;
var MAX_PAGE = 0;
var arrayDataPaginado = [];

function paginarDatos(data, numeroPagina, cantidadPorPagina) {
  let arrayPaginado = [];
  let inicio = (numeroPagina - 1) * cantidadPorPagina;
  let fin = numeroPagina * cantidadPorPagina;
  for (let i = inicio; i < fin; i++) {
    arrayPaginado.push(data[i]);
  }
  return arrayPaginado;
}



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
  numeroPagina = 1;
  let url = "http://168.194.207.98:8081/tp/lista.php?action=BUSCAR";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      arrayData = data;
      MAX_PAGE = Math.floor(arrayData.length / cantidadPorPagina);
      setStatusButtons();
      arrayDataPaginado = paginarDatos(arrayData, numeroPagina, cantidadPorPagina);
      llenarTabla(arrayDataPaginado);
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
  numeroPagina = 1;
  const busqueda = document.getElementById("buscarUser").value;
  let url =
    "http://168.194.207.98:8081/tp/lista.php?action=BUSCAR&usuario=" + busqueda;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      arrayData = data;
      
      MAX_PAGE = Math.floor(arrayData.length / cantidadPorPagina);
      setStatusButtons();
      arrayDataPaginado = paginarDatos(arrayData, numeroPagina, cantidadPorPagina);
      llenarTabla(arrayDataPaginado);
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
    for (let i = 0; i < data.length; i++) {
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


function enableNext(){
const next = document.getElementById("next");
next.disabled = false;
}

function enablePrev(){
const prev = document.getElementById("prev");
prev.disabled = false;
}

function disabledNext(){
const next = document.getElementById("next");
next.disabled = true;
}

function disabledPrev(){
const prev = document.getElementById("prev");
prev.disabled = true;
}

function hasNext(){
return numeroPagina < MAX_PAGE
}

function hasPrev(){
return numeroPagina > 1
}

function setStatusButtons(){
  (!hasNext()) ? disabledNext() : enableNext();
  (!hasPrev()) ? disabledPrev() : enablePrev();
}

function next(){
setStatusButtons();
if(hasNext()){
  numeroPagina++;
  console.log("next");
  console.log(numeroPagina);
  arrayDataPaginado = paginarDatos(arrayData, numeroPagina, cantidadPorPagina);
  llenarTabla(arrayDataPaginado);
  setStatusButtons();
}
}
function prev(){
setStatusButtons();
if(hasPrev()){
  numeroPagina--;
  console.log("prev");
  console.log(numeroPagina);
  arrayDataPaginado = paginarDatos(arrayData, numeroPagina, cantidadPorPagina);
  llenarTabla(arrayDataPaginado);
  setStatusButtons();
}
}