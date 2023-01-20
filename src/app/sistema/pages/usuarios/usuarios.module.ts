import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FomularioUsuariosComponent } from './formulario/formulario-usuarios.component';
import { UsuariosComponent } from './usuarios.component';

@NgModule({
  declarations: [
    UsuariosComponent, 
    FomularioUsuariosComponent
  ],
  imports: [CommonModule, SharedModule],
  exports: [UsuariosComponent, FomularioUsuariosComponent],
})
export class UsuariosModule {}
