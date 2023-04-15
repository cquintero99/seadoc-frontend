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

crearCategoria.addEventListener('click', () => {
    mostrarSpinner()
    let pos = sessionStorage.getItem("pos")
    let nombre = document.getElementById("inputCategoriaP").value
    const array = []
    if ((Number(pos) <= 0 || pos === undefined) && nombre !== "") {

        sessionStorage.setItem("pos", 1)

        const catg = {
            "id": 1,
            "nombre": nombre,

        }

        sessionStorage.setItem("categoriasEvaluacion", JSON.stringify(catg))
        document.getElementById("list-example").
            innerHTML += `<a class="list-group-item list-group-item-action" href="#list-item-${1}">${nombre}</a>
    `
        document.getElementById("bodyListaCategoria").
            innerHTML += `<h4 id="list-item-${1}">Categoria - ${nombre}</h4>
            <div class="input-group">
                
            <input type="text" id="crearPreguntaCategoria${1}" class="form-control" placeholder="Crear pregunta para la categoria ${nombre}" aria-label="Input group example" aria-describedby="btnGroupAddon">
            <button id="btnGroupAddon" onclick="crearPregunta(1)" class="input-group-text btn btn-success" type="button"><i class="fa fa-plus"
            aria-hidden="true" ></i></button>
        </div>
        </br>
        <ol class="list-group " id="preguntaC1">
                
        </ol>
        <hr>`

        setTimeout(() => {
            ocultarSpinner()
            document.getElementById("inputCategoriaP").value = ""
        }, 150)

    } else if (nombre !== "") {
        const primer = sessionStorage.getItem("categoriasEvaluacion")

        if (primer != undefined) {


            let nombre = document.getElementById("inputCategoriaP").value
            let posicion = Number(pos) + 1
            const catg = {
                "id": posicion,
                "nombre": nombre,

            }
            array.push(primer)
            array.push(JSON.stringify(catg))


            sessionStorage.setItem("categoriasEvaluacion", array)
            sessionStorage.setItem("pos", posicion)


            document.getElementById("list-example").
                innerHTML += `<a class="list-group-item list-group-item-action" href="#list-item-${posicion}">${nombre}</a>
    `
            document.getElementById("bodyListaCategoria").
                innerHTML += `<h4 id="list-item-${posicion}"  class="text-center">Categoria - ${nombre}   </h4>
                <div class="input-group">
                
                <input type="text" class="form-control" id="crearPreguntaCategoria${posicion}" placeholder="Crear pregunta para la categoria ${nombre}" aria-label="Input group example" aria-describedby="btnGroupAddon">
                <button id="btnAddPregunta" onclick="crearPregunta(${posicion})" class="input-group-text btn btn-success" type="button"><i class="fa fa-plus"
                aria-hidden="true" ></i></button>
            </div>
            </br>
            <ol class="list-group list-group-numbered" id="preguntaC${posicion}">
                
                </ol>
            
            <hr>`

        }
        setTimeout(() => {
            ocultarSpinner()
            document.getElementById("inputCategoriaP").value = ""
        }, 100)
    } else {
        //Nombre vacio
        ocultarSpinner()
    }




})

function crearPregunta(pos) {
    let pregunta = document.getElementById("crearPreguntaCategoria" + pos).value

    document.getElementById("preguntaC" + pos).innerHTML += `
   <li class="list-group-item">
   <div class="input-group">

         <input type="text" id="inputCategoriaP" class="form-control" value="${pregunta}"
         placeholder="CREAR CATEGORIA EVALUACION" aria-label="Input group example"
        aria-describedby="btnGroupAddon">
         <button id="crearCategoria" class="input-group-text btn btn-danger" type="button">
         <i class="fa fa-times" aria-hidden="true"></i></button>
    </div>
   
   </li>`
    document.getElementById("crearPreguntaCategoria" + pos).value = ""

}

window.addEventListener('load', () => {
    let nombre = JSON.parse(localStorage.getItem("data")).nombre

    document.getElementById("nombreUsuario").innerHTML = `<h5 class="mt-3 p-3 mb-3  text-light " >Bienvenido _ ${nombre} </h5>`
});


const salir = document.getElementById("salir")


salir.addEventListener('click', () => {
    localStorage.clear();
})

