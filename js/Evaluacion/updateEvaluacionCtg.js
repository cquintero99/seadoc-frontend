
//ELIMINAR PREGUNTA
async function deletePregunta(id) {
    let token = localStorage.getItem("token")
    const result = await fetch(urlBasic + "/pregunta/" + id, {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer " + token,
            "Content-type": "application/json"
        }
    })
    return result
}

//ACTUALIAR PREGUNTA
async function updatePregunta(pregunta) {
    let token = localStorage.getItem("token")
    const result = await fetch(urlBasic + "/pregunta/" + pregunta.id + "/update", {
        method: 'PUT',
        body: JSON.stringify(pregunta),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-type": "application/json"
        }

    })
    return result

}
//SAVE PREGUNTA
async function savePreguntaE(pregunta) {
    let token = localStorage.getItem("token")

    const result = await fetch(urlBasic + "/pregunta/save", {
        method: 'POST',
        body: JSON.stringify(pregunta),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-type": "application/json"
        }
    })
    return result
}
function crearPreguntaE(id) {
    mostrarSpinner()
    const savePreguntaCategoria = document.getElementById("savePreguntaCategoria" + id)

    if(savePreguntaCategoria.value!=""){
    let criterioId=sessionStorage.getItem("criterioId")
    let evaluacionId=sessionStorage.getItem("evaluacionId")
    let preguntaNueva=savePreguntaCategoria.value
    const pregunta={
        criterioId,
        evaluacionId,
        categoriaId: id,
        descripcion: preguntaNueva,
        fechaRegistro: new Date(),
    }
   
    console.log(pregunta)
    savePreguntaE(pregunta)
    .then(response=>response)
    .then(data=>{
            let preguntaC = document.getElementById("preguntaC" + id)
    preguntaC.innerHTML += `<div class="list-group-item  mb-3 d-sm-flex" id="${data.id}">
    <div class="input-group " >
    <input type="text" id="input${data.id}" class="form-control" value="${preguntaNueva}"
    disabled>
    
    <button  onclick="actualizarPreguntaE('${data.id}')" class="input-group-text btn btn-outline-warning" type="button">
    <i class="fa fa-pencil" aria-hidden="true"></i></button>
    <button id="crearCategoria" onclick="eliminarPreguntaE('${data.id}')" class="input-group-text btn btn-outline-danger" type="button">
    <i class="fa fa-times" aria-hidden="true"></i></button>
    
    </div>
    <hr>
    </div>`

        
    })
    .catch(err=>{
        alert(err)

    })
    .finally(final=>{
        ocultarSpinner()
    })
    
    
    
    }
}
function actualizarPreguntaE(id) {

    const pregunta = document.getElementById("input" + id)
    document.getElementById(id).innerHTML = `<div class="input-group " >
    <input type="text" id="input${id}" class="form-control" value="${pregunta.value}"
     >
    
    <button  onclick="confirmarInfoPregunta('${id}')" class="input-group-text btn btn-outline-success" type="button">
    <i class="fa fa-check" aria-hidden="true"></i></button>
    <button id="crearCategoria" onclick="eliminarPreguntaE('${id}')" class="input-group-text btn btn-outline-danger" type="button">
    <i class="fa fa-times" aria-hidden="true"></i></button>
    
    </div>
    <hr>`
}
function confirmarInfoPregunta(id) {
    mostrarSpinner()
    const pregunta = document.getElementById("input" + id)

    const newPregunta = {
        id,
        descripcion: pregunta.value
    }
    if (newPregunta.descripcion.value == "") {

    } else {
        updatePregunta(newPregunta)
            .then(responde => responde.json())
            .then(data => {
                console.log(data)
                document.getElementById(id).innerHTML = `<div class="input-group " >
    <input type="text" id="input${id}" class="form-control" value="${pregunta.value}"
     disabled>
    
    <button  onclick="actualizarPreguntaE('${id}')" class="input-group-text btn btn-outline-warning" type="button">
    <i class="fa fa-pencil" aria-hidden="true"></i></button>
    <button id="crearCategoria" onclick="eliminarPreguntaE('${id}')" class="input-group-text btn btn-outline-danger" type="button">
    <i class="fa fa-times" aria-hidden="true"></i></button>
    
    </div>
    <hr>`
            })
            .catch(err => {
                console.log(err)
            })
            .finally(final => {
                ocultarSpinner()

            })
    }

}
function eliminarPreguntaE(id) {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-outline-success',
            cancelButton: 'btn btn-outline-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Estas seguro?',
        text: "Quieres eliminar la pregunta!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar!',
        cancelButtonText: 'Salir!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            deletePregunta(id)
                .then(response => response)
                .then(data => {
                    if (data.status == 200) {
                        const pregunta = document.getElementById(id)
                        pregunta.remove()
                        swalWithBootstrapButtons.fire(
                            'Eliminado!',
                            'Se elimino la pregunta.',
                            'success'
                        )

                    }
                })
                .catch(err => {

                })
                .finally(final => {

                })

        }
    })

}