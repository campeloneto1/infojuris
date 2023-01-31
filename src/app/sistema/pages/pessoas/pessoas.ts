import { Cidade } from "../cidades/cidades";
import { Escritorio } from "../escritorios/escritorios";
import { EstadoCivil } from "../estados-civis/estados-civis";
import { Ocupacao } from "../ocupacoes/ocupacoes";
import { Sexo } from "../sexos/sexos";

export interface Pessoa{
    id?: number,
    escritorio_id: number,
    escritorio?: Escritorio,
    nome: string,
    cpf: string,
    email?: string,
    data_nascimento?: Date,
    telefone1: string,
    telefone2?: string,
    estado_civil_id?: number,
    estado_civil?: EstadoCivil,
    sexo_id?: number,
    sexo?: Sexo,
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
    obs?: string,
    pivot?: any
}

export type Pessoas = Array<Pessoa>;