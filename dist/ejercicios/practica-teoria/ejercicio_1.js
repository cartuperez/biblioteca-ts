"use strict";
class Ingrediente {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}
class Plato {
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