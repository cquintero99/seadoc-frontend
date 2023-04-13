


const crearCategoria = document.getElementById("crearCategoria")

crearCategoria.addEventListener('click', () => {
    let pos = sessionStorage.getItem("pos")
    let nombre = document.getElementById("inputCategoriaP").value
    const array = []
    if (Number(pos) <= 0 || pos === undefined && nombre !=="") {

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
            innerHTML += `<h4 id="list-item-${1}">Categoria ${nombre}</h4>
            <div class="input-group">
                
            <input type="text" id="crearPreguntaCategoria${1}" class="form-control" placeholder="Crear pregunta para la categoria ${nombre}" aria-label="Input group example" aria-describedby="btnGroupAddon">
            <button id="btnGroupAddon" class="input-group-text btn btn-success" type="button"><i class="fa fa-plus"
            aria-hidden="true" ></i></button>
        </div>
        <hr>`
        document.getElementById("alertCrearCategoria").innerHTML = `<div class="alert alert-success" role="alert">
              Categoria ${nombre} se creo 
            </div>`

    } else if (nombre !=="") {
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
                innerHTML += `<h4 id="list-item-${posicion}">Categoria ${nombre}   </h4>
                <div class="input-group">
                
                <input type="text" class="form-control" id="crearPreguntaCategoria${posicion}" placeholder="Crear pregunta para la categoria ${nombre}" aria-label="Input group example" aria-describedby="btnGroupAddon">
                <button id="btnGroupAddon" class="input-group-text btn btn-success" type="button"><i class="fa fa-plus"
                aria-hidden="true" ></i></button>
            </div>
            <hr>`
            document.getElementById("alertCrearCategoria").innerHTML = `<div class="alert alert-success" role="alert">
              Categoria ${nombre} se creo 
            </div>`
        }
    } else {
        document.getElementById("alertCrearCategoria").innerHTML = `<div class="alert alert-danger" role="alert">
        Ingrese Nombre de la categoria
      </div>`
    }

    

})

window.addEventListener('load', ()=> {
    let nombre=JSON.parse(localStorage.getItem("data")).nombre
 
document.getElementById("nombreUsuario").innerHTML=`<h5 class="mt-3 p-3 mb-3  text-light " >Bienvenido _ ${nombre} </h5>`
  });

