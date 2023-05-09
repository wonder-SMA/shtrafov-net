import { customersReducer } from './customers/reducer';
import { modalReducer } from '@/store/modals/reducer';
import { newCustomerModalReducer } from '@/store/modals/newCustomer/reducer';
import * as customersActions from './customers/actions';
import * as modalActions from '@/store/modals/actions';
import * as newCustomerModalActions from '@/store/modals/newCustomer/actions';

export const reducers = { customersReducer, modalReducer, newCustomerModalReducer };
export const actions = { ...customersActions, ...modalActions, ...newCustomerModalActions };
