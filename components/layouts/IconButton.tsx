import { FC, PropsWithChildren, ReactNode } from 'react';
import classNames from 'classnames';

type IconButtonProps = {
  children?: ReactNode;
  className?: string;
  name: string;
  width: number;
  height: number;
  rotate?: number;
  danger?: boolean;
  onClick: () => void;
}

const IconButton: FC<PropsWithChildren<IconButtonProps>> = ({
                                                              children,
                                                              className = '',
                                                              name,
                                                              width,
                                                              height,
                                                              rotate,
                                                              danger,
                                                              onClick,
                                                            }) => {
  const iconButtonClass = classNames({
    [`${name}-button`]: true,
    rotated: rotate,
    [className]: className,
  });

  return (
    <>
      <button className={iconButtonClass} onClick={onClick}>
        <span className={`${name}-button__icon`}>{children}</span>
      </button>

      <style jsx>
        {`
          .${name}-button {
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: transparent;
            user-select: none;
            touch-action: manipulation;
            cursor: pointer;
            transition: transform .2s, fill .2s;

            .${name}-button__icon {
              width: ${width}px;
              height: ${height}px;
              display: flex;
              fill: ${danger ? '#ef4444' : '#6b7280'};
              transition: transform .2s, fill .2s;

              &:hover {
                fill: ${danger ? '#b91c1c' : '#334155'};
              }
            }
          }

          .${name}-button.rotated {
            transform: rotate(${rotate || 0}deg);
          }
        `}
      </style>
    </>
  );
};

export default IconButton;
