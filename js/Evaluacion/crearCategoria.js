function mostrarSpinner() {
    document.getElementById("sppiner").innerHTML = `<div id="spinner-container" class="d-flex justify-content-center align-items-center ">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Cargando...</span>
      </div>
    </div>`
}

function ocultarSpinner() {
    document.getElementById("sppiner").innerHTML = `<div id="spinner-container" class="d-flex justify-content-center align-items-center d-none">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Cargando...</span>
      </div>
    </div>`
}


const crearCategoria = document.getElementById("crearCategoria")
// CREAR CATEGORIA
crearCategoria.addEventListener('click', () => {
    mostrarSpinner()

    let pos = sessionStorage.getItem("pos")
    let nombre = document.getElementById("inputCategoriaP").value
    let array = []
    //Verifico si no hay Categorias
    if (pos === null) {
        pos = 0
    }
    if (nombre !== "") {

        const primer = sessionStorage.getItem("categoriasEvaluacion")

        //Verifico que el arreglo de categorias no esta vacio
        if (primer != null) {
            array = array.concat(JSON.parse(primer))
        }

        //Obtengo el nombre
        let nombre = document.getElementById("inputCategoriaP").value
        //Obtengo la posicion
        let posicion = Number(pos) + 1
        //Creo el objeto categoria
        const catg = {
            "id": posicion,
            "nombre": nombre,
            "preguntas": []

        }
        //Agrego la categoria al array
        array.push(catg)


        //Guardo en sessionStorage
        sessionStorage.setItem("categoriasEvaluacion", JSON.stringify(array))
        sessionStorage.setItem("pos", posicion)


        document.getElementById("list-example").
            innerHTML += `<a class="list-group-item list-group-item-action" href="#list-item-${posicion}">${nombre}</a>
    `

        document.getElementById("bodyListaCategoria").
            innerHTML += `<h4 id="list-item-${posicion}"  class="text-center fw-medium">  ${posicion}° - ${nombre}   </h4>
                <div class="input-group mb-3">
                
                <input type="text" class="form-control" id="crearPreguntaCategoria${posicion}" placeholder="Crear pregunta para la categoria ${nombre}" aria-label="Input group example" aria-describedby="btnGroupAddon">
                <button id="btnAddPregunta" onclick="crearPregunta(${posicion})" class="input-group-text btn btn-success" type="button"><i class="fa fa-plus"
                aria-hidden="true" ></i></button>
            </div>
            </br>
            
            <ol class="list-group list-group-numbered list-group-flush" >
                
                </ol>
            <div  class="list-group list-group-numbered list-group-flush" id="preguntaC${posicion}"><div>
                
            
            `


        setTimeout(() => {
            ocultarSpinner()
            document.getElementById("inputCategoriaP").value = ""
        }, 100)

    } else {
        document.getElementById("validCategoria").innerHTML = `<div class="alert alert-warning" role="alert">
        Ingresa el nombre de la categoria
      </div>`
        setTimeout(() => {
            document.getElementById("validCategoria").innerHTML = ""
        }, 5000)
        ocultarSpinner()
    }




})

function crearPregunta(pos) {
    //Obtengo el texto de la pregunta
    let pregunta = document.getElementById("crearPreguntaCategoria" + pos).value
    //Busco las preguntas guardadas
    const preguntasEvaluacion = sessionStorage.getItem("preguntasEvaluacion")
    //Busco numero de pregunta
    let nPregunta = sessionStorage.getItem("nPregunta")

    //Verifico el numero de preguntas
    if (nPregunta === null) {
        nPregunta = 0;
    } else {

    }
    if (pregunta != "") {
        //Creo la posicion que es nPregunta+1
        let posicion = Number(nPregunta) + 1
        //Creo el array Pregunta
        let arrayPregunta = []
        //Creo el objeto pregunto

        const newPregunta = {
            id: posicion,
            idCategoria: pos,
            pregunta
        }
        //Si la el array no esta vacio
        if (preguntasEvaluacion != null) {
            arrayPregunta = arrayPregunta.concat(JSON.parse(preguntasEvaluacion))
        }
        //Guardo la pregunta nueva
        arrayPregunta.push(newPregunta)
        sessionStorage.setItem("preguntasEvaluacion", JSON.stringify(arrayPregunta))
        sessionStorage.setItem("nPregunta", posicion)

        //Agrego la vista
        document.getElementById("preguntaC" + pos).innerHTML += `
            <div id="${pos}-${posicion}">
            <div class="input-group " >
                    <input type="text" id="input${pos}-${posicion}" class="form-control" value="${pregunta}"
                    placeholder="CREAR CATEGORIA EVALUACION" aria-label="Input group example"
                    aria-describedby="btnGroupAddon" disabled readonly>
                    
                    <button  onclick="actualizarPregunta('${pos}-${posicion}')" class="input-group-text btn btn-warning" type="button">
                    <i class="fa fa-pencil" aria-hidden="true"></i></button>
                    <button id="crearCategoria" onclick="eliminarPregunta('${pos}-${posicion}')" class="input-group-text btn btn-danger" type="button">
                    <i class="fa fa-times" aria-hidden="true"></i></button>
                    </div>
                    <hr>
           </div> 
                 `
        document.getElementById("crearPreguntaCategoria" + pos).value = ""
    }
}
/*
window.addEventListener('load', () => {
    let nombre = JSON.parse(localStorage.getItem("data")).nombre

    document.getElementById("nombreUsuario").innerHTML = `<h5 class="mt-3 p-3 mb-3  text-light " >Bienvenido _ ${nombre} </h5>`
});
*/
function actualizarPregunta(id) {
    console.log(id)
    let pregunta = document.getElementById("input" + id).value
    console.log(pregunta)
    document.getElementById(id).innerHTML = `<div class="input-group " >
    <input type="text" id="input${id}" class="form-control" value="${pregunta}"
    placeholder="CREAR CATEGORIA EVALUACION" aria-label="Input group example"
    aria-describedby="btnGroupAddon" >
    
    <button  onclick="cambiarPregunta('${id}')" class="input-group-text btn btn-success" type="button">
    <i class="fa fa-check" aria-hidden="true"></i></button>
    <button id="crearCategoria" onclick="eliminarPregunta('${id}')" class="input-group-text btn btn-danger" type="button">
    <i class="fa fa-times" aria-hidden="true"></i></button>
    </div>
    <hr>`
}

function cambiarPregunta(id) {
    let con = id.split("-")
    //obtengo el id de la pregunta
    let idPregunta = con[1]
    //Obtengo la nueva pregunta
    let pregunta = document.getElementById("input" + id).value
    console.log(idPregunta)
    //Busco la lista de preguntas
    const preguntas = JSON.parse(sessionStorage.getItem("preguntasEvaluacion"));
    //Busco la pregunta que voy actualizar
    const newPregunta = preguntas.find(p => p.id === Number(idPregunta));
    //Actualizo la pregunta
    newPregunta.pregunta = pregunta;
    //Guardo la lista de preguntas
    sessionStorage.setItem("preguntasEvaluacion", JSON.stringify(preguntas));
    //Muestro la vista
    document.getElementById(id).innerHTML = `<div class="input-group " >
    <input type="text" id="input${id}" class="form-control" value="${pregunta}"
    placeholder="CREAR CATEGORIA EVALUACION" aria-label="Input group example"
    aria-describedby="btnGroupAddon" disabled readonly>
    
    <button  onclick="actualizarPregunta('${id}')" class="input-group-text btn btn-warning" type="button">
    <i class="fa fa-pencil" aria-hidden="true"></i></button>
    <button id="crearCategoria" onclick="eliminarPregunta('${id}')" class="input-group-text btn btn-danger" type="button">
    <i class="fa fa-times" aria-hidden="true"></i></button>
    </div>
    <hr>`

}
function eliminarPregunta(id) {
    //Quito la pregunta de la interfas
    document.getElementById(id).remove()
    let con = id.split("-")
    //obtengo el id de la pregunta
    let pregunta = con[1]
    //Creo el array nuevo
    let array = []
    //obtengo la lista de pregutnas
    const ListaP = sessionStorage.getItem('preguntasEvaluacion')

    //agrego las preguntas al array
    array = array.concat(JSON.parse(ListaP))

    //Busco la pregunta que voy a eliminar
    const index = array.findIndex(element => element.id === Number(pregunta));
    if (index !== -1) {
        //elimino la pregunta del array
        array.splice(index, 1);
    }
    //guardo el array en el sessionStorage
    sessionStorage.setItem('preguntasEvaluacion', JSON.stringify(array))



}

//Boton salir
const salir = document.getElementById("salir")


salir.addEventListener('click', () => {
    localStorage.clear();
})

window.addEventListener('beforeunload', function (event) {
    // Aquí puedes realizar alguna acción antes de que el usuario abandone la página.
    // Por ejemplo, puedes preguntarle si realmente desea recargar la página.
    // Si deseas mostrar un mensaje personalizado, debes asignarlo a la propiedad `event.returnValue`.
    event.returnValue = '¿Estás seguro de que deseas recargar la página?';
});

window.addEventListener('unload', function (event) {
    // Aquí puedes realizar alguna acción después de que el usuario haya abandonado la página.
    // Ten en cuenta que esta acción se ejecutará incluso si el usuario ha cerrado la pestaña o el navegador.
    sessionStorage.clear()
});

