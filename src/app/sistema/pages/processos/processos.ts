import { Cliente } from "../clientes/clientes";
import { Escritorio } from "../escritorios/escritorios";
import { Natureza } from "../naturezas/naturezas";
import { Vara } from "../varas/varas";

export interface Processo{
    id?: number,
    autor_id: number,
    autor: Cliente,
    reu_id: number,
    reu: Cliente
    escritorio_id: number,
    escritorio: Escritorio,
    natureza_id: number,
    natureza: Natureza,
    vara_id: number,
    vara: Vara,
    codigo: string,
    valor: number,
    data: Date,
    obs: string,
    status: number,

}

export type Processos = Array<Processo>;