import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductoPageRoutingModule } from './producto-routing.module';
import { ProductoPage } from './producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoPageRoutingModule
  ],
  declarations: [ProductoPage], // Declara el componente aquí
})
export class ProductoPageModule { } // Asegúrate de que este nombre sea el que esperas en tu enrutamiento
