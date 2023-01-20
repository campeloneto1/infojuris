import { Component, OnInit } from '@angular/core';
import { EscritoriosService } from '../../escritorios/escritorios.service';
import { Escritorio, Escritorios } from '../../escritorios/escritorios';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-formulario-usuarios',
  templateUrl: './formulario-usuarios.component.html',
  styleUrls: ['./formulario-usuarios.component.css'],
})
export class FomularioUsuariosComponent implements OnInit {
  escritorios$!: Observable<Escritorios>;

  config = {
    displayFn:(item: Escritorio) => { return item.nome; }, //to support flexible text displaying for each item
    displayKey:"description", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Escritório', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'mais', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'Não encontrado!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Pesquisar', // label thats displayed in search input,
    searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr', // the direction of the search input can be rtl or ltr(default)
    selectAllLabel: 'Selecionar todos', // label that is displayed in multiple selection for select all
    enableSelectAll: false, // enable select all option to select all available items, default is false
  }

    

  constructor(private escritoriosService: EscritoriosService) {}

  ngOnInit(): void {
    this.escritorios$ = this.escritoriosService.index();
  }
}
