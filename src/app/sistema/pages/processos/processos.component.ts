import { Component, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject, tap } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { Pessoa, Pessoas } from '../pessoas/pessoas';
import { Status, Statuss } from '../status/status';
import { StatusService } from '../status/status.service';
import { FormularioProcessosStatusComponent } from './fomulario-processos-status/formulario-processos-status.component';
import { FormularioProcessosComponent } from './formulario/formulario-processos.component';
import { Processo, Processos } from './processos';
import { ProcessosPessoasService } from './processos-pessoas.service';
import { ProcessosService } from './processos.service';

@Component({
  selector: 'app-processos',
  templateUrl: './processos.component.html',
  styleUrls: ['./processos.component.css'],
})
export class ProcessosComponent {
  data$!: Observable<Processos>;
  status$!: Observable<Statuss>;
  excluir!: Processo;
  processo!: Processo;
  excluirPessoa!: Pessoa;
  status!: Processo;

  cadautor = false;
  delautor = false;
  cadreu = false;
  delreu = false;
  

  @ViewChild(FormularioProcessosComponent) child!: FormularioProcessosComponent;
  
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<Processos>();

  constructor(
    private sharedService: SharedService,
    private statusService: StatusService,
    private processosService: ProcessosService,
    private processosPessoasService: ProcessosPessoasService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
      order: [1, 'desc'],
    };

    this.data$ = this.processosService.index().pipe(
      tap(() => {
        this.dtTrigger.next(this.dtOptions);
      })
    );

    this.status$ = this.statusService.index();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  refresh() {
    this.data$ = this.processosService.index().pipe(
      tap(() => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger.next(this.dtOptions);
        });
      })
    );

    this.cadautor = false;
    this.cadreu = false;
  }

  refresh2() {
    this.data$ = this.processosService.index().pipe(
      tap(() => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger.next(this.data$);

          this.processosService.show(this.processo.id || 0).subscribe(data => {
            this.processo = data;
          });
          
        });
      })
    );
    this.cadautor = false;
    this.cadreu = false;
    this.delreu = false;
    this.delautor = false;
  }

  setProcesso(data: Processo) {
    this.cadautor = false;
    this.cadreu = false;
    this.delreu = false;
    this.delautor = false;
    this.processo = data;
  }

  filtro(data: Pessoas, tipo: number) {
    //console.log(data)
    //@ts-ignore
    return data.filter((data) => {
      //@ts-ignore
      if (data.pivot?.tipo_id == tipo) {
        return true;
      }
    });
  }

  resetarForm() {
    this.child.resetar();
  }

  edit(data: Processo) {
    //console.log(data);
    this.child.setForm(data);
  }

  delete(data: Processo) {
    this.excluir = data;
  }

  confirm(id?: number) {
    this.processosService.destroy(id || 0).subscribe({
      next: (data) => {
        this.sharedService.toast('Sucesso!', data as string, 3);
        this.excluir = {} as Processo;
        this.refresh();
      },
      error: (error) => {
        this.sharedService.toast('Error!', error.erro as string, 2);
      },
    });
  }

  deletePessoaAutor(data: Pessoa) {
    this.delautor =  true;
    this.excluirPessoa = data;
  }

  deletePessoaReu(data: Pessoa) {
    this.delreu =  true;
    this.excluirPessoa = data;
  }

  confirmPessoa(id: number){
    //console.log(id);
    this.delautor = false;
    this.delreu = false;
    this.processosPessoasService.destroy(id).subscribe({
      next: (data) => {
        this.sharedService.toast('Sucesso!', data as string, 3);
        this.refresh();
        this.processosService.show(this.processo.id || 0).subscribe(data => {
          this.processo = data;
        });
      },
      error: (error) => {
        this.sharedService.toast('Error!', error.erro as string, 2);
      },
    });
  }

  changeStatus(data: Processo){
    this.status = data;
  }
}
