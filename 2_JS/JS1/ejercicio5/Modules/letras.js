/**
 * lógica para manejar las consignas de splice()
 */

export class GestorSplice {
    constructor() {
        this.letras = ['A', 'B', 'C', 'D', 'E', 'F'];
        this.nombres = ['Ana', 'Luis', 'Pedro'];
        this.reemplazos = ['Uno', 'Dos', 'Tres', 'Cuatro'];
    }

    // elimina dos elementos desde la posición 1
    eliminarLetras() {
        this.letras.splice(1, 2);
        return [...this.letras];
    }

    // inserta nombre en la segunda posición sin eliminar nada
    insertarNombre(nombre) {
        if (nombre) {
            this.nombres.splice(1, 0, nombre);
            return true;
        }
        return false;
    }

    // reemplaza elementos individualmente usando splice
    reemplazarIndividualmente(pos1, nuevo1, pos2, nuevo2) {
        let exito = false;
        if (pos1 >= 0 && pos1 < this.reemplazos.length) {
            this.reemplazos.splice(pos1, 1, nuevo1);
            exito = true;
        }
        if (pos2 >= 0 && pos2 < this.reemplazos.length) {
            this.reemplazos.splice(pos2, 1, nuevo2);
            exito = true;
        }
        return exito;
    }

    obtenerEstado() {
        return {
            letras: [...this.letras],
            nombres: [...this.nombres],
            reemplazos: [...this.reemplazos]
        };
    }
}
