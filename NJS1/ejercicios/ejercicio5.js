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
    <title>Resultados de Cálculos</title>
    <!-- inclusion de librerias externas para el diseño responsivo y estilos base -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
      /* definicion de variables de color para una transicion total entre temas */
      :root { 
          --bg-color: #f8fafc; 
          --card-bg: #ffffff; 
          --text-color: #1e293b; 
          --border-color: #e2e8f0;
          --header-gradient: linear-gradient(135deg, #3b82f6 0%, #2dd4bf 100%);
      } 
      
      /* reconfiguracion de todas las variables para el modo oscuro sin dejar partes blancas */
      [data-bs-theme="dark"] { 
          --bg-color: #0f172a; 
          --card-bg: #1e293b; 
          --text-color: #f1f5f9; 
          --border-color: #334155;
          --header-gradient: linear-gradient(135deg, #1e40af 0%, #0d9488 100%);
      } 
      
      /* configuracion de transiciones globales para suavizar el cambio de colores */
      * { 
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.2s ease !important; 
      }

      body {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--bg-color);
        color: var(--text-color);
        margin: 0;
      }
      
      /* diseño de la tarjeta contenedora con adaptacion automatica de colores */
      .card {
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        border: 1px solid var(--border-color);
        border-radius: 24px;
        overflow: hidden;
        background-color: var(--card-bg);
      }
      
      /* seccion de cabecera con gradiente adaptativo */
      .header-section {
        background: var(--header-gradient);
        color: white;
        padding: 3rem 2rem;
        text-align: center;
      }
      
      /* sistema de control flotante para el cambio de tema */
      .theme-toggle {
        position: fixed;
        top: 30px;
        right: 30px;
        z-index: 1000;
      }

      /* diseño del boton segun especificacion: circular, borde fino y pequeño */
      .btn-theme-toggle {
        width: 42px;
        height: 42px;
        background: transparent;
        border: 1px solid var(--border-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 0;
        color: var(--text-color);
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      }

      .btn-theme-toggle:hover {
        border-color: #3b82f6;
        transform: scale(1.05);
      }

      /* ajuste de la tabla para que sea totalmente oscura en su modo correspondiente */
      .table {
        color: var(--text-color);
        border-color: var(--border-color);
      }
      
      .table thead th {
        border-bottom: 2px solid var(--border-color);
        color: var(--text-color);
        opacity: 0.7;
        text-transform: uppercase;
        font-size: 0.8rem;
        letter-spacing: 0.05em;
      }
    </style>
  </head>
  <body>

    <!-- boton de control de tema minimalista circular -->
    <div class="theme-toggle">
      <button id="boton-tema" class="btn-theme-toggle" title="cambiar tema"> 
          <span id="icono-tema" style="font-size: 1.2rem;">🌙</span> 
      </button>
    </div>

    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card">
            <!-- encabezado principal con tipografia refinada -->
            <div class="header-section">
              <h1 class="h3 fw-bold mb-1">Resultados del Ejercicio 5</h1>
              <p class="small opacity-80 mb-0">operaciones matemáticas básicas</p>
            </div>
            
            <div class="card-body p-4 p-md-5">
              <div class="table-responsive">
                <!-- tabla de resultados con integracion total de colores -->
                <table class="table table-hover align-middle mb-0">
                  <thead>
                    <tr>
                      <th class="ps-3 py-3">Operación</th>
                      <th class="text-center py-3">Resultado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="ps-3 py-3">suma (5 + 3)</td>
                      <td class="text-center fw-bold text-primary">${suma(5, 3)}</td>
                    </tr>
                    <tr>
                      <td class="ps-3 py-3">resta (8 - 6)</td>
                      <td class="text-center fw-bold text-danger">${resta(8, 6)}</td>
                    </tr>
                    <tr>
                      <td class="ps-3 py-3">multiplicación (3 * 11)</td>
                      <td class="text-center fw-bold text-success">${multiplicacion(3, 11)}</td>
                    </tr>
                    <tr>
                      <td class="ps-3 py-3">división (30 / 5)</td>
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