"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GestorPrestamos = void 0;
class GestorPrestamos {
    constructor(politicaInicial) {
        this._politica = politicaInicial;
    }
    setPolitica(p) { this._politica = p; }
    evaluar(ctx) {
        return this._politica.evaluar(ctx);
    }
}
exports.GestorPrestamos = GestorPrestamos;
//# sourceMappingURL=GestorPrestamos.js.map