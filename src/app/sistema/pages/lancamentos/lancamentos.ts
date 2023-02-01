import { Escritorio } from "../escritorios/escritorios";

export interface Lancamento{
    id?: number,
    escritorio_id: number,
    escritorio: Escritorio,
    codigo: string,
    valor: number,
    valor_liquido: number,
    valor_pago: number,
    data_vencimento: Date,
    data_pagamento: Date,
    desconto: number,
    porcentagem: number,
    pagseguro_id: string,
    status: number

}

export type Lancamentos = Array<Lancamento>;