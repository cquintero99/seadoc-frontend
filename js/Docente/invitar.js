const urlBasic = "https://teacher-test-backend-production-e58a.up.railway.app"
// "https://teacher-test-backend-production-e58a.up.railway.app"
var selectedFile;
document
    .getElementById("fileUpload")
    .addEventListener("change", function (event) {

        selectedFile = event.target.files[0];
        if (selectedFile) {
            var fileReader = new FileReader();
            fileReader.onload = function (event) {
                var data = event.target.result;

                var workbook = XLSX.read(data, {
                    type: "binary"
                });
                workbook.SheetNames.forEach(sheet => {
                    let rowObject = XLSX.utils.sheet_to_row_object_array(
                        workbook.Sheets[sheet]
                    );
                    let jsonObject = JSON.stringify(rowObject);
                    // document.getElementById("jsonData").innerHTML = jsonObject;
                    cargarLista(jsonObject)

                });
            };
            fileReader.readAsBinaryString(selectedFile);
        }
    });


function cargarLista(jsonObject) {
    sessionStorage.setItem("listaDocente", jsonObject)
    var body = ""
    for (let i = 0; i < JSON.parse(jsonObject).length; i++) {
        let nombre = JSON.parse(jsonObject)[i].Nombre
        let codigo = JSON.parse(jsonObject)[i].Codigo
        let documento = JSON.parse(jsonObject)[i].Documento
        let email = JSON.parse(jsonObject)[i].Email
        body += `<tr>
            <td>${nombre}</td>
            <td>${codigo}</td>
            <td>${documento}</td>
            <td>${email}</td>
            <td id="F${codigo}"></td>
        </tr>`


    }
    document.getElementById("datosInvitados").innerHTML = body;

}

document
    .getElementById("uploadExcel")
    .addEventListener("click", function () {
        mostrarSpinner()



        let listaDocente = sessionStorage.getItem("listaDocente")

        if (listaDocente != null && JSON.parse(listaDocente).length>=1 ) {

            for (let i = 0; i < JSON.parse(listaDocente).length; i++) {
                mostrarSpinner()

                savePreRegistro(JSON.parse(listaDocente)[i])



            }

            document.getElementById("fileUpload").value = ""
            sessionStorage.clear()

        } else {
            ocultarSpinner()
            document.getElementById("alertInvitar").innerHTML = `<div class="alert alert-warning" role="alert">
        <i class="fa fa-file-excel-o" aria-hidden="true"></i> Lista Vacia Cargue un archivo EXCEL 
      </div>`

            setTimeout(() => {
                document.getElementById("alertInvitar").innerHTML = ""
            }, 5000)
        }

    });



function descargarExcel() {
    // Ruta del archivo de Excel relativa a la raíz del proyecto
    var rutaArchivo = "/js/Docente/formato_pre_registro.xlsx";

    // Crear un enlace de descarga
    var linkDescarga = document.createElement("a");

    // Establecer la URL del archivo de Excel como la URL del enlace de descarga
    linkDescarga.href = rutaArchivo;

    // Establecer el nombre de archivo del archivo de Excel como el nombre de descarga del enlace de descarga
    linkDescarga.download = "formato_pre_registro.xlsx";

    // Hacer clic automáticamente en el enlace de descarga para iniciar la descarga
    linkDescarga.click();
}

var btn = document.getElementById("btn-descargar-excel");
btn.addEventListener("click", descargarExcel);

async function savePreRegistro(registro) {

    let preRegistro = {
        nombre: registro.Nombre,
        codigo: registro.Codigo,
        documento: registro.Documento,
        email: registro.Email,
        password: registro.Documento,
        fechaRegistro: new Date()
    }


    let token = localStorage.getItem("token")
    const result = fetch(urlBasic + "/pre/save", {
        method: 'POST',
        body: JSON.stringify(preRegistro),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-type": "Application/json"
        }
    })
        .then(res => res.json())
        .then(data => {

            document.getElementById("F" + registro.Codigo).innerHTML = `<p class="bg-success text-center text-light">Enviado</p>`

        })
        .catch(err => {
            console.log(err)
            document.getElementById("F" + registro.Codigo).innerHTML = `<p>No Enviado</p>`

        })
        .finally(final => {
            ocultarSpinner()
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
/*
window.addEventListener('beforeunload', function(event) {
    // Aquí puedes realizar alguna acción antes de que el usuario abandone la página.
    // Por ejemplo, puedes preguntarle si realmente desea recargar la página.
    // Si deseas mostrar un mensaje personalizado, debes asignarlo a la propiedad `event.returnValue`.
    event.returnValue = '¿Estás seguro de que deseas recargar la página?';
  });
  */

window.addEventListener('unload', function (event) {
    // Aquí puedes realizar alguna acción después de que el usuario haya abandonado la página.
    // Ten en cuenta que esta acción se ejecutará incluso si el usuario ha cerrado la pestaña o el navegador.
    sessionStorage.clear()
});

