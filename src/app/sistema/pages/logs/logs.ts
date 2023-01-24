import { Usuario } from "../usuarios/usuarios";

export interface Log{
    id?: number,
    user_id: number,
    user: Usuario,
    mendagem: string,
    table: string,
    fk: number,
    action: number
}

export type Logs = Array<Log>;