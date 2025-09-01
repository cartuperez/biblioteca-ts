// clases/PrestamoBasico.ts
import { Prestamo } from "./Prestamo";
import type { Libro } from "./Libro";

export class PrestamoBasico extends Prestamo {
  private readonly _vencimiento: Date;

  constructor(libro: Libro, vencimiento: Date, fechaPrestamo: Date = new Date()) {
    super(libro, fechaPrestamo);
    // normalizo a solo fecha
    this._vencimiento = new Date(
      vencimiento.getFullYear(),
      vencimiento.getMonth(),
      vencimiento.getDate()
    );
  }

  calcularVencimiento(): Date {
    return new Date(this._vencimiento);
  }

  calcularMulta(fechaDeDevolucion: Date, multaBasePorDia: number = 50): number {
    const dias = this.diasEntre(fechaDeDevolucion, this._vencimiento);
    return dias > 0 ? dias * multaBasePorDia : 0;
  }
}
