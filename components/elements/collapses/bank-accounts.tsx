import { FC, useCallback, useMemo, useState } from 'react';
import { useActions } from '@/hooks/use-actions';
import Button from '@/components/elements/ui/buttons/button';
import Collapse from '@/components/layouts/collapse';
import CollapseWithButton from '@/components/layouts/collapse-with-button';
import TextInput from '@/components/elements/ui/text-input';
import InputContainer from '@/components/layouts/input-container';
import Switch from '@/components/elements/ui/switch';
import SwitchContainer from '@/components/layouts/switch-container';
import DeleteIconButton from '@/components/elements/ui/buttons/delete-icon-button';
import { TTextInput } from '@/types/text-input';
import { BankAccount } from '@/types/new-customer';

const BankAccounts: FC = () => {
  const bankAccountsData = useMemo<TTextInput[]>(
    () => [
      {
        heading: 'Название счета',
        name: 'name',
        required: true,
        error: 'Введите название счета',
      },
      {
        heading: 'Номер счета',
        name: 'account_number',
        required: true,
        pattern: '\\d*',
        error: 'Введите номер счета',
      },
      {
        heading: 'БИК счета',
        name: 'bik',
        required: true,
        pattern: '\\d{9}',
        error: 'Введите БИК счета',
      },
      {
        heading: 'Корр. номер счета',
        name: 'corr_account_number',
        required: true,
        pattern: '\\d{20}',
        error: 'Введите Корр. номер счета',
      },
    ],
    [],
  );
  const [accounts, setAccounts] = useState<TTextInput[][]>([bankAccountsData]);
  const [defaultAccount, setDefaultAccount] = useState<number>(0);
  const { setBankAccountDetails, setDefaultBankAccount, addBankAccount, deleteBankAccount } = useActions();

  // Возвращает функцию с замыканием на имя инпута и индекс счета в списке accounts
  const onChange = useCallback((index: number, name: keyof BankAccount) => {
    return (value: string) => setBankAccountDetails({ index, name, value });
  }, []);

  // Добавляет новый аккаунт в конец списка accounts
  const addHandler = useCallback(() => {
    setAccounts(prevState => [...prevState, prevState[0]]);
    addBankAccount();
  }, []);

  // Возвращает функцию с замыканием на индекс элемента из списка accounts
  const deleteHandler = useCallback((index: number) => {
    return () => {
      if (index === defaultAccount) {
        setDefaultAccount(0);
      }
      setAccounts(prevState => prevState.filter((_, itemIndex) => itemIndex !== index));
      deleteBankAccount({ index });
    };
  }, [defaultAccount]);

  // Возвращает функцию с замыканием на индекс элемента из списка accounts
  const setDefaultAccountHandler = useCallback((index: number) => {
    return () => {
      setDefaultAccount(index);
      setDefaultBankAccount({ index });
    };
  }, []);

  return (
    <Collapse title="Банковские счета">
      {accounts.map((account, accountIndex) => (
        <CollapseWithButton
          key={accountIndex}
          name="account"
          button={accountIndex !== 0
            ? (matchMedia('(min-width: 576px)').matches
                ? <Button type="ghost" danger onClick={deleteHandler(accountIndex)}>
                  – Удалить счет
                </Button>
                : <DeleteIconButton className="margin-center" onDelete={deleteHandler(accountIndex)} />
            )
            : null
          }
        >
          {account.map(({
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
                required={accountIndex === defaultAccount && required}
                size={size}
                minLength={minLength}
                maxLength={maxLength}
                pattern={pattern}
                error={error}
                onChange={onChange(accountIndex, name as keyof BankAccount)}
              />
            </InputContainer>
          ))}
          <SwitchContainer text="Дефолтный счет">
            <Switch
              name="default_account"
              onChange={setDefaultAccountHandler(accountIndex)}
              isChecked={accountIndex === defaultAccount}
              disabled={accountIndex === defaultAccount}
            />
          </SwitchContainer>
        </CollapseWithButton>
      ))}
      <Button type="ghost" className="w-full" onClick={addHandler}>
        + Добавить еще счет
      </Button>
    </Collapse>
  );
};

export default BankAccounts;
