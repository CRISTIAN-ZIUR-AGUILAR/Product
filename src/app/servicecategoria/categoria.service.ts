import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private firestore: AngularFirestore) { }

  // Obtener la lista de categorías
  getCategorias(): Observable<any[]> {
    return this.firestore.collection('categorias').snapshotChanges();
  }

  // Agregar una nueva categoría
  agregarCategoria(nombre: string, descripcion: string): Promise<void> {
    const nuevaCategoria = { nombre, descripcion };
    return this.firestore.collection('categorias').add(nuevaCategoria).then(() => {
      console.log('Categoría agregada con éxito');
    }).catch((error) => {
      console.error('Error al agregar categoría:', error);
      throw error; // Propagar el error
    });
  }

  // Actualizar una categoría por ID
  actualizarCategoria(id: string, nombre: string, descripcion: string): Promise<void> {
    const categoriaActualizada = { nombre, descripcion };
    return this.firestore.collection('categorias').doc(id).update(categoriaActualizada).then(() => {
      console.log('Categoría actualizada con éxito');
    }).catch((error) => {
      console.error('Error al actualizar categoría:', error);
      throw error; // Propagar el error
    });
  }

  // Eliminar una categoría por ID
  eliminarCategoria(id: string): Promise<void> {
    return this.firestore.collection('categorias').doc(id).delete().then(() => {
      console.log('Categoría eliminada con éxito');
    }).catch((error) => {
      console.error('Error al eliminar categoría:', error);
      throw error; // Propagar el error
    });
  }
}
