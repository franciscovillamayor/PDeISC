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
      /* definicion de variables de color para la gestion de temas */
      :root { 
          --bg-light: #f8fafc; 
          --card-bg: #ffffff; 
          --text-main: #1e293b !important; 
      } 
      
      /* reconfiguracion de variables para el esquema de colores oscuro */
      [data-bs-theme="dark"] { 
          --bg-light: #0f172a; 
          --card-bg: #1e293b; 
          --text-main: #f8fafc !important; 
      } 
      
      /* configuracion de transiciones globales para optimizar la experiencia visual */
      * { 
          transition: background-color 0.3s ease, color 0.3s ease !important; 
      }

      body {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--bg-light);
      }
      
      /* configuracion de estilos personalizados para los contenedores principales */
      .card {
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        border: none;
        border-radius: 15px;
        overflow: hidden;
        background-color: var(--card-bg);
      }
      
      /* diseño de la identidad visual mediante degradados corporativos */
      .header-section {
        background: linear-gradient(135deg, #0d6efd 0%, #00d2ff 100%);
        color: white;
        padding: 2rem;
        text-align: center;
      }
      
      /* configuracion del sistema de posicionamiento para el control de temas */
      .theme-toggle {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
      }

      .btn-theme-toggle {
        font-size: 1.5rem;
        padding: 0.5rem 1rem;
        border-radius: 50%;
        line-height: 1;
      }
    </style>
  </head>
  <body>

    <!-- interfaz de control para la alternancia entre esquemas de colores -->
    <div class="theme-toggle">
      <button id="boton-tema" class="btn btn-outline-primary btn-theme-toggle"> 
          <span id="icono-tema">🌙</span> 
      </button>
    </div>

    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <!-- seccion de encabezado que define el proposito del ejercicio -->
            <div class="header-section">
              <h1 class="display-6 mb-0">Resultados del Ejercicio 5</h1>
              <p class="lead mb-0">operaciones matemáticas básicas</p>
            </div>
            
            <div class="card-body p-4">
              <div class="table-responsive">
                <!-- presentacion sistematica de datos mediante una tabla interactiva -->
                <table class="table table-hover table-bordered align-middle mb-0">
                  <thead class="table-light">
                    <tr>
                      <th class="text-center">Operación</th>
                      <th class="text-center">Resultado</th>
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