import { Cidade } from "../cidades/cidades";

export interface Escritorio{
    id?: number,
    nome: string,
    cnpj: string,
    email?: string,
    telefone1?: string,
    telefone2?: string,
    rua?: string,
    numero?: string,
    bairro?: string,
    complemento?: string,
    cidade_id?: number,
    cidade: Cidade,
    cep?: string,
    created_by?: number,
    created_at?: Date,
    updated_by?: number,
    updated_at?: Date

}

export type Escritorios = Array<Escritorio>;