import { GestorForEach } from '../Modules/catalogo.js';

const gestor = new GestorForEach();

const estadoNombres = document.getElementById('estado-nombres');
const estadoNumeros = document.getElementById('estado-numeros');
const estadoPersonas = document.getElementById('estado-personas');
const btnSaludos = document.getElementById('btn-saludos');
const btnDobles = document.getElementById('btn-dobles');
const btnPersonas = document.getElementById('btn-personas');
const resSaludos = document.getElementById('res-saludos');
const resDobles = document.getElementById('res-dobles');
const resPersonas = document.getElementById('res-personas');

const dom = {
    html: document.documentElement,
    botonTema: document.getElementById('boton-tema'),
    iconoTema: document.getElementById('icono-tema')
};

const aplicarTema = (tema) => { 
    dom.html.setAttribute('data-bs-theme', tema); 
    dom.iconoTema.textContent = tema === 'dark' ? '☀️' : '🌙'; 
    localStorage.setItem('p9-tema', tema); 
}; 

dom.botonTema.addEventListener('click', () => { 
    const actual = dom.html.getAttribute('data-bs-theme'); 
    aplicarTema(actual === 'dark' ? 'light' : 'dark'); 
}); 

const temaGuardado = localStorage.getItem('p9-tema') || 'light';
aplicarTema(temaGuardado);

const renderizar = () => {
    const estado = gestor.obtenerEstado();
    
    estadoNombres.textContent = estado.nombres.length > 0 ? estado.nombres.join(', ') : '⚠️ Sin nombres aún';
    estadoNumeros.textContent = estado.numeros.length > 0 ? estado.numeros.join(', ') : '⚠️ Sin números aún';
    estadoPersonas.textContent = estado.personas.map(p => `${p.nombre} (${p.edad} años)`).join(', ');
};

btnSaludos.addEventListener('click', () => {
    const saludos = gestor.obtenerSaludos();
    resSaludos.textContent = saludos.join(' • ');
});

btnDobles.addEventListener('click', () => {
    const dobles = gestor.obtenerDobles();
    resDobles.textContent = dobles.join(' • ');
});

btnPersonas.addEventListener('click', () => {
    const personas = gestor.obtenerListaPersonas();
    resPersonas.textContent = personas.join(' • ');
});

renderizar();
