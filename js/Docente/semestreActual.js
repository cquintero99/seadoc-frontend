//CONEXION CON EL BACK
const urlBasic = "https://teacher-test.herokuapp.com"

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
    const result = await fetch(urlBasic + "/usuario/" + id + "/semestre/docente", {
        method: 'GET',

        headers: {
            "Authorization": "Bearer " + token,
            "Content-type": "application/json"
        }
    })
    return result

}

const unirmeSemestre = document.getElementById("unirmeSemestre")
function buscarSemestreActual() {
    verSemestreEstado("ACTUAL")
        .then(response => response.json())
        .then(data => {
            const semestreActual = document.getElementById("semestreActual")
            const registrado = document.getElementById("registrado")

            if (data.length >= 1) {
                localStorage.setItem("semestreActual", data[0].id)
                let fechaInicio = new Date(data[0].fechaInicio).toLocaleDateString()
                let fechaFin = new Date(data[0].fechaFin).toLocaleDateString()
                document.getElementById("nombreSemestre").innerHTML = data[0].nombre
                document.getElementById("visibilidad").innerHTML = data[0].visibilidad
                document.getElementById("fechas").innerHTML = fechaInicio + " - " + fechaFin
                verListadeSemestreDelDocente()
                    .then(response => response.json())
                    .then(lista => {
                        console.log(lista)
                        let visibilidad = data[0].visibilidad
                        if (lista.length == "0" && visibilidad == "PUBLICO") {
                            unirmeSemestre.className = "btn btn-outline-success"
                        } else {
                            var semestreEncontrado = lista.find(function (item) {
                                return item.semestreId.id === data[0].id;
                            });

                            // Verificar si se encontró el objeto
                            if (semestreEncontrado) {
                                registrado.className = "bg-success h3 rounded fw-bold text-light "

                            } else if (visibilidad == "PUBLICO") {
                                unirmeSemestre.className = "btn btn-outline-success "


                            }
                            mostraSemestres(lista)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    .finally(fina => {

                    })



            } else {
                document.getElementById("nombreSemestre").innerHTML = "No hay"
                document.getElementById("visibilidad").innerHTML = "-"
                document.getElementById("fechas").innerHTML = "-"
                verListadeSemestreDelDocente()
                    .then(response => response.json())
                    .then(lista => {
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

