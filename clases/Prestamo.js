"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prestamo = void 0;
const Libro_1 = require("./Libro");
/**
 * Representa cada préstamo individual
 */
class Prestamo {
    libro;
    vencimiento;
    constructor(libro, vencimiento) {
        this.libro = libro;
        this.vencimiento = vencimiento;
    }
}
exports.Prestamo = Prestamo;
//# sourceMappingURL=Prestamo.js.map