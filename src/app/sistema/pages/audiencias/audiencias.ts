import { Time } from "@angular/common";
import { Cidade } from "../cidades/cidades";
import { Processo } from "../processos/processos";

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
    status: number,
    obs: string,
}

export type Audiencias = Array<Audiencia>;