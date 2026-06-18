/**
 * lógica para manejar las consignas de pop()
 */

export class GestorPop {
    constructor() {
        this.animales = ['Perro', 'Gato', 'Conejo', 'Hamster'];
        this.compras = ['Leche', 'Pan', 'Huevos', 'Frutas'];
        this.arrayParaVaciar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }

    // elimina el último animal
    eliminarAnimal() {
        if (this.animales.length > 0) {
            return this.animales.pop();
        }
        return null;
    }

    // quita último producto y muestra eliminado
    quitarProducto() {
        if (this.compras.length > 0) {
            return this.compras.pop();
        }
        return null;
    }

    // vaciar array con while y pop
    vaciarArray() {
        const eliminados = [];
        while (this.arrayParaVaciar.length > 0) {
            eliminados.push(this.arrayParaVaciar.pop());
        }
        return eliminados;
    }

    obtenerEstado() {
        return {
            animales: [...this.animales],
            compras: [...this.compras],
            arrayParaVaciar: [...this.arrayParaVaciar]
        };
    }
}
