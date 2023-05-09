import { createServer } from 'miragejs';
import { endpoints } from './endpoints';
import { models } from './models';
import { factories } from './factories';
import { customers } from '@/mirage/data';

export function startMirage() {
  const server = createServer({
    models,
    factories,

    seeds(server) {
      server.createList('customer', customers.length);
    },

    routes() {
      this.namespace = '/api/v1';
      endpoints.customers(this);
    },
  });

  server.namespace = '';
  server.passthrough(`/*`);
}
