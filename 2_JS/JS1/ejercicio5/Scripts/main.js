import { GestorSplice } from '../Modules/letras.js';

const gestor = new GestorSplice();

const estadoLetras = document.getElementById('estado-letras');
const estadoNombres = document.getElementById('estado-nombres');
const estadoReemplazos = document.getElementById('estado-reemplazos');
const btnEliminarLetras = document.getElementById('btn-eliminar-letras');
const formNombre = document.getElementById('form-nombre');
const inputNombre = document.getElementById('input-nombre');
const formReemplazo = document.getElementById('form-reemplazo');
const msgLetras = document.getElementById('msg-letras');
const msgNombres = document.getElementById('msg-nombres');
const msgReemplazos = document.getElementById('msg-reemplazos');

const dom = {
    html: document.documentElement,
    botonTema: document.getElementById('boton-tema'),
    iconoTema: document.getElementById('icono-tema')
};

const aplicarTema = (tema) => { 
    dom.html.setAttribute('data-bs-theme', tema); 
    dom.iconoTema.textContent = tema === 'dark' ? '☀️' : '🌙'; 
    localStorage.setItem('p5-tema', tema); 
}; 

dom.botonTema.addEventListener('click', () => { 
    const actual = dom.html.getAttribute('data-bs-theme'); 
    aplicarTema(actual === 'dark' ? 'light' : 'dark'); 
}); 

const temaGuardado = localStorage.getItem('p5-tema') || 'light';
aplicarTema(temaGuardado);

const renderizar = () => {
    const estado = gestor.obtenerEstado();
    
    estadoLetras.textContent = estado.letras.length > 0 ? estado.letras.join(', ') : '⚠️ Sin letras aún';
    estadoNombres.textContent = estado.nombres.length > 0 ? estado.nombres.join(', ') : '⚠️ Sin nombres aún';
    estadoReemplazos.textContent = estado.reemplazos.length > 0 ? estado.reemplazos.join(', ') : '⚠️ Sin valores aún';
};

const mostrarMensaje = (elemento, texto) => {
    elemento.textContent = texto;
    elemento.classList.remove('d-none');
    setTimeout(() => elemento.classList.add('d-none'), 3000);
};

btnEliminarLetras.addEventListener('click', () => {
    gestor.eliminarLetras();
    btnEliminarLetras.disabled = true;
    mostrarMensaje(msgLetras, '✅ Se eliminaron 2 elementos desde la posición 1');
    renderizar();
});

formNombre.addEventListener('submit', (e) => {
    e.preventDefault();
    if (gestor.insertarNombre(inputNombre.value)) {
        inputNombre.value = '';
        mostrarMensaje(msgNombres, '✅ Nombre insertado correctamente en la posición 1');
        renderizar();
    }
});

formReemplazo.addEventListener('submit', (e) => {
    e.preventDefault();
    const pos1 = parseInt(document.getElementById('input-pos1').value);
    const val1 = document.getElementById('input-nuevo1').value;
    const pos2 = parseInt(document.getElementById('input-pos2').value);
    const val2 = document.getElementById('input-nuevo2').value;
    
    if (gestor.reemplazarIndividualmente(pos1, val1, pos2, val2)) {
        document.getElementById('input-pos1').value = '';
        document.getElementById('input-nuevo1').value = '';
        document.getElementById('input-pos2').value = '';
        document.getElementById('input-nuevo2').value = '';
        mostrarMensaje(msgReemplazos, '✅ Reemplazos realizados correctamente');
        renderizar();
    } else {
        mostrarMensaje(msgReemplazos, '⚠️ Posiciones inválidas, verifica los valores');
    }
});

renderizar();
