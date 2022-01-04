import { CommunalArea } from './communalArea';
import { Payment } from './payment';
import { Unit } from './unit';
export interface Condominium {
    ciudad: string;
    communalAreas: CommunalArea[];
    egresos: Payment[];
    ingresos: Payment[];
    name: string;
    propietario: string;
    units: Unit[];
}