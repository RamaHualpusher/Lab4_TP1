//Traer los datos de la API para llenar la tabla
//Traer los datos en formato json (http://168.194.207.98:8081/tp/lista.php?action=BUSCAR)
//Llenar la tabla con los datos
let letStart = 30;


function getAll() {
  let url = "http://168.194.207.98:8081/tp/lista.php?action=BUSCAR";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let tabla = document.getElementById("content-table");
      tabla.innerHTML = "";
      for (let i = letStart; i < letStart+30; i++) {
        if(data[i].bloqueado == "Y"){
        tabla.innerHTML += `
            <div class="row row-green" id="row-item-${data[i].id}">
                <div class="col-item-center">${data[i].id}</div>
                <div class="col-item">${data[i].usuario}</div>
                <div class="col-item-center">${data[i].bloqueado}</div>
                <div class="col-item">${data[i].apellido}</div>
                <div class="col-item">${data[i].nombre}</div>
                <div class="col-item-center-btn"> <button class="btn btn-success" onclick="bloquear(${data[i].id})">BLOQUEAR</button> </div>
                <div class="col-item-center-btn"> <button class="btn btn-danger" onclick="desbloquear(${data[i].id})">DESBLOQUEAR</button> </div>
            </div>    
            `;
        }else{
          tabla.innerHTML += `
            <div class="row row-red" id="row-item-${data[i].id}">
                <div class="col-item-center">${data[i].id}</div>
                <div class="col-item">${data[i].usuario}</div>
                <div class="col-item-center">${data[i].bloqueado}</div>
                <div class="col-item">${data[i].apellido}</div>
                <div class="col-item">${data[i].nombre}</div>
                <div class="col-item-center-btn"> <button class="btn btn-success" onclick="bloquear(${data[i].id})">BLOQUEAR</button> </div>
                <div class="col-item-center-btn"> <button class="btn btn-danger" onclick="desbloquear(${data[i].id})">DESBLOQUEAR</button> </div>
            </div>    
            `;
        }
      }
    });
}

function nextPage(){
  letStart += 30;
  getAll();
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
  