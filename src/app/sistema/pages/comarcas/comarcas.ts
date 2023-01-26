import { Cidade } from "../cidades/cidades";
import { Tribunal } from "../tribunais/tribunais";

export interface Comarca{
    id?: number,
    tribunal_id: number,
    tribunal: Tribunal,
    nome: string,
    email: string,
    telefone1: string,
    telefone2?: string,
    rua?: string,
    numero?: string,
    bairro?: string,
    complemento?: string,
    cidade_id: number,
    cidade: Cidade,
    cep?: string,
}

export type Comarcas = Array<Comarca>;