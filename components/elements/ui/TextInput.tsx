import { ChangeEventHandler, FC, PropsWithChildren, useState, useCallback, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import classNames from 'classnames';

type InputProps = {
  className?: string;
  heading?: string;
  id?: string;
  name?: string;
  type?: 'text' | 'email';
  value?: string;
  placeholder?: string;
  required?: boolean;
  size?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  error?: string;
  onChange?: (value: string) => void;
  delay?: number;
}

const TextInput: FC<PropsWithChildren<InputProps>> = ({
                                                        className = '',
                                                        heading,
                                                        id,
                                                        name,
                                                        type = 'text',
                                                        value = '',
                                                        placeholder,
                                                        required,
                                                        size,
                                                        minLength,
                                                        maxLength,
                                                        pattern,
                                                        error,
                                                        onChange,
                                                        delay,
                                                      }) => {
  // Внутренний стейт по умолчанию с переданным value
  const [inputValue, setInputValue] = useState<string>(value);
  const [isValid, setIsValid] = useState<boolean>(!required || false);
  const errorRef = useRef<HTMLSpanElement | null>(null);

  const inputClass = classNames({
    input: true,
    valid: isValid,
    [className]: className,
  });

  // Обновление стейта, если передан новый value
  useEffect(() => setInputValue(value), [value]);

  // Задержка для вызова onChange
  const changeDelay = useCallback(
    debounce(value => {
      if (onChange) {
        onChange(value);
      }
    }, delay),
    [onChange],
  );

  // Обработчик изменений в поле
  const inputHandler: ChangeEventHandler<HTMLInputElement> = useCallback(event => {
    setInputValue(event.target.value);
    changeDelay(event.target.value);

    if (errorRef.current?.style.display === 'none') {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [onChange, errorRef.current]);

  return (
    <>
      <div className={inputClass}>
        {heading &&
          <label className="input__label">
            <span className="input__required">* </span>
            {heading}
          </label>
        }
        <input
          className="input__field"
          id={id}
          name={name}
          value={inputValue}
          type={type}
          placeholder={placeholder}
          required={required}
          size={size}
          minLength={minLength}
          maxLength={maxLength}
          pattern={pattern}
          onChange={inputHandler}
        />
        {error &&
          <span className="input__error" ref={errorRef}>{error}</span>
        }
      </div>

      <style jsx>
        {`
          .input {
            display: flex;
            flex-direction: column;
            line-height: 1.25rem;

            .input__label {
              margin-bottom: 0.5rem;
              color: inherit;
            }

            .input__field {
              padding: 0.5rem;
              border-radius: 0.25rem;
              font-size: inherit;
              color: inherit;
              background-color: ${inputValue ? '#eef2ff' : '#ffffff'};
              outline: none;
              transition: border .2s, border-color 0s;

              &:valid {
                border: 1px solid #d1d5db;

                &:hover {
                  border-color: #9ca3af;
                }

                &:focus-visible {
                  border: 1px solid transparent;
                  outline: 2px solid #6b7280;
                }
              }

              &:invalid {
                border: 1px solid #dc2626;

                &:focus-visible {
                  border: 1px solid transparent;
                  outline: 2px solid #dc2626;
                }
              }
            }

            .input__required {
              color: #dc2626;
            }

            .input__error {
              display: none;
              margin: 0.25rem 0;
              color: #dc2626;
            }

            .input__field:invalid + .input__error {
              display: inline-block;
            }
          }
        `}
      </style>
    </>
  );
};

export default TextInput;
