import { toast } from 'react-toastify';
import { CustomerService } from '@/services/customer.service';
import { TAppDispatch, TRootState } from '@/store';
import { CustomersActionTypes } from '@/store/customers/types';
import {
  AddAccountEmailAction,
  AddBankAccountAction,
  AddRawMetaAction,
  ClearStateAction,
  DeleteAccountEmailAction,
  DeleteBankAccountAction,
  DeleteRawMetaAction,
  NewCustomerModalActionTypes,
  SetAccountEmailAction,
  SetBankAccountDetailsAction,
  SetClientDetailsAction,
  SetDefaultBankAccountAction,
  SetRawMetaAction,
  SetOrganizationDetailsAction,
  SetPreparedMetaAction,
} from '@/store/modals/newCustomer/types';

export const clearState = (payload: ClearStateAction['payload'] = {}) => {
  return { type: NewCustomerModalActionTypes.CLEAR_STATE, payload };
};

// Client details
export const setClientDetails = (payload: SetClientDetailsAction['payload']) => {
  return { type: NewCustomerModalActionTypes.SET_CLIENT_DETAILS, payload };
};

// Organization details
export const setOrganizationDetails = (payload: SetOrganizationDetailsAction['payload']) => {
  return { type: NewCustomerModalActionTypes.SET_ORGANIZATION_DETAILS, payload };
};

// Bank account
export const setBankAccountDetails = (payload: SetBankAccountDetailsAction['payload']) => {
  return { type: NewCustomerModalActionTypes.SET_BANK_ACCOUNT_DETAILS, payload };
};

export const setDefaultBankAccount = (payload: SetDefaultBankAccountAction['payload']) => {
  return { type: NewCustomerModalActionTypes.SET_DEFAULT_BANK_ACCOUNT, payload };
};

export const addBankAccount = (payload: AddBankAccountAction['payload'] = {}) => {
  return { type: NewCustomerModalActionTypes.ADD_BANK_ACCOUNT, payload };
};

export const deleteBankAccount = (payload: DeleteBankAccountAction['payload']) => {
  return { type: NewCustomerModalActionTypes.DELETE_BANK_ACCOUNT, payload };
};

// Account email
export const setAccountEmail = (payload: SetAccountEmailAction['payload']) => {
  return { type: NewCustomerModalActionTypes.SET_ACCOUNT_EMAIL, payload };
};

export const addAccountEmail = (payload: AddAccountEmailAction['payload'] = {}) => {
  return { type: NewCustomerModalActionTypes.ADD_ACCOUNT_EMAIL, payload };
};

export const deleteAccountEmail = (payload: DeleteAccountEmailAction['payload']) => {
  return { type: NewCustomerModalActionTypes.DELETE_ACCOUNT_EMAIL, payload };
};

// Meta
export const setRawMeta = (payload: SetRawMetaAction['payload']) => {
  return { type: NewCustomerModalActionTypes.SET_RAW_META, payload };
};

export const addRawMeta = (payload: AddRawMetaAction['payload'] = {}) => {
  return { type: NewCustomerModalActionTypes.ADD_RAW_META, payload };
};

export const deleteRawMeta = (payload: DeleteRawMetaAction['payload']) => {
  return { type: NewCustomerModalActionTypes.DELETE_RAW_META, payload };
};

export const setPreparedMeta = (payload: SetPreparedMetaAction['payload'] = {}) => {
  return { type: NewCustomerModalActionTypes.SET_PREPARED_META, payload };
};

export const createNewCustomer = (onClose: () => void) => {
  return async (dispatch: TAppDispatch, getState: () => TRootState) => {
    try {
      setPreparedMeta();
      const newCustomer = getState().newCustomerModalReducer.newCustomer;
      const createdCustomer = await CustomerService.createCustomer(newCustomer);
      dispatch({ type: CustomersActionTypes.ADD_CUSTOMER, payload: createdCustomer });
      onClose();
      toast.success('The customer has been added');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
};
