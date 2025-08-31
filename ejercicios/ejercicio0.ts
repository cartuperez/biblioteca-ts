type TipoEjercicio = {
    texto: string;
};

let numero = 1;
const ejercicio: TipoEjercicio = {
    texto: "Hola, TypeScript!"
}; 

function incrementarNumero(cantidad: number): void {
    numero += cantidad;
};

console.log("hola mundo");
console.log(ejercicio.texto);
incrementarNumero(5);
console.log(`El número es: ${numero}`);

class Contador{
    static contadores: Contador[] = [];
    cuenta: number;

    constructor(inicial: number = 0) {
        this.cuenta = inicial;
    }
    incrementar() {
        this.cuenta++;
    }
}

const lista = [1, 2, 3, 4, 5];
console.log(lista);