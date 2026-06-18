/**
 * lógica principal para el ejercicio 1 (push)
 */

import { GestorPush } from '../Modules/frutas.js';

const gestor = new GestorPush();

const estadoFrutas = document.getElementById('estado-frutas');
const estadoAmigos = document.getElementById('estado-amigos');
const estadoNumeros = document.getElementById('estado-numeros');
const formNumero = document.getElementById('form-numero');
const inputNumero = document.getElementById('nuevo-numero');
const btnFrutas = document.getElementById('btn-frutas');
const btnAmigos = document.getElementById('btn-amigos');

// Referencias para el modo oscuro
const dom = {
    html: document.documentElement,
    botonTema: document.getElementById('boton-tema'),
    iconoTema: document.getElementById('icono-tema')
};

// Función para aplicar el tema y cambiar el icono 
const aplicarTema = (tema) => { 
    dom.html.setAttribute('data-bs-theme', tema); 
    dom.iconoTema.textContent = tema === 'dark' ? '☀️' : '🌙'; 
    localStorage.setItem('p1-tema', tema); 
}; 

// Escuchador para el botón de tema
dom.botonTema.addEventListener('click', () => { 
    const actual = dom.html.getAttribute('data-bs-theme'); 
    aplicarTema(actual === 'dark' ? 'light' : 'dark'); 
}); 

// Cargar tema guardado al iniciar
const temaGuardado = localStorage.getItem('p1-tema') || 'light';
aplicarTema(temaGuardado);

const renderizar = () => {
    const estado = gestor.obtenerEstado();
    
    estadoFrutas.textContent = estado.frutas.length > 0 ? estado.frutas.join(', ') : '⚠️ Sin elementos aún';
    estadoAmigos.textContent = estado.amigos.length > 0 ? estado.amigos.join(', ') : '⚠️ Sin elementos aún';
    estadoNumeros.textContent = estado.numeros.length > 0 ? estado.numeros.join(', ') : '⚠️ Sin elementos aún';
};

btnFrutas.addEventListener('click', () => {
    const v1 = document.getElementById('f1').value;
    const v2 = document.getElementById('f2').value;
    const v3 = document.getElementById('f3').value;
    if (gestor.agregarFrutasObligatorias(v1, v2, v3)) {
        btnFrutas.disabled = true;
        renderizar();
    }
});

btnAmigos.addEventListener('click', () => {
    const v1 = document.getElementById('a1').value;
    const v2 = document.getElementById('a2').value;
    const v3 = document.getElementById('a3').value;
    if (gestor.agregarAmigosObligatorios(v1, v2, v3)) {
        btnAmigos.disabled = true;
        renderizar();
    }
});

formNumero.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = parseInt(inputNumero.value);
    const res = gestor.agregarNumeroCondicional(val);
    
    if (!res.exito) {
        const msg = document.getElementById('msg-error');
        msg.textContent = res.mensaje;
        msg.classList.remove('d-none');
        setTimeout(() => msg.classList.add('d-none'), 3000);
    } else {
        inputNumero.value = '';
        renderizar();
    }
});

renderizar();
