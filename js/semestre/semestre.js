//CONEXION CON EL BACK
const urlBasic = "https://teacher-test-backend-production-e58a.up.railway.app";
//"http://localhost:8080"

const tabla = document.getElementById("tabla-datos");
const cuerpoTabla = tabla.getElementsByTagName("tbody")[0];


verSemestres()
async function listaSemestres(){
  let token = localStorage.getItem("token");

  const result= await fetch(urlBasic + "/semestre", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-type": "Application/json",
    },
  })
  return result

}


async function verSemestreEstado(estado){
 
  let token=localStorage.getItem("token")
  const result= await fetch(urlBasic+"/semestre/estado/"+estado,{
      method:'GET',
      
      headers:{
          "Authorization":"Bearer "+token,
          "Content-type":"Application/json"
      }
  })
  return result
  
}
function compararFechasInicioDescendente(a, b) {
  return new Date(a.fechaInicio) - new Date(b.fechaInicio);
}
async function verSemestres() {
  mostrarSpinner()
    listaSemestres()
    .then((response) => response.json())
    .then((data) => {

      mostrarData(data.sort(compararFechasInicioDescendente))
    })
    .finally((yes) => {
      //loadingElement.style.display = 'none';
      ocultarSpinner()
    })
    .catch((err) => {
      console.log(err);
    });
}


function mostrarData(data){
  
  let body = ``;
  let actual=false;
  for (let i = data.length-1; i >=0 ; i--) {
    if(data[i].estado=="ACTUAL"){
      if(data[i].visibilidad=="PRIVADO"){
        document.getElementById("semestreActual").innerHTML=data[i].nombre+" "+`<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
    </svg>`
      }else{
        document.getElementById("semestreActual").innerHTML=data[i].nombre+" "+`<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-unlock-fill" viewBox="0 0 16 16">
      <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z"/>
    </svg>`
      }
      
      body += `
      <tr>
      <td>${data.length-i}</td>
      <td>${data[i].nombre}</td>
      <td>${new Date(data[i].fechaInicio).toLocaleDateString()}</td>
      <td>${new Date(data[i].fechaFin).toLocaleDateString()}</td>
      <td>${data[i].estado}</td>
      <td>${new Date(data[i].fechaRegistro).toLocaleDateString()}</td>
      <td>${data[i].visibilidad}</td>
      <td>
      <div class="btn-group dropstart">
        <button type="button" class="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          Actualizar
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Estado</a></li>
          <li><a class="dropdown-item" href="#">Visibilidad</a></li>
          <li><a class="dropdown-item" href="#">Fechas</a></li>
        </ul>
      </div>
      </td>
      </tr>

      `
      actual=true
    }else{
    body += `
      <tr>
      <td>${data.length-i}</td>
      <td>${data[i].nombre}</td>
      <td>${new Date(data[i].fechaInicio).toLocaleDateString()}</td>
      <td>${new Date(data[i].fechaFin).toLocaleDateString()}</td>
      <td>${data[i].estado}</td>
      <td>${new Date(data[i].fechaRegistro).toLocaleDateString()}</td>
      <td>${data[i].visibilidad}</td>
      <td>
      
      </td>
      </tr>

      `
     
    }
  }
  if(actual==false){
    body=""
    document.getElementById("semestreActual").innerHTML="No hay Semestre actual"
   // noHayActual(data)
   for (let i = data.length-1; i >=0 ; i--) {
    
    body += `
      <tr>
      <td>${i+1}</td>
      <td>${data[i].nombre}</td>
      <td>${new Date(data[i].fechaInicio).toLocaleDateString()}</td>
      <td>${new Date(data[i].fechaFin).toLocaleDateString()}</td>
      <td>${data[i].estado}</td>
      <td>${new Date(data[i].fechaRegistro).toLocaleDateString()}</td>
      <td>${data[i].visibilidad}</td>
      <td>
      <button type="button" class="btn btn-outline-warning">Actualizar</button>
      </td>
      </tr>

      `
  }
  
  }
 
  document.getElementById("tabla_semestres").innerHTML = body;
}

function noHayActual(data){
 

}

function mostrarSpinner() {
  document.getElementById("sppiner").innerHTML=`<div id="spinner-container" class="d-flex justify-content-center align-items-center ">
    <div class="spinner-border text-danger" role="status">
      <span class="sr-only">Cargando...</span>
    </div>
  </div>`
}


function ocultarSpinner() {
  document.getElementById("sppiner").innerHTML=`<div id="spinner-container" class="d-flex justify-content-center align-items-center d-none">
    <div class="spinner-border text-danger" role="status">
      <span class="sr-only">Cargando...</span>
    </div>
  </div>`
}
