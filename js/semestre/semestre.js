//CONEXION CON EL BACK
const urlBasic = "https://teacher-test.herokuapp.com"
//"https://teacher2023.herokuapp.com"
//"https://teacher-test-backend-production-e58a.up.railway.app";
//"http://localhost:8080"

//const tabla = document.getElementById("tabla-datos");
//const cuerpoTabla = tabla.getElementsByTagName("tbody")[0];


verSemestres()
async function listaSemestres() {
  let token = localStorage.getItem("token");

  const result = await fetch(urlBasic + "/semestre", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-type": "Application/json",
    },
  })
  return result

}


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

async function deleteSemestre(id){
  let token=localStorage.getItem("token")
  const result=await fetch(urlBasic+"/semestre/"+id,{
    method:'DELETE',
    headers:{
      "Authorization":"Bearer "+token
    }

  })
  return result;
}
function compararFechasInicioDescendente(a, b) {
  return new Date(b.fechaInicio) - new Date(a.fechaInicio);
}


 function verSemestres() {
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




async function mostrarData(data) {
  var counter = 1;
  var t = $('#example').DataTable();
  t.clear().draw();
 




  for (let i = 0; i < data.length; i++) {
    let estado = data[i].estado
    let id = data[i].id
    let acciones = `<div class="input-group " >
    
    <button onclick="verSemestre(${id})"  data-bs-toggle="modal" data-bs-target="#staticBackdrop3"
     class="input-group-text btn btn-outline-warning" type="button">
    <i class="fa fa-pencil" aria-hidden="true"></i></button>
    <button class="input-group-text btn btn-outline-danger" onclick="eliminarSemestre(${id})" 
     type="button" >
    <i class="fa fa-times" aria-hidden="true"></i></button>
    </div>
    
    
</div> `
    let color=""
    if (estado == 'ACTUAL') {
      color="success"
      
      if (data[i].visibilidad == "PRIVADO") {
        document.getElementById("semestreActual").innerHTML = data[i].nombre + " " + `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
      </svg>`

      } else {
        document.getElementById("semestreActual").innerHTML = data[i].nombre + " " + `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-unlock-fill" viewBox="0 0 16 16">
        <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z"/>
      </svg>`
      }
     
    }else if(estado=='REGISTRADO'){
      color="info"
    }
    else{
      color="warning"
    }
    


    t.row.add([i + 1
      , `<p class="text-dark fw-bold bg-${color}">${data[i].nombre}</p>`
      , new Date(data[i].fechaInicio).toLocaleDateString()
      , new Date(data[i].fechaFin).toLocaleDateString()
      , `<p class="text-dark fw-bold bg-${color}">${data[i].estado}</p>`, new Date(data[i].fechaRegistro).toLocaleDateString()
      , data[i].visibilidad,
      acciones]).draw(false);

    counter++;
  }
  
 

 




}

async function cargarBotonSemestreActual(){
  document.getElementById("semestreActual").innerHTML=`<button class="input-group-text btn btn-danger" id="btnActivarSemestre"
  data-bs-toggle="modal" data-bs-target="#staticBackdrop2" type="button">
  <i class="fa fa-plus" aria-hidden="true"></i></button>`

}

function eliminarSemestre(id) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: 'Estas Seguro?',
    text: "Esta accion elimina el semestre!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Eliminar!',
    cancelButtonText: 'Cancelar!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      deleteSemestre(id)
      .then(response=>response.json())
      .then(data=>{
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'El semestre '+data.nombre+' se elimino',
          'success'
        )
      })
      .catch(err=>{
        alert(err)
      })
      .finally(final=>{
        verSemestres()

      })
      
    }
  })

}




function mostrarSpinner() {
  document.getElementById("sppiner").innerHTML = `<div id="spinner-container" class="d-flex justify-content-center align-items-center ">
    <div class="spinner-border text-danger" role="status">
      <span class="sr-only">Cargando...</span>
    </div>
  </div>`
}


function ocultarSpinner() {
  document.getElementById("sppiner").innerHTML = `<div id="spinner-container" class="d-flex justify-content-center align-items-center d-none">
    <div class="spinner-border text-danger" role="status">
      <span class="sr-only">Cargando...</span>
    </div>
  </div>`
}
$(document).ready( function () {
  $('#tablaRegistrados').DataTable({
      "language": {
          "decimal":        "",
          "emptyTable":     "No hay datos disponibles en la tabla",
          "info":           "Mostrando _START_ a _END_ de _TOTAL_ registros",
          "infoEmpty":      "Mostrando 0 a 0 de 0 registros",
          "infoFiltered":   "(filtrado de _MAX_ registros totales)",
          "infoPostFix":    "",
          "thousands":      ",",
          "lengthMenu":     "Mostrar _MENU_ registros",
          "loadingRecords": "Cargando...",
          "processing":     "Procesando...",
          "search":         "Buscar:",
          "zeroRecords":    "No se encontraron registros coincidentes",
          "paginate": {
              "first":      "Primero",
              "last":       "Último",
              "next":       "Siguiente",
              "previous":   "Anterior"
          },
          "aria": {
              "sortAscending":  ": activar para ordenar de manera ascendente",
              "sortDescending": ": activar para ordenar de manera descendente"
          }
      }
  });
})
$(document).ready( function () {
  $('#example').DataTable({
      "language": {
          "decimal":        "",
          "emptyTable":     "No hay datos disponibles en la tabla",
          "info":           "Mostrando _START_ a _END_ de _TOTAL_ registros",
          "infoEmpty":      "Mostrando 0 a 0 de 0 registros",
          "infoFiltered":   "(filtrado de _MAX_ registros totales)",
          "infoPostFix":    "",
          "thousands":      ",",
          "lengthMenu":     "Mostrar _MENU_ registros",
          "loadingRecords": "Cargando...",
          "processing":     "Procesando...",
          "search":         "Buscar:",
          "zeroRecords":    "No se encontraron registros coincidentes",
          "paginate": {
              "first":      "Primero",
              "last":       "Último",
              "next":       "Siguiente",
              "previous":   "Anterior"
          },
          "aria": {
              "sortAscending":  ": activar para ordenar de manera ascendente",
              "sortDescending": ": activar para ordenar de manera descendente"
          }
      }
  });
})


