//OBTENER SEMESTRE POR ID 
const selectSemestre = document.getElementById("selectSemestresDocentes")

const selectSemestres = document.getElementById("selectSemestres")
const dataSemestreActual = document.getElementById("dataSemestreActual")
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
/*#LISTA DE USUARIOS POR SEMESTRE
*/
async function verListaDocentesByIdSemestre(id) {

    let token = localStorage.getItem("token")
    const result = await fetch(urlBasic+"/usuario/semestre/" + id + "/semestre", {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + token,
            "Content-type": "application/json"
        }
    })
    return result

}
function listaSemestreDocentes() {
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
                    //mostrarEvaluaciones(data[i].id)
                    listaDocentes(data[i].id)

                }
                if (!siActual) {
                    actual = "selected"

                    document.getElementById("fechaSemestre").innerHTML = `<p > ESTADO: ${data[i].estado}</p>`


                }
                if (!siActual && Number(i) == data.length - 1) {
                    //mostrarEvaluaciones(data[i].id)
                    listaDocentes(data[i].id)
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
            ocultarSpinner()
        })


}

function listaDocentes(id) {
    mostrarSpinner()
    verListaDocentesByIdSemestre(id)
        .then(res => res.json())
        .then(data => {
            var counter = 1;
            var t = $('#tablaEvaluaciones').DataTable();
            t.clear().draw();
            console.log(data)
           let  acciones = ` <button type="button" class="btn btn-outline-info dropdown-toggle text-center  justify-content-center"  data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa fa-cog" aria-hidden="true"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li>
                            <div class="dropdown-item input-group d-grid gap-2">
                                <a  href="#"  type="buttom" class=" input-group-text btn btn-outline-info" type="button">
                                <i class="fa fa-eye" aria-hidden="true"></i> Informacion
                                </a>
                            </div>
                        </li>
                        <li>
                            <div class="dropdown-item input-group d-grid gap-2">
                                <a href="#"    data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                class="input-group-text btn btn-outline-warning" type="button">
                                <i class="fa fa-pencil" aria-hidden="true"></i> Evaluaciones
                                </a>
                            </div>
                        </li>
                        <li>
                            <div class="dropdown-item input-group d-grid gap-2">
                                <button class="input-group-text btn btn-outline-success"  
                                    type="button"  >
                                <i class="fa fa-plus" aria-hidden="true"></i> CAI
                                </button>
                            </div>
                        </li>
                    </ul>
                   
                
                
            `
            for (let i = 0; i < data.length; i++) {
                t.row.add([i + 1
                    , data[i].usuarioId.nombre
                    , data[i].usuarioId.codigo
                    , data[i].usuarioId.documento
                    , data[i].usuarioId.email
                    , data[i].usuarioId.estado,
                    acciones
                   
                ]).draw(false);
    
                counter++;
                
            }
        })
        .catch(err => {
            console.log(err)
        })
        .finally(final => {
            console.log(final)
            ocultarSpinner()

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
                listaDocentes(data.id)
                // mostrarEvaluaciones(data.id)
            })
            .catch(err => {
                ocultarSpinner()
            })
            .finally(final => {
                ocultarSpinner()
            })

    })
} catch (error) {
    console.log(error)
}
function compararFechasInicioDescendente(a, b) {
    return new Date(b.fechaInicio) - new Date(a.fechaInicio);
}
function compararFechasRegistro(a, b) {
    return new Date(b.fechaRegistro) - new Date(a.fechaRegistro);
}
////////////////////////////////
/*FIN
*/
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