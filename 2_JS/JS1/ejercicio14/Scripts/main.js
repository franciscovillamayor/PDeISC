import { GestorReverse } from '../Modules/secuencia.js';

const gestor = new GestorReverse();

const estadoLetras = document.getElementById('estado-letras');
const estadoNumeros = document.getElementById('estado-numeros');
const btnLetras = document.getElementById('btn-letras');
const btnNumeros = document.getElementById('btn-numeros');
const formTexto = document.getElementById('form-texto');
const inputTexto = document.getElementById('input-texto');
const resLetras = document.getElementById('res-letras');
const resNumeros = document.getElementById('res-numeros');
const resTexto = document.getElementById('res-texto');

const dom = {
    html: document.documentElement,
    botonTema: document.getElementById('boton-tema'),
    iconoTema: document.getElementById('icono-tema')
};

const aplicarTema = (tema) => { 
    dom.html.setAttribute('data-bs-theme', tema); 
    dom.iconoTema.textContent = tema === 'dark' ? '☀️' : '🌙'; 
    localStorage.setItem('p14-tema', tema); 
}; 

dom.botonTema.addEventListener('click', () => { 
    const actual = dom.html.getAttribute('data-bs-theme'); 
    aplicarTema(actual === 'dark' ? 'light' : 'dark'); 
}); 

const temaGuardado = localStorage.getItem('p14-tema') || 'light';
aplicarTema(temaGuardado);

const renderizar = () => {
    const estado = gestor.obtenerEstado();
    
    estadoLetras.textContent = estado.letras.length > 0 ? estado.letras.join(', ') : '⚠️ Sin letras aún';
    estadoNumeros.textContent = estado.numeros.length > 0 ? estado.numeros.join(', ') : '⚠️ Sin números aún';
};

btnLetras.addEventListener('click', () => {
    const res = gestor.invertirLetras();
    resLetras.textContent = res.join(', ');
});

btnNumeros.addEventListener('click', () => {
    const res = gestor.invertirNumeros();
    resNumeros.textContent = res.join(', ');
});

formTexto.addEventListener('submit', (e) => {
    e.preventDefault();
    const res = gestor.revertirTexto(inputTexto.value);
    resTexto.textContent = res;
});

renderizar();
