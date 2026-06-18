import { GestorIncludes } from '../Modules/auth.js';

const gestor = new GestorIncludes();

const estadoUsuarios = document.getElementById('estado-usuarios');
const estadoColores = document.getElementById('estado-colores');
const estadoNumeros = document.getElementById('estado-numeros');
const btnAdmin = document.getElementById('btn-admin');
const btnVerde = document.getElementById('btn-verde');
const formNumero = document.getElementById('form-numero');
const inputNumero = document.getElementById('input-numero');
const msgAdmin = document.getElementById('msg-admin');
const msgVerde = document.getElementById('msg-verde');
const msgNumero = document.getElementById('msg-numero');

const dom = {
    html: document.documentElement,
    botonTema: document.getElementById('boton-tema'),
    iconoTema: document.getElementById('icono-tema')
};

const aplicarTema = (tema) => { 
    dom.html.setAttribute('data-bs-theme', tema); 
    dom.iconoTema.textContent = tema === 'dark' ? '☀️' : '🌙'; 
    localStorage.setItem('p8-tema', tema); 
}; 

dom.botonTema.addEventListener('click', () => { 
    const actual = dom.html.getAttribute('data-bs-theme'); 
    aplicarTema(actual === 'dark' ? 'light' : 'dark'); 
}); 

const temaGuardado = localStorage.getItem('p8-tema') || 'light';
aplicarTema(temaGuardado);

const renderizar = () => {
    const estado = gestor.obtenerEstado();
    
    estadoUsuarios.textContent = estado.usuarios.length > 0 ? estado.usuarios.join(', ') : '⚠️ Sin usuarios aún';
    estadoColores.textContent = estado.colores.length > 0 ? estado.colores.join(', ') : '⚠️ Sin colores aún';
    estadoNumeros.textContent = estado.numeros.length > 0 ? estado.numeros.join(', ') : '⚠️ Sin números aún';
};

const mostrarMensaje = (elemento, texto) => {
    elemento.textContent = texto;
    elemento.classList.remove('d-none');
    setTimeout(() => elemento.classList.add('d-none'), 3000);
};

btnAdmin.addEventListener('click', () => {
    const existe = gestor.contieneAdmin();
    mostrarMensaje(msgAdmin, existe ? '✅ El array contiene "admin"' : '❌ No contiene "admin"');
});

btnVerde.addEventListener('click', () => {
    const existe = gestor.existeVerde();
    mostrarMensaje(msgVerde, existe ? '✅ El color "verde" existe' : '❌ El color "verde" no existe');
});

formNumero.addEventListener('submit', (e) => {
    e.preventDefault();
    const num = parseInt(inputNumero.value);
    const res = gestor.intentarSumar(num);
    
    mostrarMensaje(msgNumero, res.mensaje);
    
    if (res.exito) {
        inputNumero.value = '';
        renderizar();
    }
});

renderizar();
