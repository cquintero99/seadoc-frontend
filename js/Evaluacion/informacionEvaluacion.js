async function listaCategoriaEvaluacion(){

}

window.addEventListener('load', function() {
    verSemestreEstado("ACTUAL")
    .then(response=>response.json())
    .then(data=>{

        seeDataEvaluacion(data)
    })
    .catch(err=>{
        console.log(err)
    })
    
    
  // Código a ejecutar después de que se haya cargado la página

})
function seeDataEvaluacion(data){
        let body=""
        if(data.length>0){
            localStorage.setItem("semestre",JSON.parse(data[0].id))
            body=`<div class="col-xl-6">
            <p>Semestre Actual: ${data[0].nombre}</p>
        </div>
        <div class="col-xl-6">
            ${new Date(data[0].fechaInicio).toLocaleDateString()} - ${new Date(data[0].fechaFin).toLocaleDateString()}
        </div>`

        }else{
            body=`<div class="col-xl-6">
            <p>No hay Semestre Actual</p>
        </div>
        <div class="col-xl-6">
            -
        </div>`

        }
        document.getElementById("datosSemestreActual").innerHTML=body
        let nombre=JSON.parse(localStorage.getItem("data")).nombre
        document.getElementById("nombreAdmin").innerHTML=`<div class="col-xl-6">
        <p>  Administrador <a href="#" > ${nombre} </a></p>
     </div>
     <div class="col-xl-6">

     </div>`
}


