import { TCreatedCustomer, TCustomers } from '@/store/customers/types';
import { TNewCustomer } from '@/types/NewCustomer';

export const CustomerService = {
  async getCustomers(): Promise<TCustomers> {
    const response = await fetch('/api/v1/customers');

    if (!response.ok) {
      throw new Error(`${response.status}. ${response.statusText}`);
    } else {
      const data = await response.json();
      return data.customers;
    }
  },

  async createCustomer(newCustomer: TNewCustomer): Promise<TCreatedCustomer> {
    const response = await fetch('/api/v1/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCustomer),
    });

    if (!response.ok) {
      throw new Error(`${response.status}. ${response.statusText}`);
    } else {
      return await response.json();
    }
  },
};
