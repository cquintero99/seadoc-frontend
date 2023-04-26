const agregarSemestre = document.getElementById("agregarSemestre")

agregarSemestre.addEventListener('click', () => {
    mostrarSpinner()
    let fechaInicio = document.getElementById("fechaInicio").value
    let fechaFin = document.getElementById("fechaFin").value
    let usuarioId = JSON.parse(localStorage.getItem("data")).id

    const semestre = {
        fechaInicio,
        fechaFin,
        fechaRegistro: "",
        nombre: "",
        estado: "ESPERA",
        visibilidad: "PRIVADO",
        usuarioId

    }
    if(usuarioId!=null && fechaFin!=="" && fechaInicio!==""){
        registrarSemestre(semestre)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            body = `<div class="alert alert-success" role="alert">
        Semestre se guardo con exito
      </div>`;
            document.getElementById("alertSemestre").innerHTML = body;

            setTimeout(() => {
                document.getElementById("alertSemestre").innerHTML = "";
            }, 5000);
            verSemestres()
        })
        .catch(err => {
            console.log(err)
            body = `<div class="alert alert-danger" role="alert">
        Error Solo se pueden registrar 2 semestres en un año
      </div>`;
            document.getElementById("alertSemestre").innerHTML = body;
            ocultarSpinner()
            setTimeout(() => {
                document.getElementById("alertSemestre").innerHTML = "";
            }, 7000);
        })
        .finally(final => {

            ocultarSpinner()


        })
    }else{
        body = `<div class="alert alert-danger" role="alert">
        Seleccione las fechas del semestre
      </div>`;
            document.getElementById("alertSemestre").innerHTML = body;
            ocultarSpinner()
            setTimeout(() => {
                document.getElementById("alertSemestre").innerHTML = "";
            }, 7000);
        

    }
   



})

async function registrarSemestre(semestre) {
    console.log(semestre)
    let token = localStorage.getItem("token")
    const result = await fetch(urlBasic + "/semestre/save", {
        method: 'POST',
        body: JSON.stringify(semestre),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-type": "Application/json"
        }
    })
    return result

}