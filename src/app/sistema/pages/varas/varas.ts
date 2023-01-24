import { Cidade } from "../cidades/cidades";
import { Comarca } from "../comarcas/comarcas";

export interface Vara{
    id?: number,
    comarca_id: number,
    comcarca: Comarca,
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

export type Varas = Array<Vara>;