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


//MUESTRA LA INFORMACION DE LA EVALUACION EN EL MODAL
function editarEvaluacion(idEvaluacion) {
    mostrarSpinner()
    getEvalucionById(idEvaluacion)
        .then(response => response.json())
        .then(evaluacion => {
            //Busco la categoria de la evaluacion

            //PARTE 1 EVALUACION
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
            for (let i = 0; i < evaluacion.criterio[0].opciones.length; i++) {
                body += `<tr>
                <td>${evaluacion.criterio[0].opciones[i].descripcion}</td>
                <td>${evaluacion.criterio[0].opciones[i].valor}</td>
                <td>
                <button class="input-group-text btn btn-outline-warning" type="button">
                    <i class="fa fa-pencil" aria-hidden="true"></i></button>
                <button  class="input-group-text btn btn-outline-danger" type="button">
                <i class="fa fa-times" aria-hidden="true"></i></button></td>
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

                document.getElementById("list-example").innerHTML += `<a class="list-group-item list-group-item-action" href="#list-item-${i}">${data[i].nombre}</a>`
                document.getElementById("bodyListaCategoria").innerHTML += `<h4 id="list-item-${i}"  class="text-center fw-medium">  ${i + 1}° - ${data[i].nombre}   </h4>
                <div class="input-group mb-3">
                
                <input type="text" class="form-control" id="crearPreguntaCategoria${i}" placeholder="Crear pregunta para la categoria ${data[i].nombre}" aria-label="Input group example" aria-describedby="btnGroupAddon">
                <button id="btnAddPregunta" onclick="crearPregunta(${i})" class="input-group-text btn btn-outline-success" type="button"><i class="fa fa-plus"
                aria-hidden="true" ></i></button>
            </div>
            </br>
            
           
            <div  class="list-group list-group-numbered list-group-flush" id="preguntaC${i}">
            <div>
                
            `

                pregun = ""
                for (let j = 0; j < data[i].preguntas.length; j++) {
                    pregun += `
        <div id="${i}-${j}">
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

//ACTUALIZAR INFORMACION DE LA EVALUACION TITULO CATEGORIA DESCRIPCION


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


//ACTUALIZAR CRITERIOS EVALUACION DESCRIPCION GENERAL 
const textareaDescripcionCriterio = document.getElementById("textareaDescripcionCriterio")
function actualizarCiterioEvaluacion() {
    textareaDescripcionCriterio.disabled = false
    if (textareaDescripcionCriterio.value.length > 1) {


        document.getElementById("btnCriterioInfo").innerHTML = `<button onclick="confirmarInfoCriterio()" class="input-group-text btn btn-outline-success" type="button">
    <i class="fa fa-check" aria-hidden="true"></i></button>`
    }

}


function confirmarInfoCriterio() {
    mostrarSpinner
    textareaDescripcionCriterio.disabled = true
    let id = sessionStorage.getItem("criterioId")
    const newCriterio = {
        id,
        descripcion: textareaDescripcionCriterio.value
    }
    console.log(newCriterio)
    updateCriterioById(newCriterio)
        .then(response => response)
        .then(data => {

        })
        .catch(err => {
            alert(err)
        })
        .finally(final => {
            ocultarSpinner()

        })
    document.getElementById("btnCriterioInfo").innerHTML = ` <button onclick="actualizarCiterioEvaluacion()" class="input-group-text btn btn-outline-warning" type="button">
    <i class="fa fa-pencil" aria-hidden="true"></i></button>`

}

//SALIR MODAL ACTUALIZO LA LISTA Y LIMPIO LA SESION

function salirModalE() {
    listadoSemestre()
    alertEvaluacion.innerHTML = ""
    sessionStorage.clear()
}