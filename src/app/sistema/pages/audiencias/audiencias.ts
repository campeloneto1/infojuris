import { Time } from "@angular/common";
import { Cidade } from "../cidades/cidades";
import { Pessoas } from "../pessoas/pessoas";
import { Processo } from "../processos/processos";
import { Status } from "../status/status";

export interface Audiencia{
    id?: number,    
    processo_id: number,
    processo: Processo,
    data: Date,
    hora: Time,
    tipo_id: number,
    link?: string,
    rua?: string,
    numero?: string,
    bairro?: string,
    complemento?: string,
    cidade_id?: number,
    cidade?: Cidade,
    cep?: string,
    status_id: number,
    status: Status,
    obs: string,
    pessoas: Pessoas
}

export type Audiencias = Array<Audiencia>;