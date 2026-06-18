/**
 * lógica para manejar las consignas de unshift()
 */

export class GestorUnshift {
    constructor() {
        this.colores = [];
        this.tareas = ['Lavar platos', 'Hacer la cama'];
        this.usuariosConectados = ['usuario123', 'pro_gamer'];
    }

    // agrega tres colores al principio
    agregarColoresObligatorios(c1, c2, c3) {
        if (c1 && c2 && c3) {
            this.colores.unshift(c1, c2, c3);
            return true;
        }
        return false;
    }

    // agrega tarea urgente al principio
    agregarTareaUrgente(tarea) {
        if (tarea) {
            this.tareas.unshift(`¡URGENTE! ${tarea}`);
            return true;
        }
        return false;
    }

    // inserta usuario al principio
    conectarUsuario(nombre) {
        if (nombre) {
            this.usuariosConectados.unshift(nombre);
            return true;
        }
        return false;
    }

    obtenerEstado() {
        return {
            colores: [...this.colores],
            tareas: [...this.tareas],
            usuariosConectados: [...this.usuariosConectados]
        };
    }
}
