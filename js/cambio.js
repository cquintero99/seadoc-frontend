async function updatePassword(usuario) {
    let token = localStorage.getItem("token")
    const result = await fetch(urlBasic+"/codigo/cambio/pass", {
        method: 'PUT',
        body: JSON.stringify(usuario),
        headers: {
            "Content-type": "application/json",
            'Access-Control-Allow-Headers': 'Authorization',
            'Cache-Control': 'no-store',
            "Authorization": "Bearer " + token
        },
        cache: 'no-store',

    })
    return result
}


function cambioPassword() {
    mostrarSpinner()

    if (validarContrasenas()) {
        let password1 = document.getElementById("password1").value;
        let password2 = document.getElementById("password2").value;
        let mensaje = localStorage.getItem("token")
        var token = mensaje.substring(0, 100);
        const usuario = {
            token,
            pass: password1
        }

        updatePassword(usuario)
            .then(res => res.json())
            .then(data => {
                if (data == true) {
                    localStorage.clear()
                    swal({
                        title: "Completado!",
                        text: "Se cambio la contraseña",
                        icon: "success",
                        button: "Ok!",
                    });
                    document.getElementById("formulario").innerHTML=`
                    <h3 class="text-center p-5 mt-3">Su contrase se cambio con exito</h3>`
                } else {
                    localStorage.clear()
                    ocultarSpinner()
                    swal("Error!", "Su token ya vencio!", "error")

                }
            })
            .catch(err => {
                console.log(err)
                ocultarSpinner()

            })
            .finally(final=>{
                ocultarSpinner()
            })




    } else {
        ocultarSpinner()
        console.log("incorrecta")

    }

}

function validarContrasenas() {
    var password1 = document.getElementById("password1").value;
    var password2 = document.getElementById("password2").value;
    var mensajeError = document.getElementById("mensajeError");

    if (password1 !== "" && password2 !== "") {
        if (password1 === password2) {
            mensajeError.textContent = "";
            return true;
        } else {
            mensajeError.textContent = "Las contraseñas no coinciden";
            return false;
        }
    } else {
        mensajeError.textContent = "Por favor, ingresa ambas contraseñas";
        return false;
    }
}

