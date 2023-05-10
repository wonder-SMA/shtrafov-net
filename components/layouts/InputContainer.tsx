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
            width: 100%;
            padding: 0.25rem 0;
          }

          @media (min-width: 425px) {
            .input-container {
              width: 75%;
            }
          }

          @media (min-width: 768px) {
            .input-container {
              width: 60%;
            }
          }

          @media (min-width: 1024px) {
            .input-container {
              width: 50%;
            }
          }
        `}
      </style>
    </>
  );
};

export default InputContainer;
