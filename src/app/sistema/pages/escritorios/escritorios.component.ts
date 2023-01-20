import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subject, tap } from "rxjs";
import { Escritorios } from "./escritorios";
import { EscritoriosService } from "./escritorios.service";

@Component({
    selector: 'app-escritorios',
    templateUrl: './escritorios.component.html',
    styleUrls: ['./escritorios.component.css']
})

export class EscritoriosComponent implements OnInit, OnDestroy{

    data$!: Observable<Escritorios>;

    dtOptions: DataTables.Settings = {};

    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    dtTrigger: Subject<any> = new Subject<Escritorios>();

    constructor(private escritoriosService: EscritoriosService){

    }
    
    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 2
          };

        this.data$ = this.escritoriosService.index().pipe(tap(() => {
            this.dtTrigger.next(this.data$)
        }));
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
         this.dtTrigger.unsubscribe();
    }

}