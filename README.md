# Laboratorio: Simulación de phishing — Portal de becas

Proyecto educativo para demostrar ingeniería social y credential harvesting sin almacenar ni transmitir contraseñas.

## Ejecutar

1. Descomprime el proyecto.
2. Abre `index.html` en Chrome/Edge/Firefox.
3. Introduce únicamente datos de prueba.
4. Pulsa "Continuar".
5. Abre F12 → Console para mostrar el registro seguro de prueba.
6. F12 → Network puede utilizarse para explicar que esta versión no realiza una petición a un servidor externo.

## Qué se demuestra

- Apariencia de un portal legítimo.
- Uso de urgencia/beneficio como elemento de ingeniería social.
- Solicitud de usuario, correo y contraseña.
- Qué información podría intentar obtener un atacante.
- Diferencia entre interfaz y procesamiento en servidor.
- Importancia de revisar dominio, HTTPS y legitimidad del sitio.

## Qué NO hace

- No envía información por Internet.
- No guarda contraseñas.
- No utiliza una base de datos.
- No envía correos.
- No contiene un capturador de credenciales.

Para una exposición, se recomienda usar datos ficticios.
