// ============================================
// CONEXIÓN CON SUPABASE
// ============================================

const SUPABASE_URL = "https://eokrwbhdlmyjilhnwsmc.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_U1GSINIZO_dvcPqgUoyjvg_orhyw6cr";



const form = document.getElementById("loginForm");
const result = document.getElementById("result");
const forgot = document.getElementById("forgot");


// ============================================
// CARGAR LIBRERÍA DE SUPABASE
// ============================================

const supabaseReady = new Promise((resolve, reject) => {

  if (window.supabase) {
    resolve(window.supabase);
    return;
  }

  const script = document.createElement("script");

  script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

  script.onload = () => {
    resolve(window.supabase);
  };

  script.onerror = () => {
    reject(new Error("No se pudo cargar la librería de Supabase."));
  };

  document.head.appendChild(script);
});


// ============================================
// ENVÍO DEL FORMULARIO
// ============================================

form.addEventListener("submit", async (event) => {

  event.preventDefault();


  // Obtener únicamente los datos de prueba
  const usuario = document
    .getElementById("usuario")
    .value
    .trim();

  const correo = document
    .getElementById("correo")
    .value
    .trim();


  // Comprobamos solamente que exista una contraseña.
  // NO guardamos su contenido.
  // NO la enviamos a Supabase.
  // NO la imprimimos en consola.

  const passwordField = document.getElementById("password");

  const passwordPresent =
    passwordField.value.length > 0;


  // ============================================
  // VALIDACIÓN
  // ============================================

  if (!usuario || !correo || !passwordPresent) {

    result.className = "result success";

    result.innerHTML = `
      <strong>Completa los campos</strong>
      Para continuar con la simulación,
      introduce datos de prueba.
    `;

    return;
  }


  // ============================================
  // DESCARTAR CONTRASEÑA
  // ============================================

  // La contraseña se elimina ANTES
  // de realizar cualquier petición de red.

  passwordField.value = "";


  result.className = "result success";

  result.innerHTML = `
    <strong>Procesando...</strong>
    Guardando únicamente los datos de prueba.
  `;


  // ============================================
  // ENVIAR A SUPABASE
  // ============================================

  try {

    const supabaseLib = await supabaseReady;


    const client = supabaseLib.createClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY
    );


    // IMPORTANTE:
    // Solo enviamos usuario y correo.
    //
    // La contraseña NO está incluida.

    const { error } = await client
      .from("registros_demo")
      .insert({
        usuario: usuario,
        correo: correo
      });


    // ============================================
    // ERROR DE SUPABASE
    // ============================================

    if (error) {

      console.error("Error de Supabase:", error);

      result.innerHTML = `
        <strong>No se pudo registrar el dato de prueba</strong>
        Revisa la conexión con Supabase.
      `;

      return;
    }


    // ============================================
    // REGISTRO CORRECTO
    // ============================================

    result.innerHTML = `
      <strong>⚠ SIMULACIÓN DE PHISHING</strong>

      Se reprodujo el flujo de una página
      que solicita credenciales.<br><br>

      Usuario de prueba:
      <b>${escapeHtml(usuario)}</b><br>

      Correo de prueba:
      <b>${escapeHtml(correo)}</b><br>

      Contraseña:
      <b>descartada inmediatamente</b>

      <br><br>

      <small>
        Esta demostración únicamente envía
        usuario y correo de prueba a Supabase.
        La contraseña no se almacena ni se transmite.
      </small>
    `;

  } catch (error) {

    console.error("Error de conexión:", error);

    result.innerHTML = `
      <strong>Error de conexión</strong>
      No fue posible conectar con el servicio
      de demostración.
    `;
  }

});


// ============================================
// ENLACE "OLVIDASTE TU CONTRASEÑA"
// ============================================

forgot.addEventListener("click", (e) => {

  e.preventDefault();

  alert(
    "En esta simulación no se solicita ninguna contraseña adicional."
  );

});


// ============================================
// PROTECCIÓN PARA MOSTRAR TEXTO
// ============================================

function escapeHtml(value) {

  return value.replace(/[&<>"']/g, (char) => ({

    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"

  }[char]));

}
