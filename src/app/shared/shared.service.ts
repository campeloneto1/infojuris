import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private toastr: ToastrService) {}

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

}
