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
//OBTENER EVALUACION POR ID
async function getDocentesSemestreById(id) {
    let token = localStorage.getItem("token")
    const result = await fetch(urlBasic + "/semestre/" + id+"/docentes", {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    return result
}
function mostrarEstadoEvaluacion(estado){
    const estados= document.getElementById("estadoEvaluacion")
    const btnActualizarEstado= document.getElementById("btnActualizarEstado")
    btnActualizarEstado
    console.log(estado)
    if(estado=='REGISTRADA'){
        estados.innerHTML=` <div class="progress" role="progressbar" aria-label="Progress" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="height: 1px;">
        <div class="progress-bar" style="width: 0%"></div>
      </div>
      <button type="button" class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary bg-info  rounded-pill" style="width: 2rem; height:2rem;">1 <span>REGISTRADO</span></button>
      <button type="button" class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-secondary rounded-pill" style="width: 2rem; height:2rem;">2</button>
      <button type="button" class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill" style="width: 2rem; height:2rem;">3</button>
   `
    }else if(estado=='ACTIVA'){
        estados.innerHTML=` <div class="progress" role="progressbar" aria-label="Progress" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="height: 1px;">
        <div class="progress-bar bg-success" style="width: 50%"></div>
      </div>
      <button type="button" class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary bg-info  rounded-pill" style="width: 2rem; height:2rem;">1 <span>REGISTRADO</span></button>
      <button type="button" class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-secondary bg-success rounded-pill " style="width: 2rem; height:2rem;">2</button>
      <button type="button" class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill" style="width: 2rem; height:2rem;">3</button>
   `

    }else if(estado=='CERRADA'){
        estados.innerHTML=` <div class="progress" role="progressbar" aria-label="Progress" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="height: 1px;">
        <div class="progress-bar bg-warning" style="width: 100%"></div>
      </div>
      <button type="button" class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary bg-info  rounded-pill" style="width: 2rem; height:2rem;">1 <span>REGISTRADO</span></button>
      <button type="button" class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-secondary bg-success rounded-pill " style="width: 2rem; height:2rem;">2</button>
      <button type="button" class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary bg-warning rounded-pill" style="width: 2rem; height:2rem;">3</button>
   `
   btnActualizarEstado.className="d-none"

    }

}

function gestionarEvaluacion(){
    mostrarSpinner()
    // Obtener el valor del parámetro de consulta "dato"
 const urlParams = new URLSearchParams(window.location.search);
 const id = urlParams.get('id');
 
 // Busco la evaluacion con el id del url
 getEvalucionById(id)
 .then(response=>response.json())
 .then(data=>{
    //Obtengo la evaluacion
    let fecha=new Date(data.fechaRegistro).toLocaleDateString()
    document.getElementById("titulo").innerHTML=data.titulo
    document.getElementById("fechaE").innerHTML=fecha
    document.getElementById("categoriaE").innerHTML=data.categoriaId.nombre.toUpperCase()
    console.log(data)
    let nombreEstado=data.estadosEvaluacion[data.estadosEvaluacion.length-1].estadoId.nombre
    mostrarEstadoEvaluacion(nombreEstado)
    
    getSemestreId(data.semestreId)
    .then(res=>res.json())
    .then(semestre=>{
        document.getElementById("nombreS").innerHTML=semestre.nombre
        document.getElementById("estadoS").innerHTML=semestre.estado
        getDocentesSemestreById(semestre.id)
        .then(respon=>respon.json())
        .then(docentes=>{
            
            var counter = 1;
            var tabla = $('#tablaDonceteEvaluaciones').DataTable()
            tabla.clear().draw();
            let acciones =
            ` <button type="button" class="btn btn-outline-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa fa-cog" aria-hidden="true"></i>
              </button>
              <ul class="dropdown-menu">
                  <li>
                      <div class="dropdown-item input-group d-grid gap-2">
                          <a   type="buttom" class=" input-group-text btn btn-outline-info" type="button">
                          <i class="fa fa-eye" aria-hidden="true"></i> Gestionar
                          </a>
                      </div>
                  </li>
                  <li>
                      <div class="dropdown-item input-group d-grid gap-2">
                          <a href="#"   
                          class="input-group-text btn btn-outline-warning" type="button">
                          <i class="fa fa-pencil" aria-hidden="true"></i> Editar
                          </a>
                      </div>
                  </li>
                  <li>
                      <div class="dropdown-item input-group d-grid gap-2">
                          <button class="input-group-text btn btn-outline-danger"  
                              type="button" >
                          <i class="fa fa-times" aria-hidden="true"></i> Elimnar
                          </button>
                      </div>
                  </li>
              </ul>
             
          
          
      ` 
            
            let color="warning"
            let estado=`<p class="rounded mt-3 fw-bold bg-${color}">Sin presentar</p>`
            console.log(docentes)
            for (let i = 0; i < docentes.length; i++) {
                
            let nombre=`<p class="rounded mt-3 fw-bold bg-${color}">${docentes[i].nombre}</p>`
               
                tabla.row.add([i + 1
                    , nombre
                    , docentes[i].codigo,
                    estado,
                    acciones
                ]).draw(false);

                counter++;
                
            }
        })
        .catch(err=>{
            console.log(err)

        })
        .finally(final=>{

        })
       
    
    })
    .catch(err=>[
        console.log(err)
    ])
 })
 .catch(err=>{
    console.log(err)
 })
 .finally(final=>{
    ocultarSpinner()

 })
 
 }
 $(document).ready( function () {
    $('#tablaDonceteEvaluaciones').DataTable({
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
