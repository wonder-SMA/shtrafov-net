import {
  NewCustomerModalActions,
  NewCustomerModalActionTypes,
  NewCustomerModalState,
} from '@/store/modals/new-customer/types';
import randomstring from 'randomstring';

const initialState: NewCustomerModalState = {
  newCustomer: {
    name: '',
    email: '',
    deferral_days: 0,
    credit_limit: 0,
    organization: {
      name: '',
      inn: '',
      kpp: '',
      ogrn: '',
      addr: '',
      bank_accounts: [
        {
          name: '',
          bik: '',
          account_number: '',
          corr_account_number: '',
          is_default: true,
        },
      ],
    },
    metadata: {},
    'invoice_emails': [''],
    'invoice_prefix': randomstring.generate({
      length: 6,
      charset: 'alphanumeric',
      capitalization: 'uppercase',
    }),
  },
  rawMetaData: [],
};

export const newCustomerModalReducer = (state = initialState, action: NewCustomerModalActions): NewCustomerModalState => {
  switch (action.type) {

    // Client details
    case NewCustomerModalActionTypes.SET_CLIENT_DETAILS:
      return { ...state, newCustomer: { ...state.newCustomer, ...action.payload } };

    // Organization details
    case NewCustomerModalActionTypes.SET_ORGANIZATION_DETAILS:
      return {
        ...state,
        newCustomer: {
          ...state.newCustomer,
          organization: {
            ...state.newCustomer.organization,
            ...action.payload,
            bank_accounts: [...state.newCustomer.organization.bank_accounts],
          },
        },
      };

    // Bank account
    case NewCustomerModalActionTypes.SET_BANK_ACCOUNT_DETAILS: {
      const { index, name, value } = action.payload;
      const bank_accounts = [...state.newCustomer.organization.bank_accounts];
      const account = { ...bank_accounts[index], [name]: value };
      bank_accounts.splice(index, 1, account);

      return {
        ...state,
        newCustomer: {
          ...state.newCustomer,
          organization: { ...state.newCustomer.organization, bank_accounts },
        },
      };
    }

    case NewCustomerModalActionTypes.SET_DEFAULT_BANK_ACCOUNT: {
      const accounts = state.newCustomer.organization.bank_accounts.map((account, index) => {
        account.is_default = index === action.payload.index;
        return account;
      });

      return {
        ...state,
        newCustomer: {
          ...state.newCustomer,
          organization: { ...state.newCustomer.organization, bank_accounts: [...accounts] },
        },
      };
    }

    case NewCustomerModalActionTypes.ADD_BANK_ACCOUNT:
      return {
        ...state,
        newCustomer: {
          ...state.newCustomer,
          organization: {
            ...state.newCustomer.organization,
            bank_accounts: [
              ...state.newCustomer.organization.bank_accounts,
              { ...initialState.newCustomer.organization.bank_accounts[0] },
            ],
          },
        },
      };

    case NewCustomerModalActionTypes.DELETE_BANK_ACCOUNT: {
      const bank_accounts = [...state.newCustomer.organization.bank_accounts];
      bank_accounts.splice(action.payload.index, 1);

      return {
        ...state,
        newCustomer: {
          ...state.newCustomer,
          organization: { ...state.newCustomer.organization, bank_accounts },
        },
      };
    }

    // Account email
    case NewCustomerModalActionTypes.SET_ACCOUNT_EMAIL: {
      const { index, value } = action.payload;
      const invoice_emails = [...state.newCustomer.invoice_emails];
      invoice_emails[index] = value;

      return { ...state, newCustomer: { ...state.newCustomer, invoice_emails } };
    }

    case NewCustomerModalActionTypes.ADD_ACCOUNT_EMAIL:
      return {
        ...state,
        newCustomer: { ...state.newCustomer, invoice_emails: [...state.newCustomer.invoice_emails, ''] },
      };

    case NewCustomerModalActionTypes.DELETE_ACCOUNT_EMAIL: {
      const invoice_emails = [...state.newCustomer.invoice_emails];
      invoice_emails.splice(action.payload.index, 1);

      return { ...state, newCustomer: { ...state.newCustomer, invoice_emails } };
    }

    // MetaData
    case NewCustomerModalActionTypes.SET_RAW_META: {
      const { index, tableEntryKey, changedValue } = action.payload;
      let rawMetaData = [];
      rawMetaData = state.rawMetaData.map((data, dataIndex) => {
        if (dataIndex === index) {
          return { ...data, [tableEntryKey]: changedValue };
        }
        return data;
      });

      return { ...state, rawMetaData };
    }

    case NewCustomerModalActionTypes.ADD_RAW_META: {
      return {
        ...state,
        rawMetaData: [...state.rawMetaData, { id: randomstring.generate(), key: '', value: '' }],
      };
    }

    case NewCustomerModalActionTypes.DELETE_RAW_META: {
      const rawMetaData = [...state.rawMetaData];
      rawMetaData.splice(action.payload.index, 1);

      return { ...state, rawMetaData };
    }

    case NewCustomerModalActionTypes.SET_PREPARED_META: {
      let rawMetaData = [...state.rawMetaData];
      let preparedMetaData = {};
      rawMetaData.forEach(({ key, value }) => {
        if (key && value) {
          preparedMetaData = { ...preparedMetaData, [key]: value };
        }
      });

      return { ...state, newCustomer: { ...state.newCustomer, metadata: preparedMetaData } };
    }

    case NewCustomerModalActionTypes.CLEAR_STATE:
      return { ...initialState };

    default:
      return state;
  }
};
