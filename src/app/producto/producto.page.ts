import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../serviceproducto/producto.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  productos: any[] = []; // Arreglo para almacenar los productos
  producto: any = {}; // Objeto para almacenar los datos del producto a agregar/actualizar
  isEditing: boolean = false; // Indica si se está editando un producto

  constructor(private productosService: ProductosService) { }

  ngOnInit() {
    this.cargarProductos(); // Llama al método para cargar productos
  }

  cargarProductos() {
    this.productosService.getProductos().subscribe(data => {
      this.productos = data.map(e => {
        return {
          id: e.payload.doc.id, // Obtiene el ID del documento
          ...e.payload.doc.data() as any // Obtiene los datos del documento
        };
      });
      console.log(this.productos); // Verifica que los productos se carguen correctamente
    }, error => {
      console.error('Error al cargar productos:', error); // Manejo de errores
    });
  }

  agregarProducto() {
    this.productosService.agregarProducto(this.producto).then(() => {
      this.producto = {}; // Resetea el formulario
      this.cargarProductos(); // Recarga la lista de productos
    }).catch((error) => {
      console.error('Error al agregar producto:', error); // Manejo de errores
    });
  }

  cargarProducto(producto: any) {
    this.producto = { ...producto }; // Carga el producto en el formulario para editar
    this.isEditing = true; // Cambia a modo edición
  }

  actualizarProducto() {
    this.productosService.actualizarProducto(this.producto.id, this.producto).then(() => {
      this.producto = {}; // Resetea el formulario
      this.isEditing = false; // Cambia a modo agregar
      this.cargarProductos(); // Recarga la lista de productos
    }).catch((error) => {
      console.error('Error al actualizar producto:', error); // Manejo de errores
    });
  }

  eliminarProducto(id: string) {
    this.productosService.eliminarProducto(id).then(() => {
      console.log('Producto eliminado con éxito');
      this.cargarProductos(); // Recarga la lista de productos después de eliminar uno
    }).catch((error) => {
      console.error('Error al eliminar producto:', error); // Manejo de errores
    });
  }
}
