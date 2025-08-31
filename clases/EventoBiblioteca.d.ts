import { Socio } from "./Socio";
/**
 * se maneja todos los eventos que organizamos en la biblioteca
 */
export declare class EventoBiblioteca {
    private _nombre;
    private _fecha;
    private _descripcion;
    private _participantes;
    constructor(_nombre: string, _fecha: Date, _descripcion: string);
    get nombre(): string;
    get fecha(): Date;
    get descripcion(): string;
    get participantes(): Socio[];
    agregarParticipante(socio: Socio): void;
    notificarParticipantes(mensaje: string): void;
}
//# sourceMappingURL=EventoBiblioteca.d.ts.map