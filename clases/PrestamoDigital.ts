import { Prestamo } from "./Prestamo";
import type { Libro } from "./Libro";

export class PrestamoDigital extends Prestamo {
  constructor(libro: Libro, fechaPrestamo: Date = new Date()) { super(libro, fechaPrestamo); }

  calcularVencimiento(): null { return null; }
  calcularMulta(): number { return 0; }
}
