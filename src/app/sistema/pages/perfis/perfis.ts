export interface Perfil{
    id?: number,
    nome?: string,
    administrador?: boolean,
    gestor?: boolean,

    audiencias?: boolean,
    audiencias_cad?: boolean,
    audiencias_edt?: boolean,
    audiencias_del?: boolean,

    filiais?: boolean,
    filiais_cad?: boolean,
    filiais_edt?: boolean,
    filiais_del?: boolean,

    lancamentos?: boolean,
    lancamentos_cad?: boolean,
    lancamentos_edt?: boolean,
    lancamentos_del?: boolean,

    pessoas?: boolean,
    pessoas_cad?: boolean,
    pessoas_edt?: boolean,
    pessoas_del?: boolean,

    processos?: boolean,
    processos_cad?: boolean,
    processos_edt?: boolean,
    processos_del?: boolean,

    usuarios?: boolean,
    usuarios_cad?: boolean,
    usuarios_edt?: boolean,
    usuarios_del?: boolean,

    created_by?: number,
    created_at?: Date,
    updated_by?: number,
    updated_at?: Date
}

export type Perfis =  Array<Perfil>;