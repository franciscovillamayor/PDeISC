/**
 * lógica para manejar las consignas de shift()
 */

export class GestorShift {
    constructor() {
        this.enteros = [1, 2, 3, 4, 5];
        this.mensajesChat = ['Hola!', 'Cómo estás?', 'Todo bien por acá'];
        this.colaAtencion = ['Cliente A', 'Cliente B', 'Cliente C'];
    }

    // quita el primer número
    quitarPrimerEntero() {
        if (this.enteros.length > 0) {
            return this.enteros.shift();
        }
        return null;
    }

    // elimina el primer mensaje de chat
    eliminarPrimerMensaje() {
        if (this.mensajesChat.length > 0) {
            return this.mensajesChat.shift();
        }
        return null;
    }

    // atiende al próximo cliente (simulación de cola)
    atenderCliente() {
        if (this.colaAtencion.length > 0) {
            return this.colaAtencion.shift();
        }
        return null;
    }

    obtenerEstado() {
        return {
            enteros: [...this.enteros],
            mensajesChat: [...this.mensajesChat],
            colaAtencion: [...this.colaAtencion]
        };
    }
}
