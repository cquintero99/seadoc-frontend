

async function updateSemestre(semestre) {
    let token = localStorage.getItem("token")

    const result = await fetch(urlBasic + "/semestre/" + semestre.id + "/update", {
        method: 'PUT',
        body: JSON.stringify(semestre),
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        }
    })
    return result;

}
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

function verSemestre(id) {
    mostrarSpinner()
    getSemestreId(id)
        .then(response => response.json())
        .then(data => {
            cargarDatosModal(data)

        })
        .catch(err => {

            console.log(err)

        })
        .finally(final => {
            ocultarSpinner()
        })
}

function cargarDatosModal(semestre) {
    //Formateo fecha de inicio
    let fechaOriginalIncio = new Date(semestre.fechaInicio);
    let fechaInicio = fechaOriginalIncio.toISOString().substring(0, 10);
    // Fromateo fecha de fin
    let fechaOriginalFin = new Date(semestre.fechaFin);
    let fechaFin = fechaOriginalFin.toISOString().substring(0, 10);
    // Formateo fecha de registro
    let fechaOriginalRegistro = new Date(semestre.fechaRegistro);
    let fechaRegistro = fechaOriginalRegistro.toISOString().substring(0, 10);
    let disabled = "disabled"
    // Agrego body del modal Actualizar Semestre
    if (semestre.estado == "ACTUAL") {
        disabled = ""
    }
    let body = `<h3>${semestre.nombre}</h3>
    
    <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Fecha de Inicio</label>
        <input type="date" class="form-control text-center" id="sFechaInicio" value="${fechaInicio}">
    </div>
    <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Fecha de Final</label>
        <input type="date" class="form-control text-center" id="sFechaFin" value="${fechaFin}">
    </div>
    <div class=" mb-3">
        <label for="inputLastName">Visibilidad</label>
        <select class="form-select text-center" id="selectV" aria-label="Default select example" ${disabled}>
            
            <option value="1">PUBLICO</option>
            <option value="2">PRIVADO</option>
        </select>
        
    </div>
    <div class=" mb-3">
         <label for="inputLastName">Estado</label>
        <select class="form-select text-center" id="selectEstado"  aria-label="Default select example" ${disabled}>
            
            <option value="1">REGISTRADO</option>
            <option value="2">ACTUAL</option>
            <option value="3">TERMINADO </option>
        </select>
        
    </div>
    <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Fecha de
            Registro</label>
        <input type="date" class="form-control text-center" id="fechaRegistro" value="${fechaRegistro}" disabled>
    </div>
    `
    document.getElementById("actualizarSemestre").innerHTML = body;
    document.getElementById("footerActualizarS").innerHTML = ` <button type="button" class="btn btn-secondary"
    data-bs-dismiss="modal">Cerrar</button>
<button type="button" class="btn btn-success" onclick="putSemestre(${semestre.id})" data-bs-dismiss="modal"
aria-label="Close" >Actualizar</button>
`
    // Obtener el elemento select Estado 
    const select = document.getElementById("selectEstado")
    if (semestre.estado == "REGISTRADO") {
        select.value = "1"
    } else
        if (semestre.estado == "ACTUAL") {
            select.value = "2";
        } else {
            select.value = "3";
        }

    // Obtener elemento select Vilisibilidad
    const selectV = document.getElementById("selectV")
    if (semestre.visibilidad == "PUBLICO") {
        selectV.value = "1"
    } else {
        selectV.value = "2"
    }



}

function putSemestre(id) {
    mostrarSpinner()

    //Obtengo las fechas
    let fechaInicio = document.getElementById("sFechaInicio").value
    let fechaFin = document.getElementById("sFechaFin").value
    let fechaRegistro = document.getElementById("fechaRegistro").value
    //Obtengo estado
    const select = document.getElementById('selectEstado');
    const optionSeleccionado = select.options[select.selectedIndex];
    const estado = optionSeleccionado.text;
    //Obtengo visibilidad
    const selectV = document.getElementById('selectV');
    const visibilidadOption = select.options[select.selectedIndex];
    const visibilidad = visibilidadOption.text;
    //Creo semestre
    const semestre = {
        id,
        fechaInicio,
        fechaFin,
        fechaRegistro,
        nombre: "",
        estado,
        visibilidad,


    }
    updateSemestre(semestre)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(data)
        })
        .finally(final => {
            ocultarSpinner()

            //const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

           // toastBootstrap.show()

            window.location.reload()
            // verSemestres()

        })
}

const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
    })
}