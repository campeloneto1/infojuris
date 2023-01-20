import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/shared/session.service';
import { SharedService } from 'src/app/shared/shared.service';
import { AutenticacaoService } from '../autenticacao.service';

import { Login } from './login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private autenticacaoService: AutenticacaoService,
    private sharedService: SharedService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      lembrarme: [false],
    });
  }

  entrar() {
    if (this.form.valid) {
      const info = this.form.getRawValue() as Login;
      //console.log(info);

      this.autenticacaoService.doLogin(info).subscribe({
        next: (res) => {
          //console.log(res);
          this.sessionService.setSession(res);
          this.router.navigate(['/sis']);
        },
        error: (error) => {
          this.sharedService.toast(
            'Usuário ou senha incorreto!',
            'Por favor, conferir as informações e tentar novamente.',
            2
          );
        },
      });
    }
  }
}
