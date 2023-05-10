import { TCustomer } from '@/types/customer';

export type TCreatedCustomer = {
  customer: TCustomer;
}

export type TCustomers = Array<TCreatedCustomer & { id: number }>;

export type CustomersState = {
  customers: TCustomers | [];
}

export enum CustomersActionTypes {
  SET_CUSTOMERS = 'SET_CUSTOMERS',
  ADD_CUSTOMER = 'ADD_CUSTOMER',
}

export type SetCustomersAction = {
  type: CustomersActionTypes.SET_CUSTOMERS;
  payload: TCustomers;
}

export type AddCustomerAction = {
  type: CustomersActionTypes.ADD_CUSTOMER;
  payload: TCreatedCustomer;
}

export type CustomersActions = SetCustomersAction | AddCustomerAction;
