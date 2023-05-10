import { FC } from 'react';

type ArrowIconProps = {
  isRotate?: Boolean;
}

const ArrowIcon: FC<ArrowIconProps> = ({ isRotate }) => {

  return (
    <>
      <span className={`arrow-icon ${isRotate ? 'rotated' : ''}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" width="24px" height="24px" fill="#6b7280">
          <path d="M480 721 230 471l53-53 197 199 198-198 52 53-250 249Z" />
        </svg>
      </span>

      <style jsx>
        {`
          .arrow-icon {
            display: inline-flex;
            transition: all .2s;
          }

          .arrow-icon.rotated {
            transform: rotate(${isRotate ? -90 : 0}deg);
          }
        `}
      </style>
    </>
  );
};

export default ArrowIcon;
