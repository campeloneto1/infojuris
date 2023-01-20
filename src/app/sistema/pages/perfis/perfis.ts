export interface Perfil{
    id?: number,
    nome?: string,
    administrador?: boolean,
    gestor?: boolean,
    created_by?: number,
    created_at?: Date,
    updated_by?: number,
    updated_at?: Date
}

export type Perfis =  Array<Perfil>;