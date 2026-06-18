import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUERTO = 3006;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

const servidor = http.createServer((solicitud, respuesta) => {
  let rutaArchivo = solicitud.url === '/' 
    ? path.join(__dirname, 'Pages', 'index.html') 
    : path.join(__dirname, solicitud.url);

  const extension = path.extname(rutaArchivo);
  
  fs.readFile(rutaArchivo, (error, contenido) => {
    if (error) {
      if (error.code === 'ENOENT') {
        respuesta.writeHead(404);
        respuesta.end('archivo no encontrado');
      } else {
        respuesta.writeHead(500);
        respuesta.end(`error del servidor: ${error.code}`);
      }
    } else {
      const contentType = MIME_TYPES[extension] || 'text/plain';
      respuesta.writeHead(200, { 'Content-Type': contentType });
      respuesta.end(contenido, 'utf-8');
    }
  });
});

servidor.listen(PUERTO, () => {
  console.log(`servidor corriendo en http://localhost:${PUERTO}`);
});
