
const urlBasic = "https://teacher-test.herokuapp.com"
//"https://teacher2023.herokuapp.com"
//"https://teacher-test-backend-production-e58a.up.railway.app";
const login = document.getElementById("login");

// Metodos de mostrar y ocultar spinner
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

//ENTRAR LOGIN
login.addEventListener("click", () => {
  mostrarSpinner()
  try {
    //Obtengo los datos
    let codigo = document.getElementById("inputCodigo").value;
    let documento = document.getElementById("inputDocumento").value;
    let password = document.getElementById("inputPassword").value;

    const user = {
      codigo,
      documento,
      password,
    };

    verificoIngresoDatos(user);

  } catch (error) {
    console.log(error)
    ocultarSpinner()
  }
});


function verificoIngresoDatos(codigo, documento, password) {

  if (codigo.charAt(0) == "0" || documento.charAt(0) == "0") {

// Verifico que los datos no esten vacios
function verificoIngresoDatos(user) {
  if (
    Number(user.codigo.length) <= 0 &&
    Number(user.document.length) <= 0 &&
    user.password != ""
  ) {

    body = `<div class="alert alert-danger" role="alert">
        El codigo o documento incorrecto
      </div>`;
    document.getElementById("alert").innerHTML = body;

    setTimeout(() => {
      document.getElementById("alert").innerHTML = "";
    }, 5000);


  } else

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

  } else {
    verificoCodigoDocumento(user);
  }

}

// Verifico que el codigo y el documento sean correctos
async function verificoCodigoDocumento(user) {
  const data = {
    codigo: user.codigo,
    documento: user.documento
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
      console.log(data)
      if (data === true) {

        inciarSesion()

         inciarSesion(user)


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

// Realizar inicio de sesión con los datos del login
async function inciarSesion(user) {
  mostrarSpinner();

  const data = {
    usernameOrEmail: user.codigo,
    password: user.password
  };

  await fetch(urlBasic + "/user/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json ",
      "Access-Control-Allow-Headers": "Authorization",
      "Cache-Control": "no-store",
    },
    cache: "no-store",
  })
    .then((response) => response)
    .then((JWT) => {
      if (JWT.status === 200 && JWT.headers.has("Authorization")) {
        const bearerToken = JWT.headers.get("Authorization");
        const token = bearerToken.replace("Bearer ", "");

        sessionStorage.setItem("id", "100");

        localStorage.setItem("token", token);
        localStorage.setItem("data", JSON.stringify(parseJwt(token)));



        localStorage.setItem('token', token);
        localStorage.setItem("data", JSON.stringify(parseJwt(token)))

        cargarModuloRol()

      } else {
        ocultarSpinner()

        cargarModuloRol();
      } else {
        ocultarSpinner();

        body = `<div class="alert alert-danger" role="alert">
         Contraseña  incorrecta
      </div>`;
        document.getElementById("alert").innerHTML = body;

        setTimeout(() => {
          document.getElementById("alert").innerHTML = "";
        }, 5000);
      }
    })
    .catch((err) => {
      ocultarSpinner();
      console.log(err);
    });
}

function cargarModuloRol() {

  const roles = JSON.parse(localStorage.getItem("data")).roles
  const admin = false
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].nombre == "ROLE_ADMIN") {
      window.location.href = "./administrador/index.html";
      admin = true

    } else if (roles[i].nombre == "ROLE_TEACHER" && admin === false) {
      window.location.href = "./docente/index.html";
    }





// Cargar vista de acuerdo al rol
function cargarModuloRol() {
  const roles = JSON.parse(localStorage.getItem("data")).roles;
  const admin = false;
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].nombre == "ROLE_ADMIN") {
      window.location.href = "./administrador/index.html";
      admin = true;
    } else if (roles[i].nombre == "ROLE_TEACHER" && admin === false) {
      window.location.href = "./docente/index.html";
    }

  }
}

// Decodificar token
function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}