"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let numero = 1;
const ejercicio = {
    texto: "Hola, TypeScript!"
};
function incrementarNumero(cantidad) {
    numero += cantidad;
}
;
console.log("hola mundo");
console.log(ejercicio.texto);
incrementarNumero(5);
console.log(`El número es: ${numero}`);
class Contador {
    static contadores = [];
    cuenta;
    constructor(inicial = 0) {
        this.cuenta = inicial;
    }
    incrementar() {
        this.cuenta++;
    }
}
const lista = [1, 2, 3, 4, 5];
console.log(lista);
//# sourceMappingURL=ejercicio0.js.map