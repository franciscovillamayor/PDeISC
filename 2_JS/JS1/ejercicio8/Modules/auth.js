/**
 * lógica para manejar las consignas de includes()
 */

export class GestorIncludes {
    constructor() {
        this.usuarios = ['guest', 'editor', 'admin', 'user'];
        this.colores = ['rojo', 'azul', 'amarillo', 'blanco'];
        this.numeros = [10, 20, 30];
    }

    // comprueba si contiene "admin"
    contieneAdmin() {
        return this.usuarios.includes('admin');
    }

    // indica si existe "verde"
    existeVerde() {
        return this.colores.includes('verde');
    }

    // verifica si número está presente antes de sumar
    intentarSumar(num) {
        if (this.numeros.includes(num)) {
            return { exito: false, mensaje: `El número ${num} ya existe en el array.` };
        }
        this.numeros.push(num);
        return { exito: true, mensaje: `Número ${num} agregado con éxito.` };
    }

    obtenerEstado() {
        return {
            usuarios: [...this.usuarios],
            colores: [...this.colores],
            numeros: [...this.numeros]
        };
    }
}
