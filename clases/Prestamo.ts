import { Libro } from "./Libro";

/**
 * Representa cada préstamo individual
 */
export class Prestamo {
  constructor(public libro: Libro, public vencimiento: Date) {}
}