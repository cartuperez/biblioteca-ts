"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoliticaDocente = exports.PoliticaEstudiante = exports.PoliticaFlexible = exports.PoliticaEstricta = void 0;
// ── Estrategias ──
// No permite préstamos si hay vencidos
class PoliticaEstricta {
    evaluar(ctx) {
        if (ctx.tieneVencidos) {
            return { ok: false, motivo: "Hay préstamos vencidos: política estricta no permite nuevos." };
        }
        return { ok: true, periodoDias: ctx.periodoBaseDias };
    }
}
exports.PoliticaEstricta = PoliticaEstricta;
// Permite pero reduce período a la mitad si hay vencidos (mín. 3 días)
class PoliticaFlexible {
    evaluar(ctx) {
        if (ctx.tieneVencidos) {
            const reducido = Math.max(3, Math.floor(ctx.periodoBaseDias / 2));
            return { ok: true, periodoDias: reducido };
        }
        return { ok: true, periodoDias: ctx.periodoBaseDias };
    }
}
exports.PoliticaFlexible = PoliticaFlexible;
// Extiende período +7 en épocas de examen
class PoliticaEstudiante {
    evaluar(ctx) {
        const extra = ctx.esEpocaExamen ? 7 : 0;
        return { ok: true, periodoDias: ctx.periodoBaseDias + extra };
    }
}
exports.PoliticaEstudiante = PoliticaEstudiante;
// Larga duración (+21 días) y varias renovaciones
class PoliticaDocente {
    evaluar(ctx) {
        return { ok: true, periodoDias: ctx.periodoBaseDias + 21, renovaciones: 3 };
    }
}
exports.PoliticaDocente = PoliticaDocente;
//# sourceMappingURL=PoliticaPrestamo.js.map