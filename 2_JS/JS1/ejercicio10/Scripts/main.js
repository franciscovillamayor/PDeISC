import { GestorMap } from '../Modules/precios.js';

const gestor = new GestorMap();

const estadoNumeros = document.getElementById('estado-numeros');
const estadoNombres = document.getElementById('estado-nombres');
const estadoPrecios = document.getElementById('estado-precios');
const btnMulti = document.getElementById('btn-multi');
const btnMayus = document.getElementById('btn-mayus');
const btnIVA = document.getElementById('btn-iva');
const resMulti = document.getElementById('res-multi');
const resMayus = document.getElementById('res-mayus');
const resIVA = document.getElementById('res-iva');

const dom = {
    html: document.documentElement,
    botonTema: document.getElementById('boton-tema'),
    iconoTema: document.getElementById('icono-tema')
};

const aplicarTema = (tema) => { 
    dom.html.setAttribute('data-bs-theme', tema); 
    dom.iconoTema.textContent = tema === 'dark' ? '☀️' : '🌙'; 
    localStorage.setItem('p10-tema', tema); 
}; 

dom.botonTema.addEventListener('click', () => { 
    const actual = dom.html.getAttribute('data-bs-theme'); 
    aplicarTema(actual === 'dark' ? 'light' : 'dark'); 
}); 

const temaGuardado = localStorage.getItem('p10-tema') || 'light';
aplicarTema(temaGuardado);

const renderizar = () => {
    const estado = gestor.obtenerEstado();
    
    estadoNumeros.textContent = estado.numeros.length > 0 ? estado.numeros.join(', ') : '⚠️ Sin números aún';
    estadoNombres.textContent = estado.nombres.length > 0 ? estado.nombres.join(', ') : '⚠️ Sin nombres aún';
    estadoPrecios.textContent = estado.precios.length > 0 ? `$${estado.precios.join(', $')}` : '⚠️ Sin precios aún';
};

btnMulti.addEventListener('click', () => {
    const res = gestor.multiplicarPor3();
    resMulti.textContent = res.join(', ');
});

btnMayus.addEventListener('click', () => {
    const res = gestor.convertirMayusculas();
    resMayus.textContent = res.join(', ');
});

btnIVA.addEventListener('click', () => {
    const res = gestor.agregarIVA();
    resIVA.textContent = res.map(p => `$${p}`).join(', ');
});

renderizar();
