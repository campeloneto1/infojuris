export interface Pagamento{
     id:number;
     nome:string;
     telefone:string;
     email:string;
     cpf:string;
     nascimento:string;
     logradouro:string;
     numero:string;
     bairro:string;
     cep:string;
     cidade:string;
     estado:string;
     numCard:string;              //ex: '4111111111111111'      
     mesValidadeCard:string;      // ex: '12';
     anoValidadeCard:string;      // ex: '2030';
     codSegCard:string;           // ex: '123';
     hashComprador:string;        // preenchido dinamicamente
     bandCard:string;             // preenchido dinamicamente
     hashCard:string;             // preenchido dinamicamente
     parcelas:Array<Object>; // preenchido dinamicamente
}