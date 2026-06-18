import { GestorReduce } from '../Modules/carrito.js';

const gestor = new GestorReduce();

const estadoNumeros = document.getElementById('estado-numeros');
const estadoEnteros = document.getElementById('estado-enteros');
const estadoCarrito = document.getElementById('estado-carrito');
const btnSuma = document.getElementById('btn-suma');
const btnMulti = document.getElementById('btn-multi');
const btnTotal = document.getElementById('btn-total');
const resSuma = document.getElementById('res-suma');
const resMulti = document.getElementById('res-multi');
const resTotal = document.getElementById('res-total');

const dom = {
    html: document.documentElement,
    botonTema: document.getElementById('boton-tema'),
    iconoTema: document.getElementById('icono-tema')
};

const aplicarTema = (tema) => { 
    dom.html.setAttribute('data-bs-theme', tema); 
    dom.iconoTema.textContent = tema === 'dark' ? '☀️' : '🌙'; 
    localStorage.setItem('p12-tema', tema); 
}; 

dom.botonTema.addEventListener('click', () => { 
    const actual = dom.html.getAttribute('data-bs-theme'); 
    aplicarTema(actual === 'dark' ? 'light' : 'dark'); 
}); 

const temaGuardado = localStorage.getItem('p12-tema') || 'light';
aplicarTema(temaGuardado);

const renderizar = () => {
    const estado = gestor.obtenerEstado();
    
    estadoNumeros.textContent = estado.numeros.length > 0 ? estado.numeros.join(', ') : '⚠️ Sin números aún';
    estadoEnteros.textContent = estado.enteros.length > 0 ? estado.enteros.join(', ') : '⚠️ Sin enteros aún';
    estadoCarrito.textContent = estado.objetosPrecio.map(i => `${i.nombre}: $${i.precio}`).join(', ');
};

btnSuma.addEventListener('click', () => {
    const res = gestor.sumarTodos();
    resSuma.textContent = `Resultado: ${res}`;
});

btnMulti.addEventListener('click', () => {
    const res = gestor.multiplicarTodos();
    resMulti.textContent = `Resultado: ${res}`;
});

btnTotal.addEventListener('click', () => {
    const res = gestor.obtenerTotalPrecios();
    resTotal.textContent = `Total: $${res}`;
});

renderizar();
