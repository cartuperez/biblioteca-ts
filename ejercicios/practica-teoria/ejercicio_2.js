"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Parte {
    numero;
    descripcion;
    precioUnitario;
    constructor(numero, descripcion, precioUnitario) {
        this.numero = numero;
        this.descripcion = descripcion;
        this.precioUnitario = precioUnitario;
    }
    obtenerPrecio() {
        return this.precioUnitario;
    }
}
class Bicicleta {
    numero;
    descripcion;
    partes;
    constructor(numero, descripcion, partes) {
        this.numero = numero;
        this.descripcion = descripcion;
        this.partes = [];
    }
    agregarParte(parte) {
        this.partes.push(parte);
    }
    obtenerPrecio() {
        return this.partes.reduce((total, parte) => total + parte.obtenerPrecio(), 0);
    }
}
class Oferta {
    numero;
    descripcion;
    elementos;
    descuento;
    constructor(numero, descripcion, descuento) {
        this.numero = numero;
        this.descripcion = descripcion;
        this.descuento = descuento;
        this.elementos = [];
    }
    agregarElemento(elemento) {
        this.elementos.push(elemento);
    }
    obtenerPrecio() {
        const total = this.elementos.reduce((sum, elem) => sum + elem.obtenerPrecio(), 0);
        return total - (total * this.descuento / 100);
    }
}
//# sourceMappingURL=ejercicio_2.js.map