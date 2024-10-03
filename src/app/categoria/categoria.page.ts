import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../servicecategoria/categoria.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {
  categorias: any[] = []; // Arreglo para almacenar las categorías
  categoria: any = {}; // Objeto para almacenar los datos de la categoría a agregar/actualizar
  isEditing: boolean = false; // Indica si se está editando una categoría

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit() {
    this.cargarCategorias(); // Llama al método para cargar categorías
  }

  cargarCategorias() {
    this.categoriaService.getCategorias().subscribe(data => {
      this.categorias = data.map(e => {
        return {
          id: e.payload.doc.id, // Obtiene el ID del documento
          ...e.payload.doc.data() // Obtiene los datos del documento
        };
      });
      console.log(this.categorias); // Verifica que las categorías se carguen correctamente
    }, error => {
      console.error('Error al cargar categorías:', error); // Manejo de errores
    });
  }

  agregarCategoria() {
    if (!this.categoria.nombre || !this.categoria.descripcion) { // Validación simple
      console.error('El nombre y la descripción son obligatorios');
      return;
    }

    this.categoriaService.agregarCategoria(this.categoria.nombre, this.categoria.descripcion).then(() => {
      this.categoria = {}; // Resetea el formulario
      this.cargarCategorias(); // Recarga la lista de categorías
    }).catch((error) => {
      console.error('Error al agregar categoría:', error); // Manejo de errores
    });
  }

  cargarCategoria(categoria: any) {
    this.categoria = { ...categoria }; // Carga la categoría en el formulario para editar
    this.isEditing = true; // Cambia a modo edición
  }

  actualizarCategoria() {
    if (!this.categoria.id) {
      console.error('El ID de la categoría es obligatorio para actualizar');
      return;
    }

    this.categoriaService.actualizarCategoria(this.categoria.id, this.categoria.nombre, this.categoria.descripcion).then(() => {
      this.categoria = {}; // Resetea el formulario
      this.isEditing = false; // Cambia a modo agregar
      this.cargarCategorias(); // Recarga la lista de categorías
    }).catch((error) => {
      console.error('Error al actualizar categoría:', error); // Manejo de errores
    });
  }

  eliminarCategoria(id: string) {
    if (!id) {
      console.error('El ID de la categoría es obligatorio para eliminar');
      return;
    }

    console.log('Eliminando categoría con ID:', id); // Verifica el ID de la categoría

    this.categoriaService.eliminarCategoria(id).then(() => {
      console.log('Categoría eliminada con éxito');
      this.cargarCategorias(); // Recarga la lista de categorías después de eliminar una
    }).catch((error) => {
      console.error('Error al eliminar categoría:', error); // Manejo de errores
    });
  }
}
