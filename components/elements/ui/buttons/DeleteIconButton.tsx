import { FC } from 'react';
import IconButton from '@/components/layouts/IconButton';

type DeleteIconButtonProps = {
  className?: string;
  width?: number;
  height?: number;
  onDelete: () => void;
}

const DeleteIconButton: FC<DeleteIconButtonProps> = ({
                                                       className,
                                                       width = 22,
                                                       height = 22,
                                                       onDelete,
                                                     }) => {

  return (
    <IconButton className={className} name="delete" width={width} height={height} danger onClick={onDelete}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" width={width} height={height}>
        <path d="m247 861-51-52 233-233-233-234 51-52 234 234 232-234 51 52-232 234 232 233-51 52-232-234-234 234Z" />
      </svg>
    </IconButton>
  );
};

export default DeleteIconButton;
