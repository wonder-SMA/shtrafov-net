import randomstring from 'randomstring';
import { TCustomer } from '@/types/customer';
import { TDateISO } from '@/types/date-iso';
import { TNewCustomer, TOrganization } from '@/types/new-customer';

const getRandomStr = (length: number) => {
  return randomstring.generate({ length, charset: 'alphanumeric' });
};

export const getPrepareCustomerData = (customer: TNewCustomer) => {
  const customerId = `${getRandomStr(6)}-${getRandomStr(5)}`;

  const orgId = `${getRandomStr(8)}-${getRandomStr(4)}-${getRandomStr(4)}-${getRandomStr(4)}-${getRandomStr(12)}`;

  const bankAccounts = customer.organization.bank_accounts.map(account => {
    return {
      ...account,
      id: `${getRandomStr(8)}-${getRandomStr(4)}-${getRandomStr(4)}-${getRandomStr(4)}-${getRandomStr(12)}`,
      created_at: createdAt,
      updated_at: updatedAt,
    };
  });

  const createdAt = new Date().toISOString().replace(/[.]\d+/, '') as TDateISO;
  const updatedAt = new Date().toISOString().replace(/[.]\d+/, '') as TDateISO;

  const org = {
    ...customer.organization,
    bank_accounts: bankAccounts,
    id: orgId,
    created_at: createdAt,
    updated_at: updatedAt,
  };

  const creditLimit = customer.credit_limit;

  const balance = {
    currency: 'RUB',
    current_amount: 0,
    credit_limit: creditLimit,
    available_amount: 0,
  };

  const preparedCustomer: TCustomer & { credit_limit?: number, organization?: TOrganization } = {
    ...customer,
    id: customerId,
    org,
    balance,
    status: 'active',
    created_at: createdAt,
    updated_at: updatedAt,
  };

  delete preparedCustomer.credit_limit;
  delete preparedCustomer.organization;

  return preparedCustomer;
};
