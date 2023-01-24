import { Cidade } from "../cidades/cidades";

export interface Tribunal{
    id?: number,
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

export type Tribunais = Array<Tribunal>;