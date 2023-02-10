import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/shared/session.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { TituloModule } from 'src/app/sistema/components/titulo/titulo.module';
import { Lancamento } from '../lancamentos';
import { LancamentosService } from '../lancamentos.service';
import { Pagamento } from './pagamento';

declare var PagSeguro: any;

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css'],
  standalone: true,
  imports: [CommonModule, SharedModule, TituloModule, FormsModule],
})
export class LancamentoComponent implements OnInit {
  id!: number;
  formapag = 1;
  protected form!: FormGroup;
  protected lancamento$!: Observable<Lancamento>;

  pagamento!: Pagamento;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private http: HttpClient,
    private lancamentosService: LancamentosService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.lancamento$ = this.lancamentosService.show(this.id);
    //846DE5DEA7894831B68EA89FA261581E

    //CARREGA O JAVASCRIPT DO PAGSEGURO
    this.carregaJavascriptPagseguro();

    this.form = this.formBuilder.group({
      id: [''],
      nome: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(150),
        ]),
      ],
      cartao: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ]),
      ],
      mes: [
        '',
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(12),
        ]),
      ],
      ano: [
        '',
        Validators.compose([
          Validators.required,
          Validators.min(2023),
          Validators.maxLength(2099),
        ]),
      ],
      codigo: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(3),
        ]),
      ],
    });
  }

  pagar(data: Lancamento) {
    console.log(this.formapag);
    console.log(this.form.value);

    let card = PagSeguro.encryptCard({
        publicKey: "PUBA013EDD6987C47D9A18F6240585724D4",
        holder: this.form.value.nome,
        number: this.form.value.cartao,
        expMonth: this.form.value.mes,
        expYear: this.form.value.ano,
        securityCode: this.form.value.codigo
      });
      
      var encrypted = card.encryptedCard;

      var dados = {
        reference_id: data.codigo,
        description: "Mensalidade sistema InfoJuris",
        amount: {
            value: data.valor_liquido,
            currency: "BRL"
        },
        payment_method: {
            type: "CREDIT_CARD",
            installments: 1,
            capture: true,
            card: {
            encrypted: encrypted
            }
        }
      }

      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': '846DE5DEA7894831B68EA89FA261581E' });
    let options = { headers: headers };

      this.http.post('https://sandbox.api.pagseguro.com/charges', dados, options).subscribe(
       {
        next: (data)=> {
            console.log(data)
        },
        error: (error)=> {
            console.log(error)
        }
       }
      )
    /*
     //BUSCA O HASH DO COMPRADOR JUNTO A API DO PAGSEGURO
     this.pagamento.hashComprador = PagSeguroDirectPayment.getSenderHash();
     
     //CRIA O HASK DO CARTÃO DE CRÉDITO JUNTO A API DO PAGSEGURO
     PagSeguroDirectPayment.createCardToken({
     
       cardNumber:       this.pagamento.numCard,
       cvv:              this.pagamento.codSegCard,
       expirationMonth:  this.pagamento.mesValidadeCard,
       expirationYear:   this.pagamento.anoValidadeCard,
       brand:            this.pagamento.bandCard,
       success: (response:any) => {
       
       this.pagamento.hashCard = response.card.token;
       console.log(this.pagamento);

       //NESTE MOMENTO JÁ TEMOS TUDO QUE PRECISAMOS!
       //HORA DE ENVIAR OS DADOS PARA O SERVIDOR PARA CONCRETIZAR O PAGAMENTO
       //this.enviaDadosParaServidor();
          
       },
       error: (response:any) => { console.log(response) }

     });*/
  }

  enviaDadosParaServidor(){

    //COLOQUE AQUI O CÓDIGO PARA ENVIAR OS DADOS PARA O SERVIDOR (PHP, JAVA ETC..) PARA QUE ELE CONSUMA A API DO PAGSEGURO E CONCRETIZE A TRANSAÇÃO
    //this.pagamentoService.store(this.dados).subscribe(result => console.log(result));
  }


  //BUSCA A BANDEIRA DO CARTÃO (EX: VISA, MASTERCARD ETC...) E DEPOIS BUSCA AS PARCELAS;
  //ESTA FUNÇÃO É CHAMADA QUANDO O INPUT QUE RECEBE O NÚMERO DO CARTÃO PERDE O FOCO;
  /*
  buscaBandeira() {
    PagSeguroDirectPayment.getBrand({
      cardBin: this.form.value.cartao,
      success: (response: any) => {
        this.pagamento.bandCard = response.brand.name;
        this.buscaParcelas();
        console.log('Bandeira do cartão: ' + this.pagamento.bandCard);
      },
      error: (response: any) => {
        console.log(response);
      },
    });
  }*/

  //BUSCA AS PARCELAS NA API DO PAGSEGURO PARA O CLIENTE ESCOLHER
  /*
  buscaParcelas() {
    PagSeguroDirectPayment.getInstallments({
      amount: '100', //valor total da compra (deve ser informado)
      brand: this.pagamento.bandCard, //bandeira do cartão (capturado na função buscaBandeira)
      maxInstallmentNoInterest: 3,
      success: (response:any) => {
        this.pagamento.parcelas = response.installments[this.pagamento.bandCard];
        console.log('parcelas: ' + response);
      },
      error: (response:any) => {
        console.log(response);
      },
    });
  }*/

  //CARREGA O JAVASCRIPT DO PAGSEGURO (A EXPLICAÇÃO ESTA FUNÇÃO ESTÁ LOGO ABAIXO)
  carregaJavascriptPagseguro() {
    if (!this.sessionService.retornaPagseguro()) {
      //SEJA O JAVASCRIPT NO CABEÇÁRIO DA PÁGINA
      new Promise((resolve) => {
        let script: HTMLScriptElement = document.createElement('script');
        script.addEventListener('load', (r) => {Promise.resolve()});
        script.src =
          'https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js';
        document.head.appendChild(script);
      });

      //BUSCA UM ID DE SESSÃO NO SERVIDOR (ESTE ID É GERADO PELA API DO PAGSEGURO QUE VOCÊ DEVE CONSUMIR USANDO SEU SERVIDOR. LER DOCUMENTAÇÃO PARA SABER COMO GERAR)
      //this.pagamentoService.startSession().subscribe(result => PagSeguroDirectPayment.setSessionId(result));

      this.sessionService.setPagseguro(true);
    }
  }
}
