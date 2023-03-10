export async function loginTest(user, pass) {
    let url = "http://168.194.207.98:8081/tp/login.php";
    let params = "user=" + user + "&pass=" + pass;
    await fetch(url + "?" + params)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
          if (data.respuesta == "ERROR") {
              alert(data.mje);
          } else {
              window.location.href = "lista.html";
          }
        }
      );
  }