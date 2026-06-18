/**
 * lógica principal para el ejercicio 2 (pop)
 */

import { GestorPop } from '../Modules/animales.js';

const gestor = new GestorPop();

const estadoAnimales = document.getElementById('estado-animales');
const estadoCompras = document.getElementById('estado-compras');
const estadoVaciado = document.getElementById('estado-vaciado');
const btnAnimal = document.getElementById('btn-animal');
const btnCompra = document.getElementById('btn-compra');
const btnVaciar = document.getElementById('btn-vaciar');

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
    localStorage.setItem('p2-tema', tema); 
}; 

// Escuchador para el botón de tema
dom.botonTema.addEventListener('click', () => { 
    const actual = dom.html.getAttribute('data-bs-theme'); 
    aplicarTema(actual === 'dark' ? 'light' : 'dark'); 
}); 

// Cargar tema guardado al iniciar
const temaGuardado = localStorage.getItem('p2-tema') || 'light';
aplicarTema(temaGuardado);

const renderizar = () => {
    const estado = gestor.obtenerEstado();
    
    estadoAnimales.textContent = estado.animales.length > 0 ? estado.animales.join(', ') : '⚠️ Array vacío';
    estadoCompras.textContent = estado.compras.length > 0 ? estado.compras.join(', ') : '⚠️ Array vacío';
    estadoVaciado.textContent = estado.arrayParaVaciar.length > 0 ? estado.arrayParaVaciar.join(', ') : '⚠️ Array vacío';
};

btnAnimal.addEventListener('click', () => {
    const eliminado = gestor.eliminarAnimal();
    const msg = document.getElementById('msg-animal');
    if (eliminado) {
        msg.textContent = `✅ Se eliminó el animal: ${eliminado}`;
        msg.classList.remove('d-none');
        setTimeout(() => msg.classList.add('d-none'), 3000);
        renderizar();
    } else {
        msg.textContent = '❌ No hay animales para eliminar';
        msg.classList.remove('d-none');
        setTimeout(() => msg.classList.add('d-none'), 3000);
    }
});

btnCompra.addEventListener('click', () => {
    const eliminado = gestor.quitarProducto();
    const msg = document.getElementById('msg-compra');
    if (eliminado) {
        msg.textContent = `✅ Se quitó de la compra: ${eliminado}`;
        msg.classList.remove('d-none');
        setTimeout(() => msg.classList.add('d-none'), 3000);
        renderizar();
    } else {
        msg.textContent = '❌ No hay productos para quitar';
        msg.classList.remove('d-none');
        setTimeout(() => msg.classList.add('d-none'), 3000);
    }
});

btnVaciar.addEventListener('click', () => {
    const eliminados = gestor.vaciarArray();
    const msg = document.getElementById('msg-vaciado');
    msg.textContent = `✅ Array vaciado. Se eliminaron ${eliminados.length} elementos.`;
    msg.classList.remove('d-none');
    setTimeout(() => msg.classList.add('d-none'), 3000);
    renderizar();
});

renderizar();
