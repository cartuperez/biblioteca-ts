// ejercicios/tarea2.ts
import { Prestamo } from "../clases/Prestamo";


class PrestamoRegular extends Prestamo {
  calcularVencimiento(): Date {
    const v = new Date(this.fechaPrestamo);
    v.setDate(v.getDate() + 14);
    return v;
  }

  calcularMulta(fechaDeDevolucion: Date, multaBasePorDia: number = 50): number {
    const vto = this.calcularVencimiento();
    const finDev = new Date(
      fechaDeDevolucion.getFullYear(),
      fechaDeDevolucion.getMonth(),
      fechaDeDevolucion.getDate()
    );
    const finVto = new Date(vto.getFullYear(), vto.getMonth(), vto.getDate());
    const dias = Math.floor((finDev.getTime() - finVto.getTime()) / (1000 * 60 * 60 * 24));
    return dias > 0 ? dias * multaBasePorDia : 0; // multa estándar
  }
}

class PrestamoCorto extends Prestamo {
  calcularVencimiento(): Date {
    const v = new Date(this.fechaPrestamo);
    v.setDate(v.getDate() + 7);
    return v;
  }

  calcularMulta(fechaDeDevolucion: Date, multaBasePorDia: number = 50): number {
    const vto = this.calcularVencimiento();
    const finDev = new Date(
      fechaDeDevolucion.getFullYear(),
      fechaDeDevolucion.getMonth(),
      fechaDeDevolucion.getDate()
    );
    const finVto = new Date(vto.getFullYear(), vto.getMonth(), vto.getDate());
    const dias = Math.floor((finDev.getTime() - finVto.getTime()) / (1000 * 60 * 60 * 24));
    return dias > 0 ? dias * (multaBasePorDia * 2) : 0; // multa doble
  }
}

class PrestamoReferencia extends Prestamo {
  calcularVencimiento(): Date | null {
    // Solo consulta en sala. Podrías devolver null; dejo misma fecha para que “exista” un vto visible
    return new Date(
      this.fechaPrestamo.getFullYear(),
      this.fechaPrestamo.getMonth(),
      this.fechaPrestamo.getDate()
    );
  }


  calcularMulta(_fechaDeDevolucion: Date, _multaBasePorDia: number = 50): number {
    return 0;
  }
}

class PrestamoDigital extends Prestamo {
  calcularVencimiento(): null {
    return null; // Sin límite
  }

  
  calcularMulta(_fechaDeDevolucion: Date, _multaBasePorDia: number = 50): number {
    return 0;
  }
}


const hoy = new Date();
const hace10 = new Date();
hace10.setDate(hoy.getDate() - 10);

const fakeLibro = { titulo: "Demo", isbn: "123-XYZ" } as any;

const reg = new PrestamoRegular(fakeLibro, hace10);
const cor = new PrestamoCorto(fakeLibro, hace10);
const ref = new PrestamoReferencia(fakeLibro, hoy);
const dig = new PrestamoDigital(fakeLibro, hoy);

console.log("Regular vence:", reg.calcularVencimiento()?.toDateString());
console.log("Corto   vence:", cor.calcularVencimiento()?.toDateString());
console.log("Ref     vence:", ref.calcularVencimiento()?.toDateString());
console.log("Digital vence:", dig.calcularVencimiento());

console.log("Multa Regular hoy :", reg.calcularMulta(hoy));
console.log("Multa Corto   hoy :", cor.calcularMulta(hoy));
console.log("Multa Ref      hoy :", ref.calcularMulta(hoy));
console.log("Multa Digital  hoy :", dig.calcularMulta(hoy));
