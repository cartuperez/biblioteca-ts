"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prestamo = void 0;
class Prestamo {
    constructor(libro, fechaPrestamo = new Date()) {
        this.libro = libro;
        this.fechaPrestamo = fechaPrestamo;
    }
    // Helper opcional por si lo querés usar en subclases
    diasEntre(a, b) {
        const d1 = new Date(a.getFullYear(), a.getMonth(), a.getDate());
        const d2 = new Date(b.getFullYear(), b.getMonth(), b.getDate());
        return Math.floor((d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24));
    }
}
exports.Prestamo = Prestamo;
//# sourceMappingURL=Prestamo.js.map