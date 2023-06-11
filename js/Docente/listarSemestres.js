//======================= Variables =======================
let idSemestre = null;
let idUsuario = null;

//CONEXION CON EL BACK

//======================Peticiones============================================

// Listar semestres
async function listaSemestres() {
  let token = localStorage.getItem("token");

  const result = await fetch(urlBasic + "/semestre", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-type": "Application/json",
    },
  });
  return result;
}

// Guardar usuario semestre
async function saveUserSemestre(userSemestre) {
  let token = localStorage.getItem("token");

  const result = await fetch(urlBasic + "/semestre", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-type": "application/json",
    },
    body: JSON.stringify(userSemestre),
  });

  if (result.ok) {
    const responseData = await result.json();
    return responseData;
  } else {
    throw new Error(`Error al guardar el usuario semestre: ${result.status}`);
  }
}

//======================Funciones Principales=================================

// Listar semestres en la tabla
verSemestres();

// Funcion para ver los semestres dentro del sistema
function verSemestres() {
  mostrarSpinner();
  listaSemestres()
    .then((response) => response.json())
    .then((data) => {
      mostrarData(data.sort(compararFechasInicioDescendente));
    })
    .finally((yes) => {
      //loadingElement.style.display = 'none';
      ocultarSpinner();
    })
    .catch((err) => {
      console.log(err);
    });
}

$(document).ready(function () {
  $("#historialSemestreDocente").DataTable({
    language: {
      decimal: "",
      emptyTable: "No hay datos disponibles en la tabla",
      info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
      infoEmpty: "Mostrando 0 a 0 de 0 registros",
      infoFiltered: "(filtrado de _MAX_ registros totales)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ registros",
      loadingRecords: "Cargando...",
      processing: "Procesando...",
      search: "Buscar:",
      zeroRecords: "No se encontraron registros coincidentes",
      paginate: {
        first: "Primero",
        last: "Último",
        next: "Siguiente",
        previous: "Anterior",
      },
      aria: {
        sortAscending: ": activar para ordenar de manera ascendente",
        sortDescending: ": activar para ordenar de manera descendente",
      },
    },
  });
});

// Funcion para cargar la informacion de los semestres
async function mostrarData(data) {
  var counter = 1;
  var t = $("#historialSemestreDocente").DataTable();
  t.clear().draw();

  data.forEach((semestre) => {
    // Si un semestre no es publico no lo muestra
    if (semestre.visibilidad != "PUBLICO") {
      return;
    } else {
      // Si el semestre es de estado actual y  no ha sido inscrito por el usuario lo muestra arriba
      if (semestre.estado == "ACTUAL") {
        document.getElementById("semestreActual").innerHTML = semestre.nombre + `
        <button onclick="inscribirSemestre(${semestre.id})" data-bs-toggle="modal" data-bs-target="#staticBackdrop3"
          class="input-group-text btn btn-outline-danger" type="button">
              <i class="fa fa-user-plus" aria-hidden="true"></i>
        </button>`;
        return
      } else {
        // Si no, indica que no hay semestre actual
        document.getElementById("semestreActual").innerHTML = "No hay semestre actual";
      }

      // Crea la fila con la informacion del semestre
      var row = t.row.add([
        counter,
        semestre.nombre,
        new Date(semestre.fechaInicio).toLocaleDateString(),
        new Date(semestre.fechaFin).toLocaleDateString()
      ]);

      // Si es un semestre actual inscrito por el usuario lo marca de color rojo
      if (semestre.estado == "ACTUAL") {
        row.nodes().to$().addClass('bg-danger p-2 text-dark bg-opacity-25');
      }

      row.draw(false);

      counter++;
    }
  });
}

function inscribirSemestre(idSemestre) {
  let idUsuario = localStorage.getItem("data").id;

  let fechaRegistro = new Date().toLocaleDateString();

  let data = {
    fecha_registro: fechaRegistro,
    semestre_id: idSemestre,
    usuario_id: idUsuario,
  };

  try {
    saveUserSemestre(data);
  } catch (error) {
    alert(error.message);
  }
}

//======================Funciones Secundarias=================================

function compararFechasInicioDescendente(a, b) {
  return new Date(b.fechaInicio) - new Date(a.fechaInicio);
}

function mostrarSpinner() {
  document.getElementById(
    "sppiner"
  ).innerHTML = `<div id="spinner-container" class="d-flex justify-content-center align-items-center ">
      <div class="spinner-border text-danger" role="status">
        <span class="sr-only">Cargando...</span>
      </div>
    </div>`;
}

function ocultarSpinner() {
  document.getElementById(
    "sppiner"
  ).innerHTML = `<div id="spinner-container" class="d-flex justify-content-center align-items-center d-none">
      <div class="spinner-border text-danger" role="status">
        <span class="sr-only">Cargando...</span>
      </div>
    </div>`;
}
