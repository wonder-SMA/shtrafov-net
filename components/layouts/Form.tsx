import { FormEvent, forwardRef, PropsWithChildren, ReactNode, useImperativeHandle, useRef } from 'react';

type FormProps = {
  children?: ReactNode;
  name?: string;
  onSubmit?: (event: FormEvent) => void;
  button?: ReactNode;
}

const Form = forwardRef<HTMLFormElement | null, PropsWithChildren<FormProps>>(({
                                                                                 children,
                                                                                 name,
                                                                                 onSubmit,
                                                                                 button,
                                                                               }, ref) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  useImperativeHandle(ref, () => formRef.current as HTMLFormElement, [ref, formRef.current]);

  return (
    <>
      <form className="form" name={name} onSubmit={onSubmit} ref={formRef}>
        <div className="form__content">
          {children}
        </div>
        <div className="form__button">
          {button}
        </div>
      </form>

      <style jsx>
        {`
          .form {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            overflow: auto;
            scrollbar-gutter: stable;

            .form__content {
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: start;
              align-items: start;
            }

            .form__button {
              margin-top: auto;
            }
          }
        `}
      </style>
    </>
  );
});

export default Form;
