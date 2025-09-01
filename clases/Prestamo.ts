// clases/Prestamo.ts
import type { Libro } from "./Libro";

export abstract class Prestamo {
  constructor(
    public readonly libro: Libro,
    public readonly fechaPrestamo: Date = new Date()
  ) {}

  // Cada subtipo define esto:
  abstract calcularVencimiento(): Date | null;
  abstract calcularMulta(fechaDeDevolucion: Date, multaBasePorDia?: number): number;

  // Helper opcional por si lo querés usar en subclases
  protected diasEntre(a: Date, b: Date): number {
    const d1 = new Date(a.getFullYear(), a.getMonth(), a.getDate());
    const d2 = new Date(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24));
  }
}
