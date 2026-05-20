// importamos los modulos necesarios para el servidor y los calculos
import http from 'http';
import { suma, resta, multiplicacion, division } from './calculos.js';

// creamos el servidor que va a manejar las peticiones del navegador
const server = http.createServer((req, res) => {

  // aca armamos todo el contenido html que vamos a mostrar
  const html = `
  <!DOCTYPE html>
  <html lang="es" data-bs-theme="light">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultados de Cálculos</title>
    <!-- traemos bootstrap para que todo se vea lindo y sea responsivo -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- iconos de bootstrap para el botoncito del modo oscuro -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
    <style>
      body {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s ease;
      }
      /* estilo para que la tarjeta se vea con relieve */
      .card {
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        border: none;
        border-radius: 15px;
        overflow: hidden;
      }
      /* degradado fachero para el titulo */
      .header-section {
        background: linear-gradient(135deg, #0d6efd 0%, #00d2ff 100%);
        color: white;
        padding: 2rem;
        text-align: center;
      }
      /* posicion del boton flotante para cambiar el tema */
      .theme-toggle {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
      }
    </style>
  </head>
  <body class="bg-body-tertiary">

    <!-- boton flotante para switchar entre claro y oscuro -->
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
            <!-- cabecera con el titulo principal -->
            <div class="header-section">
              <h1 class="display-6 mb-0">Resultados del Ejercicio 5</h1>
              <p class="lead mb-0">operaciones matemáticas básicas</p>
            </div>
            
            <div class="card-body p-4">
              <div class="table-responsive">
                <!-- tabla con los resultados de los calculos -->
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

    <!-- scripts de bootstrap y la logica para el modo oscuro -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
      const btnTema = document.getElementById('btnTema');
      const iconoTema = document.getElementById('iconoTema');
      const textoTema = document.getElementById('textoTema');
      const htmlTag = document.documentElement;

      // funcion para cambiar el tema de forma dinamica
      btnTema.addEventListener('click', () => {
        const temaActual = htmlTag.getAttribute('data-bs-theme');
        
        if (temaActual === 'light') {
          // pasamos a modo oscuro
          htmlTag.setAttribute('data-bs-theme', 'dark');
          iconoTema.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
          textoTema.innerText = 'modo claro';
          btnTema.classList.replace('btn-outline-primary', 'btn-outline-warning');
        } else {
          // volvemos a modo claro
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