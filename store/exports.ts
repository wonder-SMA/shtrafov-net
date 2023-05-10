import { customersReducer } from './customers/reducer';
import { modalReducer } from '@/store/modals/reducer';
import { newCustomerModalReducer } from '@/store/modals/new-customer/reducer';
import * as customersActions from './customers/actions';
import * as modalActions from '@/store/modals/actions';
import * as newCustomerModalActions from '@/store/modals/new-customer/actions';

export const reducers = { customersReducer, modalReducer, newCustomerModalReducer };
export const actions = { ...customersActions, ...modalActions, ...newCustomerModalActions };
