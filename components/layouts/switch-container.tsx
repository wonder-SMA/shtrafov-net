import { FC, PropsWithChildren, ReactNode } from 'react';

type SwitchContainerProps = {
  children?: ReactNode;
  text?: string;
}

const SwitchContainer: FC<PropsWithChildren<SwitchContainerProps>> = ({ children, text }) => {

  return (
    <>
      <div className="switch-container">
        <span className="switch-container__text">{text}</span>
        {children}
      </div>

      <style jsx>
        {`
          .switch-container {
            padding: 0.5rem 0 0.25rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;

            .switch-container__text {
              line-height: 1.25rem;
              color: inherit;
            }
          }
        `}
      </style>
    </>
  );
};

export default SwitchContainer;
