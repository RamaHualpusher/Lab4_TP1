var log = require ('./login.js');
function goLogin(){
    window.location.href = "/views/login.html";
}
function login(){
  let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;
  console.log(user, pass);
}
