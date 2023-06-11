
const urlBasic = "http://localhost:8080"

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