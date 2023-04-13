


const crearCategoria = document.getElementById("crearCategoria")

crearCategoria.addEventListener('click', () => {
    let pos = sessionStorage.getItem("pos")
    const array = []
    if (Number(pos) <= 0 || pos === undefined) {

        sessionStorage.setItem("pos", 1)
        let nombre = document.getElementById("inputCategoriaP").value
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
                
            <input type="text" class="form-control" placeholder="Crear pregunta para la categoria ${nombre}" aria-label="Input group example" aria-describedby="btnGroupAddon">
            <button id="btnGroupAddon" class="input-group-text btn btn-success" type="button"><i class="fa fa-plus"
            aria-hidden="true" ></i></button>
        </div>
        <hr>`

    } else {
        const primer = sessionStorage.getItem("categoriasEvaluacion")

        if (primer != undefined) {


            let nombre = document.getElementById("inputCategoriaP").value
            let posicion = Number(pos) + 1
            const catg = {
                "id": posicion,
                "nombre": nombre,

            }
            array.push(primer)
            console.log(primer)
            array.push(JSON.stringify(catg))


            sessionStorage.setItem("categoriasEvaluacion", array)
            sessionStorage.setItem("pos", posicion)


            document.getElementById("list-example").
                innerHTML += `<a class="list-group-item list-group-item-action" href="#list-item-${posicion}">${nombre}</a>
    `
            document.getElementById("bodyListaCategoria").
                innerHTML += `<h4 id="list-item-${posicion}">Categoria ${nombre}</h4>
                <div class="input-group">
                
                <input type="text" class="form-control" placeholder="Crear pregunta para la categoria ${nombre}" aria-label="Input group example" aria-describedby="btnGroupAddon">
                <button id="btnGroupAddon" class="input-group-text btn btn-success" type="button"><i class="fa fa-plus"
                aria-hidden="true" ></i></button>
            </div>
            <hr>`
        }
    }

})

