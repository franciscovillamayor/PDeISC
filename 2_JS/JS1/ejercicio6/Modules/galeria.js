/**
 * lógica para manejar las consignas de slice()
 */

export class GestorSlice {
    constructor() {
        this.numeros = [10, 20, 30, 40, 50, 60];
        this.peliculas = ['Batman', 'Superman', 'Spiderman', 'Wonder Woman', 'Flash', 'Aquaman'];
    }

    // copia los primeros 3 elementos
    copiarPrimeros3() {
        return this.numeros.slice(0, 3);
    }

    // crea copia parcial de películas desde pos 2 hasta 4
    copiarParcialPeliculas() {
        return this.peliculas.slice(2, 5); // incluye pos 2, 3, 4
    }

    // crea array nuevo con los últimos 3 elementos
    copiarUltimos3() {
        return this.numeros.slice(-3);
    }

    obtenerEstado() {
        return {
            numeros: [...this.numeros],
            peliculas: [...this.peliculas]
        };
    }
}
