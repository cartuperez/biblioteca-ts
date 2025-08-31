"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cliente {
    cuit;
    nombre;
    apellido;
    direccion;
    constructor(cuit, nombre, apellido, direccion) {
        this.cuit = cuit;
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
    }
}
class Beneficiario extends Cliente {
    numeroCuentaDebito;
    gastoMensual;
    constructor(cuit, nombre, apellido, direccion, numeroCuentaDebito, gastoMensual) {
        super(cuit, nombre, apellido, direccion);
        this.numeroCuentaDebito = numeroCuentaDebito;
        this.gastoMensual = gastoMensual;
    }
    gastar(monto) {
        this.gastoMensual += monto;
    }
}
class Afiliado extends Cliente {
    numeroCuentaCredito;
    constructor(cuit, nombre, apellido, direccion, numeroCuentaCredito) {
        super(cuit, nombre, apellido, direccion);
        this.numeroCuentaCredito = numeroCuentaCredito;
    }
    registrarCompra(monto) {
    }
}
//# sourceMappingURL=ejercicio_3.js.map