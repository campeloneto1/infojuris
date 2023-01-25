import { Usuario } from "../sistema/pages/usuarios/usuarios";

export interface Session{
    token: string,
    user: Usuario
}