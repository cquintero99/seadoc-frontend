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

function editarEvaluacion(idEvaluacion) {
    mostrarSpinner()
    getEvalucionById(idEvaluacion)
        .then(response => response.json())
        .then(evaluacion => {
            console.log(evaluacion)
            //Busco la categoria de la evaluacion
            let categoria=evaluacion.categoriaId
            let op1=""
            let op2=""
            console.log(categoria)
            if(categoria=="1"){
                op1="selected"
            }else{
                op2="selected"
            }
            //PARTE 1 EVALUACION
            modalActualizarE.innerHTML = `
            <p class=" mt-3  fw-medium  text-uppercase">1°-Datos de la Evaluacion *</p>
            <label for="inputLastName">Categoria</label>

                                    <select class="form-select" aria-label="Default select example"
                                        id="selectCategoriaEvaluacion" disabled>
                                        <option >Seleccione una categoria de Evaluacion</option>
                                        <option value="1" ${op1}>Autoevaluacion</option>
                                        <option value="2" ${op2}>HeteroEvaluacion</option>
                                    </select>
                                   
                                
            <label class=" text-center" >TITULO</label>
                    <div class="input-group " >
        
                    <input type="text"  class="form-control" value="${evaluacion.titulo}"
                    placeholder="CREAR CATEGORIA EVALUACION" aria-label="Input group example"
                    aria-describedby="btnGroupAddon" disabled readonly>
                    
                    <button class="input-group-text btn btn-warning" type="button">
                    <i class="fa fa-pencil" aria-hidden="true"></i></button>

                    <button  class="input-group-text btn btn-danger" type="button">
                    <i class="fa fa-times" aria-hidden="true"></i></button>

                    </div>
            <label class=" text-center" for="floatingTextarea">DESCRICION</label>
                    <div class="input-group " >
        
                    
                    <textarea class="form-control"   id="textareaDescripcion" disabled>${evaluacion.descripcion}</textarea>
                    
                    <button class="input-group-text btn btn-warning" type="button">
                    <i class="fa fa-pencil" aria-hidden="true"></i></button>
                    
                    <button  class="input-group-text btn btn-danger" type="button">
                    <i class="fa fa-times" aria-hidden="true"></i></button>

                    </div>

                  

    `
    //PARTE 2 
    //DESCRIPCION DE LOS CRITERIOS
            modalActualizarE.innerHTML+=`  <p class=" mt-3  fw-medium  text-uppercase">2°-Crea los Criteros de evaluacion *</p>
                                            <div id="alertCriterios"></div>
                                            <label class=" text-center" >DESCRIPCION DE LOS CRITERIOS</label>
                                                <div class="input-group " >
                                                <textarea class="form-control"   id="textareaDescripcion" disabled>${evaluacion.criterio[0].descripcion}</textarea>
                                                
                                                
                                                <button class="input-group-text btn btn-warning" type="button">
                                                <i class="fa fa-pencil" aria-hidden="true"></i></button>

                                                <button  class="input-group-text btn btn-danger" type="button">
                                                <i class="fa fa-times" aria-hidden="true"></i></button>

                                                </div>
                                                </br>
            `
        //OPCIONES
            modalActualizarE.innerHTML+=`<div class="row">
            <div class="col-xl-4 ">


                            <form>

                                <div class="form-floating mb-3">
                                    <input class="form-control" id="inputValorP" type="number" placeholder="1" />
                                    <label for="inputEmail">Valor de 1 a 5 </label>
                                </div>
                                <div class="form-floating mb-3 text-center">
                                    <textarea class="form-control" placeholder="Leave a comment here"
                                        id="inputDescripcionP" type="descripcion"></textarea>


                                    <label for="inputEmail">Descripcion</label>
                                </div>
                                <div class="form-floating text-center">
                                    <button type="button" class="btn btn-success " id="btnOpcinesRespuesta">Crear
                                        Criterio</button>
                                </div>

                            </form>



                        </div>
                        <div class="col-xl-8">
                            <table class="table text-center">
                                <thead>
                                    <tr>
                                        <th>Descripcion</th>
                                        <th>Valor</th>
                                        <th>Accion</th>
                                    </tr>
                                </thead>
                                <tbody id="opcinesRespuesta">


                                </tbody>

                            </table>
                        </div>
            </div>`
            let body=""
            for (let i = 0; i < evaluacion.criterio[0].opciones.length; i++) {
                body+=`<tr>
                <td>${evaluacion.criterio[0].opciones[i].descripcion}</td>
                <td>${evaluacion.criterio[0].opciones[i].valor}</td>
                <td>
                <button class="input-group-text btn btn-warning" type="button">
                    <i class="fa fa-pencil" aria-hidden="true"></i></button>
                <button  class="input-group-text btn btn-danger" type="button">
                <i class="fa fa-times" aria-hidden="true"></i></button></td>
                </tr>`
                
            }
            document.getElementById("opcinesRespuesta").innerHTML=body

        })
        .catch(err => {
            console.log(err)
            ocultarSpinner()
        })
        .finally(final => {
            ocultarSpinner()

        })

}