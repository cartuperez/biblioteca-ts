class Cliente{
    cuit: string;
    nombre: string;
    apellido: string;
    direccion: string;

    constructor(cuit: string, nombre: string, apellido: string, direccion: string) {
        this.cuit = cuit;
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
    }
}

class Beneficiario extends Cliente{
    numeroCuentaDebito: string;
    gastoMensual: string;

    constructor(cuit: string, nombre: string, apellido: string, direccion: string, numeroCuentaDebito: string, gastoMensual: string) {
        super(cuit, nombre, apellido, direccion);
        this.numeroCuentaDebito = numeroCuentaDebito;
        this.gastoMensual = gastoMensual;
    }

    gastar(monto: number): void {
        this.gastoMensual += monto;
    }

}

class Afiliado extends Cliente{
    numeroCuentaCredito: string;

    constructor(cuit: string, nombre: string, apellido: string, direccion: string, numeroCuentaCredito: string) {
        super(cuit, nombre, apellido, direccion);
        this.numeroCuentaCredito = numeroCuentaCredito;
    }

    registrarCompra(monto: number): void {
    }
}
