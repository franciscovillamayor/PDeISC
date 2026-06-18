import { GestorIndexOf } from '../Modules/ciudades.js';

const gestor = new GestorIndexOf();

const estadoPalabras = document.getElementById('estado-palabras');
const estadoNumeros = document.getElementById('estado-numeros');
const estadoCiudades = document.getElementById('estado-ciudades');
const btnPerro = document.getElementById('btn-perro');
const btn50 = document.getElementById('btn-50');
const btnMadrid = document.getElementById('btn-madrid');
const msgPerro = document.getElementById('msg-perro');
const msg50 = document.getElementById('msg-50');
const msgMadrid = document.getElementById('msg-madrid');

const dom = {
    html: document.documentElement,
    botonTema: document.getElementById('boton-tema'),
    iconoTema: document.getElementById('icono-tema')
};

const aplicarTema = (tema) => { 
    dom.html.setAttribute('data-bs-theme', tema); 
    dom.iconoTema.textContent = tema === 'dark' ? '☀️' : '🌙'; 
    localStorage.setItem('p7-tema', tema); 
}; 

dom.botonTema.addEventListener('click', () => { 
    const actual = dom.html.getAttribute('data-bs-theme'); 
    aplicarTema(actual === 'dark' ? 'light' : 'dark'); 
}); 

const temaGuardado = localStorage.getItem('p7-tema') || 'light';
aplicarTema(temaGuardado);

const renderizar = () => {
    const estado = gestor.obtenerEstado();
    
    estadoPalabras.textContent = estado.palabras.length > 0 ? estado.palabras.join(', ') : '⚠️ Sin palabras aún';
    estadoNumeros.textContent = estado.numeros.length > 0 ? estado.numeros.join(', ') : '⚠️ Sin números aún';
    estadoCiudades.textContent = estado.ciudades.length > 0 ? estado.ciudades.join(', ') : '⚠️ Sin ciudades aún';
};

const mostrarMensaje = (elemento, texto) => {
    elemento.textContent = texto;
    elemento.classList.remove('d-none');
    setTimeout(() => elemento.classList.add('d-none'), 5000);
};

btnPerro.addEventListener('click', () => {
    const pos = gestor.buscarPerro();
    mostrarMensaje(msgPerro, pos !== -1 ? `✅ La palabra "perro" está en la posición: ${pos}` : '❌ La palabra "perro" no está en la lista');
});

btn50.addEventListener('click', () => {
    const res = gestor.buscar50();
    mostrarMensaje(msg50, res.existe ? `✅ El número 50 está en la posición ${res.posicion}` : '❌ El número 50 no está en la lista');
});

btnMadrid.addEventListener('click', () => {
    const res = gestor.buscarMadrid();
    mostrarMensaje(msgMadrid, res.mensaje);
});

renderizar();
