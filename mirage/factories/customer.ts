import { Factory } from 'miragejs';
import { TCustomers } from '@/mirage/types';
import { customers } from '@/mirage/data';

export const customerFactory = Factory.extend<TCustomers>({
  customer(i) {
    return customers[i];
  },
});


