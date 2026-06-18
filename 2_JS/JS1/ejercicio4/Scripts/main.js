import { GestorShift } from '../Modules/cola.js';

const gestor = new GestorShift();

const estadoEnteros = document.getElementById('estado-enteros');
const estadoMensajes = document.getElementById('estado-mensajes');
const estadoCola = document.getElementById('estado-cola');
const btnEntero = document.getElementById('btn-entero');
const btnMensaje = document.getElementById('btn-mensaje');
const btnAtender = document.getElementById('btn-atender');
const msgEntero = document.getElementById('msg-entero');
const msgMensaje = document.getElementById('msg-mensaje');
const msgAtender = document.getElementById('msg-atender');

const dom = {
    html: document.documentElement,
    botonTema: document.getElementById('boton-tema'),
    iconoTema: document.getElementById('icono-tema')
};

const aplicarTema = (tema) => { 
    dom.html.setAttribute('data-bs-theme', tema); 
    dom.iconoTema.textContent = tema === 'dark' ? '☀️' : '🌙'; 
    localStorage.setItem('p4-tema', tema); 
}; 

dom.botonTema.addEventListener('click', () => { 
    const actual = dom.html.getAttribute('data-bs-theme'); 
    aplicarTema(actual === 'dark' ? 'light' : 'dark'); 
}); 

const temaGuardado = localStorage.getItem('p4-tema') || 'light';
aplicarTema(temaGuardado);

const renderizar = () => {
    const estado = gestor.obtenerEstado();
    
    estadoEnteros.textContent = estado.enteros.length > 0 ? estado.enteros.join(', ') : '⚠️ Sin números aún';
    estadoMensajes.textContent = estado.mensajesChat.length > 0 ? estado.mensajesChat.join(', ') : '⚠️ Sin mensajes aún';
    estadoCola.textContent = estado.colaAtencion.length > 0 ? estado.colaAtencion.join(', ') : '⚠️ Sin clientes aún';
};

const mostrarMensaje = (elemento, texto) => {
    elemento.textContent = texto;
    elemento.classList.remove('d-none');
    setTimeout(() => elemento.classList.add('d-none'), 3000);
};

btnEntero.addEventListener('click', () => {
    const quitado = gestor.quitarPrimerEntero();
    if (quitado !== null) {
        mostrarMensaje(msgEntero, `✅ Se quitó el número: ${quitado}`);
        renderizar();
    } else {
        mostrarMensaje(msgEntero, '⚠️ No hay más números para quitar');
    }
});

btnMensaje.addEventListener('click', () => {
    const quitado = gestor.eliminarPrimerMensaje();
    if (quitado) {
        mostrarMensaje(msgMensaje, `✅ Mensaje eliminado: "${quitado}"`);
        renderizar();
    } else {
        mostrarMensaje(msgMensaje, '⚠️ No hay más mensajes para eliminar');
    }
});

btnAtender.addEventListener('click', () => {
    const cliente = gestor.atenderCliente();
    if (cliente) {
        mostrarMensaje(msgAtender, `✅ Atendiendo a: ${cliente}`);
        renderizar();
    } else {
        mostrarMensaje(msgAtender, '⚠️ No hay más clientes en la cola');
    }
});

renderizar();
