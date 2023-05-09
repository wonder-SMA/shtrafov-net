import { ModalActions, ModalActionTypes, ModalState } from '@/store/modals/types';

const initialState: ModalState = {
  isOpenModals: new Map(),
  countOpenModals: 0,
};

export const modalReducer = (state = initialState, action: ModalActions): ModalState => {
  switch (action.type) {

    case ModalActionTypes.SET_IS_OPEN_MODAL: {
      const isOpenModals = state.isOpenModals;
      isOpenModals.set(action.payload.name, action.payload.isOpen);
      let countOpenModals = state.countOpenModals;
      action.payload.isOpen ? ++countOpenModals : --countOpenModals;

      return { ...state, isOpenModals, countOpenModals };
    }

    default:
      return state;
  }
};
