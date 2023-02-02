import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { SharedModule } from "src/app/shared/shared.module";
import { TituloModule } from "src/app/sistema/components/titulo/titulo.module";
import { Pessoas } from "../../pessoas/pessoas";
import { Processo } from "../processos";
import { ProcessosService } from "../processos.service";

@Component({
    selector: 'app-processo',
    templateUrl: './processo.component.html',
    styleUrls: ['./processo.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule, TituloModule], 
})

export class ProcessoComponent implements OnInit{
    id!: number;
    protected processo$!: Observable<Processo>;

    constructor(private activatedRoute: ActivatedRoute,
        private processosService: ProcessosService){

    }

    ngOnInit(): void {
        this.id = this.activatedRoute.snapshot.params['id'];
        this.processo$ = this.processosService.show(this.id);
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

    
    
}