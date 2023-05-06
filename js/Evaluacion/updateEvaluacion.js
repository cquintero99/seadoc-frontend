const modalActualizarE = document.getElementById("modalActualizarE")
//OBTENER EVALUACION POR ID
async function getEvalucionById(id) {
    let token = localStorage.getItem("token")
    const result = await fetch(urlBasic + "/evaluacion/" + id, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    return result
}
//OBTENER CATEGORIAS Y PREGUNTAS DE LA EVALUACION
async function getListaCategoriasEvalucionById(id) {
    let token = localStorage.getItem("token")
    const result = await fetch(urlBasic + "/categoria/pregunta/" + id + "/evaluacion", {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    return result
}
//ACTULIZAR INFORMACION DE LA EVALUACION
async function updateInfoEvalucionById(evaluacion) {
    let token = localStorage.getItem("token")
    const result = await fetch(urlBasic + "/evaluacion/" + evaluacion.id + "/update", {
        method: 'PUT',
        body: JSON.stringify(evaluacion),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-type": "application/json"
        }
    })
    return result
}
//ACTUALIZAR CRITERIO GENERAL DESCRICIPCION
async function updateCriterioById(criterio) {
    let token = localStorage.getItem("token")
    const result = await fetch(urlBasic + "/criterio/" + criterio.id + "/update", {
        method: 'PUT',
        body: JSON.stringify(criterio),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-type": "application/json"
        }
    })
    return result
}
//ACTUALIZAR  OPCION DEL CRITERIO
async function updateOpcionById(opcion) {
    let token = localStorage.getItem("token")
    const result = await fetch(urlBasic + "/opcion/" + opcion.id + "/update", {
        method: 'PUT',
        body: JSON.stringify(opcion),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-type": "application/json"
        }
    })
    return result
}
//ELIMINAR OPCION DEL CRITERIO
async function deleteOpcionById(id) {
    let token = localStorage.getItem("token")
    const result = await fetch(urlBasic + "/opcion/" + id, {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer " + token,
            "Content-type": "application/json"
        }
    })
    return result
}


//MUESTRA LA INFORMACION DE LA EVALUACION EN EL MODAL
function editarEvaluacion(idEvaluacion) {
    mostrarSpinner()
    getEvalucionById(idEvaluacion)
        .then(response => response.json())
        .then(evaluacion => {
            //Busco la categoria de la evaluacion

            //PARTE 1 EVALUACION
            //Guardo el id de la evaluacion en la sesion
            sessionStorage.setItem("evaluacionId", evaluacion.id)
            const selectCategoria = document.getElementById("selectCategoriaEvaluacion")
            document.getElementById("inputTitulo").value = evaluacion.titulo
            document.getElementById("textareaDescripcion").value = evaluacion.descripcion
            selectCategoria.value = evaluacion.categoriaId

            //PARTE 2 
            //DESCRIPCION DE LOS CRITERIOS
            sessionStorage.setItem("criterioId", evaluacion.criterio[0].id)
            document.getElementById("textareaDescripcionCriterio").value = evaluacion.criterio[0].descripcion

            //OPCIONES
            let body = ""
            //oreno el array
            evaluacion.criterio[0].opciones.sort((a, b) => {
                return a.valor - b.valor;
            });
            //Guardo las Opciones criterios en la session
            sessionStorage.setItem("criteriosEvaluacion", JSON.stringify(evaluacion.criterio[0].opciones))
            for (let i = 0; i < evaluacion.criterio[0].opciones.length; i++) {
                let idCriterio = evaluacion.criterio[0].opciones[i].id
                body += `<tr class="text-center" id="opcionC${idCriterio}">
                <td>
                    <input id="descripcion${idCriterio}" size="5" 
                    style="border: none; outline: none;  padding: 10px; " class=" text-center from-control " disabled type="text" value="${evaluacion.criterio[0].opciones[i].descripcion}">
                    </td>
                <td>
                    <input id="valor${idCriterio}" size="2"
                    style="border: none; outline: none;  padding: 10px;" class="text-center from-control" disabled  type="text" value="${evaluacion.criterio[0].opciones[i].valor}"> 
                </td>
                <td id="btnCriterios${idCriterio}">
                    <button  onclick="actualizarOpcion(${idCriterio})" class="input-group-text btn btn-outline-warning" type="button">
                        <i class="fa fa-pencil" aria-hidden="true"></i></button>
                    <button onclick="eliminarOpcion(${idCriterio})"  class="input-group-text btn btn-outline-danger" type="button">
                    <i class="fa fa-times" aria-hidden="true"></i></button>
                </td>
                </tr>`

            }
            document.getElementById("opcinesRespuesta").innerHTML = body

            //Muestro las categorias
            verCategoriasEvaluacion(evaluacion.id)

        })
        .catch(err => {
            console.log(err)
        })
        .finally(final => {

        })

}
//MUESTRA LAS CATEGORIAS DE LA EVALUACION EN EL MODAL
function verCategoriasEvaluacion(id) {
    document.getElementById("list-example").innerHTML = ""
    document.getElementById("bodyListaCategoria").innerHTML = ""
    getListaCategoriasEvalucionById(id)
        .then(response => response.json())
        .then(data => {

            for (let i = 0; i < data.length; i++) {

                document.getElementById("list-example").innerHTML += `<a class="list-group-item 
                list-group-item-action" href="#list-item-${i}">${data[i].nombre}</a>`

                document.getElementById("bodyListaCategoria").innerHTML += `<div class="mt-3 rounded border  border-3">
                <h4 id="list-item-${i}" 
                 class="mt-3  fw-medium  text-uppercase text-center">  ${i + 1}° - ${data[i].nombre}   </h4>

                <div class="input-group mb-3">
                
                <input type="text" class="form-control" id="crearPreguntaCategoria${i}" placeholder="Crear pregunta para la categoria ${data[i].nombre}" aria-label="Input group example" aria-describedby="btnGroupAddon">
                <button id="btnAddPregunta" onclick="crearPregunta(${i})" class="input-group-text btn btn-outline-success" type="button"><i class="fa fa-plus"
                aria-hidden="true" ></i></button>
            </div>
            </br>
            
           
            <div  class=" list-group list-group-numbered list-group-flush" id="preguntaC${i}">
            <div>
             </div>   
            `

                pregun = ""
                for (let j = 0; j < data[i].preguntas.length; j++) {
                    pregun += `
        <div class="list-group-item  mb-3 d-sm-flex" id="${i}-${j}">
        <div class="input-group " >
                <input type="text" id="input${i}-${j}" class="form-control" value="${data[i].preguntas[j].descripcion}"
                placeholder="CREAR CATEGORIA EVALUACION" aria-label="Input group example"
                aria-describedby="btnGroupAddon" disabled readonly>
                
                <button  onclick="actualizarPregunta('${i}-${j}')" class="input-group-text btn btn-outline-warning" type="button">
                <i class="fa fa-pencil" aria-hidden="true"></i></button>
                <button id="crearCategoria" onclick="eliminarPregunta('${i}-${j}')" class="input-group-text btn btn-outline-danger" type="button">
                <i class="fa fa-times" aria-hidden="true"></i></button>
                </div>
                <hr>
       </div> 
             `


                }

                document.getElementById("preguntaC" + i).innerHTML = pregun




            }





        })
        .catch(err => {
            console.log(err)
            ocultarSpinner()
        })
        .finally(final => {


            ocultarSpinner()
        })

}



//***ACTUALIZAR INFORMACION DE LA EVALUACION TITULO CATEGORIA DESCRIPCION


//Boton Actualizar
const selectCategoriaEvaluacion = document.getElementById("selectCategoriaEvaluacion")
const inputTitulo = document.getElementById("inputTitulo")
const textareaDescripcion = document.getElementById("textareaDescripcion")
function actuInfoEvaluacion() {
    selectCategoriaEvaluacion.disabled = false
    inputTitulo.disabled = false
    textareaDescripcion.disabled = false
    document.getElementById("btnInfoE").innerHTML = `<button onclick="confirmarInfoEvaluacion()" class="input-group-text btn btn-outline-success" type="button">
    <i class="fa fa-check" aria-hidden="true"></i></button>`

}

//CONFIRMO LA INFORMACION **FALTA HACER VERICACIONES
const alertEvaluacion = document.getElementById("alerEvaluacion")
function confirmarInfoEvaluacion() {
    mostrarSpinner()

    let id = sessionStorage.getItem("evaluacionId")

    const newEvaluacion = {
        id,
        categoriaId: selectCategoriaEvaluacion.value,
        titulo: inputTitulo.value,
        descripcion: textareaDescripcion.value

    }
    if (newEvaluacion.titulo == "" || newEvaluacion.descripcion == "" || newEvaluacion.categoriaId.length > 10) {
        alertEvaluacion.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>La informacion esta incompleta  </strong> precione " ctrl Z " para recuperar la informacion
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>

      </div>`
        ocultarSpinner()
    } else {
        let estadoOriginal = inputTitulo.disabled
        selectCategoriaEvaluacion.disabled = true
        inputTitulo.disabled = true
        textareaDescripcion.disabled = true


        updateInfoEvalucionById(newEvaluacion)
            .then(response => response.json())
            .then(data => {

            })
            .catch(err => {
                console.log(err)
            })
            .finally(fina => {
                document.getElementById("btnInfoE").innerHTML = `<button onclick="actuInfoEvaluacion()"  class="input-group-text btn btn-outline-warning" type="button">
    <i class="fa fa-pencil" aria-hidden="true"></i></button>`
                alertEvaluacion.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>La informacion se actualizo </strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>

      </div>`
                ocultarSpinner()
            })


    }



}


//***ACTUALIZAR CRITERIOS EVALUACION DESCRIPCION GENERAL 
const textareaDescripcionCriterio = document.getElementById("textareaDescripcionCriterio")
const alertCriterios = document.getElementById("alertCriterios")
function actualizarCiterioEvaluacion() {
    textareaDescripcionCriterio.disabled = false

    document.getElementById("btnCriterioInfo").innerHTML = `<button onclick="confirmarInfoCriterio()" class="input-group-text btn btn-outline-success" type="button">
    <i class="fa fa-check" aria-hidden="true"></i></button>`



}

//Confirmo la nueva descripcion del criterio
function confirmarInfoCriterio() {
    mostrarSpinner()

    let id = sessionStorage.getItem("criterioId")
    const newCriterio = {
        id,
        descripcion: textareaDescripcionCriterio.value
    }
    if (newCriterio.descripcion == "") {
        alertCriterios.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>La descripcion esta vacia </strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>

      </div>`
    } else {
        textareaDescripcionCriterio.disabled = true
        updateCriterioById(newCriterio)
            .then(response => response)
            .then(data => {
                alertCriterios.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>La descripción se actualizo </strong> 
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    
          </div>`
                //Boton editar Criterio
                document.getElementById("btnCriterioInfo").innerHTML = ` <button onclick="actualizarCiterioEvaluacion()" class="input-group-text btn btn-outline-warning" type="button">
          <i class="fa fa-pencil" aria-hidden="true"></i></button>`

            })
            .catch(err => {
                alert(err)
            })
            .finally(final => {
                ocultarSpinner()



            })
    }




}
//ACTUALIZAR OPCION DE  UN CRITERIO

function actualizarOpcion(id) {

    const descripcion = document.getElementById("descripcion" + id)
    const valor = document.getElementById("valor" + id)
    descripcion.disabled = false
    valor.disabled = false

    const btnCriterios = document.getElementById("btnCriterios" + id)
    btnCriterios.innerHTML = `<button  onclick="confirmarOpcion(${id})" class="input-group-text btn btn-outline-success" type="button">
            <i class="fa fa-check" aria-hidden="true"></i></button>
        <button onclick="eliminarOpcion(${id})"  class="input-group-text btn btn-outline-danger" type="button">
        <i class="fa fa-times" aria-hidden="true"></i></button>`
}

//CONFIRMAR CAMBIO DE LA OPCION
function confirmarOpcion(id) {
    mostrarSpinner()
    const descripcion = document.getElementById("descripcion" + id)
    const valor = document.getElementById("valor" + id)
    let criterioId = sessionStorage.getItem("criterioId")
    const newOpcion = {
        id,
        descripcion: descripcion.value,
        valor: valor.value,
        comentario: "",
        criterioId

    }

    if (newOpcion.descripcion == "" || newOpcion.valor == "") {
        alertCriterios.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>El Nombre , Valor esta incompleto </strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>

      </div>`

    } else {
        updateOpcionById(newOpcion)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                descripcion.disabled = true
                valor.disabled = true
                const btnCriterios = document.getElementById("btnCriterios" + id)
                btnCriterios.innerHTML = `<button  onclick="actualizarOpcion(${id})" class="input-group-text btn btn-outline-warning" type="button">
    <i class="fa fa-pencil" aria-hidden="true"></i></button>
    <button onclick="eliminarOpcion(${id})"  class="input-group-text btn btn-outline-danger" type="button">
    <i class="fa fa-times" aria-hidden="true"></i></button>`
                alertCriterios.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>La Opcion se actualizo</strong> 
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>

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

//ELIMINAR OPCION CRITERIOS
function eliminarOpcion(id) {
    //Obtengo los criterios
    const arrayCriterios = sessionStorage.getItem("criteriosEvaluacion")
    //Creo un nuevo array
    let array = []
    //Le agrego los criterios
    array = array.concat(JSON.parse(arrayCriterios))

    if (array.length <= 3) {
        alertCriterios.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Minimo 3 criterios </strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>

      </div>`
    } else {


        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Estas seguro?',
            text: "Quires eliminar la opcion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar!',
            cancelButtonText: 'Cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                mostrarSpinner()
                deleteOpcionById(id)
                    .then(response => response)
                    .then(data => {
                        if (data.status == "200") {

                            //Busco El criterio que voy a eliminar
                            const index = array.findIndex(element => element.id === Number(id));
                            //Si encuentra el Criterio
                            if (index !== -1) {
                                //elimino el criterio del array
                                array.splice(index, 1);
                            }
                            //Ordeno el array por el valor 

                            //Agrego en la session
                            sessionStorage.setItem("criteriosEvaluacion", JSON.stringify(array))
                            const opcionC = document.getElementById("opcionC" + id)
                            opcionC.remove()
                            swalWithBootstrapButtons.fire(
                                'Eliminado!',
                                'La opcion de elimino.',
                                'success'
                            )

                        }

                    })
                    .catch(err => {
                        console.log(err)
                    })
                    .finally(final => {
                        ocultarSpinner()
                    })

            }
        })
    }
}
//SAVE OPCION
async function saveOpcion(opcion) {
    let token = localStorage.getItem("token")

    const result = await fetch(urlBasic + "/opcion/save", {
        method: 'POST',
        body: JSON.stringify(opcion),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-type": "application/json"
        }
    })
    return result
}
//CREAR CRITERIO NUEVO 
function addNewOpcion() {
    mostrarSpinner()
    //Obtengo los datos
    let valor = document.getElementById("inputValorP").value
    let descripcion = document.getElementById("inputDescripcionP").value
    //Busco los datos en la session
    const criterios = sessionStorage.getItem("criteriosEvaluacion")
    //   Busco el criterioId
    let criterioId = sessionStorage.getItem("criterioId")

    if (JSON.parse(criterios).length < 5) {
        //Si son validos 
        if (valor != "" && descripcion != "") {

            //Creo el objeto
            const newOpcion = {
                criterioId,
                valor,
                comentario: "",
                descripcion
            }
            saveOpcion(newOpcion)
                .then(response => response.json())
                .then(data => {
                    //Si hay criterios guardados en la session los agrego al array
                    let array = []
                    if (criterios != null) {
                        array = array.concat(JSON.parse(criterios))
                    }
                    //Agrego el Criterio nuevo
                    array.push(data)
                    //oreno el array
                    array.sort((a, b) => {
                        return a.valor - b.valor;
                    });
                    //Agrego los datos a la vista
                    let body = ""
                    for (let i = 0; i < array.length; i++) {
                        console.log(array)
                        let opcionId = array[i].id
                        body += `<tr class="text-center" id="opcionC${opcionId}">
            <td>
                <input id="descripcion${opcionId}" size="5" 
                style="border: none; outline: none;  padding: 10px; " class=" text-center from-control " disabled type="text" value="${array[i].descripcion}">
                </td>
            <td>
                <input id="valor${opcionId}" size="2"
                style="border: none; outline: none;  padding: 10px;" class="text-center from-control" disabled  type="text" value="${array[i].valor}"> 
            </td>
            <td id="btnCriterios${opcionId}">
                <button  onclick="actualizarOpcion(${opcionId})" class="input-group-text btn btn-outline-warning" type="button">
                    <i class="fa fa-pencil" aria-hidden="true"></i></button>
                <button onclick="eliminarOpcion(${opcionId})"  class="input-group-text btn btn-outline-danger" type="button">
                <i class="fa fa-times" aria-hidden="true"></i></button>
            </td>
            </tr>`


                    }
                    document.getElementById("opcinesRespuesta").innerHTML = body

                    //Limpio los campos
                    document.getElementById("inputValorP").value = ""
                    document.getElementById("inputDescripcionP").value = ""
                    //Guardo en la Session
                    sessionStorage.setItem("criteriosEvaluacion", JSON.stringify(array))

                })
                .catch(err => {
                    console.log(err)
                })
                .finally(final => {
                    ocultarSpinner()

                })

        }
    } else {
        ocultarSpinner()
        alertCriterios.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Maximo 5 criterios </strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`
    }
}


//SALIR MODAL ACTUALIZO LA LISTA Y LIMPIO LA SESION

function salirModalE() {
    listadoSemestre()
    alertCriterios.innerHTML = ""
    document.getElementById("btnCriterioInfo").innerHTML = `<button onclick="actualizarCiterioEvaluacion()"
    class="input-group-text btn btn-outline-warning" type="button">
    <i class="fa fa-pencil" aria-hidden="true"></i></button>`
    textareaDescripcionCriterio.disabled = true

    alertEvaluacion.innerHTML = ""
    document.getElementById("btnInfoE").innerHTML = `<button onclick="actuInfoEvaluacion()"  class="input-group-text btn btn-outline-warning" type="button">
    <i class="fa fa-pencil" aria-hidden="true"></i></button>`
    selectCategoriaEvaluacion.disabled = true
    inputTitulo.disabled = true
    textareaDescripcion.disabled = true
    sessionStorage.clear()
}