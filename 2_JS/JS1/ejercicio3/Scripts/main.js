/**
 * lógica principal para el ejercicio 3 (unshift)
 */

import { GestorUnshift } from '../Modules/tareas.js';

const gestor = new GestorUnshift();

const estadoColores = document.getElementById('estado-colores');
const estadoTareas = document.getElementById('estado-tareas');
const estadoUsuarios = document.getElementById('estado-usuarios');
const btnColores = document.getElementById('btn-colores');
const formTarea = document.getElementById('form-tarea');
const inputTarea = document.getElementById('input-tarea');
const formUsuario = document.getElementById('form-usuario');
const inputUsuario = document.getElementById('input-usuario');

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
    localStorage.setItem('p3-tema', tema); 
}; 

// Escuchador para el botón de tema
dom.botonTema.addEventListener('click', () => { 
    const actual = dom.html.getAttribute('data-bs-theme'); 
    aplicarTema(actual === 'dark' ? 'light' : 'dark'); 
}); 

// Cargar tema guardado al iniciar
const temaGuardado = localStorage.getItem('p3-tema') || 'light';
aplicarTema(temaGuardado);

const renderizar = () => {
    const estado = gestor.obtenerEstado();
    
    estadoColores.textContent = estado.colores.length > 0 ? estado.colores.join(', ') : '⚠️ Sin colores aún';
    estadoTareas.textContent = estado.tareas.length > 0 ? estado.tareas.join(', ') : '⚠️ Sin tareas aún';
    estadoUsuarios.textContent = estado.usuariosConectados.length > 0 ? estado.usuariosConectados.join(', ') : '⚠️ Sin usuarios aún';
};

btnColores.addEventListener('click', () => {
    const v1 = document.getElementById('c1').value;
    const v2 = document.getElementById('c2').value;
    const v3 = document.getElementById('c3').value;
    if (gestor.agregarColoresObligatorios(v1, v2, v3)) {
        btnColores.disabled = true;
        renderizar();
    }
});

formTarea.addEventListener('submit', (e) => {
    e.preventDefault();
    if (gestor.agregarTareaUrgente(inputTarea.value)) {
        inputTarea.value = '';
        renderizar();
    }
});

formUsuario.addEventListener('submit', (e) => {
    e.preventDefault();
    if (gestor.conectarUsuario(inputUsuario.value)) {
        inputUsuario.value = '';
        renderizar();
    }
});

renderizar();
