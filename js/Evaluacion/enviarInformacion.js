function enviarDataEvaluacion() {
    mostrarSpinner()
    //Obtengo el id usuario
    let usuarioId = JSON.parse(localStorage.getItem("data")).id
    //Obtengo el id sel semestre
    let semestreId = JSON.parse(sessionStorage.getItem("semestreActual"))[0].id
    let titulo = document.getElementById("inputTitulo").value
    let descripcion = document.getElementById("textareaDescripcion").value
    //Obtengo tipo de evaluacion
    const select = document.getElementById('selectCategoriaEvaluacion');
    let ctgId = select.value
    //Obtengo la fecha de registro

    let fechaRegistro = new Date()

    const evaluacion = {
        usuarioId,
        semestreId,
        titulo,
        descripcion,
        categoriaId:{
            id:ctgId
        },
        fechaRegistro

    }
    console.log(evaluacion)
    //Guardo la evaluacion
    saveEvaluacion(evaluacion)
        .then(res => res.json())
        .then(newEvaluacion => {
            console.log("evaluacion nueva")
            console.log(newEvaluacion)
            alertInformacion.innerHTML +=
                `<div class="alert alert-success alert-dismissible fade show" role="alert">
                     <strong>Titulo de la evaluacion: ${newEvaluacion.titulo}</strong> 
                     <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                 </div>`
            const criterios = sessionStorage.getItem("criterios")
            let descripcionGeneral = document.getElementById("textareaDescripcionCriterio").value

            if (descripcionGeneral != "") {
                //Creo el criterio de evaluacion
                const criterio = {
                    descripcion: descripcionGeneral,
                    evaluacionId: newEvaluacion.id
                }
                console.log(criterio)
                if (criterios != null) {

                    let arrayOpcion = []
                    arrayOpcion = arrayOpcion.concat(JSON.parse(criterios))
                    if (arrayOpcion.length >= 3) {
                        //guardo el criterio de evaluacion
                        saveCriterio(criterio)
                            .then(response => response.json())
                            .then(newCriterio => {
                                alertInformacion.innerHTML +=
                                    `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                             <strong>Criterio :${newCriterio.descripcion}</strong> 
                                             <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>`
                                for (let i = 0; i < arrayOpcion.length; i++) {
                                    //Creo la opcion
                                    const opcion = {
                                        valor: arrayOpcion[i].valor,
                                        descripcion: arrayOpcion[i].descripcion,
                                        comentario: "",
                                        criterioId: newCriterio.id

                                    }
                                    //Cuado las opciones
                                    saveOpcion(opcion)
                                        .then(res => res.json())
                                        .then(newOpcion => {
                                            alertInformacion.innerHTML +=
                                                `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                <strong>Opcion: ${newOpcion.descripcion}</strong> 
                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                                                            </div>`

                                        })
                                        .catch(err => {
                                            console.log(err)

                                        })
                                        .finally(final => {

                                        })
                                }

                                //GUARDO LAS CATEGORIAS 
                                const categorias = sessionStorage.getItem("categoriasEvaluacion")
                                let array = []
                                if (categorias != null) {
                                    array = array.concat(JSON.parse(categorias))


                                    for (let i = 0; i < array.length; i++) {


                                        const categoriaPregunta = {
                                            evaluacionId: newEvaluacion.id,
                                            nombre: array[i].nombre,
                                            descripcion: "",


                                        }

                                        const preguntas = sessionStorage.getItem("preguntasEvaluacion")
                                        let arrayPregunta = []
                                        if (preguntas != null) {

                                            arrayPregunta = arrayPregunta.concat(JSON.parse(preguntas))
                                            const elementosConIdCategoria = arrayPregunta.filter(elemento => elemento.idCategoria === array[i].id)
                                            //Si la categoria tiene mas de una pregunta
                                            if (elementosConIdCategoria.length > 0) {
                                                //SAVE CATEGORIA
                                                saveCategoria(categoriaPregunta)
                                                    .then(response => response.json())
                                                    .then(newCategoria => {
                                                        alertInformacion.innerHTML +=
                                                            `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                        <strong>Categoria: ${newCategoria.nombre}</strong> 
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`
                                                        for (let j = 0; j < arrayPregunta.length; j++) {

                                                            if (arrayPregunta[j].idCategoria == array[i].id) {

                                                                const pregunta = {
                                                                    criterioId: newCriterio.id,
                                                                    evaluacionId: newEvaluacion.id,
                                                                    categoriaId: newCategoria.id,
                                                                    descripcion: arrayPregunta[j].pregunta,
                                                                    fechaRegistro: new Date(),


                                                                }
                                                                savePregunta(pregunta)
                                                                    .then(res => res.json())
                                                                    .then(data => {
                                                                        mostrarSpinner()
                                                                        
                                                                    })
                                                                    .catch(err => {
                                                                        console.log(err)
                                                                    })
                                                                    .finally(final => {
                                                                        ocultarSpinner()
                                                                        alertInformacion.innerHTML= `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                                        <strong>Evaluacion con titulo: ${newEvaluacion.titulo}</strong> 
                                                                        <p>SE CREO CON EXITO !</p>
                                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                                       </div>`
                                                                       document.getElementById("accionesEvaluacion").innerHTML=`<a class="btn btn-info" href="#">CARGANDO ...</a>`
                                                                       setTimeout(()=>{
                                                                        document.getElementById("accionesEvaluacion").innerHTML = `
                                                                        <a class="btn btn-info" href="./index.html">CREAR OTRA EVALUACION</a>
                                                                         <a class="btn btn-info" href="./listado/index.html">VER EVALUACION</a>
                                                                        `

                                                                       },5000)
                                                                   
                                                                    })

                                                            }

                                                        }
                                                  

                                                    })
                                                    .catch(err => {
                                                        console.log(err)
                                                    })
                                                    .finally(final => {
                                                       

                                                    })

                                            }

                                        }

                                        // console.log(categoriaPregunta)
                                    }
                                }

                            })
                            .catch(err => {

                            })
                            .finally(final => {

                            })


                    }


                }
            }



        })
        .catch(err => {
            console.log("NO SAVE EVALUACION" + err)
        })
        .finally(final => {

        })
}