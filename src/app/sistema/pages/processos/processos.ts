import { Audiencias } from "../audiencias/audiencias";
import { Escritorio } from "../escritorios/escritorios";
import { Natureza } from "../naturezas/naturezas";
import { Pessoas } from "../pessoas/pessoas";
import { Status } from "../status/status";
import { Vara } from "../varas/varas";

export interface Processo{
    id?: number,
    audiencias: Audiencias,
    escritorio_id: number,
    escritorio?: Escritorio,
    natureza_id: number,
    natureza: Natureza,
    vara_id: number,
    vara: Vara,
    codigo: string,
    valor: number,
    data: Date,
    obs: string,
    status: Status,
    status_id: number,
    pessoas: Pessoas,

}

export type Processos = Array<Processo>;