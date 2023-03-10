
function login() {
  let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;
  let url = "http://168.194.207.98:8081/tp/login.php";
  let params = "user=" + user + "&pass=" + pass;
  fetch(url + "?" + params)
    .then((response) => response.json())
    .then((data) => {
      if (data.respuesta == "ERROR") {
        alert(data.mje);
      } else {
        sessionStorage.setItem("user", user);
        window.location.href = "lista.html";
      }
    });
}

// Async/await version of login() function above 
async function login2() {
  let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;
  let url = "http://168.194.207.98:8081/tp/login.php";
  let params = "user=" + user + "&pass=" + pass;
  const response = await fetch(url + "?" + params);
  const data = await response.json();
  if (data.respuesta == "ERROR") {
    alert(data.mje);
  } else {
    sessionStorage.setItem("user", user);
    window.location.href = "lista.html";
  }
  return data;
}

function logout() {
  sessionStorage.removeItem("user");
  window.location.href = "/views/login.html";
}
