export type BankAccount = {
  name: string;
  bik: string;
  account_number: string;
  corr_account_number: string;
  is_default: boolean;
}

export type TOrganization = {
  name: string;
  inn: string;
  kpp: string;
  ogrn: string;
  addr: string;
  bank_accounts: BankAccount[];
}

export type TNewCustomer = {
  name: string;
  email: string;
  deferral_days: number;
  credit_limit: 0;
  organization: TOrganization;
  metadata: {
    [key: string]: string;
  };
  invoice_emails: string[];
  invoice_prefix: string;
}
