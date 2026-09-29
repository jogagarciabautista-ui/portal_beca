const SUPABASE_URL = "https://eokrwbhdmyjilhnwsmc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_U1GSINIZO_dvcPqgUoyjvg_orhyw6cr";

const form = document.getElementById("loginForm");
const result = document.getElementById("result");
const forgot = document.getElementById("forgot");

// Cargar la librería de Supabase
const supabaseReady = new Promise((resolve, reject) => {
  const script = document.createElement("script");

  script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

  script.onload = () => resolve(window.supabase);
  script.onerror = () => reject(new Error("No se pudo cargar Supabase."));

  document.head.appendChild(script);
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const correo = document.getElementById("correo").value.trim();

  const passwordField = document.getElementById("password");

  // Solo comprobamos que exista una contraseña.
  // NO se guarda ni se envía.
  const passwordPresent = passwordField.value.length > 0;

  if (!usuario || !correo || !passwordPresent) {
    result.className = "result success";
    result.innerHTML =
      "<strong>Completa los campos</strong>Para continuar con la simulación, introduce datos de prueba.";
    return;
  }

  // Borramos la contraseña ANTES de cualquier petición.
  passwordField.value = "";

  result.className = "result success";
  result.innerHTML =
    "<strong>Procesando...</strong>Guardando únicamente los datos de prueba.";

  try {
    const supabaseLib = await supabaseReady;

    const client = supabaseLib.createClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY
    );

    // SOLO se mandan usuario y correo.
    const { error } = await client
      .from("registros_demo")
      .insert({
        usuario: usuario,
        correo: correo
      });

    if (error) {
      console.error("Error de Supabase:", error);

      result.innerHTML = `
        <strong>No se pudo registrar el dato de prueba</strong>
        Revisa la conexión con Supabase.
      `;

      return;
    }

    result.innerHTML = `
      <strong>⚠ SIMULACIÓN DE PHISHING</strong>
      Se reprodujo el flujo de una página que solicita credenciales.<br>
      Usuario de prueba: <b>${escapeHtml(usuario)}</b><br>
      Correo de prueba: <b>${escapeHtml(correo)}</b><br>
      Contraseña: <b>descartada inmediatamente</b><br><br>
      <small>
        Esta demostración solo envía usuario y correo de prueba.
        La contraseña no se almacena ni se transmite.
      </small>
    `;

  } catch (error) {
    console.error("Error de conexión:", error);

    result.innerHTML = `
      <strong>Error de conexión</strong>
      No fue posible conectar con el servicio de demostración.
    `;
  }
});

forgot.addEventListener("click", (e) => {
  e.preventDefault();

  alert(
    "En esta simulación no se solicita ninguna contraseña adicional."
  );
});

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}
