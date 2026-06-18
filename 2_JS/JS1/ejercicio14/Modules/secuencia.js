/**
 * lógica para manejar las consignas de reverse()
 */

export class GestorReverse {
    constructor() {
        this.letras = ['A', 'B', 'C', 'D'];
        this.numeros = [1, 2, 3, 4, 5];
        this.textoOriginal = "JavaScript es genial";
    }

    // invierte array de letras
    invertirLetras() {
        return [...this.letras].reverse();
    }

    // invierte array de números
    invertirNumeros() {
        return [...this.numeros].reverse();
    }

    // convierte string a array y lo revierte
    revertirTexto(texto) {
        if (!texto) return "";
        // string -> array de caracteres -> reverse -> string
        return texto.split('').reverse().join('');
    }

    obtenerEstado() {
        return {
            letras: [...this.letras],
            numeros: [...this.numeros],
            textoOriginal: this.textoOriginal
        };
    }
}
