//CONEXION CON EL BACK
const urlBasic = "https://teacher-test-backend-production-e58a.up.railway.app";
//"http://localhost:8080"



async function listaSemestres() {
    let token = localStorage.getItem("token");

    const result = await fetch(urlBasic + "/semestre", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
            "Content-type": "Application/json",
        },
    })
    return result

}
//OBTENER SEMESTRE POR ID 

async function getSemestreId(id) {
    let token = localStorage.getItem("token")

    const result = await fetch(urlBasic + "/semestre/" + id, {
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        }
    })
    return result;

}
//LISTA DE EVALUCIONES POR ID SEMESTRE
async function getEvaluacionesSemestre(id) {
    let token = localStorage.getItem("token")

    const result = await fetch(urlBasic + "/evaluacion/" + id + "/semestre", {
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    return result


}
function compararFechasInicioDescendente(a, b) {
    return new Date(b.fechaInicio) - new Date(a.fechaInicio);
  }
  function compararFechasRegistro(a, b) {
    return new Date(b.fechaRegistro) - new Date(a.fechaRegistro);
  }
  



const selectSemestres = document.getElementById("selectSemestres")
const dataSemestreActual = document.getElementById("dataSemestreActual")
function listadoSemestre() {
    mostrarSpinner()
    listaSemestres()
        .then(response => response.json())
        .then(data => {
            data.sort(compararFechasInicioDescendente)
            
            let body = ""
            let dataSemestre = ""
            var siActual = false
            for (let i = 0; i < data.length; i++) {
                let fechaInicio = new Date(data[i].fechaInicio).toLocaleDateString()
                let fechaFin = new Date(data[i].fechaFin).toLocaleDateString()
                let actual = ""

                if (data[i].estado == "ACTUAL") {
                    siActual = true
                    actual = "selected"
                    dataSemestre = ` <div class="col-xl-4">
                            ESTADO: ${data[i].estado}
                        </div>
                        <div class="col-xl-4">
                            VISIBILIDAD: ${data[i].visibilidad}
                        </div>
                        <div class="col-xl-4">
                        ${fechaInicio} - ${fechaFin}
                    </div>
                        
                        `
                    mostrarEvaluaciones(data[i].id)
                }
                if (!siActual) {
                    actual = "selected"
                    dataSemestre = ` <div class="col-xl-4">
                            ESTADO: ${data[i].estado}
                        </div>
                        <div class="col-xl-4">
                            VISIBILIDAD: ${data[i].visibilidad}
                        </div>
                        <div class="col-xl-4">
                        ${fechaInicio} - ${fechaFin}
                    </div>
                        
                        `

                }
                if(!siActual && Number(i)==data.length-1){
                    mostrarEvaluaciones(data[i].id)
                }

                body += `<option ${actual} value="${data[i].id}" > <a  >${data[i].nombre} </a></option>
           `

            }
            selectSemestres.innerHTML = body
            dataSemestreActual.innerHTML = dataSemestre
        })
        .catch(err => {
            console.log(err)
            ocultarSpinner()
        })
        .finally(final => {
          //  ocultarSpinner()
        })


}
selectSemestres.addEventListener('change', () => {
    mostrarSpinner()
    let idSemestre = selectSemestres.value
    getSemestreId(idSemestre)
        .then(response => response.json())
        .then(data => {
            let fechaInicio = new Date(data.fechaInicio).toLocaleDateString()
            let fechaFin = new Date(data.fechaFin).toLocaleDateString()
            dataSemestreActual.innerHTML = ` <div class="col-xl-4">
                                                        ESTADO: ${data.estado}
                                                    </div>
                                                    <div class="col-xl-4">
                                                        VISIBILIDAD: ${data.visibilidad}
                                                    </div>
                                                    <div class="col-xl-4">
                                                    ${fechaInicio} - ${fechaFin}
                                                </div>
                                                    
                                                    `
            mostrarEvaluaciones(data.id)
        })
        .catch(err => {
            ocultarSpinner()
        })
        .finally(final => {
           // ocultarSpinner()
        })

})



function mostrarEvaluaciones(id) {
    mostrarSpinner()
    var counter = 1;
    var t = $('#tablaEvaluaciones').DataTable();
    t.clear().draw();
    getEvaluacionesSemestre(id)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.sort(compararFechasRegistro)
            let acciones = `<div class="input-group " >
    
            <button onclick="verSemestre(${id})"  data-bs-toggle="modal" data-bs-target="#staticBackdrop3"
             class="input-group-text btn btn-warning" type="button">
            <i class="fa fa-pencil" aria-hidden="true"></i></button>
            <button class="input-group-text btn btn-danger" onclick="eliminarSemestre(${id})" 
             type="button" >
            <i class="fa fa-times" aria-hidden="true"></i></button>
            </div>
            
            
        </div> `
            for (let i = 0; i < data.length; i++) {

                t.row.add([i + 1
                    , data[i].titulo
                    , data[i].descripcion
                    , data[i].categoriaId
                    ,  new Date(data[i].fechaRegistro).toLocaleDateString()
                    ,acciones
                    ]).draw(false);
              
                  counter++;
                
            }
        })
        .catch(err => {
            ocultarSpinner()
        })
        .finally(final => {
            ocultarSpinner()
        })
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

