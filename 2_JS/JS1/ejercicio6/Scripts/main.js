import { GestorSlice } from '../Modules/galeria.js';

const gestor = new GestorSlice();

const estadoNumeros = document.getElementById('estado-numeros');
const estadoPeliculas = document.getElementById('estado-peliculas');
const btnPrimeros = document.getElementById('btn-primeros');
const btnParcial = document.getElementById('btn-parcial');
const btnUltimos = document.getElementById('btn-ultimos');
const resPrimeros = document.getElementById('res-primeros');
const resParcial = document.getElementById('res-parcial');
const resUltimos = document.getElementById('res-ultimos');

const dom = {
    html: document.documentElement,
    botonTema: document.getElementById('boton-tema'),
    iconoTema: document.getElementById('icono-tema')
};

const aplicarTema = (tema) => { 
    dom.html.setAttribute('data-bs-theme', tema); 
    dom.iconoTema.textContent = tema === 'dark' ? '☀️' : '🌙'; 
    localStorage.setItem('p6-tema', tema); 
}; 

dom.botonTema.addEventListener('click', () => { 
    const actual = dom.html.getAttribute('data-bs-theme'); 
    aplicarTema(actual === 'dark' ? 'light' : 'dark'); 
}); 

const temaGuardado = localStorage.getItem('p6-tema') || 'light';
aplicarTema(temaGuardado);

const renderizar = () => {
    const estado = gestor.obtenerEstado();
    
    estadoNumeros.textContent = estado.numeros.length > 0 ? estado.numeros.join(', ') : '⚠️ Sin números aún';
    estadoPeliculas.textContent = estado.peliculas.length > 0 ? estado.peliculas.join(', ') : '⚠️ Sin películas aún';
};

btnPrimeros.addEventListener('click', () => {
    const copia = gestor.copiarPrimeros3();
    resPrimeros.textContent = `✅ Copiados: ${copia.join(', ')}`;
});

btnParcial.addEventListener('click', () => {
    const copia = gestor.copiarParcialPeliculas();
    resParcial.textContent = `✅ Copiadas: ${copia.join(', ')}`;
});

btnUltimos.addEventListener('click', () => {
    const copia = gestor.copiarUltimos3();
    resUltimos.textContent = `✅ Copiados: ${copia.join(', ')}`;
});

renderizar();
