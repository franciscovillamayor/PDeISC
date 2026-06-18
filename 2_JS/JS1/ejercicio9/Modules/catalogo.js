/**
 * lógica para manejar las consignas de forEach()
 */

export class GestorForEach {
    constructor() {
        this.nombres = ['Ana', 'Luis', 'Marta', 'Jorge'];
        this.numeros = [2, 5, 10, 20];
        this.personas = [
            { nombre: 'Sofía', edad: 25 },
            { nombre: 'Carlos', edad: 30 },
            { nombre: 'Elena', edad: 22 }
        ];
    }

    // muestra todos los nombres con un saludo
    obtenerSaludos() {
        const saludos = [];
        this.nombres.forEach(nombre => {
            saludos.push(`¡Hola, ${nombre}! 👋`);
        });
        return saludos;
    }

    // obtiene el doble de cada número
    obtenerDobles() {
        const dobles = [];
        this.numeros.forEach(num => {
            dobles.push(`El doble de ${num} es ${num * 2}`);
        });
        return dobles;
    }

    // muestra cada nombre con su edad
    obtenerListaPersonas() {
        const lista = [];
        this.personas.forEach(p => {
            lista.push(`${p.nombre} tiene ${p.edad} años`);
        });
        return lista;
    }

    obtenerEstado() {
        return {
            nombres: [...this.nombres],
            numeros: [...this.numeros],
            personas: [...this.personas]
        };
    }
}
