//CONEXION CON EL BACK
const urlBasic = "https://teacher-test.herokuapp.com"
//"https://teacher2023.herokuapp.com"
//"https://teacher-test-backend-production-e58a.up.railway.app";
//"http://localhost:8080"


//OBTENER LISTA DE SEMESTRE
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
//ELIMINAR EVALUACION POR ID
async function deleteEvaluacion(id) {
    let token = localStorage.getItem("token")

    const result = await fetch(urlBasic + "/evaluacion/" + id, {
        method: 'DELETE',
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
                let actual = ""

                if (data[i].estado == "ACTUAL") {
                    siActual = true
                    actual = "selected"

                    document.getElementById("fechaSemestre").innerHTML = `<p > ESTADO: ${data[i].estado}</p>`
                    mostrarEvaluaciones(data[i].id)
                }
                if (!siActual) {
                    actual = "selected"

                    document.getElementById("fechaSemestre").innerHTML = `<p > ESTADO: ${data[i].estado}</p>`


                }
                if (!siActual && Number(i) == data.length - 1) {
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

try {
    selectSemestres.addEventListener('change', () => {
        mostrarSpinner()
        let idSemestre = selectSemestres.value
        getSemestreId(idSemestre)
            .then(response => response.json())
            .then(data => {
    
    
                document.getElementById("fechaSemestre").innerHTML = `<p > ESTADO: ${data.estado}</p>`
    
                mostrarEvaluaciones(data.id)
            })
            .catch(err => {
                ocultarSpinner()
            })
            .finally(final => {
                // ocultarSpinner()
            })
    
    })
} catch (error) {
    console.log(error)
}


function mostrarEvaluaciones(id) {
    mostrarSpinner()
    var counter = 1;
    var t = $('#tablaEvaluaciones').DataTable();
    t.clear().draw();
    getEvaluacionesSemestre(id)
        .then(response => response.json())
        .then(data => {
            data.sort(compararFechasRegistro)
            //href="./editar/index.html"
            
            for (let i = 0; i < data.length; i++) {
                let acciones = ` <button type="button" class="btn btn-outline-info dropdown-toggle text-center  justify-content-center"  data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa fa-cog" aria-hidden="true"></i>
                </button>
                <ul class="dropdown-menu">
                    <li>
                        <div class="dropdown-item input-group d-grid gap-2">
                            <a  href="./gestionar/index.html?id=${data[i].id}"  onclick="gestionarEvaluacion()" type="buttom" class=" input-group-text btn btn-outline-info" type="button">
                            <i class="fa fa-eye" aria-hidden="true"></i> Gestionar
                            </a>
                        </div>
                    </li>
                    <li>
                        <div class="dropdown-item input-group d-grid gap-2">
                            <button  
                            class="input-group-text btn btn-outline-secundary" type="button" disabled>
                            <i class="fa fa-pencil" aria-hidden="true"></i> Editar
                            </button>
                        </div>
                    </li>
                    <li>
                        <div class="dropdown-item input-group d-grid gap-2">
                            <button class="input-group-text btn btn-outline-secundary"  
                                type="button" disabled >
                            <i class="fa fa-times" aria-hidden="true"></i> Elimnar
                            </button>
                        </div>
                    </li>
                </ul>
                  `
               
                let nombreEstado = ""
                const estadoCerradaPresente = data[i].estadosEvaluacion.some(item => item.estadoId.nombre === 'CERRADA');
                if (estadoCerradaPresente) {
                    nombreEstado = "CERRADA"
                } else {
                    const estadoActivaPresente = data[i].estadosEvaluacion.some(item => item.estadoId.nombre === 'ACTIVA');

                    if (estadoActivaPresente) {
                        nombreEstado = "ACTIVA"
                    } else {
                        const estadoRegistradaPresente = data[i].estadosEvaluacion.some(item => item.estadoId.nombre === 'REGISTRADA');


                        if (estadoRegistradaPresente) {
                            nombreEstado = "REGISTRADA"

                        }
                    }
                }




                let color = ""
                if (nombreEstado == 'REGISTRADA') {
                    color = "info"
                    acciones = ` <button type="button" class="btn btn-outline-info dropdown-toggle text-center  justify-content-center"  data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa fa-cog" aria-hidden="true"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li>
                            <div class="dropdown-item input-group d-grid gap-2">
                                <a  href="./gestionar/index.html?id=${data[i].id}"  onclick="gestionarEvaluacion()" type="buttom" class=" input-group-text btn btn-outline-info" type="button">
                                <i class="fa fa-eye" aria-hidden="true"></i> Gestionar
                                </a>
                            </div>
                        </li>
                        <li>
                            <div class="dropdown-item input-group d-grid gap-2">
                                <a href="#"  onclick="editarEvaluacion(${data[i].id})"  data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                class="input-group-text btn btn-outline-warning" type="button">
                                <i class="fa fa-pencil" aria-hidden="true"></i> Editar
                                </a>
                            </div>
                        </li>
                        <li>
                            <div class="dropdown-item input-group d-grid gap-2">
                                <button class="input-group-text btn btn-outline-danger"  
                                    type="button" onclick="eliminarEvaluacion(${data[i].id})" >
                                <i class="fa fa-times" aria-hidden="true"></i> Elimnar
                                </button>
                            </div>
                        </li>
                    </ul>
                   
                
                
            `
                } else if (nombreEstado == 'ACTIVA') {
                    color = "success"


                } else if (nombreEstado == 'CERRADA') {
                    color = "warning"
                }
                let fechaRegistro = new Date(data[i].fechaRegistro).toLocaleDateString();
                let categoria = ` <p class="text-uppercase   ">${data[i].categoriaId.nombre}</p>`
                let estado = ` <p class="text-uppercase rounded text-center  bg-${color} ">${nombreEstado}</p>`
                let fechaR = ` <p class="text-uppercase text-center  ">${fechaRegistro}</p>`

                t.row.add([i + 1
                    , data[i].titulo
                    , data[i].descripcion
                    , categoria
                    , estado
                    , fechaR
                    , acciones
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

function eliminarEvaluacion(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Estas Seguro?',
        text: "Esta accion elimina la evaluación!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar!',
        cancelButtonText: 'Cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {

            deleteEvaluacion(id)
                .then(response => response)
                .then(data => {
                    console.log(data)
                    swalWithBootstrapButtons.fire(
                        'Eliminado!',
                        'La evaluacion se elimino',
                        'success'
                    )
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(final => {
                    // verSemestres()
                    listadoSemestre()

                })

        }
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
$(document).ready(function () {
    $('#tablaEvaluaciones').DataTable({
        "language": {
            "decimal": "",
            "emptyTable": "No hay datos disponibles en la tabla",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
            "infoEmpty": "Mostrando 0 a 0 de 0 registros",
            "infoFiltered": "(filtrado de _MAX_ registros totales)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ registros",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No se encontraron registros coincidentes",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "aria": {
                "sortAscending": ": activar para ordenar de manera ascendente",
                "sortDescending": ": activar para ordenar de manera descendente"
            }
        }
    });
})
