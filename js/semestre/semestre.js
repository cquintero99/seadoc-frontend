//CONEXION CON EL BACK
const urlBasic = "https://teacher-test-backend-production-e58a.up.railway.app";
const tabla = document.getElementById("tabla-datos");
const cuerpoTabla = tabla.getElementsByTagName("tbody")[0];
function mostrarSpinner() {
  document.getElementById("sppiner").innerHTML=`<div id="spinner-container" class="d-flex justify-content-center align-items-center ">
    <div class="spinner-border text-danger" role="status">
      <span class="sr-only">Cargando...</span>
    </div>
  </div>`
}

function ocultarSpinner() {
  document.getElementById("sppiner").innerHTML=`<div id="spinner-container" class="d-flex justify-content-center align-items-center d-none">
    <div class="spinner-border text-danger" role="status">
      <span class="sr-only">Cargando...</span>
    </div>
  </div>`
}
async function verSemestres() {
  mostrarSpinner()
  let token = localStorage.getItem("token");

  await fetch(urlBasic + "/semestre", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-type": "Application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let body = ``;

      for (let i = 0; i < data.length; i++) {
        body += `
          <tr>
          <td>${data[i].id}</td>
          <td>${new Date(data[i].fechaInicio).toLocaleDateString()}</td>
          <td>${new Date(data[i].fechaFin).toLocaleDateString()}</td>
          <td>${data[i].usuarioId}</td>
          <td>${new Date(data[i].fechaRegistro).toLocaleDateString()}</td>
          <td>${data[i].estado}</td>
          </tr>

          `;
        console.log(JSON.stringify(data));
      }
      document.getElementById("tabla_semestres").innerHTML = body;
    })
    .finally((yes) => {
      //loadingElement.style.display = 'none';
      ocultarSpinner()
    })
    .catch((err) => {
      console.log(err);
    });
}

// Obtener los elementos del DOM
verSemestres();
const botonAgregar = document.getElementById("agregar-semestre");
botonAgregar.addEventListener("click", agregarFila);

const modal = document.getElementById("modal");
const botonCerrar = document.getElementById("cerrar");
botonCerrar.addEventListener("click", cerrarModal);

function agregarFila() {
  modal.style.display = "block";
}

function cerrarModal() {
  modal.style.display = "none";
}

/*Boton */

const botonGuardar = document.getElementById("agregar");
botonGuardar.addEventListener("click", agregarSemestre);
botonGuardar.addEventListener("click", cerrarModal);



//NOTA: Completar función porra conectar con el back <------
async function agregarSemestre(evento) {
  evento.preventDefault();
  const formulario = document.getElementById("datos-semestre");
  const datos = new FormData(formulario);

  console.log(datos);

  //Aqui no sé si deba ir el id del semestre
  const fechaInicio = new Date(datos.get("fechaInicio")).toISOString();
  const fechaFin = new Date(datos.get("fechaFin")).toISOString();
  const fechaRegistro = new Date().toISOString();
  const estado = "activo";
  const usuarioID = 1; // Cambiar a un número autogenerado, de momento se deja así

  const semestre = {
    fechaInicio,
    fechaFin,
    fechaRegistro,
    estado,
    usuarioID,
  };
  console.log(semestre);

  try {
    const response = await fetch(urlBasic + "/semestre", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(semestre),
    });

    if (response.ok) {
      alert("Semestre agregado");
    } else {
      alert("Semestre no agregado");

      throw new Error("Error al guardar los datos del semestre");
    }
  } catch (error) {
    console.log(error);
  }
}
