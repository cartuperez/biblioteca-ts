interface IProducto{
    numero: string
    descripcion: string;
    obtenerPrecio(): number;
}


class Parte{
    numero: string;
    descripcion: string;
    private precioUnitario: number;

    constructor(numero: string, descripcion: string, precioUnitario: number) {
        this.numero = numero;
        this.descripcion = descripcion;
        this.precioUnitario = precioUnitario;
    }
    obtenerPrecio(): number {
        return this.precioUnitario;
    }

}

class Bicicleta{
    numero: string;
    descripcion: string;
    private partes: Parte[];

    constructor(numero: string, descripcion: string, partes: Parte[]) {
        this.numero = numero;
        this.descripcion = descripcion;
        this.partes = [];
    }
    agregarParte(parte: Parte): void {
        this.partes.push(parte);
    }
    obtenerPrecio(): number {
        return this.partes.reduce((total, parte) => total + parte.obtenerPrecio(), 0);
    }

}

class Oferta{
    numero: string;
    descripcion: string;
    private elementos: IProducto[];
    private descuento: number;

    constructor(numero: string, descripcion: string, descuento: number) {
        this.numero = numero;
        this.descripcion = descripcion;
        this.descuento = descuento;
        this.elementos = [];
    }
    agregarElemento(elemento: IProducto): void {
        this.elementos.push(elemento);
    }
    obtenerPrecio(): number {
        const total = this.elementos.reduce((sum, elem) => sum + elem.obtenerPrecio(), 0);
        return total - (total * this.descuento / 100);
    }

}