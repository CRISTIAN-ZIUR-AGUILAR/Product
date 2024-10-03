import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private firestore: AngularFirestore) { }

  // Obtener la lista de usuarios
  getUsuarios(): Observable<any[]> {
    return this.firestore.collection('usuarios').snapshotChanges();
  }

  // Agregar un nuevo usuario
  agregarUsuario(nombre: string, correo: string, direccion: string, telefono: string, metodoPago: string): Promise<void> {
    const nuevoUsuario = { nombre, correo, direccion, telefono, metodoPago };
    return this.firestore.collection('usuarios').add(nuevoUsuario).then(() => {
      console.log('Usuario agregado con éxito');
    }).catch((error) => {
      console.error('Error al agregar usuario:', error);
      throw error; // Propagar el error
    });
  }

  // Actualizar un usuario por ID
  actualizarUsuario(id: string, nombre: string, correo: string, direccion: string, telefono: string, metodoPago: string): Promise<void> {
    const usuarioActualizado = { nombre, correo, direccion, telefono, metodoPago };
    return this.firestore.collection('usuarios').doc(id).update(usuarioActualizado).then(() => {
      console.log('Usuario actualizado con éxito');
    }).catch((error) => {
      console.error('Error al actualizar usuario:', error);
      throw error; // Propagar el error
    });
  }

  // Eliminar un usuario por ID
  eliminarUsuario(id: string): Promise<void> {
    return this.firestore.collection('usuarios').doc(id).delete().then(() => {
      console.log('Usuario eliminado con éxito');
    }).catch((error) => {
      console.error('Error al eliminar usuario:', error);
      throw error; // Propagar el error
    });
  }
}
