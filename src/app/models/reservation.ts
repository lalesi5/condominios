import { CommunalArea } from './communalArea';
import { Usuario } from './usuario';

export interface Reservation{
    communalArea: CommunalArea;
    reservation_date: string;
    reservation_state: string;
    reservation_time: number;
    user: Usuario;
}