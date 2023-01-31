import { Pessoa } from "../pessoas/pessoas";
import { Processo } from "./processos";

export interface ProcessoPessoa{
    id?: number,
    processo_id: number,
    processo: Processo,
    pessoa_id: number,
    pessoa: Pessoa,
    tipo_id: number
}

export type ProcessosPessoas = Array<ProcessoPessoa>;