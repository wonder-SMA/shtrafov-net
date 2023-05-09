import { FC, useCallback, useMemo } from 'react';
import { useActions } from '@/hooks/useActions';
import Collapse from '@/components/layouts/Collapse';
import TextInput from '@/components/elements/ui/TextInput';
import InputContainer from '@/components/layouts/InputContainer';
import { TTextInput } from '@/types/TextInput';

const ClientDetails: FC = () => {
  const { setClientDetails } = useActions();

  const clientDetailsData = useMemo<TTextInput[]>(
    () => [
      {
        heading: 'Имя',
        name: 'name',
        required: true,
        minLength: 2,
        maxLength: 64,
        error: 'Введите имя',
      },
      {
        heading: 'Email',
        name: 'email',
        type: 'email',
        required: true,
        error: 'Введите email',
      },
      {
        heading: 'Дней отсрочки',
        name: 'deferral_days',
        required: true,
        pattern: '\\d*',
        error: 'Дней отсрочки должна быть больше или равна нулю',
      },
      {
        heading: 'Кредитный лимит',
        name: 'credit_limit',
        required: true,
        pattern: '\\d*',
        error: 'Кредитный лимит должен быть больше или равна нулю',
      },
    ],
    [],
  );

  // Возвращает функцию с замыканием на имя инпута
  const onChange = useCallback((name: string) => {
    return (value: string) => setClientDetails({ [name]: value });
  }, []);

  return (
    <Collapse title="Детали клиента">
      {clientDetailsData.map(({
                                heading,
                                id,
                                name,
                                type,
                                placeholder,
                                required,
                                size,
                                minLength,
                                maxLength,
                                pattern,
                                error,
                              }, index) => (
        <InputContainer key={index}>
          <TextInput
            heading={heading}
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            size={size}
            minLength={minLength}
            maxLength={maxLength}
            pattern={pattern}
            error={error}
            onChange={onChange(name)}
          />
        </InputContainer>
      ))}
    </Collapse>
  );
};

export default ClientDetails;
