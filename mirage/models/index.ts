import { Model } from 'miragejs';
import { ModelDefinition } from 'miragejs/-types';
import { TCustomer } from '@/types/customer';

const CustomerModel: ModelDefinition<TCustomer> = Model.extend({});

export const models = {
  customer: CustomerModel,
};
