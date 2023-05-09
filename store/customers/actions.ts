import { CustomerService } from '@/services/customer.service';
import { TAppDispatch } from '@/store';
import { CustomersActionTypes } from '@/store/customers/types';
import { toast } from 'react-toastify';

export const getCustomers = () => {
  return async (dispatch: TAppDispatch) => {
    try {
      const customers = await CustomerService.getCustomers();
      dispatch({ type: CustomersActionTypes.SET_CUSTOMERS, payload: customers });
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
};
