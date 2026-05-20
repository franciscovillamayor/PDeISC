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
    <title>Ejercicio 5</title>
    <!-- inclusion de librerias externas para el diseño responsivo y estilos base -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
      /* definicion de variables de color segun las capturas para integracion total */
      :root { 
          --bg-color: #f8fafc; 
          --nav-bg: #ffffff;
          --card-bg: #ffffff; 
          --text-color: #1e293b; 
          --text-muted: #64748b;
          --accent-color: #a855f7; 
          --border-color: #e2e8f0;
      } 
      
      /* reconfiguracion de variables para el modo oscuro profundo de las capturas */
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
        justify-content: flex-end;
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
      }

      /* contenedor principal que aprovecha el 100% del ancho */
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

      /* diseño de tarjeta ancha para los resultados */
      .card {
        background-color: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 24px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        padding: 2.5rem;
        text-align: left;
      }

      .card-header-custom {
        display: flex;
        align-items: center;
        margin-bottom: 1.5rem;
      }

      .badge-icon {
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
      }

      .card-title {
        font-size: 1.4rem;
        font-weight: 700;
        margin: 0;
      }

      /* tabla profesional adaptada al esquema de colores */
      .table {
        color: var(--text-color);
        width: 100%;
        margin-top: 1rem;
      }

      .table thead th {
        border: none;
        color: var(--text-color);
        font-weight: 700;
        padding: 1rem 0;
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

    <!-- barra de navegacion superior full-width -->
    <nav class="navbar">
      <button id="boton-tema" class="btn-theme-toggle"> 
          <span id="icono-tema">🌙</span> 
      </button>
    </nav>

    <!-- contenido principal que aprovecha todo el ancho disponible -->
    <div class="main-content">
      <h1 class="page-title">Resultados del Ejercicio 5</h1>
      <p class="page-subtitle">Operaciones matemáticas calculadas mediante módulos.</p>

      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-12">
            <div class="card">
              <div class="card-header-custom">
                <div class="badge-icon">📊</div>
                <h2 class="card-title">Cálculos Procesados</h2>
              </div>
              
              <div class="table-responsive">
                <table class="table align-middle">
                  <thead>
                    <tr>
                      <th class="ps-4">Operación</th>
                      <th class="text-center">Resultado</th>
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
      const dom = {
        html: document.documentElement,
        botonTema: document.getElementById('boton-tema'),
        iconoTema: document.getElementById('icono-tema')
      };

      const aplicarTema = (tema) => { 
        dom.html.setAttribute('data-bs-theme', tema);
        dom.iconoTema.textContent = tema === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('p1-tema', tema);
      }; 
      
      dom.botonTema.addEventListener('click', () => { 
        const actual = dom.html.getAttribute('data-bs-theme'); 
        aplicarTema(actual === 'dark' ? 'light' : 'dark');
      });

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