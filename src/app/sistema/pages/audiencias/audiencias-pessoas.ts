import { Time } from "@angular/common";
import { Cidade } from "../cidades/cidades";
import { Pessoa } from "../pessoas/pessoas";
import { Status } from "../status/status";
import { Audiencia } from "./audiencias";

export interface AudienciaPessoa{
    id?: number,
    audiencia_id: number,
    audiencia: Audiencia,
    pessoa_id: number,
    pessoa: Pessoa,
   
}

export type AudienciasPessoas = Array<AudienciaPessoa>;