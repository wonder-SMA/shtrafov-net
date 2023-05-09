import { FC, PropsWithChildren } from 'react';

type SwitchProps = {
  name?: string;
  isChecked?: boolean;
  disabled?: boolean;
  onChange?: () => void;
}

const Switch: FC<PropsWithChildren<SwitchProps>> = ({ name, onChange, isChecked, disabled }) => {

  return (
    <>
      <label className="switch">
        <input
          className="switch__input"
          type="checkbox"
          name={name}
          checked={isChecked}
          disabled={disabled}
          onChange={onChange}
        />
        <span className="switch__slider" />
      </label>

      <style jsx>
        {`
          .switch {
            --height: 28px;
            position: relative;
            width: calc(var(--height) * 2);
            height: var(--height);
            display: inline-block;
            user-select: none;
            touch-action: manipulation;
            cursor: pointer;

            .switch__input {
              width: 0;
              height: 0;
              opacity: 0;
            }

            .switch__slider {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: #2563eb;
              cursor: pointer;
              transition: background-color .2s;
            }

            .switch__input:checked + .switch__slider:hover {
              background-color: #3b82f6;
            }

            .switch__input:checked + .switch__slider:active {
              background-color: #1d4ed8;
            }

            .switch__input:not(:checked) + .switch__slider {
              background-color: #d1d5db;
            }

            .switch__input:not(:checked) + .switch__slider:hover {
              background-color: #9ca3af;
            }

            .switch__input:not(:checked) + .switch__slider:active {
              background-color: #6b7280;
            }

            .switch__slider:before {
              position: absolute;
              height: calc(var(--height) - 6px);
              width: calc(var(--height) - 6px);
              bottom: 3px;
              left: 3px;
              content: "";
              background-color: white;
              transition: transform .2s;
            }

            .switch__input:checked + .switch__slider:before {
              transform: translateX(var(--height));
            }

            .switch__slider, .switch__slider:before {
              border-radius: var(--height);
            }
          }
        `}
      </style>
    </>
  );
};

export default Switch;
