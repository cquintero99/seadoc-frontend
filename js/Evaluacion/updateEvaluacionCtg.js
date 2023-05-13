//ACTUALIAR CATEGORIA
async function updateCategoriaPregunta(categoria) {
    let token = localStorage.getItem("token")
    const result = await fetch(urlBasic + "/categoria/pregunta/" + categoria.id + "/update", {
        method: 'PUT',
        body: JSON.stringify(categoria),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-type": "application/json"
        }

    })
    return result

}

//ELIMINAR CATEGORIA PREGUNTA
async function deleteCategoriaPregunta(id) {
    let token = localStorage.getItem("token")
    const result = await fetch(urlBasic + "/categoria/pregunta/" + id, {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer " + token,
            "Content-type": "application/json"
        }
    })
    return result
}
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
//SAVE CATEGORIA
async function saveCategoria(categoria) {
    let token = localStorage.getItem("token")

    const result = await fetch(urlBasic + "/categoria/pregunta/save", {
        method: 'POST',
        body: JSON.stringify(categoria),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-type": "application/json"
        }
    })
    return result
}
function crearCategoriaE() {
    mostrarSpinner()
    let categoria = document.getElementById("inputCategoriaP").value

    let evaluacionId = sessionStorage.getItem('evaluacionId')

    const categoriaPregunta = {
        evaluacionId,
        nombre: categoria,
        descripcion: "",


    }
    saveCategoria(categoriaPregunta)
        .then(response => response.json())
        .then(data => {
            document.getElementById("inputCategoriaP").value=""
            sessionStorage.setItem("categoria" + data.id, JSON.stringify(data))
            document.getElementById("list-example").innerHTML += `<div id="ctgE${data.id}" class="mb-3 row  list-group-item 
                list-group-item-action">
               
                <div class="input-group " id="ctg${data.id}">
                
                <div class="btn-group dropup">
                <input type="text" class="from-control fw-bold"  id="input${data.id}"
                  value="${data.nombre}" disabled
                >
  <button type="button" class="btn btn-outline-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
  <i class="fa fa-cog" aria-hidden="true"></i>
  </button>
  <ul class="dropdown-menu">
  <li>
  <div class="dropdown-item input-group">
  <a  href="#list-item-${data.id}" type="buttom" class=" input-group-text btn btn-outline-info" type="button">
                <i class="fa fa-eye" aria-hidden="true"></i></a>
                <button  onclick="actualizarCtgE('${data.id}')" class=" input-group-text btn btn-outline-warning" type="button">
                <i class="fa fa-pencil" aria-hidden="true"></i></button>
                
                <button id="crearCategoria" onclick="eliminarCtgE('${data.id}')" class=" input-group-text btn btn-outline-danger" type="button">
    <i class="fa fa-times" aria-hidden="true"></i></button>
  </div>
  </li>
  </ul>
</div>
                
                
    
                </div>
                
               
    
                </div>`

            document.getElementById("bodyListaCategoria").innerHTML += `<div id="ctgPE${data.id}" class="mt-3 rounded border  border-3">
                <h4 id="list-item-${data.id}" 
                 class="mt-3  fw-medium  text-uppercase text-center">   ${data.nombre}   </h4>

                <div class="input-group mb-3">
                
                <input type="text" class="form-control" id="savePreguntaCategoria${data.id}" placeholder="Crear pregunta para la categoria ${data.nombre}" aria-label="Input group example" aria-describedby="btnGroupAddon">
                <button id="btnAddPregunta" onclick="crearPreguntaE(${data.id})" class="input-group-text btn btn-outline-success" type="button"><i class="fa fa-plus"
                aria-hidden="true" ></i></button>
            </div>
            </br>
            
           
            <div  class=" list-group list-group-numbered list-group-flush" id="preguntaC${data.id}">
            <div>
             </div>   
            `







        })
        .catch(err => {
            console.log(err)
        })
        .finally(final => {
            ocultarSpinner()

        })



}
function actualizarCtgE(id) {
    let input = document.getElementById("input" + id)
    const ctg = document.getElementById("ctg" + id)


    ctg.innerHTML = `
    
                <div class="btn-group dropup">
                <input type="text" class="from-control fw-bold" id="input${id}"
                  value="${input.value}" 
                >
                <button type="button" class="btn btn-outline-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa fa-cog" aria-hidden="true"></i>
                </button>
                <ul class="dropdown-menu">
                <li>
                <div class="dropdown-item input-group">
                <a  href="#list-item-${id}" type="buttom" class=" input-group-text btn btn-outline-info" type="button">
                <i class="fa fa-eye" aria-hidden="true"></i></a>
                <button  onclick="confirmarCtgE('${id}')" class=" input-group-text btn btn-outline-success" type="button">
                <i class="fa fa-check" aria-hidden="true"></i></button>
                              
                <button id="crearCategoria" onclick="eliminarCtgE('${id}')" class=" input-group-text btn btn-outline-danger" type="button">
                <i class="fa fa-times" aria-hidden="true"></i></button>
                </div>
                </li>
                </ul>
              </div>
               
                
                
    
    `
    setTimeout(() => {
        console.log(input)
        input.focus()
    }, 100)

}
function confirmarCtgE(id) {
    mostrarSpinner()
    const input = document.getElementById("input" + id)
    const ctg = document.getElementById("ctg" + id)
    let evaluacionId = sessionStorage.getItem("evaluacionId")
    const newCategoria = {
        id,
        evaluacionId,
        nombre: input.value,
        descripcion: ""

    }
    if (newCategoria.nombre != "") {
        updateCategoriaPregunta(newCategoria)
            .then(response => response)
            .then(data => {
                if (data.status = 200) {
                    const nombreCtg = document.getElementById("list-item-" + id)
                    nombreCtg.innerHTML = newCategoria.nombre
                    ctg.innerHTML = `
   
                <div class="btn-group dropup">
                <input type="text" class="from-control  fw-bold " id="input${id}"
                value="${input.value}" disabled
              >
  <button type="button" class="btn btn-outline-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
  <i class="fa fa-cog" aria-hidden="true"></i>
  </button>
  <ul class="dropdown-menu">
  <li>
  <div class="dropdown-item input-group">
  <a  href="#list-item-${id}" type="buttom" class=" input-group-text btn btn-outline-info" type="button">
  <i class="fa fa-eye" aria-hidden="true"></i></a>
  <button  onclick="actualizarCtgE('${id}')" class=" input-group-text btn btn-outline-warning" type="button">
  <i class="fa fa-pencil" aria-hidden="true"></i></button>
  
  <button id="crearCategoria" onclick="eliminarCtgE('${id}')" class=" input-group-text btn btn-outline-danger" type="button">
<i class="fa fa-times" aria-hidden="true"></i></button>
  </div>
  </li>
  </ul>
</div>
               
    `

                }

            })
            .catch(err => {
                alert(err)
            })
            .finally(final => {
                ocultarSpinner()

            })

    } else {
        ocultarSpinner()
    }
}

function eliminarCtgE(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-outline-success',
            cancelButton: 'btn btn-outline-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Estas seguro?',
        text: "Quieres eliminar la categoria!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar!',
        cancelButtonText: 'Salir!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            mostrarSpinner()
            deleteCategoriaPregunta(id)
                .then(response => response)
                .then(data => {
                    if (data.status == 200) {
                        ocultarSpinner()
                        const nombre = document.getElementById("ctgE" + id)
                        nombre.remove()
                        const body = document.getElementById("ctgPE" + id)
                        body.remove()
                        swalWithBootstrapButtons.fire(
                            'Eliminado!',
                            'Se elimino la categoria.',
                            'success'
                        )

                    }
                })
                .catch(err => {

                })
                .finally(final => {
                    ocultarSpinner()
                })

        }
    })


}

function crearPreguntaE(id) {
    mostrarSpinner()
    const savePreguntaCategoria = document.getElementById("savePreguntaCategoria" + id)

    if (savePreguntaCategoria.value != "") {
        let criterioId = sessionStorage.getItem("criterioId")
        let evaluacionId = sessionStorage.getItem("evaluacionId")
        let preguntaNueva = savePreguntaCategoria.value
        const pregunta = {
            criterioId,
            evaluacionId,
            categoriaId: id,
            descripcion: preguntaNueva,
            fechaRegistro: new Date(),
        }

        console.log(pregunta)
        savePreguntaE(pregunta)
            .then(response => response.json())
            .then(data => {
                savePreguntaCategoria.value = ""
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
            .catch(err => {
                alert(err)

            })
            .finally(final => {
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
            mostrarSpinner()
            deletePregunta(id)
                .then(response => response)
                .then(data => {
                    if (data.status == 200) {
                        ocultarSpinner()
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
                    ocultarSpinner()
                })

        }
    })

}