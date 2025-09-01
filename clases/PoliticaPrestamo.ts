// clases/PoliticaPrestamo.ts
export type ContextoPrestamo = {
  tieneVencidos: boolean;
  periodoBaseDias: number;   // p.ej. 14 o 7
  esEpocaExamen: boolean;
};

export type ResultadoPrestamo = {
  ok: boolean;
  motivo?: string;
  periodoDias?: number;      // si ok=true y aplica período
  renovaciones?: number;     // opcional, para docentes
};

export interface PoliticaPrestamo {
  evaluar(ctx: ContextoPrestamo): ResultadoPrestamo;
}

// ── Estrategias ──

// No permite préstamos si hay vencidos
export class PoliticaEstricta implements PoliticaPrestamo {
  evaluar(ctx: ContextoPrestamo): ResultadoPrestamo {
    if (ctx.tieneVencidos) {
      return { ok: false, motivo: "Hay préstamos vencidos: política estricta no permite nuevos." };
    }
    return { ok: true, periodoDias: ctx.periodoBaseDias };
  }
}

// Permite pero reduce período a la mitad si hay vencidos (mín. 3 días)
export class PoliticaFlexible implements PoliticaPrestamo {
  evaluar(ctx: ContextoPrestamo): ResultadoPrestamo {
    if (ctx.tieneVencidos) {
      const reducido = Math.max(3, Math.floor(ctx.periodoBaseDias / 2));
      return { ok: true, periodoDias: reducido };
    }
    return { ok: true, periodoDias: ctx.periodoBaseDias };
  }
}

// Extiende período +7 en épocas de examen
export class PoliticaEstudiante implements PoliticaPrestamo {
  evaluar(ctx: ContextoPrestamo): ResultadoPrestamo {
    const extra = ctx.esEpocaExamen ? 7 : 0;
    return { ok: true, periodoDias: ctx.periodoBaseDias + extra };
  }
}

// Larga duración (+21 días) y varias renovaciones
export class PoliticaDocente implements PoliticaPrestamo {
  evaluar(ctx: ContextoPrestamo): ResultadoPrestamo {
    return { ok: true, periodoDias: ctx.periodoBaseDias + 21, renovaciones: 3 };
  }
}
