const btnEvaluacion = document.getElementById("btnEvaluacion")

btnEvaluacion.addEventListener("click", () => {
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
    console.log("Guardar datos de la evaluacion" + JSON.stringify(evaluacion))
    saveCategoria(evaluacion)
})

function saveCategoria(evaluacion) {
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


           console.log(preguntas)

            if (preguntas != null) {

                arrayPregunta = arrayPregunta.concat(JSON.parse(preguntas))
               
                for (let j = 0; j < arrayPregunta.length; j++) {
                    if (arrayPregunta[j].idCategoria == array[i].id){

                        const pregunta={
                            criterioId:"",
                            evaluacionId:evaluacion.id,
                            categoriaId:"",
                            descripcion:arrayPregunta[j].pregunta,
                            fechaRegistro:new Date(),


                        }
                        console.log(pregunta)
                    }
                       
                }
            }

            console.log(categoriaPregunta)
        }
    }
}