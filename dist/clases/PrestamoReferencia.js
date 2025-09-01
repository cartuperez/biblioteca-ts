"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrestamoReferencia = void 0;
const Prestamo_1 = require("./Prestamo");
class PrestamoReferencia extends Prestamo_1.Prestamo {
    constructor(libro, fechaPrestamo = new Date()) { super(libro, fechaPrestamo); }
    calcularVencimiento() {
        return new Date(this.fechaPrestamo.getFullYear(), this.fechaPrestamo.getMonth(), this.fechaPrestamo.getDate());
    }
    calcularMulta() { return 0; }
}
exports.PrestamoReferencia = PrestamoReferencia;
//# sourceMappingURL=PrestamoReferencia.js.map