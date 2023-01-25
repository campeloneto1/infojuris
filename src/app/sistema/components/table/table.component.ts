import { AfterViewInit, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ADTSettings } from "angular-datatables/src/models/settings";
import { Observable, Subject } from "rxjs";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit, AfterViewInit, OnDestroy{
    data$!: Observable<any>;

    @Input() dtOptions: ADTSettings = {};
    dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();

    ngOnInit(): void {
        
      }
    
      ngAfterViewInit() {
        setTimeout(() => {
          // race condition fails unit tests if dtOptions isn't sent with dtTrigger
          this.dtTrigger.next(this.dtOptions);
        }, 200);
      }
    
    
      ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
      }
    
}