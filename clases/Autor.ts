export class Autor {
  constructor(
    private _nombre: string,
    private _biografia: string,
    private _añoNacimiento: number
  ) {}

  get nombre(): string {
    return this._nombre;
  }

  get biografia(): string {
    return this._biografia;
  }

  get añoNacimiento(): number {
    return this._añoNacimiento;
  }
}
