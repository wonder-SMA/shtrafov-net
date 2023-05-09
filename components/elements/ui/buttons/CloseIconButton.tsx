import { FC } from 'react';
import IconButton from '@/components/layouts/IconButton';

type CloseIconButtonProps = {
  className?: string;
  width?: number;
  height?: number;
  onClose: () => void;
}

const CloseIconButton: FC<CloseIconButtonProps> = ({
                                                     className,
                                                     width = 24,
                                                     height = 24,
                                                     onClose,
                                                   }) => {

  return (
    <IconButton className={className} name="close" width={width} height={height} onClick={onClose}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" width={width} height={height}>
        <path d="m247 861-51-52 233-233-233-234 51-52 234 234 232-234 51 52-232 234 232 233-51 52-232-234-234 234Z" />
      </svg>
    </IconButton>
  );
};

export default CloseIconButton;
