import { FC, PropsWithChildren, ReactNode } from 'react';

type UploadIndicatorContainerProps = {
  children?: ReactNode;
}

const UploadIndicatorContainer: FC<PropsWithChildren<UploadIndicatorContainerProps>> = ({ children }) => {
  return (
    <>
      <div className="upload-indicator-container">
        {children}
      </div>

      <style jsx>
        {`
          .upload-indicator-container {
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </>
  );
};

export default UploadIndicatorContainer;
