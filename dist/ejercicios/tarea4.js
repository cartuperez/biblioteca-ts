"use strict";
// ejercicios/tarea4.ts
(() => {
    "use strict";
    const contiene = (texto, frag) => texto.toLowerCase().includes(frag.toLowerCase());
    // ─────────────────────────────────────────────
    //  Implementaciones de IBuscable
    // ─────────────────────────────────────────────
    // 1) CatalogoBiblioteca: libros físicos
    class CatalogoBiblioteca {
        constructor(datos) {
            this.datos = datos;
        }
        buscarPor(criterio) {
            return this.datos.filter((x) => contiene(x.titulo, criterio) ||
                (x.autor ? contiene(x.autor, criterio) : false) ||
                (x.etiquetas ?? []).some((e) => contiene(e, criterio)));
        }
        filtrar(condicion) {
            return this.datos.filter(condicion);
        }
    }
    // 2) BibliotecaDigital: recursos online
    class BibliotecaDigital {
        constructor(recursos) {
            this.recursos = recursos;
        }
        buscarPor(criterio) {
            return this.recursos.filter((x) => contiene(x.titulo, criterio) ||
                (x.etiquetas ?? []).some((e) => contiene(e, criterio)));
        }
        filtrar(condicion) {
            return this.recursos.filter(condicion);
        }
    }
    // 3) ArchivoHistorico: documentos antiguos
    class ArchivoHistorico {
        constructor(documentos) {
            this.documentos = documentos;
        }
        buscarPor(criterio) {
            return this.documentos.filter((x) => contiene(x.titulo, criterio) ||
                (x.autor ? contiene(x.autor, criterio) : false));
        }
        filtrar(condicion) {
            return this.documentos.filter(condicion);
        }
    }
    // 4) BaseConocimiento: artículos académicos
    class BaseConocimiento {
        constructor(articulos) {
            this.articulos = articulos;
        }
        buscarPor(criterio) {
            return this.articulos.filter((x) => contiene(x.titulo, criterio) ||
                (x.etiquetas ?? []).some((e) => contiene(e, criterio)));
        }
        filtrar(condicion) {
            return this.articulos.filter(condicion);
        }
    }
    // ─────────────────────────────────────────────
    //  BuscadorUniversal: compone múltiples IBuscable
    // ─────────────────────────────────────────────
    class BuscadorUniversal {
        constructor() {
            this.fuentes = [];
        }
        agregarFuente(f) { this.fuentes.push(f); }
        buscarPor(criterio) { return this.fuentes.flatMap((f) => f.buscarPor(criterio)); }
        filtrar(condicion) { return this.fuentes.flatMap((f) => f.filtrar(condicion)); }
    }
    // ─────────────────────────────────────────────
    //  DEMO — datos mock (no tocan tus clases reales)
    // ─────────────────────────────────────────────
    const catalogo = new CatalogoBiblioteca([
        { id: "L1", titulo: "Estructuras de Datos", autor: "Aho", anio: 1990, etiquetas: ["algoritmos"], fuente: "catalogo" },
        { id: "L2", titulo: "Clean Code", autor: "Robert C. Martin", anio: 2008, etiquetas: ["practicas", "codigo"], fuente: "catalogo" },
    ]);
    const digital = new BibliotecaDigital([
        { id: "D1", titulo: "Intro a TypeScript (PDF)", etiquetas: ["typescript", "ts"], fuente: "digital" },
        { id: "D2", titulo: "Patrones de Diseño (ebook)", etiquetas: ["design-patterns", "oop"], fuente: "digital" },
    ]);
    const historico = new ArchivoHistorico([
        { id: "H1", titulo: "Actas de Biblioteca 1952", autor: "Dirección", anio: 1952, fuente: "historico" },
        { id: "H2", titulo: "Registro de préstamos 1968", autor: "Archivo", anio: 1968, fuente: "historico" },
    ]);
    const conocimiento = new BaseConocimiento([
        { id: "B1", titulo: "Indexación en Motores de Búsqueda", etiquetas: ["IR", "busqueda"], fuente: "base" },
        { id: "B2", titulo: "Evaluación de Recomendadores", etiquetas: ["recsys", "metricas"], fuente: "base" },
    ]);
    const buscador = new BuscadorUniversal();
    buscador.agregarFuente(catalogo);
    buscador.agregarFuente(digital);
    buscador.agregarFuente(historico);
    buscador.agregarFuente(conocimiento);
    console.log("=== Buscar por 'code' ===");
    console.log(buscador.buscarPor("code"));
    console.log("\n=== Buscar por 'busqueda' ===");
    console.log(buscador.buscarPor("busqueda"));
    console.log("\n=== Filtrar por año < 2000 ===");
    console.log(buscador.filtrar((x) => x.anio ? x.anio < 2000 : false));
})();
//# sourceMappingURL=tarea4.js.map