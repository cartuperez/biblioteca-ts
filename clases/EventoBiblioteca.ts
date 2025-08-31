
import { Socio } from "./Socio";

/**
 * se maneja todos los eventos que organizamos en la biblioteca
 */
export class EventoBiblioteca {
  private _participantes: Socio[] = [];

  constructor(
    private _nombre: string,
    private _fecha: Date,
    private _descripcion: string
  ) {}

  get nombre(): string {
    return this._nombre;
  }

  get fecha(): Date {
    return this._fecha;
  }

  get descripcion(): string {
    return this._descripcion;
  }

  get participantes(): Socio[] {
    return this._participantes;
  }

  // Inscribimos gente a los eventos
  agregarParticipante(socio: Socio): void {
    if (!this._participantes.includes(socio)) {
      this._participantes.push(socio);
      console.log(`${socio.nombreCompleto} ya esta anotado/a en "${this.nombre}"`);
    } else {
      console.log(`${socio.nombreCompleto} ya está inscrito/a en este evento`);
    }
  }

  // Mandamos avisos a todos los participantes
  notificarParticipantes(mensaje: string): void {
    console.log(`\nAviso importante sobre "${this.nombre}":`);
    this._participantes.forEach(socio => {
      console.log(`  ${socio.nombreCompleto}: ${mensaje}`);
    });
  }
}