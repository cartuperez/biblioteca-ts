"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrestamoBasico = void 0;
// clases/PrestamoBasico.ts
const Prestamo_1 = require("./Prestamo");
class PrestamoBasico extends Prestamo_1.Prestamo {
    constructor(libro, vencimiento, fechaPrestamo = new Date()) {
        super(libro, fechaPrestamo);
        // normalizo a solo fecha
        this._vencimiento = new Date(vencimiento.getFullYear(), vencimiento.getMonth(), vencimiento.getDate());
    }
    calcularVencimiento() {
        return new Date(this._vencimiento);
    }
    calcularMulta(fechaDeDevolucion, multaBasePorDia = 50) {
        const dias = this.diasEntre(fechaDeDevolucion, this._vencimiento);
        return dias > 0 ? dias * multaBasePorDia : 0;
    }
}
exports.PrestamoBasico = PrestamoBasico;
//# sourceMappingURL=PrestamoBasico.js.map