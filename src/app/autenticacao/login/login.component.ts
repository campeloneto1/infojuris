import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Login } from "./login";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
    form!: FormGroup;

    constructor(private formBuilder: FormBuilder,
        private router: Router){
       
    }

    ngOnInit(): void{
        this.form = this.formBuilder.group(
            {
                user: ['', [Validators.required, Validators.minLength(11)]],
                password: ['', [Validators.required, Validators.minLength(6)]],
                lembrarme: [false]
            }
          );
    }

    entrar(){
        if(this.form.valid){
            const info = this.form.getRawValue() as Login;
            //console.log(info);
            this.router.navigate(['/sistema']);
        } 
        
    }

}