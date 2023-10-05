document.addEventListener("DOMContentLoaded", function () {
  const registroForm = document.getElementById("registro-form");
  const message = document.getElementById("message");

  registroForm.addEventListener("submit", function (e) {
    e.preventDefault();

    //  autenticación.
    // verifica que el usuario y la contraseña en una base de datos o en un objeto predefinido.
    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    //nombre usuario
    const nuevoUsuario = {
      usuario: usuario,
      contrasena: contrasena,
      reservas: [],
    };
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    if (!usuarios) {
      usuarios = [];
    }
    usuarios.push(nuevoUsuario);
    // guardar datos en LocalStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioActivo", JSON.stringify(nuevoUsuario));
    window.location.href = "TURNOS.html";
  });
});
