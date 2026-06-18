/**
 * lógica para manejar las consignas de filter()
 */

export class GestorFilter {
    constructor() {
        this.numeros = [2, 8, 12, 5, 20, 7, 15];
        this.palabras = ['casa', 'elefante', 'sol', 'computadora', 'mar', 'ventana'];
        this.usuarios = [
            { nombre: 'Juan', activo: true },
            { nombre: 'Ana', activo: false },
            { nombre: 'Pedro', activo: true },
            { nombre: 'Maria', activo: false }
        ];
    }

    // filtra los números mayores a 10
    filtrarMayores10() {
        return this.numeros.filter(n => n > 10);
    }

    // filtra palabras con más de 5 letras
    filtrarPalabrasLargas() {
        return this.palabras.filter(p => p.length > 5);
    }

    // filtra usuarios activos
    filtrarUsuariosActivos() {
        return this.usuarios.filter(u => u.activo);
    }

    obtenerEstado() {
        return {
            numeros: [...this.numeros],
            palabras: [...this.palabras],
            usuarios: [...this.usuarios]
        };
    }
}
