import { Registry } from 'miragejs';
import Schema from 'miragejs/orm/schema';
import { models } from './models';
import { factories } from './factories';
import { TCustomer } from '@/types/Customer';

export type TCustomers = {
  customer: (i: number) => TCustomer;
};

type AppRegistry = Registry<typeof models, typeof factories>
export type TAppSchema = Schema<AppRegistry>
