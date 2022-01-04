import { Unit } from "./unit";

export interface Usuario {
    address: string;
    celphone: string;
    city: string;
    email: string;
    last_name: string;
    name: string;
    password: string;
    phone: string;
    type: string;
    units: Unit[];
}