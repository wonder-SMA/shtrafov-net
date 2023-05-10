import { FC, PropsWithChildren, ReactNode } from 'react';
import Head from 'next/head';

const getTitle = (title: string) => `${title} | Site name`;

type MetaProps = {
  children?: ReactNode;
  title: string;
  description?: string;
}

const Meta: FC<PropsWithChildren<MetaProps>> = ({ children, title, description }) => {

  return (
    <>
      <Head>
        <title>{getTitle(title)}</title>
        {description ?
          <>
            <meta name="description" content={description} />
            <meta name="og:title" content={getTitle(title)} />
            <meta name="og:description" content={description} />
          </>
          : <meta name="robots" content="noindex, nofollow" />
        }
      </Head>
      {children}
    </>
  );
};

export default Meta;
