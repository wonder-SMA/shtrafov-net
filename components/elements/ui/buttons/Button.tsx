import { FC, PropsWithChildren, useCallback } from 'react';
import classNames from 'classnames';

type ButtonProps = {
  children?: string;
  className?: string;
  type?: string;
  submit?: boolean;
  danger?: boolean;
  onClick: () => void;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
                                                      children,
                                                      className = '',
                                                      type = 'primary',
                                                      submit,
                                                      danger = false,
                                                      onClick,
                                                    }) => {
  const buttonClass = classNames({
    button: true,
    [type]: type,
    [className]: className,
  });

  const clickHandler = useCallback(() => onClick(), [onClick]);

  return (
    <>
      <button
        className={buttonClass}
        type={submit ? 'submit' : 'button'}
        onClick={clickHandler}
      >
        {children}
      </button>

      <style jsx>
        {`
          .button {
            max-height: 2.5rem;
            padding: 0.5rem 1rem;
            border: 1px solid transparent;
            border-radius: 0.25rem;
            text-align: center;
            font-size: inherit;
            user-select: none;
            touch-action: manipulation;
            cursor: pointer;
            transition: color .2s, background-color .2s, border-color .2s;
          }

          .primary {
            color: white;
            background-color: ${danger ? '#dc2626' : '#2563eb'};

            &:hover {
              background-color: ${danger ? '#ef4444' : '#3b82f6'};
            }

            &:active {
              background-color: ${danger ? '#b91c1c' : '#1d4ed8'};
            }
          }

          .ghost {
            border-color: ${danger ? '#dc2626' : '#d1d5db'};
            color: ${danger ? '#dc2626' : 'inherit'};
            background-color: transparent;

            &:hover {
              color: ${danger ? '#f87171' : '#3b82f6'};
              border-color: ${danger ? '#f87171' : '#3b82f6'};
            }

            &:active {
              color: ${danger ? '#b91c1c' : '#1d4ed8'};
              border-color: ${danger ? '#b91c1c' : '#1d4ed8'};
            }
          }

          .text {
            color: ${danger ? '#b91c1c' : 'inherit'};
            background-color: transparent;

            &:hover {
              background-color: ${danger ? '#fef2f2' : '#f3f4f6'};
            }

            &:active {
              background-color: ${danger ? '#fee2e2' : '#e5e7eb'};
            }
          }

          .link {
            color: ${danger ? '#dc2626' : '#2563eb'};
            background-color: transparent;

            &:hover {
              color: ${danger ? '#f87171' : '#3b82f6'};
            }

            &:active {
              color: ${danger ? '#b91c1c' : '#1d4ed8'};
            }
          }
        `}
      </style>
    </>
  );
};

export default Button;
