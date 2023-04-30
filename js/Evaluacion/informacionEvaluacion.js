async function listaCategoriaEvaluacion() {

}

window.addEventListener('load', function () {
    mostrarSpinner()
    
    verSemestreEstado("ACTUAL")
        .then(response => response.json())
        .then(data => {
            sessionStorage.setItem("semestreActual",JSON.stringify(data))
            
            seeDataEvaluacion(data)
        })
        .catch(err => {
            console.log(err)
        })
        .finally(final=>{
            ocultarSpinner()
        })


    // Código a ejecutar después de que se haya cargado la página

})
function seeDataEvaluacion(data) {
    let body = ""
    if (data.length > 0) {
        localStorage.setItem("semestre", JSON.parse(data[0].id))
        body = `<div class="col-xl-6">
            <p>Semestre Actual: ${data[0].nombre}</p>
        </div>
        <div class="col-xl-6">
            ${new Date(data[0].fechaInicio).toLocaleDateString()} - ${new Date(data[0].fechaFin).toLocaleDateString()}
        </div>`

    } else {
        body = `<div class="col-xl-6">
            <p>No hay Semestre Actual</p>
        </div>
        <div class="col-xl-6">
            -
        </div>`

    }
    document.getElementById("datosSemestreActual").innerHTML = body
    let nombre = JSON.parse(localStorage.getItem("data")).nombre
    document.getElementById("nombreAdmin").innerHTML = `<div class="col-xl-6">
        <p> <a href="#" > ${nombre} </a></p>
        <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item active">Administrador</li>
                    </ol>
     </div>
     <div class="col-xl-6">

     </div>`
}

function mostrarSpinner() {
    document.getElementById("sppiner").innerHTML = `<div id="spinner-container" class="d-flex justify-content-center align-items-center ">
      <div class="spinner-border text-danger" role="status">
        <span class="sr-only">Cargando...</span>
      </div>
    </div>`
  }
  
  
  function ocultarSpinner() {
    document.getElementById("sppiner").innerHTML = `<div id="spinner-container" class="d-flex justify-content-center align-items-center d-none">
      <div class="spinner-border text-danger" role="status">
        <span class="sr-only">Cargando...</span>
      </div>
    </div>`
  }


