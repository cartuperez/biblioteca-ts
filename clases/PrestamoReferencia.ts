import { Prestamo } from "./Prestamo";
import type { Libro } from "./Libro";

export class PrestamoReferencia extends Prestamo {
  constructor(libro: Libro, fechaPrestamo: Date = new Date()) { super(libro, fechaPrestamo); }

  calcularVencimiento(): Date | null {
    return new Date(this.fechaPrestamo.getFullYear(), this.fechaPrestamo.getMonth(), this.fechaPrestamo.getDate());
  }

  calcularMulta(): number { return 0; }
}
