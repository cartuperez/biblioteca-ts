"use strict";
class ContadorSimple {
    constructor() {
        this.valor = 0;
    }
    incrementar() {
        if (this.valor < 10) {
            this.valor++;
            if (this.valor === 10) {
                console.log(`¡Límite alcanzado! No se puede incrementar más. Valor: ${this.valor}`);
            }
            else {
                console.log(`Contó: ${this.valor}`);
            }
        }
    }
}
const contadorSimple = new ContadorSimple();
// Llamar 10 veces para alcanzar el límite
for (let i = 0; i < 10; i++) {
    contadorSimple.incrementar();
}
//# sourceMappingURL=ejercicio1.js.map