import { FC, PropsWithChildren, ReactNode } from 'react';

type CollapseWithButtonProps = {
  children?: ReactNode;
  button?: ReactNode | null;
  name: string;
}

const CollapseWithButton: FC<PropsWithChildren<CollapseWithButtonProps>> = ({ children, button, name }) => {

  return (
    <>
      <div className={`${name}-container`}>
        {children}
        {button &&
          <div className={`${name}-container__button`}>
            {button}
          </div>
        }
      </div>

      <style jsx>
        {`
          .${name}-container {
            position: relative;
            width: 100%;
            margin-bottom: 0.75rem;
            padding-bottom: 0.25rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: start;
            border-bottom: 1px solid #d1d5db;

            .${name}-container__button {
              position: absolute;
              top: 0;
              right: 0;
            }
          }
        `}
      </style>
    </>
  );
};

export default CollapseWithButton;
