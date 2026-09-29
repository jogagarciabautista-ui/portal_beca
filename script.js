const form = document.getElementById("loginForm");
const result = document.getElementById("result");
const forgot = document.getElementById("forgot");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const password = document.getElementById("password").value;

  if (!usuario || !correo || !password) {
    result.className = "result success";
    result.innerHTML = "<strong>Completa los campos</strong>Para continuar con la simulación, introduce datos de prueba.";
    return;
  }

  // DEMOSTRACIÓN SEGURA:
  // Solo conservamos usuario/correo en memoria para mostrar el concepto.
  // La contraseña se utiliza únicamente para comprobar que el campo no está vacío
  // y se elimina inmediatamente. No se almacena, no se envía y no se imprime.
  const demoRecord = {
    usuario: usuario,
    correo: correo,
    fecha: new Date().toLocaleString("es-MX"),
    password: undefined
  };

  console.info("[SIMULACIÓN] Registro de prueba:", demoRecord);
  console.info("[SIMULACIÓN] Contraseña descartada. No se almacena ni se transmite.");

  document.getElementById("password").value = "";

  result.className = "result success";
  result.innerHTML = `
    <strong>⚠ SIMULACIÓN DE PHISHING</strong>
    Se reprodujo el flujo de una página que solicita credenciales.<br>
    Usuario de prueba: <b>${escapeHtml(usuario)}</b><br>
    Correo de prueba: <b>${escapeHtml(correo)}</b><br>
    Contraseña: <b>descartada inmediatamente</b><br><br>
    <small>En un ataque real, un servidor podría recibir y almacenar los datos. Esta versión no realiza esa operación.</small>
  `;
});

forgot.addEventListener("click", (e) => {
  e.preventDefault();
  alert("En una simulación realista, un enlace así podría llevar a otra pantalla. Para este laboratorio no se solicita ninguna contraseña adicional.");
});

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[char]));
}
