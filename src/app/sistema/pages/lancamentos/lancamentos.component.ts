import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { SessionService } from "src/app/shared/session.service";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedService } from "src/app/shared/shared.service";
import { TituloModule } from "../../components/titulo/titulo.module";
import { Perfil } from "../perfis/perfis";
import { FormularioLancamentosComponent } from "./formulario/formulario-lancamentos.component";
import { LancamentoComponent } from "./lancamento/lancamento.component";
import { Lancamento, Lancamentos } from "./lancamentos";
import { LancamentosService } from "./lancamentos.service";

@Component({
    selector: 'app-lancamentos',
    templateUrl: './lancamentos.component.html',
    styleUrls: ['./lancamentos.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule, TituloModule, FormularioLancamentosComponent, LancamentoComponent], 
})

export class LancamentosComponent{
    data$!: Observable<Lancamentos>;
  excluir!: Lancamento;
  

  @ViewChild(FormularioLancamentosComponent) child!: FormularioLancamentosComponent;
  
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<Lancamentos>();

  perfil!: Perfil;

  constructor(
    private sharedService: SharedService,
    private sessionService: SessionService,
    private lancamentosService: LancamentosService
  ) {}

  ngOnInit(): void {
    this.dtOptions = this.sharedService.getDtOptions();
      this.dtOptions = {...this.dtOptions, order: [1, 'desc']}

    this.perfil = this.sessionService.retornaPerfil();

    this.data$ = this.lancamentosService.index().pipe(
      tap(() => {
        this.dtTrigger.next(this.dtOptions);
      })
    );

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  refresh() {
    this.data$ = this.lancamentosService.index().pipe(
      tap(() => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger.next(this.dtOptions);
        });
      })
    );
  }

  resetarForm() {
    this.child.resetar();
  }

  edit(data: Lancamento) {
    //console.log(data);
    this.child.setForm(data);
  }

  delete(data: Lancamento) {
    this.excluir = data;
  }

  confirm(id?: number) {
    this.lancamentosService.destroy(id || 0).subscribe({
      next: (data) => {
        this.sharedService.toast('Sucesso!', data as string, 3);
        this.excluir = {} as Lancamento;
        this.refresh();
      },
      error: (error) => {
        this.sharedService.toast('Error!', error.erro as string, 2);
      },
    });
  }

 
}