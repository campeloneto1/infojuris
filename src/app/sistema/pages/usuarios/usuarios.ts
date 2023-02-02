import { Escritorio } from "../escritorios/escritorios";
import { Perfil } from "../perfis/perfis";

export interface Usuario{
    id?: number,
    nome: string,
    email?: string,
    cpf: string,
    telefone1: string,
    telefone2?: string,
    escritorio?: Escritorio,
    escritorio_id?: number,
    perfil: Perfil,
    perfil_id: number,
    created_by?: number,
    created_at?: Date,
    updated_by?: number,
    updated_at?: Date
}

export type Usuarios = Array<Usuario>;