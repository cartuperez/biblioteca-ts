import { Libro } from "./Libro";
import { Socio } from "./Socio";
import { Autor } from "./Autor";
import { EventoBiblioteca } from "./EventoBiblioteca";
/**
 * la clase principal que maneja toda la biblioteca
 * se controla los libros, socios, autores y eventos
 */
export declare class Biblioteca {
    private inventario;
    private socios;
    private autores;
    private eventos;
    private DURACION;
    agregarAutor(nombre: string, biografia: string, añoNacimiento: number): Autor;
    buscarAutor(nombre: string): Autor | undefined;
    agregarLibro(titulo: string, autor: Autor, isbn: string): Libro;
    buscarLibro(isbn: string): Libro | undefined;
    buscarLibrosPorAutor(nombreAutor: string): Libro[];
    registrarSocio(id: number, nombre: string, apellido: string): Socio;
    buscarSocio(id: number): Socio | undefined;
    crearEvento(nombre: string, fecha: Date, descripcion: string): EventoBiblioteca;
    buscarEvento(nombre: string): EventoBiblioteca | undefined;
    registrarEnEvento(socioId: number, eventoNombre: string): void;
    retirarLibro(socioId: number, libroISBN: string): void;
    devolverLibro(socioId: number, libroISBN: string): void;
    reservarLibro(socioId: number, libroISBN: string): void;
    sugerirLibros(socioId: number): Libro[];
    private libroEstaPrestado;
}
//# sourceMappingURL=Biblioteca.d.ts.map