import { Cidade } from "../cidades/cidades";
import { Escritorio } from "../escritorios/escritorios";

export interface Filial{
    id?: number,
    escritorio_id: number,
    escritorio: Escritorio,
    nome: string,
    email:string,
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

export type Filiais = Array<Filial>;