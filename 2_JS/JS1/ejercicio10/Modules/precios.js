/**
 * lógica para manejar las consignas de map()
 */

export class GestorMap {
    constructor() {
        this.numeros = [1, 2, 3, 4, 5];
        this.nombres = ['ana', 'luis', 'marta'];
        this.precios = [100, 200, 300, 500];
    }

    // crea nuevo array con cada número multiplicado por 3
    multiplicarPor3() {
        return this.numeros.map(n => n * 3);
    }

    // convierte array de nombres en mayúsculas
    convertirMayusculas() {
        return this.nombres.map(n => n.toUpperCase());
    }

    // agrega 21% de IVA a array de precios
    agregarIVA() {
        return this.precios.map(p => (p * 1.21).toFixed(2));
    }

    obtenerEstado() {
        return {
            numeros: [...this.numeros],
            nombres: [...this.nombres],
            precios: [...this.precios]
        };
    }
}
