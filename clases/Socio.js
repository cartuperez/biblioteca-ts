"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socio = void 0;
const Libro_1 = require("./Libro");
const Prestamo_1 = require("./Prestamo");
/**
 * Cada socio de la biblioteca con su historial y estado
 */
class Socio {
    _id;
    _nombre;
    _apellido;
    prestamos = [];
    _deuda = 0;
    _historialLectura = [];
    constructor(_id, _nombre, _apellido) {
        this._id = _id;
        this._nombre = _nombre;
        this._apellido = _apellido;
    }
    get id() { return this._id; }
    get nombre() { return this._nombre; }
    get apellido() { return this._apellido; }
    get nombreCompleto() { return `${this.nombre} ${this.apellido}`; }
    get deuda() { return this._deuda; }
    get historialLectura() { return this._historialLectura; }
    // se lleva un libro prestado
    retirar(libro, duracion) {
        const vencimiento = new Date();
        vencimiento.setDate(vencimiento.getDate() + duracion);
        this.prestamos.push(new Prestamo_1.Prestamo(libro, vencimiento));
    }
    // devuelve un libro
    devolver(libro) {
        const prestamo = this.prestamos.find((p) => p.libro.isbn === libro.isbn);
        if (!prestamo) {
            throw new Error("Este libro no está en tu lista de préstamos");
        }
        const hoy = new Date();
        if (hoy > prestamo.vencimiento) {
            const diasDeRetraso = Math.floor((hoy.getTime() - prestamo.vencimiento.getTime()) / (1000 * 60 * 60 * 24));
            const multa = diasDeRetraso * 50;
            this._deuda += multa;
            console.log(`${libro.titulo} se entregó ${diasDeRetraso} días tarde. Esto suma $${multa} a tu cuenta. Tu deuda total ahora es de $${this._deuda}`);
        }
        else {
            console.log(`Lo devolviste a tiempo`);
        }
        const indice = this.prestamos.indexOf(prestamo);
        this.prestamos.splice(indice, 1);
        this._historialLectura.push(libro);
        console.log(`"${libro.titulo}" se agregó a tu historial de lectura, ${this.nombreCompleto}`);
    }
    // Verificacion si tiene prestado un libro especifico
    tienePrestadoLibro(libro) {
        return this.prestamos.find((p) => p.libro.isbn === libro.isbn);
    }
    // Pagar las deudas pendientes
    saldarDeuda() {
        this._deuda = 0;
        console.log(`${this.nombreCompleto}, Tu deuda está saldada`);
    }
}
exports.Socio = Socio;
//# sourceMappingURL=Socio.js.map