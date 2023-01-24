import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormularioNaturezasComponent } from './formulario/formulario-naturezas.component';
import { NaturezasComponent } from './naturezas.component';

@NgModule({
  declarations: [NaturezasComponent, FormularioNaturezasComponent],
  imports: [CommonModule, SharedModule],
  exports: [],
})
export class NaturezasModule {}
