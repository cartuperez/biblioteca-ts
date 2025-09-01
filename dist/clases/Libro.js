"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Libro = void 0;
/**
 * Cada libro tiene sus datos básicos y maneja sus propias reservas
 */
class Libro {
    constructor(_titulo, _autor, _isbn) {
        this._titulo = _titulo;
        this._autor = _autor;
        this._isbn = _isbn;
        this._reservas = [];
    }
    get titulo() { return this._titulo; }
    get autor() { return this._autor; }
    get isbn() { return this._isbn; }
    get reservas() { return this._reservas; }
    // alguien reserva este libro
    agregarReserva(socio) {
        if (!this._reservas.includes(socio)) {
            this._reservas.push(socio);
        }
    }
    quitarPrimeraReserva() {
        return this._reservas.shift();
    }
}
exports.Libro = Libro;
//# sourceMappingURL=Libro.js.map