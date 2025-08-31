"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ingrediente {
    nombre;
    precio;
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}
class Plato {
    nombre;
    ingredientes;
    constructor(nombre, ingredientes) {
        this.nombre = nombre;
        this.ingredientes = ingredientes;
    }
    get costo() {
        return this.ingredientes.reduce((total, ing) => {
            if (ing instanceof Ingrediente) {
                return total + ing.precio;
            }
            else if (ing instanceof Plato) {
                return total + ing.costo;
            }
            return total;
        }, 0);
    }
}
//# sourceMappingURL=ejercicio_1.js.map