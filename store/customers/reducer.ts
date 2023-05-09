import { CustomersActions, CustomersActionTypes, CustomersState } from '@/store/customers/types';

const initialState: CustomersState = {
  customers: [],
};

export const customersReducer = (state = initialState, action: CustomersActions): CustomersState => {
  switch (action.type) {

    case CustomersActionTypes.SET_CUSTOMERS:
      return { ...state, customers: action.payload };

    case CustomersActionTypes.ADD_CUSTOMER:
      return {
        ...state,
        customers: [...state.customers, { id: state.customers.length + 1, customer: action.payload.customer }],
      };

    default:
      return state;
  }
};
