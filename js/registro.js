
const urlBasic ="https://teacher-test-backend-production-69e6.up.railway.app"
// "https://teacher-test.herokuapp.com"
//"https://teacher2023.herokuapp.com"
//"https://teacher-test-backend-production-e58a.up.railway.app"
const r1 = document.getElementById("r1")

r1.addEventListener("click", () => {
    mostrarSpinner()
    let codigo = document.getElementById("inputCodigo").value
    let documento = document.getElementById("inputDocumento").value
    let password = document.getElementById("inputPassword").value

    const usuario = {
        codigo,
        documento,
        password
    }
    if (Number(codigo) > 0 && Number(documento) > 0 && password != "") {

        verificoPreRegistro()
            .then(response => response.json())
            .then(data => {
                if (data === true) {
                    paso2(usuario)
                } else {
                    body = `<div class="alert alert-danger" role="alert">
            Codigo o Documento incorrecto
          </div>`;
                    document.getElementById("alert").innerHTML = body;
                    ocultarSpinner()
                    setTimeout(() => {
                        document.getElementById("alert").innerHTML = "";
                    }, 5000);
                }
            })
            .catch(err => {
                body = `<div class="alert alert-danger" role="alert">
            Contraseña Temporal Incorrecta
          </div>`;
                document.getElementById("alert").innerHTML = body;
                ocultarSpinner()
                setTimeout(() => {
                    document.getElementById("alert").innerHTML = "";
                }, 5000);
            })
            .finally(final => {
                ocultarSpinner()
            })

    } else {
        body = `<div class="alert alert-danger" role="alert">
            la informacion esta incompleta
          </div>`;
        document.getElementById("alert").innerHTML = body;
        ocultarSpinner()
        setTimeout(() => {
            document.getElementById("alert").innerHTML = "";
        }, 5000);

    }


})

async function verificoPreRegistro() {
    let codigo = document.getElementById("inputCodigo").value
    let documento = document.getElementById("inputDocumento").value
    let password = document.getElementById("inputPassword").value
    const usuario = {

        codigo,
        documento,
        password
    }
    const result = await fetch(urlBasic+"/pre/security/codigo", {

        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'Content-type': 'application/json ',
            'Access-Control-Allow-Headers': 'Authorization',
            'Cache-Control': 'no-store'

        },
        cache: 'no-store'
    })
    return result
}

function paso2(usuario) {
    document.getElementById("menuRegistro").innerHTML = `
    <p class="align-self-center">
    Completar registro
</p>
<p class="">
    2° - Ingresa tu nueva contraseña
</p>

<!-- Spinner -->
<div id="sppiner">
    <div id="spinner-container" class="d-flex justify-content-center align-items-center d-none">
        <div class="spinner-border text-danger" role="status">
            <span class="sr-only">Cargando...</span>
        </div>
    </div>
</div>

<!-- Alert -->
<div class="form-floating mb-3" id="alert"></div>

<!-- Form -->
<form action="" class="d-flex flex-column form-floating">
    <div class="form-group">
    <input placeholder="Contraseña" type="password" id="inputPassword1"
    class="form-control mt-2 rounded" required />
    <input placeholder="Repetir Contraseña" type="password" id="inputPassword2"
     class="form-control mt-2 rounded" required />
        

    </div>
    
    <div class="align-items-center text-center mt-4 mb-0">
        <a class="btn btn-danger" href="#" id="r2"  onclick="r2(${usuario.codigo})">Completar</a>
    </div>
</form>
<div class="small mt-2">

</div>`

}

async function r2(codigo) {
    mostrarSpinner()
    let password1 = document.getElementById("inputPassword1").value
    let password2 = document.getElementById("inputPassword2").value
    if (password1 === password2 && password1.length >= 8) {
        const usuario = {
            codigo,
            password: password1
        }
        await fetch(urlBasic + "/usuario/save", {
            method: 'POST',
            body: JSON.stringify(usuario),
            headers: {
                "Content-type": "application/json"
            }

        })
            .then(response => response.json())
            .then(data => {
                paso3()
                
            })
            .catch(err => {
                console.log(err)
            })
            .finally(final => {
                ocultarSpinner()
            })
    } else {
        ocultarSpinner()
        body = `<div class="alert alert-danger" role="alert">
            Las contraseñas no coinciden
          </div>`;
        document.getElementById("alert").innerHTML = body;
        ocultarSpinner()
        setTimeout(() => {
            document.getElementById("alert").innerHTML = "";
        }, 5000);
    }
}

function paso3(){
    document.getElementById("menuRegistro").innerHTML = `
    <p class="align-self-center">
    Completar registro
</p>
<p class="">
    3° - Proceso Completado
</p>
<p class="">
    
</p>

<!-- Spinner -->
<div id="sppiner">
    <div id="spinner-container" class="d-flex justify-content-center align-items-center d-none">
        <div class="spinner-border text-danger" role="status">
            <span class="sr-only">Cargando...</span>
        </div>
    </div>
</div>

<!-- Alert -->
<div class="form-floating mb-3" id="alert">
<div class="alert alert-success" role="alert">
            Felicidades ya estas registrado
          </div></div>

<!-- Form -->
<form action="" class="d-flex flex-column form-floating">
    
    
    <div class="align-items-center text-center mt-4 mb-0">
        <a class="btn btn-danger" href="./index.html"   >Finalizar</a>
    </div>
</form>
<div class="small mt-2">

</div>`

}

function mostrarSpinner() {
    document.getElementById("spinner-container").style.display = "flex";
    document.getElementById("sppiner").innerHTML = `<div id="spinner-container" class="d-flex justify-content-center align-items-center ">
      <div class="spinner-border text-danger" role="status">
        <span class="sr-only">Cargando...</span>
      </div>
    </div>`
}

function ocultarSpinner() {
    document.getElementById("spinner-container").style.display = "none";
    document.getElementById("sppiner").innerHTML = `<div id="spinner-container" class="d-flex justify-content-center align-items-center d-none">
      <div class="spinner-border text-danger" role="status">
        <span class="sr-only">Cargando...</span>
      </div>
    </div>`
}