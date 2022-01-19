import { Discount } from './discount';
import { Payment } from './payment';
import { Message } from './message';

export interface UnitInterface{
    area: number;
    unit_number: number;
    discounts: Discount[];
    egresos: Payment[];
    messages: Message[];
}