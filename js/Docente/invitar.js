const urlBasic = "https://teacher-test-backend-production-69e6.up.railway.app"
//"https://teacher-test.herokuapp.com"

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





var encabezado = { Nombre: "", Codigo: "", Documento: "", Email: "" };



function descargarExcel() {
    /* Crea un libro de Excel vacío */
    var libro = XLSX.utils.book_new();
  
    /* Crea una hoja de cálculo en el libro */
    var hoja = XLSX.utils.json_to_sheet([encabezado]);
  
    /* Agrega la hoja de cálculo al libro */
    XLSX.utils.book_append_sheet(libro, hoja, 'Hoja1');
  
    /* Convierte el libro a un archivo binario de Excel */
    var archivo = XLSX.write(libro, { bookType: 'xlsx', type: 'binary' });
  
    /* Crea un objeto Blob con el archivo binario */
    var blob = new Blob([s2ab(archivo)], { type: 'application/octet-stream' });
  
    /* Descarga el archivo Excel */
    saveAs(blob, 'formato_invitacion_docente.xlsx');
  }
  
  /* Convierte una cadena en formato binario */
  function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i<s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  }

  function saveAs(blob, filename) {
    if (navigator.msSaveBlob) { // para Internet Explorer
      navigator.msSaveBlob(blob, filename);
    } else {
      var link = document.createElement('a');
      if (link.download !== undefined) { // para navegadores modernos
        var url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else { // para navegadores antiguos
        alert('Lo siento, tu navegador no soporta la descarga de archivos.');
      }
    }
  }
  
  


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
    const result = await fetch(urlBasic + "/pre/save", {
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

