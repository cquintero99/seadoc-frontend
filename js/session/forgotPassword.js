async function findByEmail(usuario){
    
    const result=await fetch(urlBasic+"/mail/cambio",{
        method:'POST',
        body:JSON.stringify(usuario),
        headers: {
            'Content-type': 'application/json ',
            'Access-Control-Allow-Headers': 'Authorization',
            'Cache-Control': 'no-store'
          },
          cache: 'no-store'
    })
    return result;
}

const sendEmail = document.getElementById("sendEmail")

sendEmail.addEventListener('click', () => {
    mostrarSpinner()
    let inputEmail = document.getElementById("inputEmail").value;


             

    
    const usuario={
        email:inputEmail
    }
    
    if (validateEmail()) {
        findByEmail(usuario)
        .then(response=>response.json())
        .then(data=>{
            if(data==true){
                sendEmail.remove()
                swal({
                    title: "Enviado!",
                    text: "Revisa tu email para continuar con el proceso de restablcer contraseña",
                    icon: "success",
                    button: "Ok!",
                  });

            }else{
                ocultarSpinner()
                swal({
                    title: "Enviado!",
                    text: "Email no registrado",
                    icon: "error",
                    button: "Ok!",
                  });

            }
        })
        .catch(error=>{
            ocultarSpinner()
            console.log(error)
            
        })
        .finally(final=>{
            ocultarSpinner()

        })
       
       

    }else{
        ocultarSpinner()
    }

})

function validateEmail() {
    //obtengo el valor del email
    let emailInput = document.getElementById("inputEmail");

    let email = emailInput.value.trim();

    if (email === "") {
        emailError.textContent = "Ingrese su correo electrónico.";
        return false;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = "Ingrese un correo electrónico válido.";
        return false;
    }

    emailError.textContent = ""; // Borrar el mensaje de error si el correo es válido
    return true;
}