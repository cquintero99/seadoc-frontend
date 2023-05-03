//http://localhost:8080
//https://teacher-test-backend-production.up.railway.app
//teacher-test-backend-production.up.railway.app
const urlBasic = "https://teacher-test-backend-production-e58a.up.railway.app";
//"https://teacher-test-backend-production-e58a.up.railway.app"
const login = document.getElementById("login");

function mostrarSpinner() {
  document.getElementById("spinner-container").style.display = "flex";
  document.getElementById("sppiner").innerHTML=`<div id="spinner-container" class="d-flex justify-content-center align-items-center ">
    <div class="spinner-border text-danger" role="status">
      <span class="sr-only">Cargando...</span>
    </div>
  </div>`
}

function ocultarSpinner() {
  document.getElementById("spinner-container").style.display = "none";
  document.getElementById("sppiner").innerHTML=`<div id="spinner-container" class="d-flex justify-content-center align-items-center d-none">
    <div class="spinner-border text-danger" role="status">
      <span class="sr-only">Cargando...</span>
    </div>
  </div>`
}
//ENTRAR LOGIN
login.addEventListener("click", () => {
  mostrarSpinner()
  try {
    //Obtengo los datos
    let codigo = document.getElementById("inputCodigo").value;
    let documento = document.getElementById("inputDocumento").value;
    let password = document.getElementById("inputPassword").value;

    const data = {
      codigo,
      documento,
      password,
    };



    verificoIngresoDatos(codigo, documento, password);

  } catch (error) {
    console.log(error)
    ocultarSpinner()
  }
});

function verificoIngresoDatos(codigo, documento, password) {

  if (Number(codigo.length) == 0 || Number(documento.length) == 0 || password == "") {
    body = `<div class="alert alert-danger" role="alert">
            la informacion esta incompleta
          </div>`;
    document.getElementById("alert").innerHTML = body;
    ocultarSpinner()
    setTimeout(() => {
      document.getElementById("alert").innerHTML = "";
    }, 5000);

  } else {
    verificoCodigoDocumento(codigo, documento)
  }
}

async function verificoCodigoDocumento(codigo, documento) {

  const data = {
    codigo,
    documento
  }
  await fetch(urlBasic + "/usuario/security/user", {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json ',
      'Access-Control-Allow-Headers': 'Authorization',
      'Cache-Control': 'no-store'
    },
    cache: 'no-store'
  })
    .then(res => res.json())
    .then(data => {
      if (data === true) {
         inciarSesion()

      } else {
        body = `<div class="alert alert-danger" role="alert">
        El codigo o documento incorrecto
      </div>`;
        document.getElementById("alert").innerHTML = body;
        ocultarSpinner()
        setTimeout(() => {
          document.getElementById("alert").innerHTML = "";
        }, 5000);
      }

    })
    .catch(err => {
      ocultarSpinner()
      console.log(err)
    })

}


async function inciarSesion() {
  mostrarSpinner()
  let codigo = document.getElementById("inputCodigo").value;
  let password = document.getElementById("inputPassword").value;



  const data = {
    usernameOrEmail: codigo,
    password: password
  }


  await fetch(urlBasic + '/user/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json ',
      'Access-Control-Allow-Headers': 'Authorization',
      'Cache-Control': 'no-store'
    },
    cache: 'no-store'
  })
    .then(response => response)
    .then(JWT => {
      if (JWT.status === 200 && JWT.headers.has('Authorization')) {
        const bearerToken = JWT.headers.get('Authorization');
        const token = bearerToken.replace('Bearer ', '');

        sessionStorage.setItem("id", "100")



        localStorage.setItem('token', token);
        localStorage.setItem("data", JSON.stringify(parseJwt(token)))

        cargarModuloRol()

      }else{
        ocultarSpinner()
        body = `<div class="alert alert-danger" role="alert">
         Contraseña  incorrecta
      </div>`;
        document.getElementById("alert").innerHTML = body;

        setTimeout(() => {
          document.getElementById("alert").innerHTML = "";
        }, 5000);
      }






    })
    .catch(err => {
      ocultarSpinner()
      console.log(err)

    })

}
function cargarModuloRol(){

  const roles=JSON.parse(localStorage.getItem("data")).roles
  const admin=false
  for (let i = 0; i < roles.length; i++) {
    if(roles[i].nombre=="ROLE_ADMIN"){
      window.location.href = "./administrador/index.html";
      admin=true

    }else if(roles[i].nombre=="ROLE_TEACHER" && admin===false){
        window.location.href = "./docente/index.html";
      }



  }



}





function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

