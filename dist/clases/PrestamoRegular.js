"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrestamoRegular = void 0;
const Prestamo_1 = require("./Prestamo");
class PrestamoRegular extends Prestamo_1.Prestamo {
    constructor(libro, fechaPrestamo = new Date()) { super(libro, fechaPrestamo); }
    calcularVencimiento() {
        const v = new Date(this.fechaPrestamo);
        v.setDate(v.getDate() + 14);
        return v;
    }
    calcularMulta(fechaDeDevolucion, multaBasePorDia = 50) {
        const d1 = new Date(fechaDeDevolucion.getFullYear(), fechaDeDevolucion.getMonth(), fechaDeDevolucion.getDate());
        const vto = this.calcularVencimiento();
        const d2 = new Date(vto.getFullYear(), vto.getMonth(), vto.getDate());
        const dias = Math.floor((d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24));
        return dias > 0 ? dias * multaBasePorDia : 0;
    }
}
exports.PrestamoRegular = PrestamoRegular;
//# sourceMappingURL=PrestamoRegular.js.map