import { Libro } from "./Libro";
import { Prestamo } from "./Prestamo";
/**
 * Cada socio de la biblioteca con su historial y estado
 */
export declare class Socio {
    private _id;
    private _nombre;
    private _apellido;
    private prestamos;
    private _deuda;
    private _historialLectura;
    constructor(_id: number, _nombre: string, _apellido: string);
    get id(): number;
    get nombre(): string;
    get apellido(): string;
    get nombreCompleto(): string;
    get deuda(): number;
    get historialLectura(): Libro[];
    retirar(libro: Libro, duracion: number): void;
    devolver(libro: Libro): void;
    tienePrestadoLibro(libro: Libro): Prestamo | undefined;
    saldarDeuda(): void;
}
//# sourceMappingURL=Socio.d.ts.map