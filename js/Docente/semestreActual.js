//CONEXION CON EL BACK
const urlBasic = "https://teacher-test.herokuapp.com"

async function verSemestreEstado(estado) {

    let token = localStorage.getItem("token")
    const result = await fetch(urlBasic + "/semestre/estado/" + estado, {
        method: 'GET',

        headers: {
            "Authorization": "Bearer " + token,
            "Content-type": "application/json"
        }
    })
    return result

}

async function saveUsuarioSemestre(usuarioSemestre){
    let token=localStorage.getItem("token")
    const result= await fetch(urlBasic+"/usuario/semestre/save",{
        method:'POST',
        body:JSON.stringify(usuarioSemestre),
        headers:{
            "Authorization": "Bearer " + token,
            "Content-type": "application/json"
        }

    })
    return result;
}
async function verListadeSemestreDelDocente() {

    let token = localStorage.getItem("token")
    let id=JSON.parse(localStorage.getItem("data")).id
    const result = await fetch(urlBasic + "/usuario/" + id+"/semestre/docente", {
        method: 'GET',

        headers: {
            "Authorization": "Bearer " + token,
            "Content-type": "application/json"
        }
    })
    return result

}

const unirmeSemestre=document.getElementById("unirmeSemestre")
function buscarSemestreActual() {
    verSemestreEstado("ACTUAL")
        .then(response => response.json())
        .then(data => {
            const semestreActual = document.getElementById("semestreActual")
            const registrado = document.getElementById("registrado")

            if (data.length >= 1) {
                localStorage.setItem("semestreActual",data[0].id)
                verListadeSemestreDelDocente()
                .then(response=>response.json())
                .then(lista=>{
                    console.log(lista)
                    if(lista.length=="0"){
                        unirmeSemestre.className="btn btn-outline-success"
                    }else{
                        var semestreEncontrado = lista.find(function(item) {
                            return item.semestreId.id=== data[0].id;
                          });
                          
                          // Verificar si se encontró el objeto
                          if (semestreEncontrado) {
                            registrado.className="bg-success rounded fw-bold text-light "
                            console.log("Se encontró el semestre con id " );
                          } else {
                            unirmeSemestre.className="btn btn-outline-success "
                        
                            
                          }
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
                .finally(fina=>{

                })
                let fechaInicio = new Date(data[0].fechaInicio).toLocaleDateString()
                let fechaFin = new Date(data[0].fechaFin).toLocaleDateString()
                document.getElementById("nombreSemestre").innerHTML = data[0].nombre
                document.getElementById("visibilidad").innerHTML = data[0].visibilidad
                document.getElementById("fechas").innerHTML = fechaInicio +" - "+fechaFin


            }

        })
        .catch(err=>{
            console.log(err)
        })
        .finally(fina=>{
            
        })
}
unirmeSemestre.addEventListener('click',()=>{

    
    let id=JSON.parse(localStorage.getItem("data")).id
    let semestreActual=localStorage.getItem("semestreActual")
    let fecha=new Date()
    const usuarioSemestre={
        usuarioId:{
            id
        },
        semestreId:{
            id:semestreActual
        },
        fechaRegistro:fecha
    }

    saveUsuarioSemestre(usuarioSemestre)
    .then(response=>response)
    .then(newUsuario=>{
        console.log(newUsuario)
    })
    .catch(err=>{
        console.log(err)
    })
    .finally(final=>{

    })
   
  
})

