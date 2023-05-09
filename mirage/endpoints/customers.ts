import { Response, Server } from 'miragejs';
import { getPrepareCustomerData } from '@/mirage/getPrepareCustomerData';
import { TAppSchema } from '../types';

export function routesForCustomers(server: Server) {
  server.get('/customers', (schema: TAppSchema, request) => {
    const customers = schema.all('customer');

    return new Response(200, {}, customers);
  });

  server.post('/customers', (schema: TAppSchema, request) => {
    const attrs = JSON.parse(request.requestBody);
    const preparedNewCustomer = getPrepareCustomerData(attrs);
    const newCustomerEntry = schema.create('customer', preparedNewCustomer);
    const createdNewCustomer = schema.find('customer', newCustomerEntry.id);

    return new Response(200, {}, { customer: createdNewCustomer });
  });
}
