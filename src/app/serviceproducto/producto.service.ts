import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private firestore: AngularFirestore) { }

  // Obtener la lista de productos
  getProductos(): Observable<any[]> {
    return this.firestore.collection('productos').snapshotChanges();
  }

  // Agregar un nuevo producto
  agregarProducto(producto: any): Promise<void> {
    return this.firestore.collection('productos').add(producto).then(() => {
      console.log('Producto agregado con éxito');
    }).catch((error) => {
      console.error('Error al agregar producto:', error);
    });
  }

  // Actualizar un producto por ID
  actualizarProducto(id: string, producto: any): Promise<void> {
    return this.firestore.collection('productos').doc(id).update(producto).then(() => {
      console.log('Producto actualizado con éxito');
    }).catch((error) => {
      console.error('Error al actualizar producto:', error);
    });
  }

  // Eliminar un producto por ID
  eliminarProducto(id: string): Promise<void> {
    return this.firestore.collection('productos').doc(id).delete().then(() => {
      console.log('Producto eliminado con éxito');
    }).catch((error) => {
      console.error('Error al eliminar producto:', error);
    });
  }

  // Obtener un producto por ID
  getProductoPorId(id: string): Observable<any> {
    return this.firestore.collection('productos').doc(id).snapshotChanges();
  }
}
