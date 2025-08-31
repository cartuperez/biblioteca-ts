"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Libro = void 0;
const Socio_1 = require("./Socio");
const Autor_1 = require("./Autor");
/**
 * Cada libro tiene sus datos básicos y maneja sus propias reservas
 */
class Libro {
    _titulo;
    _autor;
    _isbn;
    _reservas = [];
    constructor(_titulo, _autor, _isbn) {
        this._titulo = _titulo;
        this._autor = _autor;
        this._isbn = _isbn;
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