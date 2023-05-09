import { FC, useCallback, useState } from 'react';
import { useActions } from '@/hooks/useActions';
import Button from '@/components/elements/ui/buttons/Button';
import Collapse from '@/components/layouts/Collapse';
import ContainerWithButton from '@/components/layouts/ContainerWithButton';
import TextInput from '@/components/elements/ui/TextInput';
import InputContainer from '@/components/layouts/InputContainer';
import { TTextInput } from '@/types/TextInput';

const AccountEmails: FC = () => {
  const [emails, setEmails] = useState<TTextInput[]>([
    {
      heading: 'Email',
      name: 'email',
      type: 'email',
      required: true,
      error: 'Введите email',
    },
  ]);
  const { setAccountEmail, addAccountEmail, deleteAccountEmail } = useActions();

  // Возвращает функцию с замыканием индекс email в списке emails
  const onChange = useCallback((index: number) => {
    return (value: string) => setAccountEmail({ index, value });
  }, []);

  const addHandler = useCallback(() => {
    setEmails(prevState => [...prevState, prevState[0]]);
    addAccountEmail();
  }, []);

  // Возвращает функцию с замыканием на индекс элемента из списка emails
  const deleteHandler = useCallback((index: number) => {
    return () => {
      setEmails(prevState => prevState.filter((_, itemIndex) => itemIndex !== index));
      deleteAccountEmail({ index });
    };
  }, []);

  return (
    <Collapse title="Emails для счетов">
      {emails.map(({
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
        <ContainerWithButton
          key={index}
          name="email"
          button={index !== 0
            ? <Button type="ghost" danger onClick={deleteHandler(index)}>– Удалить email</Button>
            : null
          }
        >
          <InputContainer>
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
              onChange={onChange(index)}
            />
          </InputContainer>
        </ContainerWithButton>
      ))}
      <Button type="ghost" className="w-full" onClick={addHandler}>
        + Добавить еще email
      </Button>
    </Collapse>
  );
};

export default AccountEmails;
