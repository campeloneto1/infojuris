import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SelectDropDownModule } from 'ngx-select-dropdown'


@NgModule({
  imports: [
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    DataTablesModule,
    SelectDropDownModule,
    ReactiveFormsModule
  ],
  providers: [provideNgxMask()],
  exports: [
    NgxMaskDirective,
    NgxMaskPipe,
    DataTablesModule,
    SelectDropDownModule,
    ReactiveFormsModule
  ],
})
export class SharedModule {}
