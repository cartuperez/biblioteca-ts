import { Socio } from "./Socio";
import { Autor } from "./Autor";

/**
 * Cada libro tiene sus datos básicos y maneja sus propias reservas
 */
export class Libro {
  private _reservas: Socio[] = [];

  constructor(
    private _titulo: string,
    private _autor: Autor,
    private _isbn: string
  ) {}

  get titulo(): string { return this._titulo; }
  get autor(): Autor { return this._autor; }
  get isbn(): string { return this._isbn; }
  get reservas(): Socio[] { return this._reservas; }

  // alguien reserva este libro
  agregarReserva(socio: Socio): void {
    if (!this._reservas.includes(socio)) {
      this._reservas.push(socio);
    }
  }

     quitarPrimeraReserva(): Socio | undefined {
    return this._reservas.shift();
  }
  
}