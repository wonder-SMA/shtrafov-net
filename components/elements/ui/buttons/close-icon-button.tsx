import { FC } from 'react';
import IconButton from '@/components/layouts/icon-button';

type CloseIconButtonProps = {
  className?: string;
  width?: string;
  height?: string;
  onClose: () => void;
}

const CloseIconButton: FC<CloseIconButtonProps> = ({
                                                     className,
                                                     width = '1.5rem',
                                                     height = '1.5rem',
                                                     onClose,
                                                   }) => {

  return (
    <IconButton
      className={className}
      name="close"
      id="al"
      aria-label="Close"
      width={width}
      height={height}
      onClick={onClose}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" width={width} height={height}>
        <path d="m247 861-51-52 233-233-233-234 51-52 234 234 232-234 51 52-232 234 232 233-51 52-232-234-234 234Z" />
      </svg>
    </IconButton>
  );
};

export default CloseIconButton;
