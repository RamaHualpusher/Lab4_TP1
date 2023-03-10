//Traer los datos de la API para llenar la tabla
//Traer los datos en formato json (http://168.194.207.98:8081/tp/lista.php?action=BUSCAR)
//Llenar la tabla con los datos

function getAll() {
  let url = "http://168.194.207.98:8081/tp/lista.php?action=BUSCAR";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let tabla = document.getElementById("content-table");
      tabla.innerHTML = "";
      for (let i = 0; i < 30; i++) {
        tabla.innerHTML += `
            <div class="row">
                <div class="table-item">${data[i].id}</div>
                <div class="table-item">${data[i].usuario}</div>
                <div class="table-item">${data[i].bloqueado}</div>
                <div class="table-item">${data[i].apellido}</div>
                <div class="table-item">${data[i].nombre}</div>
                <div class="table-item"> <button class="btn btn-success" onclick="bloquear(${data[i].id})">BLOQUEAR</button> </div>
                <div class="table-item"> <button class="btn btn-danger" onclick="desbloquear(${data[i].id})">DESBLOQUEAR</button> </div>
            </div>    
            `;
      }
    });
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
