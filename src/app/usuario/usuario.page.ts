import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../serviceusuario/usuario.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  usuarios: any[] = []; // Arreglo para almacenar los usuarios
  usuario: any = {}; // Objeto para almacenar los datos del usuario a agregar/actualizar
  isEditing: boolean = false; // Indica si se está editando un usuario

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.cargarUsuarios(); // Llama al método para cargar usuarios
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data.map(e => {
        return {
          id: e.payload.doc.id, // Obtiene el ID del documento
          ...e.payload.doc.data() // Obtiene los datos del documento
        };
      });
      console.log(this.usuarios); // Verifica que los usuarios se carguen correctamente
    }, error => {
      console.error('Error al cargar usuarios:', error); // Manejo de errores
    });
  }

  agregarUsuario() {
    // Asegúrate de que los campos requeridos no estén vacíos
    if (!this.usuario.nombre || !this.usuario.correo) {
      console.error('El nombre y el correo son obligatorios');
      return;
    }

    this.usuarioService.agregarUsuario(this.usuario.nombre, this.usuario.correo, this.usuario.direccion, this.usuario.telefono, this.usuario.metodoPago).then(() => {
      this.usuario = {}; // Resetea el formulario
      this.cargarUsuarios(); // Recarga la lista de usuarios
    }).catch((error) => {
      console.error('Error al agregar usuario:', error); // Manejo de errores
    });
  }

  cargarUsuario(usuario: any) {
    this.usuario = { ...usuario }; // Carga el usuario en el formulario para editar
    this.isEditing = true; // Cambia a modo edición
  }

  actualizarUsuario() {
    if (!this.usuario.id) {
      console.error('El ID del usuario es obligatorio para actualizar');
      return;
    }

    this.usuarioService.actualizarUsuario(this.usuario.id, this.usuario.nombre, this.usuario.correo, this.usuario.direccion, this.usuario.telefono, this.usuario.metodoPago).then(() => {
      this.usuario = {}; // Resetea el formulario
      this.isEditing = false; // Cambia a modo agregar
      this.cargarUsuarios(); // Recarga la lista de usuarios
    }).catch((error) => {
      console.error('Error al actualizar usuario:', error); // Manejo de errores
    });
  }

  eliminarUsuario(id: string) {
    if (!id) {
      console.error('El ID del usuario es obligatorio para eliminar');
      return;
    }

    console.log('Eliminando usuario con ID:', id); // Verifica el ID del usuario

    this.usuarioService.eliminarUsuario(id).then(() => {
      console.log('Usuario eliminado con éxito');
      this.cargarUsuarios(); // Recarga la lista de usuarios después de eliminar uno
    }).catch((error) => {
      console.error('Error al eliminar usuario:', error); // Manejo de errores
    });
  }
}
