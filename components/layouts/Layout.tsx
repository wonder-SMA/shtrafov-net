import React, { FC, PropsWithChildren, ReactNode } from 'react';
import Meta from '@/components/seo/Meta';

type LayoutProps = {
  children?: ReactNode;
  title: string;
  description?: string;
}

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, title, description }) => {

  return (
    <>
      <Meta title={title} description={description}>
        <div className="layout">
          {children}
        </div>
      </Meta>

      <style jsx>
        {`
          .layout {
            width: 100%;
            height: 100vh;
            padding: 0.5rem;
            overflow-y: hidden;
          }
        `}
      </style>
    </>
  );
};

export default Layout;
