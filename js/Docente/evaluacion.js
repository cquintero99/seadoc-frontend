
function cargarDatosEvaluacionId() {
    // Obtener el valor del parámetro de consulta "dato"
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    getExisteEvaluacionSemestre(id)
        .then(res => res.json())
        .then(data2 => {
            console.log(data2)
            if (data2 == true) {
                //categorias(id)
                const evaluacion = JSON.parse(localStorage.getItem(id))

                console.log(evaluacion)
                evaluacion.criterio[0].opciones.sort((a, b) => {
                    return a.valor - b.valor;
                });

                getListaCategoriasEvalucionById(id)
                    .then(res => res.json())
                    .then(data => {
                        let body = ""
                        let array = []
                        let nPreguntas = 1;
                        for (let i = 0; i < data.length; i++) {

                            body += `<h4 class="text-uppercase text-black text-center p-3 boder ">N°${i + 1} Categoria : ${data[i].nombre}</h4>
            `

                            for (let j = 0; j < data[i].preguntas.length; j++) {
                                let criterios = ""
                                array.push(data[i].preguntas[j].id)
                                let preguntaId = data[i].preguntas[j].id
                                for (let k = 0; k < evaluacion.criterio[0].opciones.length; k++) {
                                    let opcionId = evaluacion.criterio[0].opciones[k].id

                                    criterios += `
                        <div class="  form-check form-check-inline mt-3" id="${preguntaId}">
                    <input class="form-check-input" type="radio" name="name${preguntaId}" id="inlineRadio${preguntaId}" value="${opcionId}">
                    <label class="form-check-label" for="inlineRadio${preguntaId}">${evaluacion.criterio[0].opciones[k].descripcion}</label>
                  </div>
                  `

                                }
                                //body+=`<h5>${data[i].preguntas[j].descripcion} </h5>` <small class="text-body-secondary"> #${j + 1}</small>
                                body += `
            <div  class="list-group-item border p-3">
            
                          <div class="d-flex w-100 p-3 justify-content-center bg-primary">
                          
            
                            <h5 class="mb-1 "> ${nPreguntas}- ${data[i].preguntas[j].descripcion}</h5>
                           
                          </div>
                          <div class=" d-flex justify-content-center mt-3 ">
                          <p >
                          `+ criterios + `</p>
                         
                          </div>
                          <div id="alert${preguntaId}">
                          
                          <small class="text-body-secondary">Seleciona una respuesta </small>
                          </div>
                        </div>`
                                //console.log(data[i].preguntas[j].descripcion)
                                nPreguntas++;

                            }



                        }
                        sessionStorage.setItem("preguntas", JSON.stringify(array))
                        preguntas.innerHTML = body

                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                alert("Evaluacion Completada")
            }


        })
        .catch(err => {
            return false;
        })


    /*
    getEvalucionById(id)
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        
       
    })
    .catch(err=>{
        console.log(err)
    })
    */
}
function guardarRespuestas() {
    let array = JSON.parse(sessionStorage.getItem("preguntas"))
    let completo = false
    let arrayRespuestas = []
    for (let i = 0; i < array.length; i++) {
        const seleccionado = verificoRespuestas(array[i])
        if (seleccionado != null) {
            completo = true
            const respuesta = {
                preguntaId: array[i],
                opcionId: seleccionado
            }
            arrayRespuestas.push(respuesta)


        }

    }
    sessionStorage.setItem("r", JSON.stringify(arrayRespuestas))

    if (completo) {
        sendEvaluacion()
    }

}

function verificoRespuestas(id) {
    // Obtener todos los elementos input con el nombre "name6"
    const inputs = document.getElementsByName("name" + id);

    // Recorrer los elementos para encontrar el input seleccionado
    let seleccionado;
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            seleccionado = inputs[i].value;
            break;
        }
    }

    if (seleccionado) {

        document.getElementById("alert" + id).innerHTML = `<small class="text-body-secondary text-success">Opcion Seleccionada </small>`


        console.log("El usuario seleccionó: ", seleccionado);
    } else {
        document.getElementById("alert" + id).innerHTML = `<small class=" text-danger">Debes seleccionar una opción</small>`

        console.log("Debes seleccionar una opción");
    }


    return seleccionado;
}

const preguntas = document.getElementById("preguntas")




function categorias(id) {
    getListaCategoriasEvalucionById(id)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let body = ""
            let body2 = ""
            for (let i = 0; i < data.length; i++) {
                body += `<h4 class="text-uppercase">${data[i].nombre}</h4>
            `

            }
            preguntas.innerHTML = body

        })
        .catch(err => {
            console.log(err)
        })
}