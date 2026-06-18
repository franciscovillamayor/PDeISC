/**
 * lógica para manejar las consignas de sort()
 */

export class GestorSort {
    constructor() {
        this.numeros = [40, 1, 5, 200, 10];
        this.palabras = ['zapato', 'árbol', 'casa', 'balón'];
        this.personas = [
            { nombre: 'Ana', edad: 25 },
            { nombre: 'Luis', edad: 18 },
            { nombre: 'Pedro', edad: 32 },
            { nombre: 'Maria', edad: 21 }
        ];
    }

    // ordena de menor a mayor
    ordenarNumeros() {
        return [...this.numeros].sort((a, b) => a - b);
    }

    // ordena alfabéticamente
    ordenarPalabras() {
        return [...this.palabras].sort((a, b) => a.localeCompare(b));
    }

    // ordena por edad
    ordenarPorEdad() {
        return [...this.personas].sort((a, b) => a.edad - b.edad);
    }

    obtenerEstado() {
        return {
            numeros: [...this.numeros],
            palabras: [...this.palabras],
            personas: [...this.personas]
        };
    }
}
