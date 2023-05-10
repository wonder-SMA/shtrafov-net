import { FC, useCallback, useMemo } from 'react';
import { useActions } from '@/hooks/use-actions';
import Collapse from '@/components/layouts/collapse';
import TextInput from '@/components/elements/ui/text-input';
import InputContainer from '@/components/layouts/input-container';
import { TTextInput } from '@/types/text-input';

const OrganizationDetails: FC = () => {
  const { setOrganizationDetails } = useActions();

  const organizationDetailsData = useMemo<TTextInput[]>(
    () => [
      {
        heading: 'Название организации',
        name: 'name',
        required: true,
        error: 'Введите название организации',
      },
      {
        heading: 'ИНН организации',
        name: 'inn',
        required: true,
        pattern: '\\d{10}',
        error: 'Введите ИНН организации',
      },
      {
        heading: 'КПП организации',
        name: 'kpp',
        required: true,
        pattern: '\\d{9}',
        error: 'Введите КПП организации',
      },
      {
        heading: 'ОГРН организации',
        name: 'ogrn',
        required: true,
        pattern: '^\\d{13}$|^\\d{15}$',
        error: 'Введите ОГРН организации',
      },
      {
        heading: 'Юридический адрес',
        name: 'addr',
        required: true,
        error: 'Введите юридический адрес',
      },
    ],
    [],
  );

  // Возвращает функцию с замыканием на имя инпута
  const onChange = useCallback((name: string) => {
    return (value: string) => setOrganizationDetails({ [name]: value });
  }, []);

  return (
    <Collapse title="Детали Организации">
      {organizationDetailsData.map(({
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

export default OrganizationDetails;
