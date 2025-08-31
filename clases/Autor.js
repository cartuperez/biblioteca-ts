"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autor = void 0;
class Autor {
    _nombre;
    _biografia;
    _añoNacimiento;
    constructor(_nombre, _biografia, _añoNacimiento) {
        this._nombre = _nombre;
        this._biografia = _biografia;
        this._añoNacimiento = _añoNacimiento;
    }
    get nombre() {
        return this._nombre;
    }
    get biografia() {
        return this._biografia;
    }
    get añoNacimiento() {
        return this._añoNacimiento;
    }
}
exports.Autor = Autor;
//# sourceMappingURL=Autor.js.map