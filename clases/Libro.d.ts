import { Socio } from "./Socio";
import { Autor } from "./Autor";
/**
 * Cada libro tiene sus datos básicos y maneja sus propias reservas
 */
export declare class Libro {
    private _titulo;
    private _autor;
    private _isbn;
    private _reservas;
    constructor(_titulo: string, _autor: Autor, _isbn: string);
    get titulo(): string;
    get autor(): Autor;
    get isbn(): string;
    get reservas(): Socio[];
    agregarReserva(socio: Socio): void;
    quitarPrimeraReserva(): Socio | undefined;
}
//# sourceMappingURL=Libro.d.ts.map