import { FC } from 'react';

type SortIconProps = {
  isRotate?: Boolean;
}

const SortIcon: FC<SortIconProps> = ({ isRotate }) => {

  return (
    <>
      <span className={`sort-icon ${isRotate ? 'rotated' : ''}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" width="18px" height="18px" fill="#6b7280">
          <path d="M144 792v-72h240v72H144Zm0-180v-72h432v72H144Zm0-180v-72h672v72H144Z" />
        </svg>
      </span>

      <style jsx>
        {`
          .sort-icon {
            display: inline-flex;
            vertical-align: text-top;
            transition: all .2s;
          }

          .sort-icon.rotated {
            transform: rotate(${isRotate ? 180 : 0}deg);
          }
        `}
      </style>
    </>
  );
};

export default SortIcon;
