import { GestorSort } from '../Modules/nombres.js';

const gestor = new GestorSort();

const estadoNumeros = document.getElementById('estado-numeros');
const estadoPalabras = document.getElementById('estado-palabras');
const estadoPersonas = document.getElementById('estado-personas');
const btnNumeros = document.getElementById('btn-numeros');
const btnPalabras = document.getElementById('btn-palabras');
const btnPersonas = document.getElementById('btn-personas');
const resNumeros = document.getElementById('res-numeros');
const resPalabras = document.getElementById('res-palabras');
const resPersonas = document.getElementById('res-personas');

const dom = {
    html: document.documentElement,
    botonTema: document.getElementById('boton-tema'),
    iconoTema: document.getElementById('icono-tema')
};

const aplicarTema = (tema) => { 
    dom.html.setAttribute('data-bs-theme', tema); 
    dom.iconoTema.textContent = tema === 'dark' ? '☀️' : '🌙'; 
    localStorage.setItem('p13-tema', tema); 
}; 

dom.botonTema.addEventListener('click', () => { 
    const actual = dom.html.getAttribute('data-bs-theme'); 
    aplicarTema(actual === 'dark' ? 'light' : 'dark'); 
}); 

const temaGuardado = localStorage.getItem('p13-tema') || 'light';
aplicarTema(temaGuardado);

const renderizar = () => {
    const estado = gestor.obtenerEstado();
    
    estadoNumeros.textContent = estado.numeros.length > 0 ? estado.numeros.join(', ') : '⚠️ Sin números aún';
    estadoPalabras.textContent = estado.palabras.length > 0 ? estado.palabras.join(', ') : '⚠️ Sin palabras aún';
    estadoPersonas.textContent = estado.personas.map(p => `${p.nombre} (${p.edad} años)`).join(', ');
};

btnNumeros.addEventListener('click', () => {
    const res = gestor.ordenarNumeros();
    resNumeros.textContent = res.join(', ');
});

btnPalabras.addEventListener('click', () => {
    const res = gestor.ordenarPalabras();
    resPalabras.textContent = res.join(', ');
});

btnPersonas.addEventListener('click', () => {
    const res = gestor.ordenarPorEdad();
    resPersonas.textContent = res.map(p => `${p.nombre} (${p.edad} años)`).join(', ');
});

renderizar();
