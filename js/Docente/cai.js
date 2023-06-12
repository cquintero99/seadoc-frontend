//FUNCION PARA DESCARGAR DOCUMENTO
async function descargarFormatoCAI(nombre) {
    const response = await fetch(urlAWS + "/s3/download?key="+nombre, {
        method: 'GET'
    });

    if (response.ok) {
        const blob = await response.blob();
        return blob;
    } else {
        throw new Error("Error al descargar el archivo");
    }
}
// FUNCION QUE DESCARGA EL FORMATO CAI
function descargarCAI() {
    let formato="1686602785829_CAI (1).docx"
    descargarFormatoCAI(formato)
        .then(blob => {
            // Crear un enlace temporal para descargar el archivo
            const url = URL.createObjectURL(blob);

            // Crear un elemento de enlace <a> y establecer su atributo de descarga
            const link = document.createElement('a');
            link.href = url;
            link.download = "CAI.docx";

            // Simular un clic en el enlace para iniciar la descarga
            link.click();

            // Limpiar el enlace temporal
            URL.revokeObjectURL(url);
        })
        .catch(err => {
            console.error(err);
        });
}
//FUNCION QUE  GUARDA  EN SERVIDOR  EL DOCUMENTO CAI
async function saveCAI(formData) {
    const result = await fetch(urlAWS + "/s3/upload", {
        method: "POST",
        body: formData,
        headers: {
            'Access-Control-Allow-Headers': 'Authorization',
            'Cache-Control': 'no-store',
        },
        cache: 'no-store',

    })
    return result;

}
//FUNCION QUE LEE EL DOCUEMENTO QUE INGRESA EL DOCENTE Y LO ENVIA AL SERVIDOR
function uploadCAI() {

    const inputArchivo = document.getElementById("fileUpload");
    const archivo = inputArchivo.files[0];

    if (archivo) {
        const formData = new FormData();
        formData.append("file", archivo);
        listaCAI()
            .then(response => response.json())
            .then(data => {
                if (data.length == 0) {
                    saveCAI(formData)
                        .then(res => res.text())
                        .then(data => {
                            let usuarioSemestreId = localStorage.getItem("userSemestreId")
                            let nombre = data
                            let semestreId=localStorage.getItem("semestreActual")
                            const cai = {
                                usuarioSemestreId,
                                nombre,
                                semestreId
                            }
                            console.log(cai)
                            saveTablaCAI(cai)
                                .then(response => response.json())
                                .then(newCai => {
                                    Swal.fire(
                                        'Guardado!',
                                        'Se guardo el documento CAI.',
                                        'success'
                                      )
                                    verListaCai()
                                })
                                .catch(err => {
                                    console.log(err)

                                })
                                .finally(final => {

                                })



                        })

                        .catch(error => {
                            console.log(error)
                            // Manejar el error de la petición
                        });
                } else {
                    Swal.fire(
                        'Informacion!',
                        'Ya se guardo el documento CAI del semestre actual',
                        'info'
                      )
                }

            })
            .catch(err => {
                console.log(err)
            })
            .finally(final => {

            })

    } else {
        Swal.fire(
            'Informacion!',
            'Ingrese el documento',
            'error'
          )
        // Manejar el caso en el que no se seleccione ningún archivo
    }
}

//FUNCION GUARDA LOS DATOS DEL CAI EN LA BASE DE DATOS
async function saveTablaCAI(cai) {
    let token = localStorage.getItem("token")
    const result = await fetch(urlBasic + "/cai/save", {
        method: "POST",
        body: JSON.stringify(cai),
        headers: {
            'Content-type': "application/json",
            'Access-Control-Allow-Headers': 'Authorization',
            'Cache-Control': 'no-store',
            "Authorization": "Bearer " + token
        },
        cache: 'no-store',

    })
    return result;

}
//FUNCION QUE TRAE LA LISTA DE CAI DEL DOCENTE
async function listaCAI() {
    let usuarioSemestreId = localStorage.getItem("userSemestreId")
    let token = localStorage.getItem("token")
    const result = await fetch(urlBasic + "/cai/" + usuarioSemestreId, {

        headers: {
            'Content-type': "application/json",
            'Access-Control-Allow-Headers': 'Authorization',
            'Cache-Control': 'no-store',
            "Authorization": "Bearer " + token
        },
        cache: 'no-store',

    })
    return result;

}
//MUESTRO LA LISTA AL USUARIO
function verListaCai() {
    listaCAI()
        .then(response => response.json())
        .then(data => {
            var t = $('#example').DataTable();
            t.clear().draw();
            if(data.length>0){
                sessionStorage.setItem("nombreCAI",data[0].nombre)
                let acciones = `<div class="input-group text-center" >
    
    <button class="input-group-text btn btn-outline-info " onclick="descargarCai()" 
    type="button" >
    <i class="fa fa-download" aria-hidden="true"></i></button>

    <button class="input-group-text btn btn-outline-danger " onclick="eliminarCai(${data[0].id})" 
     type="button" >
    <i class="fa fa-times" aria-hidden="true"></i></button>
    </div>
    
    
</div> `
            
           
            t.row.add([data[0].nombre
                , data[0].estado

                , new Date(data[0].fechaRegistro).toLocaleDateString()
                , acciones
            ]).draw(false);
            }

        })
        .catch(err => {
            console.log(err)
        })
        .finally(final => {

        })
}
//ELIMINA EL CAI DEL SERVIDOR
async function deleteCAI(id) {
    let token = localStorage.getItem("token")
    const result = await fetch(urlBasic + "/cai/"+id, {
        method: "DELETE",
        headers: {
            'Content-type': "application/json",
            'Access-Control-Allow-Headers': 'Authorization',
            'Cache-Control': 'no-store',
            "Authorization": "Bearer " + token
        },
        cache: 'no-store',

    })
    return result;

}
//FUNCION QUE CON EL ALERT PARA VERIFICAR SI ELIMINA EL ARCHIVO 
function eliminarCai(id) {
    Swal.fire({
        title: 'Eliminar CAI?',
        text: "Se eliminara el documento ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Elminar'
      }).then((result) => {
        if (result.isConfirmed) {
            deleteCAI(id)
            .then(res=>res)
            .then(data=>{
                console.log(data)
                Swal.fire(
                    'Eliminado!',
                    'Se elimino el documento CAI.',
                    'success'
                  )
                verListaCai()
            })
            
            .catch(err=>{
                console.log(err)
            })
          
        }
      })

   

}
//FUNCION PARA DESCARGAR EL CAI QUE EL DOCENTE SUBIO
function descargarCai(){
    let nombre=sessionStorage.getItem("nombreCAI")
    
    descargarFormatoCAI(nombre)
    .then(blob => {
        // Crear un enlace temporal para descargar el archivo
        const url = URL.createObjectURL(blob);

        // Crear un elemento de enlace <a> y establecer su atributo de descarga
        const link = document.createElement('a');
        link.href = url;
        link.download = "CAI.docx";

        // Simular un clic en el enlace para iniciar la descarga
        link.click();

        // Limpiar el enlace temporal
        URL.revokeObjectURL(url);
    })
    .catch(err => {
        console.error(err);
    });
    
}