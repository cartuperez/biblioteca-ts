"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventoBiblioteca = void 0;
const Socio_1 = require("./Socio");
/**
 * se maneja todos los eventos que organizamos en la biblioteca
 */
class EventoBiblioteca {
    _nombre;
    _fecha;
    _descripcion;
    _participantes = [];
    constructor(_nombre, _fecha, _descripcion) {
        this._nombre = _nombre;
        this._fecha = _fecha;
        this._descripcion = _descripcion;
    }
    get nombre() {
        return this._nombre;
    }
    get fecha() {
        return this._fecha;
    }
    get descripcion() {
        return this._descripcion;
    }
    get participantes() {
        return this._participantes;
    }
    // Inscribimos gente a los eventos
    agregarParticipante(socio) {
        if (!this._participantes.includes(socio)) {
            this._participantes.push(socio);
            console.log(`${socio.nombreCompleto} ya esta anotado/a en "${this.nombre}"`);
        }
        else {
            console.log(`${socio.nombreCompleto} ya está inscrito/a en este evento`);
        }
    }
    // Mandamos avisos a todos los participantes
    notificarParticipantes(mensaje) {
        console.log(`\nAviso importante sobre "${this.nombre}":`);
        this._participantes.forEach(socio => {
            console.log(`  ${socio.nombreCompleto}: ${mensaje}`);
        });
    }
}
exports.EventoBiblioteca = EventoBiblioteca;
//# sourceMappingURL=EventoBiblioteca.js.map