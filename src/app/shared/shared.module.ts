import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { InputSelectModule } from '../sistema/components/input-select/input-select.module';
import { InputTextModule } from '../sistema/components/input-text/input-text.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';



@NgModule({
  imports: [
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    DataTablesModule,
    SelectDropDownModule,
    ReactiveFormsModule,
    InputTextModule,
    InputSelectModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [provideNgxMask()],
  exports: [
    NgxMaskDirective,
    NgxMaskPipe,
    DataTablesModule,
    SelectDropDownModule,
    ReactiveFormsModule,
    InputTextModule,
    InputSelectModule,
    RouterModule,
    CalendarModule
  ],
})
export class SharedModule {}
