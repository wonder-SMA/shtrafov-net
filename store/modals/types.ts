import { TModalName } from '@/types/ModalName';

export type ModalState = {
  isOpenModals: Map<TModalName, boolean>;
  countOpenModals: number;
}

export enum ModalActionTypes {
  SET_IS_OPEN_MODAL = 'SET_IS_OPEN_MODAL',
}

export type SetIsOpenModalAction = {
  type: ModalActionTypes.SET_IS_OPEN_MODAL;
  payload: {
    name: TModalName;
    isOpen: boolean;
  };
}

export type ModalActions = SetIsOpenModalAction;
