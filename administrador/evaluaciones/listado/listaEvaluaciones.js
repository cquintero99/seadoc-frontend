
const urlBasic = "https://teacher-test-backend-production-e58a.up.railway.app";


function verListado(){
    listado() 
    .then(res=>res.json())
    .then(data=>{
        cargarLista(data)
       

    })
    .catch(error=>{
        console.log(error)
    })

}
$(document).ready(function () {
    var t = $('#example').DataTable();
    var counter = 1;
 
    $('#addRow').on('click', function () {
        t.row.add([counter + '.1', counter + '.2', counter + '.3', counter + '.4', counter + '.5']).draw(false);
 
        counter++;
    });
 
    // Automatically add a first row of data
    $('#addRow').click();
});


function cargarLista(data){
    
    let body=""
    var counter = 1;
    var t = $('#example').DataTable();
  
       
    for(let i=0;i<data.length;i++){
        t.row.add([i+1,data[i].nombre,new Date(data[i].fechaInicio).toLocaleDateString(),
        data[i].estado, new Date(data[i].fechaRegistro).toLocaleDateString()]).draw(false);
 
        counter++;
        body+=` <tr>
        <td>${i+1}</td>
        <td>${data[i].nombre}</td>
        <td>${new Date(data[i].fechaInicio).toLocaleDateString()}</td>
        <td>${new Date(data[i].fechaFin).toLocaleDateString()}</td>
        <td>${data[i].estado}</td>
        <td>${new Date(data[i].fechaRegistro).toLocaleDateString()}</td>
        <td>${data[i].visibilidad}</td>
    </tr>`
        
    
    }
    document.getElementById("listadoEvaluaciones").innerHTML=body;
                                                

    
                                             
}

async function listado(){
    let token = localStorage.getItem("token")
    const result=await fetch (urlBasic + "/semestre",{
        headers: {
            'Content-type': 'application/json ',
            'Authorization': 'Bearer '+ token,
            'Cache-Control': 'no-store'
          }
    })

    return result
}