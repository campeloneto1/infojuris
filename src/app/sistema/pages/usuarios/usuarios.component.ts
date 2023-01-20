import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuarios } from './usuarios';
import { Observable, Subject, tap } from 'rxjs';
import { UsuariosService } from './usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  data$!: Observable<Usuarios>;

  dtOptions: DataTables.Settings = {};

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<Usuarios>();

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
    };

    this.data$ = this.usuariosService.index().pipe(
      tap(() => {
        this.dtTrigger.next(this.data$);
      })
    );

    // Calling the DT trigger to manually render the table
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
