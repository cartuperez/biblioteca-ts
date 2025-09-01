import { Libro } from "./Libro";
import { Prestamo } from "./Prestamo";
import { PrestamoBasico } from "./PrestamoBasico";
import { PrestamoRegular } from "./PrestamoRegular";
import { PrestamoCorto } from "./PrestamoCorto";
import { PrestamoReferencia } from "./PrestamoReferencia";
import { PrestamoDigital } from "./PrestamoDigital";

/**
 * Cada socio de la biblioteca con su historial y estado
 */
export class Socio {
  private prestamos: Prestamo[] = [];
  private _deuda: number = 0;
  private _historialLectura: Libro[] = [];

  constructor(
    private _id: number,
    private _nombre: string,
    private _apellido: string
  ) {}

  get id(): number { return this._id; }
  get nombre(): string { return this._nombre; }
  get apellido(): string { return this._apellido; }
  get nombreCompleto(): string { return `${this.nombre} ${this.apellido}`; }
  get deuda(): number { return this._deuda; }
  get historialLectura(): Libro[] { return this._historialLectura; }

  // se lleva un libro prestado
  retirar(libro: Libro, duracion: number): void {
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + duracion);
    this.prestamos.push(new PrestamoBasico(libro, vencimiento));
  }

  // devuelve un libro
  devolver(libro: Libro): void {
    const prestamo = this.prestamos.find((p) => p.libro.isbn === libro.isbn);
    if (!prestamo) {
      throw new Error("Este libro no está en tu lista de préstamos");
    }

    const hoy = new Date();
    const multa = prestamo.calcularMulta(hoy, 50); // se usa polimorfismo ahora
    if (multa > 0) {
      this._deuda += multa;
      console.log(
        `${libro.titulo} se entregó tarde. Esto suma $${multa} a tu cuenta. Tu deuda total ahora es de $${this._deuda}`
      );
    } else {
      console.log(`Lo devolviste a tiempo`);
    }

    const indice = this.prestamos.indexOf(prestamo);
    this.prestamos.splice(indice, 1);
    this._historialLectura.push(libro);
    console.log(`"${libro.titulo}" se agregó a tu historial de lectura, ${this.nombreCompleto}`);
  }

  // Verificacion si tiene prestado un libro especifico
  tienePrestadoLibro(libro: Libro): Prestamo | undefined {
    return this.prestamos.find((p) => p.libro.isbn === libro.isbn);
  }

  // Pagar las deudas pendientes
  saldarDeuda(): void {
    this._deuda = 0;
    console.log(`${this.nombreCompleto}, Tu deuda está saldada`);
  }
  retirarConTipo(libro: Libro, tipo: "regular" | "corto" | "referencia" | "digital"): void {
  let p: Prestamo;

  switch (tipo) {
    case "regular":
      p = new PrestamoRegular(libro);
      break;
    case "corto":
      p = new PrestamoCorto(libro);
      break;
    case "referencia":
      p = new PrestamoReferencia(libro);
      break;
    case "digital":
      p = new PrestamoDigital(libro);
      break;
  }

  this.prestamos.push(p);
}
tieneVencidosAl(fecha: Date): boolean {
  return this.prestamos.some(p => {
    const vto = p.calcularVencimiento();
    if (!vto) return false; // digital o referencia no vencen
    const vtoNormalizado = new Date(vto.getFullYear(), vto.getMonth(), vto.getDate());
    const fechaNormalizada = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
    return vtoNormalizado.getTime() < fechaNormalizada.getTime();
  });
}



}
