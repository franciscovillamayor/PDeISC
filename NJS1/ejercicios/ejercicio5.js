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
    <title>PROYECTO 1 - Generación de Archivos</title>
    <!-- inclusion de librerias externas para el diseño responsivo y estilos base -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
      /* definicion de variables de color segun las capturas para una integracion total */
      :root { 
          --bg-color: #f8fafc; 
          --nav-bg: #ffffff;
          --card-bg: #ffffff; 
          --text-color: #1e293b; 
          --text-muted: #64748b;
          --accent-color: #a855f7;
          --border-color: #e2e8f0;
      } 
      
      /* reconfiguracion de variables para el modo oscuro profundo */
      [data-bs-theme="dark"] { 
          --bg-color: #0f172a; 
          --nav-bg: #1e293b;
          --card-bg: #1e293b; 
          --text-color: #f8fafc; 
          --text-muted: #94a3b8;
          --accent-color: #c084fc;
          --border-color: #334155;
      } 
      
      /* transiciones suaves para evitar parpadeos al cambiar de tema */
      * { 
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important; 
      }

      body {
        min-height: 100vh;
        background-color: var(--bg-color);
        color: var(--text-color);
        margin: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }

      /* barra de navegacion superior full-width */
      .navbar {
        background-color: var(--nav-bg);
        border-bottom: 1px solid var(--border-color);
        padding: 0.75rem 2rem;
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
      }
      
      /* diseño del boton de tema circular y minimalista segun captura */
      .btn-theme-toggle {
        width: 36px;
        height: 36px;
        background: transparent;
        border: 1px solid var(--border-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 0;
        color: var(--text-color);
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      }

      .btn-theme-toggle:hover {
        border-color: var(--accent-color);
        background-color: rgba(168, 85, 247, 0.1);
      }

      /* contenedor principal que aprovecha todo el ancho */
      .main-content {
        padding: 4rem 2rem;
        max-width: 1400px;
        margin: 0 auto;
        text-align: center;
      }

      .page-title {
        font-weight: 800;
        font-size: 3rem;
        margin-bottom: 0.5rem;
      }

      .page-subtitle {
        color: var(--text-muted);
        font-size: 1.1rem;
        margin-bottom: 4rem;
      }

      /* diseño de tarjetas anchas y modernas */
      .card {
        background-color: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 24px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        overflow: hidden;
        text-align: left;
      }

      .table {
        color: var(--text-color);
        margin-bottom: 0;
      }

      .table thead th {
        border-bottom: 1px solid var(--border-color);
        color: var(--text-muted);
        font-weight: 600;
        padding: 1.5rem;
      }

      .table tbody td {
        border-bottom: 1px solid var(--border-color);
        padding: 1.5rem;
      }
    </style>
  </head>
  <body>

    <!-- barra de navegacion superior -->
    <nav class="navbar">
      <div class="navbar-brand">PROYECTO 1</div>
      <button id="boton-tema" class="btn-theme-toggle" title="cambiar tema"> 
          <span id="icono-tema">🌙</span> 
      </button>
    </nav>

    <!-- contenido principal full-width -->
    <div class="main-content">
      <h1 class="page-title">Generación de Archivos</h1>
      <p class="page-subtitle">Ingresa tus números y crea reportes profesionales.</p>

      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-12">
            <div class="card">
              <div class="card-body p-0">
                <div class="table-responsive">
                  <!-- presentacion de datos mediante tabla profesional -->
                  <table class="table table-hover align-middle">
                    <thead>
                      <tr>
                        <th>Operación Matemática</th>
                        <th class="text-center">Resultado Obtenido</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="ps-4">suma (5 + 3)</td>
                        <td class="text-center fw-bold text-primary">${suma(5, 3)}</td>
                      </tr>
                      <tr>
                        <td class="ps-4">resta (8 - 6)</td>
                        <td class="text-center fw-bold text-danger">${resta(8, 6)}</td>
                      </tr>
                      <tr>
                        <td class="ps-4">multiplicación (3 * 11)</td>
                        <td class="text-center fw-bold text-success">${multiplicacion(3, 11)}</td>
                      </tr>
                      <tr>
                        <td class="ps-4">división (30 / 5)</td>
                        <td class="text-center fw-bold text-info">${division(30, 5)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- scripts para la gestion de interactividad y persistencia del tema -->
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