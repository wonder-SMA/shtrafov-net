import { FC, PropsWithChildren, ReactNode } from 'react';

type HeaderProps = {
  children?: ReactNode;
  heading?: string;
}

const Header: FC<PropsWithChildren<HeaderProps>> = ({ children, heading }) => {

  return (
    <>
      <header className="header">
        <h1 className="header__heading">{heading}</h1>
        <div className="header__content">
          {children}
        </div>
      </header>

      <style jsx>
        {`
          .header {
            height: 2.5rem;
            margin-bottom: 0.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            overflow: hidden;

            .header__heading {
              margin-right: 8px;
              font-size: 1.25rem;
              line-height: 1.75rem;
              font-weight: 600;
              color: inherit;
            }

            .header__content {
              height: 100%;
              display: flex;
              flex-wrap: nowrap;
              gap: 0.5rem;
            }
          }
        `}
      </style>
    </>
  );
};

export default Header;
