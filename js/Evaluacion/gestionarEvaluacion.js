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
function gestionarEvaluacion(){
    // Obtener el valor del parámetro de consulta "dato"
 const urlParams = new URLSearchParams(window.location.search);
 const id = urlParams.get('id');
 
 // Hacer algo con el valor recibido
 getEvalucionById(id)
 .then(response=>response.json())
 .then(data=>{
    let fecha=new Date(data.fechaRegistro).toLocaleDateString()
    document.getElementById("titulo").innerHTML=data.titulo
    document.getElementById("fechaE").innerHTML=fecha
    document.getElementById("categoriaE").innerHTML=data.categoriaId.nombre.toUpperCase()
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
