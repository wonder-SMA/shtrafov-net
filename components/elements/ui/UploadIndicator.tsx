import { FC, useLayoutEffect, useRef } from 'react';
import classNames from 'classnames';
import { TColor } from '@/types/Color';

type UploadIndicatorProps = {
  className?: string;
  colors?: TColor[];
}

const UploadIndicator: FC<UploadIndicatorProps> = ({ className = '', colors = ['darkcyan'] }) => {
  const circleRef = useRef<SVGCircleElement | null>(null);

  const uploadIndicatorClass = classNames({
    'upload-indicator': true,
    [className]: className,
  });

  useLayoutEffect(() => {
    if (circleRef.current) {
      let idx = 0;
      circleRef.current.style.stroke = colors.at(-1) as TColor;
      const interval = setInterval(() => {
        if (idx === colors.length) {
          idx = 0;
        }
        (circleRef.current as SVGCircleElement).style.stroke = colors[idx++];
      }, 1400);

      return () => {
        clearInterval(interval);
      };
    }
  }, [circleRef.current]);

  return (
    <>
      <div className={uploadIndicatorClass}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="upload-indicator__image">
          <circle ref={circleRef} cx="50" cy="50" r="45" />
        </svg>
      </div>

      <style jsx>
        {`
          .upload-indicator {
            position: absolute;
            width: 50%;
            height: 50%;
            max-width: 200px;
            max-height: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .upload-indicator__image {
            width: 90%;
            height: 90%;
            animation: 1.4s linear infinite svg-animation;
          }

          @keyframes svg-animation {
            0% {
              transform: rotateZ(0deg);
            }
            100% {
              transform: rotateZ(360deg);
            }
          }

          .upload-indicator__image circle {
            display: block;
            fill: transparent;
            stroke-linecap: round;
            stroke-dasharray: 280;
            stroke-dashoffset: 280;
            stroke-width: 6px;
            transform-origin: 50% 50%;
            transition: stroke 0.3s linear;
            animation: 1.4s ease-in-out infinite both circle-animation;
          }

          @keyframes circle-animation {
            0%,
            25% {
              stroke-dashoffset: 280;
              transform: rotate(0);
            }

            50%,
            75% {
              stroke-dashoffset: 75;
              transform: rotate(45deg);
            }

            100% {
              stroke-dashoffset: 280;
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </>
  );
};

export default UploadIndicator;
