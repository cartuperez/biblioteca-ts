"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Biblioteca = void 0;
const Libro_1 = require("./Libro");
const Socio_1 = require("./Socio");
const Autor_1 = require("./Autor");
const EventoBiblioteca_1 = require("./EventoBiblioteca");
const GestorPrestamos_1 = require("./GestorPrestamos");
const PoliticaPrestamo_1 = require("./PoliticaPrestamo");
/**
 * la clase principal que maneja toda la biblioteca
 * se controla los libros, socios, autores y eventos
 */
class Biblioteca {
    constructor() {
        this.inventario = [];
        this.socios = [];
        this.autores = [];
        this.eventos = [];
        this.DURACION = 14; // Los libros se prestan por 2 semanas, se puede cambiar
        this.gestorPrestamos = new GestorPrestamos_1.GestorPrestamos(new PoliticaPrestamo_1.PoliticaEstricta());
    }
    // funciones para manejar autores
    agregarAutor(nombre, biografia, añoNacimiento) {
        const autorCreado = new Autor_1.Autor(nombre, biografia, añoNacimiento);
        this.autores.push(autorCreado);
        return autorCreado;
    }
    buscarAutor(nombre) {
        return this.autores.find(autor => autor.nombre === nombre);
    }
    // relacionado con los libros
    agregarLibro(titulo, autor, isbn) {
        const libroCreado = new Libro_1.Libro(titulo, autor, isbn);
        this.inventario.push(libroCreado);
        return libroCreado;
    }
    buscarLibro(isbn) {
        return this.inventario.find((libro) => libro.isbn === isbn);
    }
    buscarLibrosPorAutor(nombreAutor) {
        const autorEncontrado = this.buscarAutor(nombreAutor);
        if (!autorEncontrado) {
            return [];
        }
        return this.inventario.filter(libro => libro.autor.nombre === nombreAutor);
    }
    // registrar y buscar socios
    registrarSocio(id, nombre, apellido) {
        const socioCreado = new Socio_1.Socio(id, nombre, apellido);
        this.socios.push(socioCreado);
        return socioCreado;
    }
    buscarSocio(id) {
        return this.socios.find((socio) => socio.id === id);
    }
    // eventos para la comunidad
    crearEvento(nombre, fecha, descripcion) {
        const nuevoEvento = new EventoBiblioteca_1.EventoBiblioteca(nombre, fecha, descripcion);
        this.eventos.push(nuevoEvento);
        return nuevoEvento;
    }
    buscarEvento(nombre) {
        return this.eventos.find(evento => evento.nombre === nombre);
    }
    registrarEnEvento(socioId, eventoNombre) {
        const socio = this.buscarSocio(socioId);
        const evento = this.buscarEvento(eventoNombre);
        if (!socio)
            throw new Error("No pudimos encontrar ese socio");
        if (!evento)
            throw new Error("El evento no existe");
        evento.agregarParticipante(socio);
    }
    //el corazon de todo, préstamos y devoluciones
    retirarLibro(socioId, libroISBN) {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBN);
        if (!socio)
            throw new Error("No encontramos ese socio en nuestro sistema");
        if (!libro)
            throw new Error("Ese libro no está en nuestro catálogo");
        if (socio.deuda > 0) {
            throw new Error(`${socio.nombreCompleto}, tenés una deuda de $${socio.deuda} pendiente. Primero necesitás saldarla para poder llevarte libros`);
        }
        if (this.libroEstaPrestado(libro)) {
            throw new Error(`"${libro.titulo}" ya está prestado, pero podés reservarlo si querés`);
        }
        socio.retirar(libro, this.DURACION);
        console.log(`oka, ${socio.nombreCompleto} se llevó "${libro.titulo}"`);
    }
    devolverLibro(socioId, libroISBN) {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBN);
        if (!socio)
            throw new Error("No encontramos ese socio");
        if (!libro)
            throw new Error("Ese libro no existe");
        socio.devolver(libro);
        console.log(`${socio.nombreCompleto} Ya recibimos "${libro.titulo}" de vuelta.`);
        const siguienteSocio = libro.quitarPrimeraReserva();
        if (siguienteSocio) {
            console.log(`${siguienteSocio.nombreCompleto}, el libro "${libro.titulo}" que reservaste ya está disponible`);
        }
    }
    reservarLibro(socioId, libroISBN) {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBN);
        if (!socio)
            throw new Error("No encontramos ese socio");
        if (!libro)
            throw new Error("Ese libro no existe");
        if (this.libroEstaPrestado(libro)) {
            libro.agregarReserva(socio);
            console.log(`Listo ${socio.nombreCompleto}, reservamos "${libro.titulo}" para vos`);
        }
        else {
            console.log(`"${libro.titulo}" está disponible ahora mismo`);
        }
    }
    // sist de recomendaciones
    sugerirLibros(socioId) {
        const socio = this.buscarSocio(socioId);
        if (!socio) {
            console.log("No encontramos ese socio para hacerle recomendaciones");
            return [];
        }
        const historial = socio.historialLectura;
        if (historial.length === 0) {
            console.log("Todavía no leíste nada con nosotros, así que no podemos recomendarte libros aún");
            return [];
        }
        const recomendaciones = [];
        const autoresLeidos = new Set();
        historial.forEach(libro => {
            autoresLeidos.add(libro.autor);
        });
        this.inventario.forEach(libroInventario => {
            if (autoresLeidos.has(libroInventario.autor) && !historial.includes(libroInventario)) {
                recomendaciones.push(libroInventario);
            }
        });
        return recomendaciones;
    }
    // una funcion auxiliar para verificar disponibilidad
    libroEstaPrestado(libro) {
        return this.socios.some(socio => socio.tienePrestadoLibro(libro));
    }
    retirarLibroTipo(socioId, libroISBN, tipo) {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBN);
        if (!socio)
            throw new Error("No encontramos ese socio en nuestro sistema");
        if (!libro)
            throw new Error("Ese libro no está en nuestro catálogo");
        if (socio.deuda > 0) {
            throw new Error(`${socio.nombreCompleto}, tenés una deuda de $${socio.deuda} pendiente.`);
        }
        if (this["libroEstaPrestado"](libro)) {
            throw new Error(`"${libro.titulo}" ya está prestado, pero podés reservarlo si querés`);
        }
        socio.retirarConTipo(libro, tipo);
        console.log(`oka, ${socio.nombreCompleto} se llevó "${libro.titulo}" (${tipo})`);
    }
    setPoliticaPrestamo(tipo) {
        switch (tipo) {
            case "estricta":
                this.gestorPrestamos.setPolitica(new PoliticaPrestamo_1.PoliticaEstricta());
                break;
            case "flexible":
                this.gestorPrestamos.setPolitica(new PoliticaPrestamo_1.PoliticaFlexible());
                break;
            case "estudiante":
                this.gestorPrestamos.setPolitica(new PoliticaPrestamo_1.PoliticaEstudiante());
                break;
            case "docente":
                this.gestorPrestamos.setPolitica(new PoliticaPrestamo_1.PoliticaDocente());
                break;
        }
        console.log(`Política de préstamo activa: ${tipo}`);
    }
    retirarLibroTipoConPolitica(socioId, libroISBN, tipo, esEpocaExamen = false) {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBN);
        if (!socio)
            throw new Error("No encontramos ese socio en nuestro sistema");
        if (!libro)
            throw new Error("Ese libro no está en nuestro catálogo");
        if (socio.deuda > 0) {
            throw new Error(`${socio.nombreCompleto}, tenés una deuda de $${socio.deuda} pendiente. Primero necesitás saldarla para poder llevarte libros`);
        }
        if (this["libroEstaPrestado"](libro)) {
            throw new Error(`"${libro.titulo}" ya está prestado, pero podés reservarlo si querés`);
        }
        // Base por tipo
        const periodoBase = tipo === "regular" ? 14 :
            tipo === "corto" ? 7 :
                0; // referencia/digital no usan período
        const hoy = new Date();
        const ctx = {
            tieneVencidos: socio.tieneVencidosAl(hoy),
            periodoBaseDias: periodoBase,
            esEpocaExamen
        };
        const res = this.gestorPrestamos.evaluar(ctx);
        if (!res.ok) {
            throw new Error(res.motivo || "Préstamo no permitido por la política actual");
        }
        // Aplicación:
        // - Para regular/corto: usamos tu método existente `retirar(libro, duracion)`
        //   con el período que dictó la política (res.periodoDias).
        // - Para referencia/digital: usamos retirarConTipo que ya creaste.
        if (tipo === "regular" || tipo === "corto") {
            const dias = res.periodoDias ?? periodoBase;
            socio.retirar(libro, dias); // usa PrestamoBasico con el vencimiento ajustado por la política
        }
        else {
            socio.retirarConTipo(libro, tipo); // referencia/digital (sin multa ni límite)
        }
        console.log(`oka, ${socio.nombreCompleto} se llevó "${libro.titulo}" (${tipo}) con política aplicada`);
    }
}
exports.Biblioteca = Biblioteca;
//# sourceMappingURL=Biblioteca.js.map