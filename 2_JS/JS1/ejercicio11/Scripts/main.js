import { GestorFilter } from '../Modules/datos.js';

const gestor = new GestorFilter();

const estadoNumeros = document.getElementById('estado-numeros');
const estadoPalabras = document.getElementById('estado-palabras');
const estadoUsuarios = document.getElementById('estado-usuarios');
const btnNumeros = document.getElementById('btn-numeros');
const btnPalabras = document.getElementById('btn-palabras');
const btnUsuarios = document.getElementById('btn-usuarios');
const resNumeros = document.getElementById('res-numeros');
const resPalabras = document.getElementById('res-palabras');
const resUsuarios = document.getElementById('res-usuarios');

const dom = {
    html: document.documentElement,
    botonTema: document.getElementById('boton-tema'),
    iconoTema: document.getElementById('icono-tema')
};

const aplicarTema = (tema) => { 
    dom.html.setAttribute('data-bs-theme', tema); 
    dom.iconoTema.textContent = tema === 'dark' ? '☀️' : '🌙'; 
    localStorage.setItem('p11-tema', tema); 
}; 

dom.botonTema.addEventListener('click', () => { 
    const actual = dom.html.getAttribute('data-bs-theme'); 
    aplicarTema(actual === 'dark' ? 'light' : 'dark'); 
}); 

const temaGuardado = localStorage.getItem('p11-tema') || 'light';
aplicarTema(temaGuardado);

const renderizar = () => {
    const estado = gestor.obtenerEstado();
    
    estadoNumeros.textContent = estado.numeros.length > 0 ? estado.numeros.join(', ') : '⚠️ Sin números aún';
    estadoPalabras.textContent = estado.palabras.length > 0 ? estado.palabras.join(', ') : '⚠️ Sin palabras aún';
    estadoUsuarios.textContent = estado.usuarios.map(u => `${u.nombre} (${u.activo ? '✅ Activo' : '❌ Inactivo'})`).join(', ');
};

btnNumeros.addEventListener('click', () => {
    const res = gestor.filtrarMayores10();
    resNumeros.textContent = res.length > 0 ? res.join(', ') : 'No hay números mayores a 10';
});

btnPalabras.addEventListener('click', () => {
    const res = gestor.filtrarPalabrasLargas();
    resPalabras.textContent = res.length > 0 ? res.join(', ') : 'No hay palabras con más de 5 letras';
});

btnUsuarios.addEventListener('click', () => {
    const res = gestor.filtrarUsuariosActivos();
    resUsuarios.textContent = res.length > 0 ? res.map(u => `${u.nombre} ✅`).join(', ') : 'No hay usuarios activos';
});

renderizar();
