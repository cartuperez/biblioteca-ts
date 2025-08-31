import { Biblioteca } from "./clases/Biblioteca";
import { Socio } from "./clases/Socio";
import { Autor } from "./clases/Autor";

const biblioteca = new Biblioteca();

//Crear autores
const autorOrwell = biblioteca.agregarAutor("George Orwell", "Escritor inglés", 1903);
const autorTolkien = biblioteca.agregarAutor("J.R.R. Tolkien", "Escritor de fantasía", 1892);

//Crear libros
const libro1 = biblioteca.agregarLibro("1984", autorOrwell, "1984");
const libro2 = biblioteca.agregarLibro("Rebelión en la Granja", autorOrwell, "9876");
const libro3 = biblioteca.agregarLibro("El señor de los anillos", autorTolkien, "5555");
const libro4 = biblioteca.agregarLibro("Hábitos Atómicos", autorTolkien, "2345"); // Otro libro de Tolkien para la prueba de recomendación

//Crear socios
const socio1 = biblioteca.registrarSocio(31882, "Lucciano", "Curotto");
const socio2 = biblioteca.registrarSocio(20321, "Luca", "Giordana");
const socioLector = biblioteca.registrarSocio(101, "Carlos", "Silva");

//Prueba la funcionalidad completa

console.log("--- Prueba de Préstamos y Multas ---");
try {
  socio1.retirar(libro1, -5); // Préstamo que generará multa
  biblioteca.devolverLibro(socio1.id, libro1.isbn); // Devolución con multa
  console.log(`Deuda de ${socio1.nombreCompleto}: $${socio1.deuda}`);

  biblioteca.retirarLibro(socio1.id, libro2.isbn); // Intento de préstamo con deuda
} catch (error: any) {
  console.log(`Error: ${error.message}`);
}
socio1.saldarDeuda();
biblioteca.retirarLibro(socio1.id, libro2.isbn); // Préstamo exitoso tras saldar deuda

console.log("\n--- Prueba de Reservas y Notificaciones ---");
try {
  biblioteca.retirarLibro(socio2.id, libro3.isbn);
  biblioteca.reservarLibro(socio1.id, libro3.isbn);
  biblioteca.devolverLibro(socio2.id, libro3.isbn);
} catch (error: any) {
  console.log(`Error: ${error.message}`);
}

console.log("\n--- Prueba de Historial y Recomendaciones ---");
// Simula la lectura de libros de Tolkien
socioLector.retirar(libro3, 10);
socioLector.devolver(libro3);

const recomendaciones = biblioteca.sugerirLibros(socioLector.id);
if (recomendaciones.length > 0) {
  console.log(`Recomendaciones para ${socioLector.nombreCompleto}:`);
  recomendaciones.forEach(libro => {
    console.log(`- "${libro.titulo}" de ${libro.autor.nombre}`);
  });
} else {
  console.log("No se encontraron recomendaciones.");
}