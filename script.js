const form = document.getElementById("loginForm");
const result = document.getElementById("result");

// ==========================================
// CONFIGURACIÓN DE SUPABASE
// ==========================================

const SUPABASE_URL = "https://eokrwbhdmyjilhnwsmc.supabase.co";

const SUPABASE_KEY = "sb_publishable_U1GSINIZO_dvcPqgUoyjvg_orhyw6cr";

// ==========================================
// ENVÍO DEL FORMULARIO
// ==========================================

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const passwordInput = document.getElementById("password");

    // La contraseña se utiliza únicamente para validar
    // que el campo fue llenado.
    const password = passwordInput.value;

    // Validación básica
    if (usuario === "" || correo === "" || password === "") {
        result.innerHTML = `
            <p style="color:red;">
                Completa todos los campos.
            </p>
        `;
        return;
    }

    // ==========================================
    // IMPORTANTE:
    // La contraseña se elimina inmediatamente.
    // Nunca se manda a Supabase.
    // ==========================================

    passwordInput.value = "";

    console.log("Usuario de prueba:", usuario);
    console.log("Correo de prueba:", correo);
    console.log("Contraseña: descartada");

    // ==========================================
    // ENVIAR SOLO DATOS DE PRUEBA
    // ==========================================

    try {

        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/registros_demo`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${SUPABASE_KEY}`,
                    "Prefer": "return=minimal"
                },

                body: JSON.stringify({
                    usuario: usuario,
                    correo: correo
                })
            }
        );

        if (!response.ok) {

            const errorText = await response.text();

            console.error("Error de Supabase:", errorText);

            result.innerHTML = `
                <p style="color:red;">
                    Error al enviar los datos de prueba.
                </p>
                <small>
                    Revisa la consola del navegador.
                </small>
            `;

            return;
        }

        // ==========================================
        // ÉXITO
        // ==========================================

        result.innerHTML = `
            <div style="
                margin-top:20px;
                padding:20px;
                border-radius:10px;
                background:#f1f1f1;
            ">

                <h3>⚠ SIMULACIÓN DE PHISHING</h3>

                <p>
                    <strong>Usuario de prueba:</strong>
                    ${escapeHtml(usuario)}
                </p>

                <p>
                    <strong>Correo de prueba:</strong>
                    ${escapeHtml(correo)}
                </p>

                <p>
                    <strong>Contraseña:</strong>
                    descartada inmediatamente
                </p>

            </div>
        `;

        console.log("Registro enviado correctamente.");

    } catch (error) {

        console.error("Error de conexión:", error);

        result.innerHTML = `
            <p style="color:red;">
                No se pudo conectar con el servidor.
            </p>

            <small>
                Error: ${escapeHtml(error.message)}
            </small>
        `;
    }
});


// ==========================================
// ESCAPAR HTML
// ==========================================

function escapeHtml(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}
