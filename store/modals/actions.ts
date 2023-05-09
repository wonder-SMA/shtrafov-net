import { ModalActionTypes, SetIsOpenModalAction } from '@/store/modals/types';

export const setIsOpen = (payload: SetIsOpenModalAction['payload']) => {
  return { type: ModalActionTypes.SET_IS_OPEN_MODAL, payload };
};
