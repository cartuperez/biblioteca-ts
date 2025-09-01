import { Prestamo } from "./Prestamo";
import type { Libro } from "./Libro";

export class PrestamoCorto extends Prestamo {
  constructor(libro: Libro, fechaPrestamo: Date = new Date()) { super(libro, fechaPrestamo); }

  calcularVencimiento(): Date {
    const v = new Date(this.fechaPrestamo);
    v.setDate(v.getDate() + 7);
    return v;
  }

  calcularMulta(fechaDeDevolucion: Date, multaBasePorDia: number = 50): number {
    const d1 = new Date(fechaDeDevolucion.getFullYear(), fechaDeDevolucion.getMonth(), fechaDeDevolucion.getDate());
    const vto = this.calcularVencimiento();
    const d2 = new Date(vto.getFullYear(), vto.getMonth(), vto.getDate());
    const dias = Math.floor((d1.getTime() - d2.getTime()) / (1000*60*60*24));
    return dias > 0 ? dias * (multaBasePorDia * 2) : 0; // doble
  }
}
