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
    <title>Ejercicio 5 - Resultados de Cálculos</title>
    <!-- inclusion de librerias externas para el diseño responsivo y estilos base -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
      /* definicion de variables de color extraidas directamente de las capturas para integracion total */
      :root { 
          --bg-color: #f8fafc; 
          --nav-bg: #ffffff;
          --card-bg: #ffffff; 
          --text-color: #1e293b; 
          --text-muted: #64748b;
          --accent-color: #a855f7; 
          --border-color: #e2e8f0;
      } 
      
      /* reconfiguracion de variables para el modo oscuro profundo de las capturas sin dejar espacios claros */
      [data-bs-theme="dark"] { 
          --bg-color: #0b0f1a; 
          --nav-bg: #111827;
          --card-bg: #1e293b; 
          --text-color: #f8fafc; 
          --text-muted: #94a3b8;
          --accent-color: #c084fc;
          --border-color: #334155;
      } 
      
      /* transiciones suaves para el cambio de tema entre claro y oscuro */
      * { 
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important; 
      }

      body {
        min-height: 100vh;
        background-color: var(--bg-color);
        color: var(--text-color);
        margin: 0;
        padding: 0;
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        overflow-x: hidden;
      }

      /* barra de navegacion superior que ocupa todo el ancho de la pantalla */
      .navbar {
        background-color: var(--nav-bg);
        border-bottom: 1px solid var(--border-color);
        padding: 1rem 2rem;
        display: flex;
        justify-content: flex-end; /* alinea el boton a la derecha sin titulo */
        align-items: center;
        width: 100vw;
        position: sticky;
        top: 0;
        z-index: 1000;
      }
      
      /* diseño del boton de tema exactamente como en la captura: circular y minimalista */
      .btn-theme-toggle {
        width: 34px;
        height: 34px;
        background: transparent;
        border: 1px solid var(--border-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 0;
        color: var(--text-color);
        transition: all 0.2s ease;
      }

      .btn-theme-toggle:hover {
        border-color: var(--accent-color);
        transform: scale(1.05);
      }

      /* contenedor principal que aprovecha el 100% del ancho sin restricciones */
      .main-content {
        padding: 4rem 2rem;
        width: 100%;
        margin: 0;
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
        font-size: 1.2rem;
        margin-bottom: 4rem;
      }

      /* diseño de tarjetas anchas que ocupan la grilla completa */
      .card {
        background-color: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 24px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        padding: 2.5rem;
        height: 100%;
        text-align: left;
      }

      .card-header-custom {
        display: flex;
        align-items: center;
        margin-bottom: 1.5rem;
      }

      /* badge numerado violeta segun la estetica de la captura */
      .badge-number {
        width: 30px;
        height: 30px;
        background-color: var(--accent-color);
        color: white;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        margin-right: 1rem;
        font-size: 0.85rem;
      }

      .card-title {
        font-size: 1.4rem;
        font-weight: 700;
        margin: 0;
      }

      .card-subtitle-custom {
        color: var(--text-muted);
        font-size: 0.9rem;
        margin-bottom: 2rem;
      }

      /* tabla profesional adaptada al esquema de colores del sistema */
      .table {
        color: var(--text-color);
        width: 100%;
      }

      .table thead th {
        border: none;
        color: var(--text-color);
        font-weight: 700;
        padding: 1rem 0;
        font-size: 1rem;
      }

      .table tbody td {
        border-top: 1px solid var(--border-color);
        padding: 1.5rem 0;
        color: var(--text-muted);
      }

      .result-value {
        font-weight: 700;
        text-align: center;
      }
    </style>
  </head>
  <body>

    <!-- barra de navegacion superior full-width solo con el boton -->
    <nav class="navbar">
      <button id="boton-tema" class="btn-theme-toggle"> 
          <span id="icono-tema">🌙</span> 
      </button>
    </nav>

    <!-- contenido principal que aprovecha todo el ancho disponible -->
    <div class="main-content">
      <h1 class="page-title">Ejercicio 5</h1>
      <p class="page-subtitle">Visualización de resultados de operaciones matemáticas básicas.</p>

      <div class="container-fluid">
        <div class="row justify-content-center">
          <!-- tarjeta de resultados centrada y ancha -->
          <div class="col-12">
            <div class="card">
              <div class="card-header-custom">
                <div class="badge-number">📊</div>
                <h2 class="card-title">Resultados de Cálculos</h2>
              </div>
              <p class="card-subtitle-custom text-uppercase fw-bold small">valores procesados desde el módulo de cálculos</p>
              
              <div class="table-responsive">
                <table class="table align-middle">
                  <thead>
                    <tr>
                      <th class="ps-4">Operación Matemática</th>
                      <th class="text-center">Resultado Final</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="ps-4">suma (5 + 3)</td>
                      <td class="result-value text-primary">${suma(5, 3)}</td>
                    </tr>
                    <tr>
                      <td class="ps-4">resta (8 - 6)</td>
                      <td class="result-value text-danger">${resta(8, 6)}</td>
                    </tr>
                    <tr>
                      <td class="ps-4">multiplicación (3 * 11)</td>
                      <td class="result-value text-success">${multiplicacion(3, 11)}</td>
                    </tr>
                    <tr>
                      <td class="ps-4">división (30 / 5)</td>
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