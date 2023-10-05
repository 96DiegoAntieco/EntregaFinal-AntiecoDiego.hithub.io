document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const message = document.getElementById("message");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    //  autenticación.

    // verifica que el usuario y la contraseña en una base de datos o en un objeto predefinido.
    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios"));

    const usuarioEncontrado = usuarios.find((usuarioGuardado) => {
      return (
        usuarioGuardado.usuario === usuario &&
        usuarioGuardado.contrasena === contrasena
      );
    });

    if (usuarioEncontrado) {
      // Autenticación exitosa, Y USO DE PROMESAS
      Swal.fire({
        icon: "success",
        title: "Exelente",
        text: "Haz ingresado correctamente.",
        ////then ()
      }).then(() => {
        localStorage.setItem(
          "usuarioActivo",
          JSON.stringify(usuarioEncontrado)
        );
        window.location.href = "TURNOS.html";
      });

      return;
    }

    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor, uno de los campos es incorrectos",
    });
  });
});
