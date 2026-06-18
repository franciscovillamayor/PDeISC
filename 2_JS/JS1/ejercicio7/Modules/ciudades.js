/**
 * lógica para manejar las consignas de indexOf()
 */

export class GestorIndexOf {
    constructor() {
        this.palabras = ['gato', 'perro', 'pájaro', 'pez'];
        this.numeros = [10, 25, 50, 75, 100];
        this.ciudades = ['Barcelona', 'Buenos Aires', 'Madrid', 'Lima', 'México'];
    }

    // encuentra posición de "perro"
    buscarPerro() {
        return this.palabras.indexOf('perro');
    }

    // verifica si 50 está y su posición
    buscar50() {
        const pos = this.numeros.indexOf(50);
        return { existe: pos !== -1, posicion: pos };
    }

    // busca "Madrid" o mensaje si no está
    buscarMadrid() {
        const pos = this.ciudades.indexOf('Madrid');
        if (pos !== -1) {
            return { mensaje: `Madrid se encuentra en el índice ${pos}`, pos };
        }
        return { mensaje: 'Madrid no se encuentra en la lista', pos: -1 };
    }

    obtenerEstado() {
        return {
            palabras: [...this.palabras],
            numeros: [...this.numeros],
            ciudades: [...this.ciudades]
        };
    }
}
