import DeleteIconButton from '@/components/elements/ui/buttons/delete-icon-button';
import { FC, useCallback, useState } from 'react';
import { useActions } from '@/hooks/use-actions';
import Button from '@/components/elements/ui/buttons/button';
import Collapse from '@/components/layouts/collapse';
import CollapseWithButton from '@/components/layouts/collapse-with-button';
import TextInput from '@/components/elements/ui/text-input';
import InputContainer from '@/components/layouts/input-container';
import { TTextInput } from '@/types/text-input';

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
        <CollapseWithButton
          key={index}
          name="email"
          button={index !== 0
            ? (matchMedia('(min-width: 576px)').matches
                ? <Button type="ghost" danger onClick={deleteHandler(index)}>
                  – Удалить email
                </Button>
                : <DeleteIconButton className="margin-center" onDelete={deleteHandler(index)} />
            )
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
        </CollapseWithButton>
      ))}
      <Button type="ghost" className="w-full" onClick={addHandler}>
        + Добавить еще email
      </Button>
    </Collapse>
  );
};

export default AccountEmails;
