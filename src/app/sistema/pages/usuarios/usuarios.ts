export interface Usuario{
    id?: number,
    nome: string,
    email?: string,
    cpf: string,
    telefone1?: string,
    telefone2?: string,
    escritorio_id?: number,
    perfil_id?: number,
    created_by?: number,
    created_at?: Date,
    updated_by?: number,
    updated_at?: Date
}

export type Usuarios = Array<Usuario>;