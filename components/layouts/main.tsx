import React, { FC, PropsWithChildren, ReactNode } from 'react';
import Meta from '@/components/seo/meta';

type MainProps = {
  children?: ReactNode;
  title: string;
  description?: string;
}

const Main: FC<PropsWithChildren<MainProps>> = ({ children, title, description }) => {

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

export default Main;
