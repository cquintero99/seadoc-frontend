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
async function verSemestres() {
  mostrarSpinner()
    listaSemestres()
    .then((response) => response.json())
    .then((data) => {
      mostrarData(data)
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
      document.getElementById("semestreActual").innerHTML=data[i].nombre+" --"+data[i].visibilidad
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
    }else{
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
      
      </td>
      </tr>

      `
     
    }
  }
 
  document.getElementById("tabla_semestres").innerHTML = body;
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
