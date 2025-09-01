"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrestamoDigital = void 0;
const Prestamo_1 = require("./Prestamo");
class PrestamoDigital extends Prestamo_1.Prestamo {
    constructor(libro, fechaPrestamo = new Date()) { super(libro, fechaPrestamo); }
    calcularVencimiento() { return null; }
    calcularMulta() { return 0; }
}
exports.PrestamoDigital = PrestamoDigital;
//# sourceMappingURL=PrestamoDigital.js.map