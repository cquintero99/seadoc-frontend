const opcinesRespuesta=document.getElementById('btnOpcinesRespuesta')

opcinesRespuesta.addEventListener('click',()=>{
    //Obtengo los datos
    let valor=document.getElementById("inputValorP").value
    let descripcion=document.getElementById("inputDescripcionP").value
    //Si son validos 
    if(valor!="" && descripcion!=""){
    //Busco los datos en la session
    const criterios=sessionStorage.getItem("criterios")
    let posicionC=sessionStorage.getItem("posicionC")
    //Creo el array
    let array=[]
    //Si no hay criterios
    if(posicionC===null){
        posicionC=0
    }
    //Aumento la posicion
    let pos=Number(posicionC)+1
    //Creo el objeto
    const newCriterio={
        id:pos,
        valor,
        descripcion
    }
    //Si hay criterios guardados en la session los agrego al array
    if(criterios!=null){
    array= array.concat(JSON.parse(criterios))
    }
    //Agrego el Criterio nuevo
    array.push(newCriterio)
    //oreno el array
    array.sort((a, b) => {
        return a.valor - b.valor;
      });
    //Agrego los datos a la vista
    let body=""
    for (let i = 0; i < array.length; i++) {
       
        body+=`<tr id="criterio${array[i].id}">
        <td >${array[i].descripcion}</td>
        <td >${array[i].valor}</td>
        <td>
        
        <button   class="input-group-text btn btn-danger text-center" type="button" onclick="eliminarCriterio(${array[i].id})">
        <i class="fa fa-times" aria-hidden="true"></i></button>
        </tr>
        `
    }
    document.getElementById("opcinesRespuesta").innerHTML=body

    //Limpio los campos
    document.getElementById("inputValorP").value=""
    document.getElementById("inputDescripcionP").value=""
    //Guardo en la Session
    sessionStorage.setItem("criterios",JSON.stringify(array))
    sessionStorage.setItem("posicionC",pos)
    }


    
})

function eliminarCriterio(pos){
    document.getElementById("criterio"+pos).remove()

    const criterios=sessionStorage.getItem("criterios")
    let array=[]
    //agrego las preguntas al array
    array = array.concat(JSON.parse(criterios))

    //Busco El criterio que voy a eliminar
    const index = array.findIndex(element => element.id === Number(pos));
    //Si encuentra el Criterio
    if (index !== -1) {
        //elimino el criterio del array
        array.splice(index, 1);
    } 
    //Ordeno el array por el valor 
 
    //Agrego en la session
    sessionStorage.setItem("criterios",JSON.stringify(array))

}



