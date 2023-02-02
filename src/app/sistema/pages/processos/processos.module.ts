import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TituloModule } from '../../components/titulo/titulo.module';
import { FormularioProcessosStatusComponent } from './fomulario-processos-status/formulario-processos-status.component';
import { FormularioProcessosPessoasComponent } from './formulario-processos-pessoas/formulario-processos-pessoas.component';
import { FormularioProcessosComponent } from './formulario/formulario-processos.component';
import { ProcessoComponent } from './processo/processo.component';
import { ProcessosComponent } from './processos.component';

@NgModule({
  declarations: [
    
  ],
  imports: [CommonModule, SharedModule, TituloModule],
  exports: [],
})
export class ProcessosModule {}
