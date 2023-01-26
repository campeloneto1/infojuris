import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Cidades } from '../sistema/pages/cidades/cidades';
import { CidadesService } from '../sistema/pages/cidades/cidades.service';
import { Comarcas } from '../sistema/pages/comarcas/comarcas';
import { ComarcasService } from '../sistema/pages/comarcas/comarcas.service';
import { Estados } from '../sistema/pages/estados/estados';
import { EstadosService } from '../sistema/pages/estados/estados.service';
import { Paises } from '../sistema/pages/paises/paises';
import { PaisesService } from '../sistema/pages/paises/paises.service';
import { Tribunais } from '../sistema/pages/tribunais/tribunais';
import { TribunaisService } from '../sistema/pages/tribunais/tribunais.service';
import { Varas } from '../sistema/pages/varas/varas';
import { VarasService } from '../sistema/pages/varas/varas.service';

const API = environment.url;

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private toastr: ToastrService,
    private paises: PaisesService,
    private estados: EstadosService,
    private cidades: CidadesService,
    private tribunais: TribunaisService,
    private comarcas: ComarcasService,
    private varas: VarasService) {}

  toast(titulo: string, mensagem: string, tipo: number) {
    if(tipo == 1){
      this.toastr.success(mensagem, titulo);
    }
    if(tipo == 2){
      this.toastr.error(mensagem, titulo);
    }
    if(tipo == 3){
      this.toastr.info(mensagem, titulo);
    }
    if(tipo == 4){
      this.toastr.warning(mensagem, titulo);
    }
  }

  getPaises(): Observable<Paises>{
    return this.paises.index();
  }

  getEstados(id: number): Observable<Estados>{
    return this.estados.where(id);
  }

  getCidades(id: number): Observable<Cidades>{
    return this.cidades.where(id);
  }

  getTribunais(): Observable<Tribunais>{
    return this.tribunais.index();
  }

  getComarcas(id: number): Observable<Comarcas>{
    return this.comarcas.where(id);
  }

  getVaras(id: number): Observable<Varas>{
    return this.varas.where(id);
  }

}
