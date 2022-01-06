import { Condominium } from './condominium';
export interface Admin {
    id?: string;
    name: [{
        first_name: string,
        last_name: string,
    }];
    adress: string;
    condominiums: Condominium[];
    email: string;
    password: string;
    phone: string;
}