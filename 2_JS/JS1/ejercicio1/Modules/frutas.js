/**
 * lógica para manejar las consignas de push()
 */

export class GestorPush {
    constructor() {
        this.frutas = [];
        this.amigos = ['Juan']; // array existente
        this.numeros = [10, 20];
    }

    // agrega 3 frutas usando push
    agregarFrutasObligatorias(f1, f2, f3) {
        if (f1 && f2 && f3) {
            this.frutas.push(f1, f2, f3);
            return true;
        }
        return false;
    }

    // agrega 3 amigos a array existente
    agregarAmigosObligatorios(a1, a2, a3) {
        if (a1 && a2 && a3) {
            this.amigos.push(a1, a2, a3);
            return true;
        }
        return false;
    }

    // agrega numero solo si es mayor que el ultimo
    agregarNumeroCondicional(nuevo) {
        const ultimo = this.numeros[this.numeros.length - 1];
        if (nuevo > ultimo) {
            this.numeros.push(nuevo);
            return { exito: true, lista: [...this.numeros] };
        }
        return { exito: false, mensaje: `el número ${nuevo} no es mayor que ${ultimo}` };
    }

    obtenerEstado() {
        return {
            frutas: [...this.frutas],
            amigos: [...this.amigos],
            numeros: [...this.numeros]
        };
    }
}
