import { Model } from 'miragejs';
import { ModelDefinition } from 'miragejs/-types';
import { TCustomer } from '@/types/Customer';

const CustomerModel: ModelDefinition<TCustomer> = Model.extend({});

export const models = {
  customer: CustomerModel,
};
