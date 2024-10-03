import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./producto/producto.module').then(m => m.ProductoPageModule) // Asegúrate de que esta ruta sea correcta
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioPageModule) // Asegúrate de que esta ruta sea correcta
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categoria/categoria.module').then(m => m.CategoriaPageModule) // Asegúrate de que esta ruta sea correcta
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
