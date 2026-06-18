/**
 * lógica para manejar las consignas de reduce()
 */

export class GestorReduce {
    constructor() {
        this.numeros = [1, 2, 3, 4, 5];
        this.enteros = [2, 3, 4];
        this.objetosPrecio = [
            { nombre: 'Item 1', precio: 50 },
            { nombre: 'Item 2', precio: 100 },
            { nombre: 'Item 3', precio: 25 }
        ];
    }

    // suma todos los elementos
    sumarTodos() {
        return this.numeros.reduce((acc, curr) => acc + curr, 0);
    }

    // multiplica todos los elementos
    multiplicarTodos() {
        return this.enteros.reduce((acc, curr) => acc * curr, 1);
    }

    // obtiene el total de precios
    obtenerTotalPrecios() {
        return this.objetosPrecio.reduce((acc, curr) => acc + curr.precio, 0);
    }

    obtenerEstado() {
        return {
            numeros: [...this.numeros],
            enteros: [...this.enteros],
            objetosPrecio: [...this.objetosPrecio]
        };
    }
}
