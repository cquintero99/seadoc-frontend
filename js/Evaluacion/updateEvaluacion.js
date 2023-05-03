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




function editarEvaluacion(idEvaluacion) {
    mostrarSpinner()
    getEvalucionById(idEvaluacion)
        .then(response => response.json())
        .then(evaluacion => {
            //Busco la categoria de la evaluacion

            //PARTE 1 EVALUACION
            const selectCategoria = document.getElementById("selectCategoriaEvaluacion")
            document.getElementById("inputTitulo").value = evaluacion.titulo
            document.getElementById("textareaDescripcion").value = evaluacion.descripcion
            selectCategoria.value = evaluacion.categoriaId

            //PARTE 2 
            //DESCRIPCION DE LOS CRITERIOS
            document.getElementById("textareaDescripcionCriterio").value = evaluacion.criterio[0].descripcion

            //OPCIONES
            let body = ""
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

function verCategoriasEvaluacion(id) {
    document.getElementById("list-example").innerHTML=""
    document.getElementById("bodyListaCategoria").innerHTML=""
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