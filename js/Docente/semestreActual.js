//CONEXION CON EL BACK


async function verSemestreEstado(estado) {

    let token = localStorage.getItem("token")
    const result = await fetch(urlBasic + "/semestre/estado/" + estado, {
        method: 'GET',

        headers: {
            "Authorization": "Bearer " + token,
            "Content-type": "application/json"
        }
    })
    return result

}

async function saveUsuarioSemestre(usuarioSemestre) {
    let token = localStorage.getItem("token")
    const result = await fetch(urlBasic + "/usuario/semestre/save", {
        method: 'POST',
        body: JSON.stringify(usuarioSemestre),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-type": "application/json"
        }

    })
    return result;
}
async function verListadeSemestreDelDocente() {

    let token = localStorage.getItem("token")
    let id = JSON.parse(localStorage.getItem("data")).id
    const result = await fetch(urlBasic + "/usuario/semestre/" + id + "/docente", {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + token,
            "Content-type": "application/json"
        }
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
//Verifica  la EVALUCIONES POR ID USUARIO SEMESTRE
async function getExisteEvaluacionSemestre(id) {
    let token = localStorage.getItem("token")

    let userSemestreId = localStorage.getItem("userSemestreId")
    const result = await fetch(urlBasic+"/usuario/evaluacion/" + id + "/usuario/" + userSemestreId, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    return result


}
function listaEvaluacioneSemestre(lista) {

    const semestreDoncente = lista
    console.log(semestreDoncente)

    let semestreActual = localStorage.getItem("semestreActual")
    //Si hay un semestre actual
    if (semestreActual != null) {
        // alert(semestreActual)
        //Busco las evaluaciones del semestre
        getEvaluacionesSemestre(semestreActual)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                let body = ""
                for (let i = 0; i < data.length; i++) {
                    const estadoActivaPresente = data[i].estadosEvaluacion.some(item => item.estadoId.nombre === 'ACTIVA');
                    const estadoCerradaPresente = data[i].estadosEvaluacion.some(item => item.estadoId.nombre === 'CERRADA');
                    //Si la evaluacion esta Activa se muestra para el docente
                    let btnRealizarEvaluacion = ""
                   
                    
                  

                    /*
                    if(semestreDoncente.listaEvaluacionesRegistradas!=null){
                        for (let i = 0; i < semestreDoncente.listaEvaluacionesRegistradas.length; i++) {
                            
                            
                        }
                    }
                    */
                    if (estadoActivaPresente && !estadoCerradaPresente) {
                        nombreEstado = "ACTIVA"
                        console.log(data[i])
                        localStorage.setItem(data[i].id, JSON.stringify(data[i]))
                        // document.cookie = "miCookie=" + JSON.stringify(data[i]) + "; expires=Thu, 1 Jan 2024 12:00:00 UTC; path=/";

                        body += `<div class="col text-center" >
                            <div class="col-md-auto">
                            <div class="card">
                              <div class="card-header bg-red">
                                <i class="fas fa-columns fa-2x"></i>
                                <h5 class="card-title mt-3 text-capitalize" >  ${data[i].categoriaId.nombre}</h5>
                              </div>
                              <div class="card-body">
                                
                                <blockquote class="blockquote mb-0">
                                    <footer class="blockquote-footer">Titulo</footer>

                                    <p >${data[i].titulo}</p>
                                    <hr>
                                    <p >Descripcion :${data[i].descripcion}</p>

                                    
                                    
                                </blockquote>
                                
                              </div>
                              <div class="card-footer text-center justify-content-center">
                              <a class="btn btn-outline-success ${btnRealizarEvaluacion} " href="./evaluacion/index.html?id=${data[i].id}"  >Realizar Evaluacion
                              <i class="fa-solid fa-chevron-right "></i></a>

                              
                              </div>
                            </div>
                          </div>

                          </div>`
                    }

                }
                document.getElementById("evaluaciones").innerHTML = body

            })
            .catch(err => {
                console.log(err)
            })
            .finally(final => {

            })
    }
}
try {
    //Boton para unirser al semestre
    const unirmeSemestre = document.getElementById("unirmeSemestre")
    function buscarSemestreActual() {
        //Busco el semestre actual
        verSemestreEstado("ACTUAL")
            .then(response => response.json())
            .then(data => {
                const registrado = document.getElementById("registrado")
                //Si encuenta el semestre actual
                if (data.length >= 1) {
                    //lo guardo en la sesion
                    localStorage.setItem("semestreActual", data[0].id)
                    //Muestro los datos en la card
                    let fechaInicio = new Date(data[0].fechaInicio).toLocaleDateString()
                    let fechaFin = new Date(data[0].fechaFin).toLocaleDateString()
                    document.getElementById("nombreSemestre").innerHTML = data[0].nombre
                    document.getElementById("visibilidad").innerHTML = data[0].visibilidad
                    document.getElementById("fechas").innerHTML = fechaInicio + " - " + fechaFin
                    // Busco la lista de semestre del docente 
                    verListadeSemestreDelDocente()
                        .then(response => response.json())
                        .then(lista => {
                            console.log(lista)
                            if (lista.length == 0) {
                                // alert("vacio")

                            }
                            try {
                                //Guardo el id del usuarioSemestre
                                localStorage.setItem("userSemestreId", lista[0].id)
                            } catch (error) {

                            }

                            //Obtengo la visibilidad del semestre
                            let visibilidad = data[0].visibilidad
                            console.log(visibilidad)
                            //Si no estoy registrado en ningun semestre 
                            if (lista.length == "0" && visibilidad === "PUBLICO") {
                                //Muestro el boton para unirme 
                                unirmeSemestre.className = "btn btn-outline-success"
                            } else {
                                //Busco si  en la lista estoy registrado en el semestre actual
                                var semestreEncontrado = lista.find(function (item) {
                                    return item.semestreId.id === data[0].id;
                                });

                                // Verificar si se encontró el objeto
                                if (semestreEncontrado) {
                                    //Mustro Mensaje que el docente esta registrado en el semestre 
                                    registrado.className = "bg-success h3 rounded fw-bold text-light "

                                    //Si no estoy registrado en el semestre
                                } else if (visibilidad === "PUBLICO") {
                                    //Muestro el boton para registrarme
                                    unirmeSemestre.className = "btn btn-outline-success "


                                }
                                //Funcion para mostrar la lista de Evaluaciones ACTIVA en el semestre

                                listaEvaluacioneSemestre(lista[0])

                                //Funcion para mostrar la lista de semestes registrado del docente 

                                mostraSemestres(lista)

                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        .finally(fina => {

                        })



                } else {
                    //Muestro mensaje que no un semestre actual
                    document.getElementById("nombreSemestre").innerHTML = "No hay"
                    document.getElementById("visibilidad").innerHTML = "-"
                    document.getElementById("fechas").innerHTML = "-"
                    // Busco la lista de semestre del docente 
                    verListadeSemestreDelDocente()
                        .then(response => response.json())
                        .then(lista => {
                            //Muestro la lista de semestres registrados del docente
                            mostraSemestres(lista)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        .finally(fina => {

                        })
                }

            })
            .catch(err => {
                console.log(err)
            })
            .finally(fina => {

            })
    }
} catch (error) {

}
//Muestro la lista de semestres registrados del docente
function mostraSemestres(lista) {
    let counter = 1;
    var t = $('#semestresRegistrado').DataTable()
    t.clear().draw();
    let color = ""
    for (let i = 0; i < lista.length; i++) {
        let estado = lista[i].semestreId.estado
        if (estado == "ACTUAL") {
            color = "success"
        } else {
            color = "warning"
        }
        t.row.add([i + 1
            , `<p class="text-dark text-light rounded fw-bold bg-${color}">${lista[i].semestreId.nombre}</p>`
            , new Date(lista[i].semestreId.fechaInicio).toLocaleDateString()
            , new Date(lista[i].semestreId.fechaFin).toLocaleDateString()
            , `<p class="text-dark text-light rounded fw-bold bg-${color}">${lista[i].semestreId.estado}</p>`
            , lista[i].semestreId.visibilidad,
        ]).draw(false);

        counter++;

    }
}
//Funcion para unirse al semestre actual
unirmeSemestre.addEventListener('click', () => {
    mostrarSpinner()

    let id = JSON.parse(localStorage.getItem("data")).id
    let semestreActual = localStorage.getItem("semestreActual")
    let fecha = new Date()
    const usuarioSemestre = {
        usuarioId: {
            id
        },
        semestreId: {
            id: semestreActual
        },
        fechaRegistro: fecha
    }

    saveUsuarioSemestre(usuarioSemestre)
        .then(response => response)
        .then(newUsuario => {
            unirmeSemestre.className = "btn btn-outline-success d-none"
            buscarSemestreActual()
        })
        .catch(err => {
            console.log(err)
        })
        .finally(final => {
            ocultarSpinner()

        })


})
$(document).ready(function () {
    $('#semestresRegistrado').DataTable({
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

