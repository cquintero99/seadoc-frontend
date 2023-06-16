//FUNCION QUE  GUARDA  EN SERVIDOR  EL DOCUMENTO CAI
async function saveUsuarioEvaluacion(usuarioEvaluacion) {
    let token=localStorage.getItem("token")
    const result = await fetch(urlBasic+"/usuario/evaluacion/save", {
        method: "POST",
        body: JSON.stringify(usuarioEvaluacion),
        headers: {
            
            'Content-type':'application/json',
            'Authorization':"Bearer "+token
        },
        cache: 'no-store',

    })
    return result;

}
function sendEvaluacion(){
    mostrarSpinner()
    // Obtener el valor del parámetro de consulta "dato"
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    //categorias(id)
    const evaluacion = JSON.parse(localStorage.getItem(id))
    let usuarioId=JSON.parse(localStorage.getItem("data")).id
    let userSemestreId=localStorage.getItem("userSemestreId")
    const usuarioEvaluacion={
        evaluacionId:evaluacion.id,
        usuarioId,
        
        usuarioSemestreId:Number(userSemestreId)
    }
    const respuestas=JSON.parse(sessionStorage.getItem("r"))
    

    const sendData={
        usuarioEvaluacion,
        respuestas
    }
    saveUsuarioEvaluacion(sendData)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        document.getElementById("preguntas").innerHTML=""
    })
    .catch(err=>{
        console.log(err)
        ocultarSpinner()
    })
    .finally(final=>{
        ocultarSpinner()
    })
}