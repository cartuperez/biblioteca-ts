"use strict";
// ejercicios/tarea3.ts
(() => {
    "use strict";
    // ===== Implementaciones =====
    // PoliticaEstricta: No permite préstamos si hay vencidos
    class PoliticaEstricta {
        evaluar(ctx) {
            if (ctx.tieneVencidos) {
                return { ok: false, motivo: "Hay préstamos vencidos: política estricta no permite nuevos." };
            }
            return { ok: true, periodoDias: ctx.periodoBaseDias };
        }
    }
    // PoliticaFlexible: permite pero reduce período si hay vencidos (mitad, mínimo 3)
    class PoliticaFlexible {
        evaluar(ctx) {
            if (ctx.tieneVencidos) {
                const reducido = Math.max(3, Math.floor(ctx.periodoBaseDias / 2));
                return { ok: true, periodoDias: reducido };
            }
            return { ok: true, periodoDias: ctx.periodoBaseDias };
        }
    }
    // PoliticaEstudiante: +7 días en época de exámenes
    class PoliticaEstudiante {
        evaluar(ctx) {
            const extra = ctx.esEpocaExamen ? 7 : 0;
            return { ok: true, periodoDias: ctx.periodoBaseDias + extra };
        }
    }
    // PoliticaDocente: +21 días y múltiples renovaciones (3)
    class PoliticaDocente {
        evaluar(_ctx) {
            return { ok: true, periodoDias: _ctx.periodoBaseDias + 21, renovaciones: 3 };
        }
    }
    // ===== Contexto (holder de la Strategy) =====
    class GestorPrestamos {
        constructor(politicaInicial) { this._politica = politicaInicial; }
        setPolitica(p) { this._politica = p; }
        evaluar(ctx) { return this._politica.evaluar(ctx); }
    }
    // ===== Demo local (encerrada en la IIFE; no contamina el global) =====
    const ctxBase = {
        tieneVencidos: false,
        periodoBaseDias: 14,
        esEpocaExamen: false
    };
    const gestor = new GestorPrestamos(new PoliticaEstricta());
    function probar(nombre, g, ctx) {
        const r = g.evaluar(ctx);
        console.log(`${nombre}:`, r.ok
            ? `OK | periodo=${r.periodoDias} días${r.renovaciones ? " | renovaciones=" + r.renovaciones : ""}`
            : `NO | motivo=${r.motivo}`);
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
    const ctxVencidos = { ...ctxBase, tieneVencidos: true };
    gestor.setPolitica(new PoliticaEstricta());
    probar("Estricta", gestor, ctxVencidos);
    gestor.setPolitica(new PoliticaFlexible());
    probar("Flexible", gestor, ctxVencidos);
    console.log("\n=== Época de exámenes ===");
    const ctxExamen = { ...ctxBase, esEpocaExamen: true };
    gestor.setPolitica(new PoliticaEstudiante());
    probar("Estudiante", gestor, ctxExamen);
})();
//# sourceMappingURL=tarea3.js.map