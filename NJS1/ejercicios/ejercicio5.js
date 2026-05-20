// importacion de dependencias externas y modulos locales de calculo
import http from 'http';
import { suma, resta, multiplicacion, division } from './calculos.js';

// inicializacion del servidor http para procesar las solicitudes entrantes
const server = http.createServer((req, res) => {

  // definicion de la estructura html5 y configuracion de la interfaz de usuario
  const html = `
  <!DOCTYPE html>
  <html lang="es" data-bs-theme="light">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PROYECTO 1</title>
    <!-- inclusion de librerias externas para el diseño responsivo y estilos base -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
      /* definicion de variables de color extraidas directamente de las capturas */
      :root { 
          --bg-color: #f8fafc; 
          --nav-bg: #ffffff;
          --card-bg: #ffffff; 
          --text-color: #1e293b; 
          --text-muted: #64748b;
          --accent-color: #a855f7; /* violeta de las capturas */
          --border-color: #f1f5f9;
      } 
      
      /* reconfiguracion de variables para el modo oscuro profundo de las capturas */
      [data-bs-theme="dark"] { 
          --bg-color: #0f172a; 
          --nav-bg: #1e293b;
          --card-bg: #1e293b; 
          --text-color: #f8fafc; 
          --text-muted: #94a3b8;
          --accent-color: #c084fc;
          --border-color: #334155;
      } 
      
      /* transiciones suaves para el cambio de tema sin parpadeos */
      * { 
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important; 
      }

      body {
        min-height: 100vh;
        background-color: var(--bg-color);
        color: var(--text-color);
        margin: 0;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      /* barra de navegacion superior exacta a la captura */
      .navbar {
        background-color: var(--nav-bg);
        border-bottom: 1px solid var(--border-color);
        padding: 1rem 3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }

      .navbar-brand {
        font-weight: 700;
        color: var(--accent-color);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-size: 1.2rem;
      }
      
      /* boton de tema circular minimalista segun la imagen */
      .btn-theme-toggle {
        width: 38px;
        height: 38px;
        background: transparent;
        border: 1px solid var(--border-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: var(--text-color);
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      }

      /* contenedor principal full-width con espaciado superior */
      .main-content {
        padding: 5rem 3rem;
        width: 100%;
        max-width: 1600px;
        margin: 0 auto;
        text-align: center;
      }

      .page-title {
        font-weight: 800;
        font-size: 3.5rem;
        margin-bottom: 0.5rem;
        color: var(--text-color);
      }

      .page-subtitle {
        color: var(--text-muted);
        font-size: 1.25rem;
        margin-bottom: 5rem;
      }

      /* diseño de tarjetas con bordes redondeados y badges numerados */
      .card {
        background-color: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 28px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        padding: 2.5rem;
        height: 100%;
        text-align: left;
      }

      .card-header-custom {
        display: flex;
        align-items: center;
        margin-bottom: 2rem;
      }

      /* badge circular numerado violeta */
      .badge-number {
        width: 32px;
        height: 32px;
        background-color: var(--accent-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        margin-right: 1rem;
        font-size: 0.9rem;
      }

      .card-title {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0;
      }

      .card-subtitle-custom {
        color: var(--text-muted);
        font-size: 0.95rem;
        margin-bottom: 2rem;
      }

      /* estilos para la tabla integrada en la tarjeta */
      .table {
        color: var(--text-color);
      }

      .table thead th {
        border: none;
        color: var(--text-color);
        font-weight: 700;
        padding: 1rem 0;
        font-size: 1.1rem;
      }

      .table tbody td {
        border-top: 1px solid var(--border-color);
        padding: 1.2rem 0;
        color: var(--text-muted);
      }

      .result-value {
        font-weight: 700;
        text-align: center;
      }
    </style>
  </head>
  <body>

    <!-- barra de navegacion superior -->
    <nav class="navbar">
      <div class="navbar-brand">PROYECTO 1</div>
      <button id="boton-tema" class="btn-theme-toggle"> 
          <span id="icono-tema">🌙</span> 
      </button>
    </nav>

    <!-- contenido principal que aprovecha el ancho de pantalla -->
    <div class="main-content">
      <h1 class="page-title">Generación de Archivos</h1>
      <p class="page-subtitle">Ingresa tus números y crea reportes profesionales.</p>

      <div class="container-fluid px-0">
        <div class="row g-4">
          <!-- tarjeta izquierda: ingresar datos -->
          <div class="col-lg-6">
            <div class="card">
              <div class="card-header-custom">
                <div class="badge-number">1</div>
                <h2 class="card-title">Ingresar Datos</h2>
              </div>
              <p class="card-subtitle-custom">Escribe los números que deseas incluir en tu archivo TXT.</p>
              
              <div class="d-flex gap-2">
                <input type="text" class="form-control p-3 rounded-4 bg-body-tertiary border-0" placeholder="Escribe un número aquí">
                <button class="btn btn-primary px-4 rounded-4 fw-bold" style="background-color: var(--accent-color); border: none;">Añadir</button>
              </div>
            </div>
          </div>

          <!-- tarjeta derecha: numeros en cola / resultados -->
          <div class="col-lg-6">
            <div class="card">
              <div class="card-header-custom">
                <div class="badge-number">2</div>
                <h2 class="card-title">Resultados de Cálculos</h2>
              </div>
              <p class="card-subtitle-custom text-uppercase fw-bold small letter-spacing-1">total procesado: 4/20</p>
              
              <div class="table-responsive">
                <table class="table align-middle">
                  <thead>
                    <tr>
                      <th>Operación</th>
                      <th class="text-center">Resultado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>suma (5 + 3)</td>
                      <td class="result-value text-primary">${suma(5, 3)}</td>
                    </tr>
                    <tr>
                      <td>resta (8 - 6)</td>
                      <td class="result-value text-danger">${resta(8, 6)}</td>
                    </tr>
                    <tr>
                      <td>multiplicación (3 * 11)</td>
                      <td class="result-value text-success">${multiplicacion(3, 11)}</td>
                    </tr>
                    <tr>
                      <td>división (30 / 5)</td>
                      <td class="result-value text-info">${division(30, 5)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- logica de cliente para la gestion de interactividad y persistencia del tema -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
      // mapeo selectivo de elementos para la manipulacion del dom
      const dom = {
        html: document.documentElement,
        botonTema: document.getElementById('boton-tema'),
        iconoTema: document.getElementById('icono-tema')
      };

      // logica para la aplicacion del tema y actualizacion de estados persistentes
      const aplicarTema = (tema) => { 
        dom.html.setAttribute('data-bs-theme', tema); // actualizacion del atributo de bootstrap
        dom.iconoTema.textContent = tema === 'dark' ? '☀️' : '🌙'; // alternancia de iconos
        localStorage.setItem('p1-tema', tema); // almacenamiento de preferencia en memoria local
      }; 
      
      // gestion del evento click para la alternancia de esquemas de colores
      dom.botonTema.addEventListener('click', () => { 
        const actual = dom.html.getAttribute('data-bs-theme'); 
        aplicarTema(actual === 'dark' ? 'light' : 'dark'); // ejecucion del cambio de estado
      });

      // verificacion inicial del tema guardado para mantener la consistencia
      const temaGuardado = localStorage.getItem('p1-tema');
      if (temaGuardado) {
        aplicarTema(temaGuardado);
      }
    </script>
  </body>
  </html>
  `;

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
});

server.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});