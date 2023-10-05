const formulario = document.getElementById("miFormulario");

// Objeto  servicios de limpieza
const serviciosLimpieza = {
  colchon1plaza: {
    id: 1,
    nombre: "colchon 1 plaza",
    precio: 6000,
    aDomicilio: true,
  },
  colchon2plazas: {
    id: 2,
    nombre: "colchon 2 plazas",
    precio: 8500,
    aDomicilio: true,
  },
  sillon2cuerpos: {
    id: 3,
    nombre: "sillon 2 cuerpos",
    precio: 8000,
    aDomicilio: true,
  },
  sillon3cuerpos: {
    id: 4,
    nombre: "sillon 3 cuerpos",
    precio: 11000,
    aDomicilio: true,
  },
  vehiculo5asientos: {
    id: 5,
    nombre: "Vehiculo 5 asientos",
    precio: 9500,
    aDomicilio: false,
  },
  vehiculo7asientos: {
    id: "6",
    nombre: "Vehiculo 7 asientos",
    precio: 12000,
    aDomicilio: false,
  },
};

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const domicilio = document.getElementById("domicilio").value;
  const telefono = document.getElementById("telefono").value;
  const email = document.getElementById("email").value;
  const servicio = document.getElementById("servicio").value;

  if (!nombre || !domicilio || !telefono || !email) {
    return;
  }

  // Validacion del campo numero de teléfono
  if (!/^\d+$/.test(telefono)) {
    return;
  }
  if (nombre.length < 4) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "El nombre de usuario es muy corto. Indentifiquese con nombre completo.",
    });
    return;
  }
  if (domicilio.length < 15) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor, sea mas especifico al escribir su direccion.",
    });
    return;
  }
  if (telefono.length !== 10) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor, coloque codigo de area, seguido de su numero celular.",
    });
    return;
  }
  if (email.length > 80) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor, verifique su Email.",
    });
    return;
  }

  // un objeto con los datos
  const nuevaReserva = {
    nombre: nombre,
    domicilio: domicilio,
    telefono: telefono,
    email: email,
    servicio: servicio,
    mostrados: false,
  };

  // buscar reservas guardadas
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  usuarioActivo.reservas.push(nuevaReserva);
  localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));

  const usuarios = JSON.parse(localStorage.getItem("usuarios"));
  const usuarioEncontrado = usuarios.find((usuarioGuardado) => {
    return (
      usuarioGuardado.usuario === usuarioActivo.usuario &&
      usuarioGuardado.contrasena === usuarioActivo.contrasena
    );
  });
  usuarioEncontrado.reservas.push(nuevaReserva);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  Swal.fire({
    icon: "success",
    title: "El turno fue agendado correctamente",
    text: "Haz click en MOSTRAR RESERVAS para ver tus solicitudes.",
    ////USO DE PROMESAS - then ()
  }).then(() => {
    // Limpiar el formulario
    formulario.submit();
  });
});

//mostrar los datos del formulario SEGUN el usuario que esta activo

document.addEventListener("DOMContentLoaded", function () {
  const botonMostrarLista = document.getElementById("mostrarLista");
  const listaReservas = document.getElementById("listaReservas");

  botonMostrarLista.addEventListener("click", function () {
    listaReservas.innerHTML = ""; // Limpia la lista antes de mostrar los servicios("string vacio")
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    for (const indice in usuarioActivo.reservas) {
      const listItem = document.createElement("li");
      const reserva = usuarioActivo.reservas[indice];

      listItem.innerHTML = `
        <strong>Nombre:</strong> ${reserva.nombre}<br>
        <strong>Domicilio:</strong> ${reserva.domicilio}<br>
        <strong>Telefono:</strong> ${reserva.telefono}<br>
        <strong>Email:</strong> ${reserva.email}<br>
        <strong>Sercicio:</strong> ${reserva.servicio}<br>
        <strong>------------------------------------</strong><br>
      `;

      listaReservas.appendChild(listItem);
    }
  });
});
