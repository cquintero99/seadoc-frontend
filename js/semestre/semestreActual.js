

const btnActivarSemestre = document.getElementById("btnActivarSemestre")

btnActivarSemestre.addEventListener('click', () => {
  

    verSemestreEstado("ACTUAL")
        .then(response => response.json())
        .then(actual => {


            if (actual.lenght === undefined) {
                semestreRegistrados()

            } else {
                console.log("HAY UN SEMESTRE ACTUAL")
            }
        })
        .catch(err => {
            console.log(err)

        })
        .finally(final => {

        })






})
function semestreRegistrados() {
    verSemestreEstado("REGISTRADO")
        .then(res => res.json())
        .then(data => {
            var counter = 1;
            var tabla = $('#tablaRegistrados').DataTable();
            tabla.clear().draw();
            n = 0;
            let acciones = ""
            while (data[n] != null) {
                acciones = `<button onclick="asignarSemestreActual(${data[n].id})" type="button" class="btn btn-outline-success">Volver Actual</button>`

                tabla.row.add([n + 1
                    , data[n].nombre
                    , new Date(data[n].fechaInicio).toLocaleDateString()
                    , new Date(data[n].fechaFin).toLocaleDateString()
                    , acciones
                ]).draw(false);

                counter++;
                n++
            }


        })
        .catch(err => {

        })
        .finally(final => {

        })
}

function asignarSemestreActual(id) {
    mostrarSpinner()

    getSemestreId(id)
    .then(response=>response.json())
    .then(semestre=>{
                    semestre.estado="ACTUAL"
                    updateSemestre(semestre)
                    .then(res=>res.json())
                    .then(data=>{
                        console.log("Actualizo"+data)
                        
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                    .finally(final=>{
                        window.location.reload()
                        ocultarSpinner()

                    })


    })
    .catch(err=>{
        console.log(err)
    })
    .finally(final=>{
        ocultarSpinner()

    })
 

}



