
const urlBasic = "https://teacher-test-backend-production.up.railway.app"

const urlAWS = "https://awss3-production.up.railway.app"

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});
function docente() {

    localStorage.setItem("modulo", "docente")


}
function director() {

    localStorage.setItem("modulo", "director")


}
try {
    localStorage.setItem("modulo", "docente")

} catch (error) {


}
window.addEventListener('load', () => {

    try {


        let nombre = JSON.parse(localStorage.getItem("data")).nombre
        document.getElementById("nombreUsuario").innerHTML = `<h5 class="mt-3 p-3 mb-3  text-light " >Bienvenido _ ${nombre} </h5>`

    } catch (error) {
        /*
        let URLactual = window.location.pathname
        if (URLactual != "/index.html" && URLactual !="/forgotPassword.html" && URLactual!="/register.html") {
            window.location.href = "/index.html"
        }
        */
    }


});

try {

    const salir = document.getElementById("salir")

    salir.addEventListener('click', () => {
        localStorage.clear()
    })
} catch (error) {

}

try {
    // Obtener el valor del parámetro de consulta "dato"
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token != null) {
        console.log(token)
        localStorage.setItem("token", token)
        window.location.href = "./cambio/index.html"
    }
} catch (error) {

}

function mostrarSpinner() {
    document.getElementById("spinner-container").style.display = "flex";
    document.getElementById("sppiner").innerHTML = `<div id="spinner-container" class="d-flex justify-content-center align-items-center ">
      <div class="spinner-border text-danger" role="status">
        <span class="sr-only">Cargando...</span>
      </div>
    </div>`
  }
  
  function ocultarSpinner() {
    document.getElementById("spinner-container").style.display = "none";
    document.getElementById("sppiner").innerHTML = `<div id="spinner-container" class="d-flex justify-content-center align-items-center d-none">
      <div class="spinner-border text-danger" role="status">
        <span class="sr-only">Cargando...</span>
      </div>
    </div>`
  }

 