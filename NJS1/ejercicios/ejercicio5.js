import http from 'http';
import { suma, resta, multiplicacion, division } from './calculos.js';

const server = http.createServer((req, res) => {

  const html = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultados de Cálculos</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
      body {
        background-color: #f8f9fa;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .card {
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        border: none;
        border-radius: 15px;
      }
      .table th {
        background-color: #0d6efd;
        color: white;
      }
      .header-section {
        background: linear-gradient(135deg, #0d6efd 0%, #00d2ff 100%);
        color: white;
        padding: 2rem;
        border-radius: 15px 15px 0 0;
        text-align: center;
      }
    </style>
  </head>
  <body>

    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="header-section">
              <h1 class="display-6 mb-0">Resultados del Ejercicio 5</h1>
              <p class="lead mb-0">Operaciones matemáticas básicas</p>
            </div>
            <div class="card-body p-4">
              <div class="table-responsive">
                <table class="table table-hover table-bordered align-middle mb-0">
                  <thead class="table-light">
                    <tr>
                      <th class="text-center">Operación</th>
                      <th class="text-center">Resultado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="ps-4">Suma (5 + 3)</td>
                      <td class="text-center fw-bold text-primary">${suma(5, 3)}</td>
                    </tr>
                    <tr>
                      <td class="ps-4">Resta (8 - 6)</td>
                      <td class="text-center fw-bold text-danger">${resta(8, 6)}</td>
                    </tr>
                    <tr>
                      <td class="ps-4">Multiplicación (3 * 11)</td>
                      <td class="text-center fw-bold text-success">${multiplicacion(3, 11)}</td>
                    </tr>
                    <tr>
                      <td class="ps-4">División (30 / 5)</td>
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

    <!-- Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  </body>
  </html>
  `;

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
});

server.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});