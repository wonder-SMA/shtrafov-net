import {
  FC,
  KeyboardEventHandler,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import CloseIconButton from '@/components/elements/ui/buttons/close-icon-button';

type ModalProps = {
  children?: ReactNode;
  heading?: string;
  footer?: ReactNode;
  onClose: () => void;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({ children, heading, footer, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    modalRef.current?.focus();

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalRef.current]);

  // Обработчик клика по области вне модалки
  const clickHandler: MouseEventHandler<HTMLDivElement> = useCallback(event => {
    if (event.target instanceof HTMLElement && event.target.className.endsWith('modal')) {
      onClose();
    }
  }, [onClose]);

  // Обработчик нажатия Escape
  const keyDownHandler: KeyboardEventHandler<HTMLDivElement> = useCallback(event => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  return (
    <>
      <div className="modal" onClick={clickHandler} onKeyDown={keyDownHandler} tabIndex={-1} ref={modalRef}>
        <div className="modal__content">
          <div className="modal__header">
            <h3 className="modal__heading">{heading}</h3>
            <CloseIconButton onClose={onClose} />
          </div>
          <div className="modal__body">
            {children}
          </div>
          {footer &&
            <div className="modal__footer">
              {footer}
            </div>}
        </div>
      </div>

      <style jsx>
        {`
          .modal {
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            position: fixed;
            display: flex;
            padding: 10px;
            background: rgba(0, 0, 0, 0.5);
            transition: all .2s;

            .modal__content {
              height: 80%;
              min-height: 380px;
              max-height: 800px;
              min-width: 380px;
              width: 80%;
              max-width: 800px;
              display: flex;
              flex-direction: column;
              margin: auto;
              border-radius: 8px;
              background: white;

              @media (min-width: 768px) {
                height: 95%;
                width: 95%
              }

              .modal__header {
                border-bottom: 1px solid #d1d5db;
                padding: 0.8rem 1.2rem;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;

                .modal__heading {
                  font-size: 1.25rem;
                  line-height: 1.75rem;
                  font-weight: 600;
                  color: inherit;
                }
              }

              .modal__body {
                height: 100%;
                width: 100%;
                padding: 1.2rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                overflow: auto;
              }

              @media (min-width: 768px) {
                .modal__body {
                  padding: 2rem;
                }
              }

              .modal__footer {
                margin: auto auto 0;
                padding: 1.2rem;
              }
            }
          }
        `}
      </style>
    </>
  );
};

export default Modal;
