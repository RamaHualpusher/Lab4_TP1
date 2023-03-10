function goLogin(){
    sessionStorage.getItem("user") ? 
    window.location.href = "/views/lista.html" :
    window.location.href = "/views/login.html";
}
