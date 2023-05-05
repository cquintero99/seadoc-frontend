const urlBasic = "https://teacher2023.herokuapp.com"
//"https://teacher-test-backend-production-e58a.up.railway.app";
const btnEvaluacion = document.getElementById("btnEvaluacion")
const alertEvaluacion = document.getElementById("alertEvaluacion")
const alertInformacion = document.getElementById("alertE")
const alertCategoria = document.getElementById("validCategoria")
const alertCriterios = document.getElementById("alertCriterios")

// SAVE EVALUACION
async function saveEvaluacion(evaluacion) {
    let token = localStorage.getItem("token")

    const result = await fetch(urlBasic + "/evaluacion/save", {
        method: 'POST',
        body: JSON.stringify(evaluacion),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-type": "application/json"
        }
    })
    return result
}
//SAVE CRITERIO
async function saveCriterio(criterio) {
    let token = localStorage.getItem("token")

    const result = await fetch(urlBasic + "/criterio/save", {
        method: 'POST',
        body: JSON.stringify(criterio),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-type": "application/json"
        }
    })
    return result
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
//SAVE PREGUNTA
async function savePregunta(pregunta) {
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


const fechaActual = new Date()

btnEvaluacion.addEventListener("click", () => {
    alertInformacion.innerHTML=""
    //Obtengo el id usuario
    let usuarioId = JSON.parse(localStorage.getItem("data")).id
    //Obtengo el id sel semestre
    let semestreId = JSON.parse(localStorage.getItem("data")).id
    let titulo = document.getElementById("inputTitulo").value
    let descripcion = document.getElementById("textareaDescripcion").value
    //Obtengo tipo de evaluacion
    const select = document.getElementById('selectCategoriaEvaluacion');
    let categoriaEvaluacionId = select.value
    //Obtengo la fecha de registro
    let fechaRegistro = new Date()

    const evaluacion = {
        usuarioId,
        semestreId,
        titulo,
        descripcion,
        categoriaEvaluacionId,
        fechaRegistro

    }
    if (validarEvaluacion(evaluacion)) {
        if (validarCriterios(evaluacion)) {
            if (validarCategoria(evaluacion)) {

                alertInformacion.innerHTML += `<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>La evaluacion cumple con la informacion y los criterios</strong> 
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`
                enviarDataEvaluacion()
            }


        }else{
            validarCategoria(evaluacion)
        }
    }else{
        validarCriterios(evaluacion)
        validarCategoria(evaluacion)
    }




})

function validarEvaluacion(evaluacion) {
    if (evaluacion.titulo == "" || evaluacion.descripcion == "" || evaluacion.categoriaEvaluacionId.length > 3) {

        alertEvaluacion.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Verifica el titulo , descripcion o la categoria</strong> .
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
        alertInformacion.innerHTML += `<div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Datos de la evaluacion Incompletos</strong> 
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`
        return false
    } else {


        
        return true
    }

}

function validarCategoria(evaluacion) {
    const categorias = sessionStorage.getItem("categoriasEvaluacion")
    let array = []
    if (categorias != null) {
        array = array.concat(JSON.parse(categorias))


        for (let i = 0; i < array.length; i++) {


            const categoriaPregunta = {
                evaluacionId: evaluacion.id,
                nombre: array[i].nombre,
                descripcion: "",


            }
           
            const preguntas = sessionStorage.getItem("preguntasEvaluacion")
            let arrayPregunta = []




            if (preguntas != null) {

                arrayPregunta = arrayPregunta.concat(JSON.parse(preguntas))
                const elementosConIdCategoria = arrayPregunta.filter(elemento => elemento.idCategoria === array[i].id)
                if (elementosConIdCategoria.length > 0) {

                    for (let j = 0; j < arrayPregunta.length; j++) {
                        if (arrayPregunta[j].idCategoria == array[i].id) {

                            const pregunta = {
                                criterioId: "",
                                evaluacionId: evaluacion.id,
                                categoriaId: "",
                                descripcion: arrayPregunta[j].pregunta,
                                fechaRegistro: new Date(),


                            }
                         

                        }

                    }
                    return true

                } else {
                    alertCategoria.innerHTML += `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>La categoria ${categoriaPregunta.nombre} no tiene preguntas</strong> .
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>`
                    alertInformacion.innerHTML += `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                  <strong>La categoria ${categoriaPregunta.nombre} debe tener minimo una pregunta</strong> 
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`

                }

            } else {
                console.log("No hay preguntas")
                alertCategoria.innerHTML += `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>La categoria ${categoriaPregunta.nombre} no tiene preguntas</strong> .
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
                alertInformacion.innerHTML += `<div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>La categoria ${categoriaPregunta.nombre} debe tener minimo una pregunta</strong> 
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`
            }

            // console.log(categoriaPregunta)
        }
    } else {
        alertCategoria.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>No hay categorias</strong> .
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
        alertInformacion.innerHTML += `<div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Debe crear minimo una categoria</strong> 
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`
    }
}


function validarCriterios(evaluacion) {
    const criterios = sessionStorage.getItem("criterios")
    let descripcionGeneral = document.getElementById("textareaDescripcionCriterio").value
    console.log(descripcionGeneral)
    if (descripcionGeneral != "") {


        if (criterios != null) {

            let array = []
            array = array.concat(JSON.parse(criterios))
            if (array.length >= 3) {
                for (let i = 0; i < array.length; i++) {
                    const newCriterio = {
                        valor: array[i].valor,
                        descripcion: array[i].descripcion,
                        comentario: "",
                        criterioId: ""

                    }


                }
                return true
            } else {
                alertCriterios.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Criterios incompletos </strong> 
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`
                alertInformacion.innerHTML += `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Minimo debe crear 3 criterios</strong> 
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`
                return false
            }


        } else {
            alertCriterios.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Criterios incompletos </strong> 
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`
            alertInformacion.innerHTML += `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Minimo debe crear 3 criterios</strong> 
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`
            return false
        }
    } else {
        alertCriterios.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Falta la Descripcion de los criterios </strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
        alertInformacion.innerHTML += `<div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Falta la Descripcion  de los criterios</strong> 
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`
        return false
    }
}