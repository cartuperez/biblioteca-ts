"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socio = void 0;
const PrestamoBasico_1 = require("./PrestamoBasico");
const PrestamoRegular_1 = require("./PrestamoRegular");
const PrestamoCorto_1 = require("./PrestamoCorto");
const PrestamoReferencia_1 = require("./PrestamoReferencia");
const PrestamoDigital_1 = require("./PrestamoDigital");
/**
 * Cada socio de la biblioteca con su historial y estado
 */
class Socio {
    constructor(_id, _nombre, _apellido) {
        this._id = _id;
        this._nombre = _nombre;
        this._apellido = _apellido;
        this.prestamos = [];
        this._deuda = 0;
        this._historialLectura = [];
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
        this.prestamos.push(new PrestamoBasico_1.PrestamoBasico(libro, vencimiento));
    }
    // devuelve un libro
    devolver(libro) {
        const prestamo = this.prestamos.find((p) => p.libro.isbn === libro.isbn);
        if (!prestamo) {
            throw new Error("Este libro no está en tu lista de préstamos");
        }
        const hoy = new Date();
        const multa = prestamo.calcularMulta(hoy, 50); // se usa polimorfismo ahora
        if (multa > 0) {
            this._deuda += multa;
            console.log(`${libro.titulo} se entregó tarde. Esto suma $${multa} a tu cuenta. Tu deuda total ahora es de $${this._deuda}`);
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
    retirarConTipo(libro, tipo) {
        let p;
        switch (tipo) {
            case "regular":
                p = new PrestamoRegular_1.PrestamoRegular(libro);
                break;
            case "corto":
                p = new PrestamoCorto_1.PrestamoCorto(libro);
                break;
            case "referencia":
                p = new PrestamoReferencia_1.PrestamoReferencia(libro);
                break;
            case "digital":
                p = new PrestamoDigital_1.PrestamoDigital(libro);
                break;
        }
        this.prestamos.push(p);
    }
    tieneVencidosAl(fecha) {
        return this.prestamos.some(p => {
            const vto = p.calcularVencimiento();
            if (!vto)
                return false; // digital o referencia no vencen
            const vtoNormalizado = new Date(vto.getFullYear(), vto.getMonth(), vto.getDate());
            const fechaNormalizada = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
            return vtoNormalizado.getTime() < fechaNormalizada.getTime();
        });
    }
}
exports.Socio = Socio;
//# sourceMappingURL=Socio.js.map