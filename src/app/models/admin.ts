import { Condominium } from './condominium';
export interface Admin {
    adress: string;
    condominiums: Condominium[];
    email: string;
    last_name: string;
    name: string;
    password: string;
    phone: string;
}