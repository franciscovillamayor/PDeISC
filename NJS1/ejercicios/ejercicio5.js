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
      /* definicion de variables de color para la gestion de temas con tonalidades mas suaves */
      :root { 
          --bg-light: #f1f5f9; 
          --card-bg: #ffffff; 
          --text-main: #334155 !important; 
          --accent-color: #3b82f6;
      } 
      
      /* reconfiguracion de variables para el esquema de colores oscuro con tonos slate */
      [data-bs-theme="dark"] { 
          --bg-light: #0f172a; 
          --card-bg: #1e293b; 
          --text-main: #f1f5f9 !important; 
          --accent-color: #60a5fa;
      } 
      
      /* configuracion de transiciones globales para optimizar la experiencia visual */
      * { 
          transition: background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease !important; 
      }

      body {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--bg-light);
        color: var(--text-main);
      }
      
      /* configuracion de estilos personalizados para los contenedores principales */
      .card {
        box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        border: 1px solid rgba(0,0,0,0.05);
        border-radius: 20px;
        overflow: hidden;
        background-color: var(--card-bg);
      }
      
      /* diseño de la identidad visual mediante degradados mas suaves y modernos */
      .header-section {
        background: linear-gradient(135deg, #3b82f6 0%, #2dd4bf 100%);
        color: white;
        padding: 2.5rem;
        text-align: center;
      }
      
      /* configuracion del sistema de posicionamiento para el control de temas */
      .theme-toggle {
        position: fixed;
        top: 25px;
        right: 25px;
        z-index: 1000;
      }

      /* diseño del boton de tema: mas pequeño, perfectamente circular y minimalista */
      .btn-theme-toggle {
        width: 38px;
        height: 38px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 1px solid var(--accent-color);
        background-color: var(--card-bg);
        color: var(--accent-color);
        font-size: 1.1rem;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      }

      .btn-theme-toggle:hover {
        transform: scale(1.1);
        background-color: var(--accent-color);
        color: white;
      }
    </style>
  </head>
  <body>

    <!-- interfaz de control para la alternancia entre esquemas de colores -->
    <div class="theme-toggle">
      <button id="boton-tema" class="btn-theme-toggle" title="cambiar tema"> 
          <span id="icono-tema">🌙</span> 
      </button>
    </div>

    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <!-- seccion de encabezado que define el proposito del ejercicio -->
            <div class="header-section">
              <h1 class="display-6 fw-bold mb-0">Resultados del Ejercicio 5</h1>
              <p class="opacity-75 mb-0">operaciones matemáticas básicas</p>
            </div>
            
            <div class="card-body p-4 p-lg-5">
              <div class="table-responsive">
                <!-- presentacion sistematica de datos mediante una tabla interactiva -->
                <table class="table table-hover align-middle mb-0">
                  <thead>
                    <tr class="text-uppercase small fw-bold text-muted">
                      <th class="ps-4 py-3">Operación</th>
                      <th class="text-center py-3">Resultado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="border-top: 1px solid rgba(0,0,0,0.05);">
                      <td class="ps-4 py-3 text-muted">suma (5 + 3)</td>
                      <td class="text-center fw-bold text-primary">${suma(5, 3)}</td>
                    </tr>
                    <tr>
                      <td class="ps-4 py-3 text-muted">resta (8 - 6)</td>
                      <td class="text-center fw-bold text-danger">${resta(8, 6)}</td>
                    </tr>
                    <tr>
                      <td class="ps-4 py-3 text-muted">multiplicación (3 * 11)</td>
                      <td class="text-center fw-bold text-success">${multiplicacion(3, 11)}</td>
                    </tr>
                    <tr>
                      <td class="ps-4 py-3 text-muted">división (30 / 5)</td>
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

    <!-- logica de cliente para la gestion de interactividad y persistencia de temas -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
      // mapeo de elementos del dom para la manipulacion dinamica
      const dom = {
        html: document.documentElement,
        botonTema: document.getElementById('boton-tema'),
        iconoTema: document.getElementById('icono-tema')
      };

      // funcion para aplicar el esquema de colores y actualizar la interfaz visual
      const aplicarTema = (tema) => { 
        dom.html.setAttribute('data-bs-theme', tema); // cambio de atributo bootstrap
        dom.iconoTema.textContent = tema === 'dark' ? '☀️' : '🌙'; // actualizacion de iconografia
        localStorage.setItem('p1-tema', tema); // persistencia de la preferencia en el navegador
      }; 
      
      // controlador de eventos para gestionar la alternancia de temas mediante interaccion
      dom.botonTema.addEventListener('click', () => { 
        const actual = dom.html.getAttribute('data-bs-theme'); 
        aplicarTema(actual === 'dark' ? 'light' : 'dark'); // ejecucion del cambio de estado
      });

      // inicializacion del tema basado en la persistencia local previa
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