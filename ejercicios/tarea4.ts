// ejercicios/tarea4.ts
(() => {
  "use strict";

  // ─────────────────────────────────────────────
  //  IBuscable: interfaz común de búsqueda
  // ─────────────────────────────────────────────
  interface IBuscable<T = any> {
    buscarPor(criterio: string): T[];
    filtrar(condicion: (item: T) => boolean): T[];
  }

  // Tipo simple para los ejemplos
  type Item = {
    id: string;
    titulo: string;
    autor?: string;
    anio?: number;
    etiquetas?: string[];
    fuente: string; // origen (catálogo, digital, etc.)
  };

  const contiene = (texto: string, frag: string) =>
    texto.toLowerCase().includes(frag.toLowerCase());

  // ─────────────────────────────────────────────
  //  Implementaciones de IBuscable
  // ─────────────────────────────────────────────

  // 1) CatalogoBiblioteca: libros físicos
  class CatalogoBiblioteca implements IBuscable<Item> {
    constructor(private readonly datos: Item[]) {}
    buscarPor(criterio: string): Item[] {
      return this.datos.filter(
        (x) =>
          contiene(x.titulo, criterio) ||
          (x.autor ? contiene(x.autor, criterio) : false) ||
          (x.etiquetas ?? []).some((e) => contiene(e, criterio))
      );
    }
    filtrar(condicion: (item: Item) => boolean): Item[] {
      return this.datos.filter(condicion);
    }
  }

  // 2) BibliotecaDigital: recursos online
  class BibliotecaDigital implements IBuscable<Item> {
    constructor(private readonly recursos: Item[]) {}
    buscarPor(criterio: string): Item[] {
      return this.recursos.filter(
        (x) =>
          contiene(x.titulo, criterio) ||
          (x.etiquetas ?? []).some((e) => contiene(e, criterio))
      );
    }
    filtrar(condicion: (item: Item) => boolean): Item[] {
      return this.recursos.filter(condicion);
    }
  }

  // 3) ArchivoHistorico: documentos antiguos
  class ArchivoHistorico implements IBuscable<Item> {
    constructor(private readonly documentos: Item[]) {}
    buscarPor(criterio: string): Item[] {
      return this.documentos.filter(
        (x) =>
          contiene(x.titulo, criterio) ||
          (x.autor ? contiene(x.autor, criterio) : false)
      );
    }
    filtrar(condicion: (item: Item) => boolean): Item[] {
      return this.documentos.filter(condicion);
    }
  }

  // 4) BaseConocimiento: artículos académicos
  class BaseConocimiento implements IBuscable<Item> {
    constructor(private readonly articulos: Item[]) {}
    buscarPor(criterio: string): Item[] {
      return this.articulos.filter(
        (x) =>
          contiene(x.titulo, criterio) ||
          (x.etiquetas ?? []).some((e) => contiene(e, criterio))
      );
    }
    filtrar(condicion: (item: Item) => boolean): Item[] {
      return this.articulos.filter(condicion);
    }
  }

  // ─────────────────────────────────────────────
  //  BuscadorUniversal: compone múltiples IBuscable
  // ─────────────────────────────────────────────
  class BuscadorUniversal<T = any> {
    private fuentes: IBuscable<T>[] = [];
    agregarFuente(f: IBuscable<T>): void { this.fuentes.push(f); }
    buscarPor(criterio: string): T[] { return this.fuentes.flatMap((f) => f.buscarPor(criterio)); }
    filtrar(condicion: (item: T) => boolean): T[] { return this.fuentes.flatMap((f) => f.filtrar(condicion)); }
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

  const buscador = new BuscadorUniversal<Item>();
  buscador.agregarFuente(catalogo);
  buscador.agregarFuente(digital);
  buscador.agregarFuente(historico);
  buscador.agregarFuente(conocimiento);

  console.log("=== Buscar por 'code' ===");
  console.log(buscador.buscarPor("code"));

  console.log("\n=== Buscar por 'busqueda' ===");
  console.log(buscador.buscarPor("busqueda"));

  console.log("\n=== Filtrar por año < 2000 ===");
  console.log(buscador.filtrar((x) => (x as Item).anio ? (x as Item).anio! < 2000 : false));
})();
