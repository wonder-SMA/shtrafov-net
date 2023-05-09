import { BankAccount, TNewCustomer } from '@/types/NewCustomer';
import { TModalMetaData } from '@/types/Tables';

export type NewCustomerModalState = {
  newCustomer: TNewCustomer;
  rawMetaData: Array<TModalMetaData & { id: string; }>;
}

export enum NewCustomerModalActionTypes {
  SET_CLIENT_DETAILS = 'SET_CUSTOMER_DETAILS',
  SET_ORGANIZATION_DETAILS = 'SET_ORGANIZATION_DETAILS',
  SET_BANK_ACCOUNT_DETAILS = 'SET_BANK_ACCOUNT_DETAILS',
  SET_DEFAULT_BANK_ACCOUNT = 'SET_DEFAULT_BANK_ACCOUNT',
  ADD_BANK_ACCOUNT = 'ADD_BANK_ACCOUNT',
  DELETE_BANK_ACCOUNT = 'DELETE_BANK_ACCOUNT',
  SET_ACCOUNT_EMAIL = 'SET_ACCOUNT_EMAIL',
  ADD_ACCOUNT_EMAIL = 'ADD_ACCOUNT_EMAIL',
  DELETE_ACCOUNT_EMAIL = 'DELETE_ACCOUNT_EMAIL',
  SET_RAW_META = 'SET_RAW_META',
  ADD_RAW_META = 'ADD_RAW_META',
  DELETE_RAW_META = 'DELETE_RAW_META',
  SET_PREPARED_META = 'SET_PREPARED_META',
  CLEAR_STATE = 'CLEAR_STATE',
}

export type SetClientDetailsAction = {
  type: NewCustomerModalActionTypes.SET_CLIENT_DETAILS;
  payload: {
    [key: string]: string;
  };
}

export type SetOrganizationDetailsAction = {
  type: NewCustomerModalActionTypes.SET_ORGANIZATION_DETAILS;
  payload: {
    [key: string]: string;
  };
}

export type SetBankAccountDetailsAction = {
  type: NewCustomerModalActionTypes.SET_BANK_ACCOUNT_DETAILS;
  payload: {
    index: number;
    name: keyof BankAccount;
    value: string;
  };
}

export type SetDefaultBankAccountAction = {
  type: NewCustomerModalActionTypes.SET_DEFAULT_BANK_ACCOUNT;
  payload: {
    index: number;
  };
}

export type AddBankAccountAction = {
  type: NewCustomerModalActionTypes.ADD_BANK_ACCOUNT;
  payload: {};
}

export type DeleteBankAccountAction = {
  type: NewCustomerModalActionTypes.DELETE_BANK_ACCOUNT;
  payload: {
    index: number;
  };
}

export type SetAccountEmailAction = {
  type: NewCustomerModalActionTypes.SET_ACCOUNT_EMAIL;
  payload: {
    index: number;
    value: string;
  };
}

export type AddAccountEmailAction = {
  type: NewCustomerModalActionTypes.ADD_ACCOUNT_EMAIL;
  payload: {};
}

export type DeleteAccountEmailAction = {
  type: NewCustomerModalActionTypes.DELETE_ACCOUNT_EMAIL;
  payload: {
    index: number;
  };
}

export type SetRawMetaAction = {
  type: NewCustomerModalActionTypes.SET_RAW_META;
  payload: {
    index: number;
    tableEntryKey: keyof TModalMetaData;
    changedValue: string;
  };
}

export type AddRawMetaAction = {
  type: NewCustomerModalActionTypes.ADD_RAW_META;
  payload: {};
}

export type DeleteRawMetaAction = {
  type: NewCustomerModalActionTypes.DELETE_RAW_META;
  payload: {
    index: number;
  };
}

export type SetPreparedMetaAction = {
  type: NewCustomerModalActionTypes.SET_PREPARED_META;
  payload: {};
}

export type ClearStateAction = {
  type: NewCustomerModalActionTypes.CLEAR_STATE;
  payload: {};
}

export type NewCustomerModalActions = SetClientDetailsAction
  | SetOrganizationDetailsAction
  | SetBankAccountDetailsAction
  | SetDefaultBankAccountAction
  | AddBankAccountAction
  | DeleteBankAccountAction
  | SetAccountEmailAction
  | AddAccountEmailAction
  | DeleteAccountEmailAction
  | SetRawMetaAction
  | AddRawMetaAction
  | DeleteRawMetaAction
  | SetPreparedMetaAction
  | ClearStateAction;
