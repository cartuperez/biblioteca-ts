// ejercicios/tarea1.ts

// Modelo simple para la Tarea 1, independiente de tus clases reales.
// No importamos nada de "clases/" para no romper tu proyecto base.

abstract class Usuario {
  constructor(
    public readonly id: number,
    public readonly nombre: string,
    public readonly apellido: string
  ) {}

  // Reglas que cada subtipo define
  abstract maxLibros(): number;                 // tope de libros simultáneos
  abstract periodoDias(): number;               // período estándar/extendido
  abstract cobraMulta(): boolean;               // si aplica multa
  abstract puedeAccederReferencia(): boolean;   // si puede usar libros de referencia en préstamo
  puedePedirPrestamo(): boolean { return true } // Visitante lo sobrescribe a false

  // Helper de demostración: valida si puede pedir prestado ahora
  intentarPedirPrestamo(
    actualmentePrestados: number,
    tipoRecurso: "regular" | "corto" | "referencia" | "digital" = "regular"
  ): { ok: boolean; motivo?: string; periodo?: number; cobraMulta?: boolean } {
    if (!this.puedePedirPrestamo()) {
      return { ok: false, motivo: "No tiene permiso para pedir prestado." }
    }
    if (tipoRecurso === "referencia" && !this.puedeAccederReferencia()) {
      return { ok: false, motivo: "No tiene permiso para llevar libros de referencia." }
    }
    const tope = this.maxLibros()
    if (actualmentePrestados >= tope) {
      return { ok: false, motivo: `Límite alcanzado (${tope} libros).` }
    }
    return {
      ok: true,
      periodo: this.periodoDias(),
      cobraMulta: this.cobraMulta()
    }
  }

  nombreCompleto(): string { return `${this.nombre} ${this.apellido}` }
}

/* ───────────────────────── SUBTIPOS ───────────────────────── */

// SocioRegular: máx. 3 libros, período estándar (14 días), con multa
class SocioRegular extends Usuario {
  maxLibros() { return 3 }
  periodoDias() { return 14 }
  cobraMulta() { return true }
  puedeAccederReferencia() { return false }
}

// SocioVIP: máx. 5 libros, período extendido (28 días), sin multas
class SocioVIP extends Usuario {
  maxLibros() { return 5 }
  periodoDias() { return 28 }      // extendido
  cobraMulta() { return false }    // sin multas
  puedeAccederReferencia() { return false }
}

// Empleado: acceso ilimitado (sin tope práctico), puede acceder a referencia
class Empleado extends Usuario {
  maxLibros() { return Number.MAX_SAFE_INTEGER } // ilimitado práctico
  periodoDias() { return 60 }                    // muy extendido
  cobraMulta() { return false }                  // suele no aplicar
  puedeAccederReferencia() { return true }       // puede llevar referencia
}

// Visitante: solo consulta catálogo, no puede pedir prestado
class Visitante extends Usuario {
  maxLibros() { return 0 }
  periodoDias() { return 0 }
  cobraMulta() { return false }
  puedeAccederReferencia() { return false }
  puedePedirPrestamo() { return false }
}

/* ───────────────────────── DEMO ───────────────────────── */

const regular  = new SocioRegular(1, "Ana", "García")
const vip      = new SocioVIP(2, "Luis", "Pérez")
const empleado = new Empleado(3, "Marta", "Suárez")
const visitante= new Visitante(4, "Sofía", "Luna")

function probar(u: Usuario, prestados: number, tipo: "regular"|"corto"|"referencia"|"digital") {
  const r = u.intentarPedirPrestamo(prestados, tipo)
  console.log(
    `${u.nombreCompleto()} (${u.constructor.name}) =>`,
    r.ok
      ? `OK | periodo: ${r.periodo} días | cobraMulta: ${r.cobraMulta}`
      : `NO | motivo: ${r.motivo}`
  )
}

console.log("---- REGULAR ----")
probar(regular, 0, "regular")
probar(regular, 3, "regular") // debería rechazar por tope
probar(regular, 1, "referencia") // debería rechazar por referencia

console.log("\n---- VIP ----")
probar(vip, 0, "regular")
probar(vip, 4, "regular")
probar(vip, 5, "regular") // tope alcanzado
probar(vip, 0, "referencia") // sin permiso para referencia

console.log("\n---- EMPLEADO ----")
probar(empleado, 20, "regular")
probar(empleado, 100, "referencia") // debe permitir referencia

console.log("\n---- VISITANTE ----")
probar(visitante, 0, "regular") // nunca puede
