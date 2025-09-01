// ejercicios/tarea3.ts
(() => {
  "use strict";

  // ===== Strategy: interfaz de política =====
  interface PoliticaPrestamo {
    evaluar(ctx: ContextoPrestamo): ResultadoPrestamo;
  }

  type ResultadoPrestamo = {
    ok: boolean;
    motivo?: string;
    periodoDias?: number;
    renovaciones?: number;
  };

  type ContextoPrestamo = {
    tieneVencidos: boolean;
    periodoBaseDias: number;
    esEpocaExamen: boolean;
  };

  // ===== Implementaciones =====

  // PoliticaEstricta: No permite préstamos si hay vencidos
  class PoliticaEstricta implements PoliticaPrestamo {
    evaluar(ctx: ContextoPrestamo): ResultadoPrestamo {
      if (ctx.tieneVencidos) {
        return { ok: false, motivo: "Hay préstamos vencidos: política estricta no permite nuevos." };
      }
      return { ok: true, periodoDias: ctx.periodoBaseDias };
    }
  }

  // PoliticaFlexible: permite pero reduce período si hay vencidos (mitad, mínimo 3)
  class PoliticaFlexible implements PoliticaPrestamo {
    evaluar(ctx: ContextoPrestamo): ResultadoPrestamo {
      if (ctx.tieneVencidos) {
        const reducido = Math.max(3, Math.floor(ctx.periodoBaseDias / 2));
        return { ok: true, periodoDias: reducido };
      }
      return { ok: true, periodoDias: ctx.periodoBaseDias };
    }
  }

  // PoliticaEstudiante: +7 días en época de exámenes
  class PoliticaEstudiante implements PoliticaPrestamo {
    evaluar(ctx: ContextoPrestamo): ResultadoPrestamo {
      const extra = ctx.esEpocaExamen ? 7 : 0;
      return { ok: true, periodoDias: ctx.periodoBaseDias + extra };
    }
  }

  // PoliticaDocente: +21 días y múltiples renovaciones (3)
  class PoliticaDocente implements PoliticaPrestamo {
    evaluar(_ctx: ContextoPrestamo): ResultadoPrestamo {
      return { ok: true, periodoDias: _ctx.periodoBaseDias + 21, renovaciones: 3 };
    }
  }

  // ===== Contexto (holder de la Strategy) =====
  class GestorPrestamos {
    private _politica: PoliticaPrestamo;
    constructor(politicaInicial: PoliticaPrestamo) { this._politica = politicaInicial; }
    setPolitica(p: PoliticaPrestamo) { this._politica = p; }
    evaluar(ctx: ContextoPrestamo): ResultadoPrestamo { return this._politica.evaluar(ctx); }
  }

  // ===== Demo local (encerrada en la IIFE; no contamina el global) =====
  const ctxBase: ContextoPrestamo = {
    tieneVencidos: false,
    periodoBaseDias: 14,
    esEpocaExamen: false
  };

  const gestor = new GestorPrestamos(new PoliticaEstricta());

  function probar(nombre: string, g: GestorPrestamos, ctx: ContextoPrestamo) {
    const r = g.evaluar(ctx);
    console.log(
      `${nombre}:`,
      r.ok
        ? `OK | periodo=${r.periodoDias} días${r.renovaciones ? " | renovaciones=" + r.renovaciones : ""}`
        : `NO | motivo=${r.motivo}`
    );
  }

  console.log("=== Caso normal (sin vencidos, sin exámenes) ===");
  probar("Estricta", gestor, ctxBase);

  gestor.setPolitica(new PoliticaFlexible());
  probar("Flexible", gestor, ctxBase);

  gestor.setPolitica(new PoliticaEstudiante());
  probar("Estudiante", gestor, ctxBase);

  gestor.setPolitica(new PoliticaDocente());
  probar("Docente", gestor, ctxBase);

  console.log("\n=== Con vencidos ===");
  const ctxVencidos: ContextoPrestamo = { ...ctxBase, tieneVencidos: true };
  gestor.setPolitica(new PoliticaEstricta());
  probar("Estricta", gestor, ctxVencidos);
  gestor.setPolitica(new PoliticaFlexible());
  probar("Flexible", gestor, ctxVencidos);

  console.log("\n=== Época de exámenes ===");
  const ctxExamen: ContextoPrestamo = { ...ctxBase, esEpocaExamen: true };
  gestor.setPolitica(new PoliticaEstudiante());
  probar("Estudiante", gestor, ctxExamen);
})();
