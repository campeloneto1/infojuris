import { Cidade } from "../cidades/cidades";
import { Escritorio } from "../escritorios/escritorios";
import { Ocupacao } from "../ocupacoes/ocupacoes";

export interface Cliente{
    id?: number,
    escritorio_id: number,
    escritorio?: Escritorio,
    nome: string,
    cpf: string,
    email?: string,
    data_nascimento?: Date,
    telefone1: string,
    telefone2?: string,
    estado_civil?: number,
    sexo_id?: number,
    nacionalidade?: number,
    ocupacao_id?: number,
    ocupacao?: Ocupacao,
    mae: string,
    pai?: string,
    rua?: string,
    numero?: string,
    bairro?: string,
    complemento?: string,
    cidade_id: number,
    cidade: Cidade,
    cep?: string,
    obs?: string
}

export type Clientes = Array<Cliente>;