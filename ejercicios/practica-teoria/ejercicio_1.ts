class Ingrediente {
    nombre: string;
    precio: number;

    constructor(nombre: string, precio: number) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

class Plato {
    nombre: string;
    ingredientes: (Ingrediente | Plato)[];

    constructor(nombre: string, ingredientes: (Ingrediente | Plato)[]) {
        this.nombre = nombre;
        this.ingredientes = ingredientes;
    }


    get costo(): number {
        return this.ingredientes.reduce((total, ing) => {
            if (ing instanceof Ingrediente) {
                return total + ing.precio;
            } else if (ing instanceof Plato) {
                return total + ing.costo;
            }
            return total;
        }, 0);
    }
}