"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ejercicios/tarea2.ts
const Prestamo_1 = require("../clases/Prestamo");
class PrestamoRegular extends Prestamo_1.Prestamo {
    calcularVencimiento() {
        const v = new Date(this.fechaPrestamo);
        v.setDate(v.getDate() + 14);
        return v;
    }
    calcularMulta(fechaDeDevolucion, multaBasePorDia = 50) {
        const vto = this.calcularVencimiento();
        const finDev = new Date(fechaDeDevolucion.getFullYear(), fechaDeDevolucion.getMonth(), fechaDeDevolucion.getDate());
        const finVto = new Date(vto.getFullYear(), vto.getMonth(), vto.getDate());
        const dias = Math.floor((finDev.getTime() - finVto.getTime()) / (1000 * 60 * 60 * 24));
        return dias > 0 ? dias * multaBasePorDia : 0; // multa estándar
    }
}
class PrestamoCorto extends Prestamo_1.Prestamo {
    calcularVencimiento() {
        const v = new Date(this.fechaPrestamo);
        v.setDate(v.getDate() + 7);
        return v;
    }
    calcularMulta(fechaDeDevolucion, multaBasePorDia = 50) {
        const vto = this.calcularVencimiento();
        const finDev = new Date(fechaDeDevolucion.getFullYear(), fechaDeDevolucion.getMonth(), fechaDeDevolucion.getDate());
        const finVto = new Date(vto.getFullYear(), vto.getMonth(), vto.getDate());
        const dias = Math.floor((finDev.getTime() - finVto.getTime()) / (1000 * 60 * 60 * 24));
        return dias > 0 ? dias * (multaBasePorDia * 2) : 0; // multa doble
    }
}
class PrestamoReferencia extends Prestamo_1.Prestamo {
    calcularVencimiento() {
        // Solo consulta en sala. Podrías devolver null; dejo misma fecha para que “exista” un vto visible
        return new Date(this.fechaPrestamo.getFullYear(), this.fechaPrestamo.getMonth(), this.fechaPrestamo.getDate());
    }
    calcularMulta(_fechaDeDevolucion, _multaBasePorDia = 50) {
        return 0;
    }
}
class PrestamoDigital extends Prestamo_1.Prestamo {
    calcularVencimiento() {
        return null; // Sin límite
    }
    calcularMulta(_fechaDeDevolucion, _multaBasePorDia = 50) {
        return 0;
    }
}
const hoy = new Date();
const hace10 = new Date();
hace10.setDate(hoy.getDate() - 10);
const fakeLibro = { titulo: "Demo", isbn: "123-XYZ" };
const reg = new PrestamoRegular(fakeLibro, hace10);
const cor = new PrestamoCorto(fakeLibro, hace10);
const ref = new PrestamoReferencia(fakeLibro, hoy);
const dig = new PrestamoDigital(fakeLibro, hoy);
console.log("Regular vence:", reg.calcularVencimiento()?.toDateString());
console.log("Corto   vence:", cor.calcularVencimiento()?.toDateString());
console.log("Ref     vence:", ref.calcularVencimiento()?.toDateString());
console.log("Digital vence:", dig.calcularVencimiento());
console.log("Multa Regular hoy :", reg.calcularMulta(hoy));
console.log("Multa Corto   hoy :", cor.calcularMulta(hoy));
console.log("Multa Ref      hoy :", ref.calcularMulta(hoy));
console.log("Multa Digital  hoy :", dig.calcularMulta(hoy));
//# sourceMappingURL=tarea2.js.map