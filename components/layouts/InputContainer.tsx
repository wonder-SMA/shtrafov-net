import { FC, PropsWithChildren, ReactNode } from 'react';

type InputContainerProps = {
  children?: ReactNode;
}

const InputContainer: FC<PropsWithChildren<InputContainerProps>> = ({ children }) => {

  return (
    <>
      <div className="input-container">{children}</div>

      <style jsx>
        {`
          .input-container {
            width: 50%;
            padding: 0.25rem 0;
          }
        `}
      </style>
    </>
  );
};

export default InputContainer;
