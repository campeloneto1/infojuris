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
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10,
    processing: true,
    responsive: true,
    
  };

  config = {  
    displayKey:"description", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: '400px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear 
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0 ,// number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'mais', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'Informação não encontrada', // text to be displayed when no items are found while searching
    searchPlaceholder:'Pesquisar', // label thats displayed in search input,
    searchOnKey: undefined, // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false ,// clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr', // the direction of the search input can be rtl or ltr(default)
    selectAllLabel: 'Selecionar todos', // label that is displayed in multiple selection for select all
    enableSelectAll: false, // enable select all option to select all available items, default is false
  }

  

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

  getDtOptions(): DataTables.Settings{
    return this.dtOptions;
  }

  getConfig(){
    return this.config;
  }

}
