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
    sessionStorage.setItem("listaDocente",jsonObject)
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
        let listaDocente=sessionStorage.getItem("listaDocente")
        console.log(listaDocente)
       for (let i = 0; i < JSON.parse(listaDocente).length; i++) {
        document.getElementById("F"+JSON.parse(listaDocente)[i].Codigo).innerHTML=`<p>Enviado</p>`
        
       }
       sessionStorage.clear()

    });

    window.addEventListener('beforeunload', function(event) {
        // Aquí puedes realizar alguna acción antes de que el usuario abandone la página.
        // Por ejemplo, puedes preguntarle si realmente desea recargar la página.
        // Si deseas mostrar un mensaje personalizado, debes asignarlo a la propiedad `event.returnValue`.
        event.returnValue = '¿Estás seguro de que deseas recargar la página?';
      });
      
      window.addEventListener('unload', function(event) {
        // Aquí puedes realizar alguna acción después de que el usuario haya abandonado la página.
        // Ten en cuenta que esta acción se ejecutará incluso si el usuario ha cerrado la pestaña o el navegador.
        sessionStorage.clear()
      });