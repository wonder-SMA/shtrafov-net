import { TDateISO } from '@/types/DateISO';

type Balance = {
  currency: string;
  current_amount: number;
  credit_limit: number;
  available_amount: number;
}

type BankAccount = {
  id: string;
  name: string;
  bik: string;
  account_number: string;
  corr_account_number: string;
  is_default: boolean;
  created_at: TDateISO;
  updated_at: TDateISO;
}

type Organization = {
  id: string;
  name: string;
  inn: string;
  kpp: string;
  ogrn: string;
  addr: string;
  bank_accounts: BankAccount[];
  created_at: TDateISO;
  updated_at: TDateISO;
}

export type TCustomer = {
  id: string;
  name: string;
  email: string;
  deferral_days: number;
  org: Organization;
  balance: Balance;
  metadata: {
    [key: string]: string;
  };
  created_at: TDateISO;
  updated_at: TDateISO;
  status: 'active' | 'inactive';
  invoice_prefix: string;
  invoice_emails: string[];
}
