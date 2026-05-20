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
    <!-- recursos visuales para la iconografia de la interfaz -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
    <style>
      body {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s ease;
      }
      /* configuracion de estilos personalizados para los contenedores principales */
      .card {
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        border: none;
        border-radius: 15px;
        overflow: hidden;
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
    </style>
  </head>
  <body class="bg-body-tertiary">

    <!-- interfaz de control para la alternancia entre esquemas de colores -->
    <div class="theme-toggle">
      <button class="btn btn-outline-primary rounded-pill px-3" id="btnTema">
        <i class="bi bi-moon-stars-fill" id="iconoTema"></i>
        <span id="textoTema">modo oscuro</span>
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

    <!-- logica de cliente para la gestion de interactividad y estilos dinamicos -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
      const btnTema = document.getElementById('btnTema');
      const iconoTema = document.getElementById('iconoTema');
      const textoTema = document.getElementById('textoTema');
      const htmlTag = document.documentElement;

      // controlador de eventos para la gestion dinamica del esquema de colores
      btnTema.addEventListener('click', () => {
        const temaActual = htmlTag.getAttribute('data-bs-theme');
        
        if (temaActual === 'light') {
          // transicion al esquema de colores oscuro
          htmlTag.setAttribute('data-bs-theme', 'dark');
          iconoTema.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
          textoTema.innerText = 'modo claro';
          btnTema.classList.replace('btn-outline-primary', 'btn-outline-warning');
        } else {
          // reversion al esquema de colores claro
          htmlTag.setAttribute('data-bs-theme', 'light');
          iconoTema.classList.replace('bi-sun-fill', 'bi-moon-stars-fill');
          textoTema.innerText = 'modo oscuro';
          btnTema.classList.replace('btn-outline-warning', 'btn-outline-primary');
        }
      });
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