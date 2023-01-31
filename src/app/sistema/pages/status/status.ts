export interface Status{
    id?: number,
    nome: string,
    aberto?: boolean,
    andamento?: boolean,
    concluido?: boolean,
    incidente?: boolean,
    cancelado?: boolean
}

export type Statuss = Array<Status>;