// clases/GestorPrestamos.ts
import type { PoliticaPrestamo, ContextoPrestamo, ResultadoPrestamo } from "./PoliticaPrestamo";

export class GestorPrestamos {
  private _politica: PoliticaPrestamo;
  constructor(politicaInicial: PoliticaPrestamo) {
    this._politica = politicaInicial;
  }
  setPolitica(p: PoliticaPrestamo) { this._politica = p; }
  evaluar(ctx: ContextoPrestamo): ResultadoPrestamo {
    return this._politica.evaluar(ctx);
  }
}
